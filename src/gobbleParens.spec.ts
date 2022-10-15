import { gobbleParens } from './gobbleParens';

describe('gobbleParens', () => {
  const text = 'div[a=1][b=2]:where(p > a), textarea.editable:not(h1:where(quote))';
  it('should return one char if in the index there is no opening parentesis', () => {
    expect(gobbleParens(text, 0)).toEqual('d');
  });

  it('should return the complete parentesis with whatever is inside', () => {
    const index = text.indexOf('(');

    expect(gobbleParens(text, index)).toEqual('(p > a)');
  });

  it('should return the complete parentesis with nested parentesis', () => {
    const index = text.indexOf('(h1');

    expect(gobbleParens(text, index)).toEqual('(h1:where(quote))');
  });

  it('should throw if missing closing parentesis', () => {
    expect(() => gobbleParens('(div > p', 0)).toThrow(/without closing paren/);
  });

  it('should throw if missing closing parentesis', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(() => gobbleParens('(div > p)', 8)).toThrow(/without opening paren/);
  });
});
