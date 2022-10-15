import { gobbleParens } from './gobbleParens';
import { TOKENS, TOKENS_FOR_RESTORE, TOKENS_WITH_PARENS, TOKENS_WITH_STRINGS, TRIM_TOKENS } from './tokens';
import { Token } from './types';

type Grammar = Record<string, RegExp>;
type StringWithOffset = { str: string; start: number };

function isTokenType(input: unknown): input is Token {
  return typeof input == 'object';
}

function restoreNested(tokens: Array<string | Token>, strings: StringWithOffset[], regex: RegExp, types: Set<string>) {
  for (const str of strings) {
    for (const token of tokens) {
      if (isTokenType(token) && types.has(token.type) && token.pos[0] < str.start && str.start < token.pos[1]) {
        const { content } = token;
        token.content = token.content.replace(regex, str.str);

        // actually changed?
        if (token.content !== content) {
          // Re-evaluate groups
          TOKENS_FOR_RESTORE[token.type].lastIndex = 0;
          const match = TOKENS_FOR_RESTORE[token.type].exec(token.content);
          const groups = match && match.groups;
          Object.assign(token, groups);
        }
      }
    }
  }
}

export function tokenizeBy(text: string, grammar: Grammar): Array<Token | string> {
  if (!text) {
    return [];
  }

  const strarr: Array<Token | string> = [text];

  for (const token in grammar) {
    const pattern = grammar[token];

    // Don’t cache length as it changes during the loop
    for (let i = 0; i < strarr.length; i++) {
      const str = strarr[i];

      if (typeof str === 'string') {
        pattern.lastIndex = 0;

        const match = pattern.exec(str);

        if (match) {
          const from = match.index - 1;
          const args = [] as Array<Token | string>;
          const content = match[0];

          const before = str.slice(0, from + 1);
          if (before) {
            args.push(before);
          }

          args.push({
            type: token as Token['type'],
            content,
            ...match.groups,
          } as Token);

          const after = str.slice(from + content.length + 1);
          if (after) {
            args.push(after);
          }

          strarr.splice(i, 1, ...args);
        }
      }
    }
  }

  let offset = 0;
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < strarr.length; i++) {
    const token = strarr[i];
    //const length = token.length || token.content.length;
    const length = isTokenType(token) ? token.content.length : token.length;

    if (isTokenType(token)) {
      token.pos = [offset, offset + length];

      if (TRIM_TOKENS.has(token.type)) {
        token.content = token.content.trim() || ' ';
      }
    }

    offset += length;
  }

  return strarr;
}

export function tokenize(input: string): Array<Token | string> | null {
  if (!input) {
    return null;
  }

  let selector = input.trim(); // prevent leading/trailing whitespace be interpreted as combinators

  // Replace strings with whitespace strings (to preserve offsets)
  const strings: StringWithOffset[] = [];
  // FIXME Does not account for escaped backslashes before a quote
  selector = selector.replace(/(['"])(\\\1|.)+?\1/g, (str, quote, content, start) => {
    strings.push({ str, start });
    return quote + '§'.repeat(content.length) + quote;
  });

  // Now that strings are out of the way, extract parens and replace them with parens with whitespace (to preserve offsets)
  const parens: StringWithOffset[] = [];
  let offset = 0;
  let start;

  while ((start = selector.indexOf('(', offset)) > -1) {
    const str = gobbleParens(selector, start);
    parens.push({ str, start });
    selector =
      selector.substring(0, start) + '(' + '¶'.repeat(str.length - 2) + ')' + selector.substring(start + str.length);
    offset = start + str.length;
  }

  // Now we have no nested structures and we can parse with regexes
  const tokens = tokenizeBy(selector, TOKENS);

  // Now restore parens and strings in reverse order
  restoreNested(tokens, parens, /\(¶+\)/, TOKENS_WITH_PARENS);
  restoreNested(tokens, strings, /(['"])§+?\1/, TOKENS_WITH_STRINGS);

  return tokens;
}
