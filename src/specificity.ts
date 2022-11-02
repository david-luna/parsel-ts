import { parse } from './parse';
import { RECURSIVE_PSEUDO_CLASSES } from './tokens';
import { AST } from './types';
import { walk } from './walk';

function maxIndexOf(arr: number[]): number {
  let max = arr[0];
  let ret = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      ret = i;
      max = arr[i];
    }
  }

  return arr.length === 0 ? -1 : ret;
}

/**
 * Converts the specificity array to a number
 * @param specificity array if specificity weights
 * @param base base to calculate the number
 * @returns number
 */
export function specificityToNumber(specificityArr: number[], base?: number): number {
  const b = base || Math.max(...specificityArr) + 1;

  return specificityArr[0] * b ** 2 + specificityArr[1] * b + specificityArr[2];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function specificity(selector: string | AST, { format = 'array' } = {}): number[] | null {
  const ast = typeof selector === 'object' ? selector : parse(selector, { recursive: true });

  if (!ast) {
    return null;
  }

  if (ast.type === 'list') {
    // Return max specificity
    let base = 10;
    const specificities = ast.list.map((s) => {
      const sp = specificity(s) || [];
      base = Math.max(base, ...sp);
      return sp;
    });
    const numbers = specificities.map((s) => specificityToNumber(s, base));
    const i = maxIndexOf(numbers);
    return specificities[i];
  }

  const ret = [0, 0, 0];

  walk(ast, (node) => {
    if (node.type === 'id') {
      ret[0]++;
    } else if (node.type === 'class' || node.type === 'attribute') {
      ret[1]++;
    } else if ((node.type === 'type' && node.content !== '*') || node.type === 'pseudo-element') {
      ret[2]++;
    } else if (node.type === 'pseudo-class' && node.name !== 'where') {
      if (RECURSIVE_PSEUDO_CLASSES.has(node.name) && node.subtree) {
        // Max of argument list
        const sub = specificity(node.subtree) || [];
        sub.forEach((s, i) => (ret[i] += s));
      } else {
        ret[1]++;
      }
    }
  });

  return ret;
}
