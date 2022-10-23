import { nestTokens, NestTokensOptions } from './nestTokens';
import { Token } from './types';

describe('nestTokens', () => {
  const tokensRecord: Record<string, Token> = {
    id: { type: 'id', content: '#test', name: 'test', pos: [0, 1] },
    comma: { type: 'comma', content: ',', name: ',', pos: [0, 1] },
    clazz: { type: 'class', content: '.class', name: 'class', pos: [0, 1] },
    combinator: { type: 'combinator', content: '>', name: '>', pos: [0, 1] },
  };

  it('should return null if tokens is empty', () => {
    expect(nestTokens([])).toBeNull();
  });

  it('should throw error if 1st token is comma', () => {
    expect(() => nestTokens([tokensRecord.comma])).toThrowError(/Incorrect comma at 0/);
  });

  it('should throw error if there are 2 consecutive commas', () => {
    expect(() => nestTokens([tokensRecord.id, tokensRecord.comma, tokensRecord.comma])).toThrowError(
      /Incorrect comma at 2/,
    );
  });

  it('should throw error if there is a trailing comma', () => {
    expect(() => nestTokens([tokensRecord.id, tokensRecord.comma])).toThrowError(/Trailing comma/);
  });

  it('should return an list object when selectors separated by comma', () => {
    expect(nestTokens([tokensRecord.id, tokensRecord.comma, tokensRecord.clazz])).toStrictEqual({
      type: 'list',
      list: [tokensRecord.id, tokensRecord.clazz],
    });
  });

  it('should return NULL when list option is false and no tokens passed', () => {
    expect(nestTokens([], { list: false })).toStrictEqual(null);
  });

  it('should return a complex AST when list option is false and there is a combinator', () => {
    expect(nestTokens([tokensRecord.clazz, tokensRecord.combinator, tokensRecord.id], { list: false })).toStrictEqual({
      type: 'complex',
      combinator: tokensRecord.combinator.content,
      left: tokensRecord.clazz,
      right: tokensRecord.id,
    });
  });

  it('should return a simple token when we only pass this one', () => {
    expect(nestTokens([tokensRecord.clazz], { list: false })).toStrictEqual(tokensRecord.clazz);
  });
});
