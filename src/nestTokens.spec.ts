import { nestTokens, NestTokensOptions } from './nestTokens';
import { Token } from './types';

describe('nestTokens', () => {
  const tokensRecord: Record<string, Token> = {
    id: { type: 'id', content: '#test', name: 'test', pos: [0, 1] },
    comma: { type: 'comma', content: ',', name: ',', pos: [0, 1] },
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
});
