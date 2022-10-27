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

  it('should tokenize pseudo-classes nesting', () => {
    expect(tokenize('div:not(:where(#yolo))')).toEqual([
      {
        type: 'type',
        content: 'div',
        name: 'div',
        pos: [0, 3],
      },
      {
        type: 'pseudo-class',
        content: ':not(:where(#yolo))',
        name: 'not',
        argument: ':where(#yolo)',
        pos: [3, 22],
      },
    ]);
  });

  it('should tokenize the sample from the web', () => {
    // eslint-disable-next-line prettier/prettier
    const tokens = tokenize('#foo > .bar + div.k1.k2 [id=\'baz\']:hello(2):not(:where(#yolo))::before');

    expect(JSON.parse(JSON.stringify(tokens))).toEqual([
      {
        type: 'id',
        content: '#foo',
        name: 'foo',
        pos: [0, 4],
      },
      {
        type: 'combinator',
        content: '>',
        pos: [4, 7],
      },
      {
        type: 'class',
        content: '.bar',
        name: 'bar',
        pos: [7, 11],
      },
      {
        type: 'combinator',
        content: '+',
        pos: [11, 14],
      },
      {
        type: 'type',
        content: 'div',
        name: 'div',
        pos: [14, 17],
      },
      {
        type: 'class',
        content: '.k1',
        name: 'k1',
        pos: [17, 20],
      },
      {
        type: 'class',
        content: '.k2',
        name: 'k2',
        pos: [20, 23],
      },
      {
        type: 'combinator',
        content: ' ',
        pos: [23, 24],
      },
      {
        type: 'attribute',
        // eslint-disable-next-line prettier/prettier
        content: '[id=\'baz\']',
        name: 'id',
        operator: '=',
        // eslint-disable-next-line prettier/prettier
        value: '\'baz\'',
        pos: [24, 32],
      },
      {
        type: 'pseudo-class',
        content: ':hello(2)',
        name: 'hello',
        argument: '2',
        pos: [32, 41],
      },
      {
        type: 'pseudo-class',
        content: ':not(:where(#yolo))',
        name: 'not',
        argument: ':where(#yolo)',
        pos: [41, 60],
      },
      {
        type: 'pseudo-element',
        content: '::before',
        name: 'before',
        pos: [60, 68],
      },
    ]);
  });
});
