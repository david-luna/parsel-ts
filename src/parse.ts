import { nestTokens } from './nestTokens';
import { tokenize } from './tokenize';
import { RECURSIVE_PSEUDO_CLASSES, RECURSIVE_PSEUDO_CLASSES_ARGS } from './tokens';
import { AST, Token } from './types';
import { walk } from './walk';

export interface ParseOptions {
  recursive: boolean;
  list: boolean;
}

const DEFAULT_PARSE_OPTIONS: ParseOptions = {
  recursive: true,
  list: true,
};

/**
 * Parse a CSS selector
 * @param selector {String} The selector to parse
 * @param options.recursive {Boolean} Whether to parse the arguments of pseudo-classes like :is(), :has() etc. Defaults to true.
 * @param options.list {Boolean} Whether this can be a selector list (A, B, C etc). Defaults to true.
 */
export function parse(selector: string, options: Partial<ParseOptions> = {}): AST | null {
  const { recursive, list } = Object.assign({}, DEFAULT_PARSE_OPTIONS, options);
  const tokens = tokenize(selector);

  if (!tokens) {
    return null;
  }

  const ast = nestTokens(tokens as Token[], { list }) as AST;

  if (recursive) {
    walk(ast, (node) => {
      if (node.type === 'pseudo-class' && node.argument) {
        if (RECURSIVE_PSEUDO_CLASSES.has(node.name)) {
          let argument = node.argument;
          const childArg = RECURSIVE_PSEUDO_CLASSES_ARGS[node.name];
          if (childArg) {
            const match = childArg.exec(argument);
            if (!match) {
              return;
            }

            Object.assign(node, match.groups);
            argument = match.groups ? match.groups.subtree : '';
          }
          if (argument) {
            node.subtree = parse(argument, { recursive: true, list: true }) as AST;
          }
        }
      }
    });
  }

  return ast;
}
