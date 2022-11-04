/* eslint-disable @typescript-eslint/no-magic-numbers */
import { tokenize } from './tokenize';

const removeVoids = (obj: any) => JSON.parse(JSON.stringify(obj));

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
    expect(removeVoids(tokenize('[attribute="value"]'))).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        operator: '=',
        value: '"value"',
        content: '[attribute="value"]',
        pos: [0, 19],
      },
    ]);
  });

  it('should tokenize an attribute starts with selector', () => {
    expect(removeVoids(tokenize('[attribute^="value"]'))).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        namespace: void 0,
        operator: '^=',
        value: '"value"',
        content: '[attribute^="value"]',
        pos: [0, 20],
      },
    ]);
  });

  it('should tokenize an attribute ends with selector', () => {
    expect(removeVoids(tokenize('[attribute$="value"]'))).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        operator: '$=',
        value: '"value"',
        content: '[attribute$="value"]',
        pos: [0, 20],
      },
    ]);
  });

  it('should tokenize an attribute contains occurence selector', () => {
    expect(removeVoids(tokenize('[attribute*="value"]'))).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        operator: '*=',
        value: '"value"',
        content: '[attribute*="value"]',
        pos: [0, 20],
      },
    ]);
  });

  it('should tokenize an attribute contains with whitespaces selector', () => {
    expect(removeVoids(tokenize('[attribute~="value"]'))).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        operator: '~=',
        value: '"value"',
        content: '[attribute~="value"]',
        pos: [0, 20],
      },
    ]);
  });

  it('should tokenize an attribute starts with hypen selector', () => {
    expect(removeVoids(tokenize('[attribute|="value"]'))).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        operator: '|=',
        value: '"value"',
        content: '[attribute|="value"]',
        pos: [0, 20],
      },
    ]);
  });

  it('should tokenize setting the caseSensitive property to insensitive', () => {
    expect(removeVoids(tokenize('[attribute|="value" i]'))).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        operator: '|=',
        value: '"value"',
        content: '[attribute|="value" i]',
        caseSensitive: 'i',
        pos: [0, 22],
      },
    ]);
  });

  it('should tokenize setting the caseSensitive property to sensitive', () => {
    expect(removeVoids(tokenize('[attribute|="value" s]'))).toEqual([
      {
        type: 'attribute',
        name: 'attribute',
        operator: '|=',
        value: '"value"',
        content: '[attribute|="value" s]',
        caseSensitive: 's',
        pos: [0, 22],
      },
    ]);
  });

  //a[attr="abcde"][attr="123"]
  it('should tokenize multiple attribute selector', () => {
    expect(removeVoids(tokenize('a[attribute="value"][attribute="123"]'))).toEqual([
      {
        type: 'type',
        name: 'a',
        content: 'a',
        pos: [0, 1],
      },
      {
        type: 'attribute',
        name: 'attribute',
        operator: '=',
        value: '"value"',
        content: '[attribute="value"]',
        pos: [1, 20],
      },
      {
        type: 'attribute',
        name: 'attribute',
        operator: '=',
        value: '"123"',
        content: '[attribute="123"]',
        pos: [20, 37],
      },
    ]);
  });

  it('should tokenize pseudo-elements', () => {
    expect(removeVoids(tokenize('::before'))).toEqual([
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
    expect(removeVoids(tokenize(':hover'))).toEqual([
      {
        type: 'pseudo-class',
        name: 'hover',
        content: ':hover',
        pos: [0, 6],
      },
    ]);
  });

  it('should tokenize pseudo-classes nesting', () => {
    expect(removeVoids(tokenize('div:not(:where(#yolo))'))).toEqual([
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

    expect(removeVoids(tokens)).toEqual([
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
        pos: [24, 34],
      },
      {
        type: 'pseudo-class',
        content: ':hello(2)',
        name: 'hello',
        argument: '2',
        pos: [34, 43],
      },
      {
        type: 'pseudo-class',
        content: ':not(:where(#yolo))',
        name: 'not',
        argument: ':where(#yolo)',
        pos: [43, 62],
      },
      {
        type: 'pseudo-element',
        content: '::before',
        name: 'before',
        pos: [62, 70],
      },
    ]);
  });
});
