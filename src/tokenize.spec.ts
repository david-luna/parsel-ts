/* eslint-disable @typescript-eslint/no-magic-numbers */
import { tokenize } from './tokenize';

describe('tokenize', () => {
  it('should return null if there is no input', () => {
    expect(tokenize('')).toEqual(null);
  });

  it('should tokenize a type selector', () => {
    expect(tokenize('div')).toEqual([
      {
        type: 'type',
        name: 'div',
        namespace: void 0,
        content: 'div',
        pos: [0, 3],
      },
    ]);
  });

  it('should tokenize an ID selector', () => {
    expect(tokenize('#id')).toEqual([
      {
        type: 'id',
        name: 'id',
        content: '#id',
        pos: [0, 3],
      },
    ]);
  });

  it('should tokenize a class selector', () => {
    expect(tokenize('.class')).toEqual([
      {
        type: 'class',
        name: 'class',
        content: '.class',
        pos: [0, 6],
      },
    ]);
  });

  it('should tokenize an attribute equals selector', () => {
    expect(tokenize('[attribute="value"]')).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        namespace: void 0,
        operator: '=',
        value: '"value"',
        content: '[attribute="value"]',
        pos: [0, 15],
      },
    ]);
  });

  it('should tokenize an attribute starts with selector', () => {
    expect(tokenize('[attribute^="value"]')).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        namespace: void 0,
        operator: '^=',
        value: '"value"',
        content: '[attribute^="value"]',
        caseSensitive: void 0,
        pos: [0, 16],
      },
    ]);
  });

  it('should tokenize an attribute ends with selector', () => {
    expect(tokenize('[attribute$="value"]')).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        namespace: void 0,
        operator: '$=',
        value: '"value"',
        content: '[attribute$="value"]',
        caseSensitive: void 0,
        pos: [0, 16],
      },
    ]);
  });

  it('should tokenize an attribute contains occurence selector', () => {
    expect(tokenize('[attribute*="value"]')).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        namespace: void 0,
        operator: '*=',
        value: '"value"',
        content: '[attribute*="value"]',
        caseSensitive: void 0,
        pos: [0, 16],
      },
    ]);
  });

  it('should tokenize an attribute contains with whitespaces selector', () => {
    expect(tokenize('[attribute~="value"]')).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        namespace: void 0,
        operator: '~=',
        value: '"value"',
        content: '[attribute~="value"]',
        caseSensitive: void 0,
        pos: [0, 16],
      },
    ]);
  });

  it('should tokenize an attribute starts with hypen selector', () => {
    expect(tokenize('[attribute|="value"]')).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        namespace: void 0,
        operator: '|=',
        value: '"value"',
        content: '[attribute|="value"]',
        caseSensitive: void 0,
        pos: [0, 16],
      },
    ]);
  });

  it('should tokenize setting the caseSensitive property to insensitive', () => {
    expect(tokenize('[attribute|="value" i]')).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        namespace: void 0,
        operator: '|=',
        value: '"value"',
        content: '[attribute|="value" i]',
        caseSensitive: 'i',
        pos: [0, 18],
      },
    ]);
  });

  it('should tokenize setting the caseSensitive property to sensitive', () => {
    expect(tokenize('[attribute|="value" s]')).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        namespace: void 0,
        operator: '|=',
        value: '"value"',
        content: '[attribute|="value" s]',
        caseSensitive: 's',
        pos: [0, 18],
      },
    ]);
  });

  it('should tokenize pseudo-elements', () => {
    expect(tokenize('::before')).toEqual([
      {
        type: 'pseudo-element',
        argument: void 0,
        name: 'before',
        content: '::before',
        pos: [0, 8],
      },
    ]);
  });

  it('should tokenize pseudo-classes', () => {
    expect(tokenize(':hover')).toEqual([
      {
        type: 'pseudo-class',
        argument: void 0,
        name: 'hover',
        content: ':hover',
        pos: [0, 6],
      },
    ]);
  });
});
