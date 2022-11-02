import { insert } from './insert';

describe('insert', () => {
  it('should add the entry before the property specified', () => {
    const target = { a: 1, c: 3 };

    insert(target, { property: 'b', value: 2, before: 'c' });

    const props = [];

    for (const p in target) {
      props.push(p);
    }

    expect(props).toStrictEqual(['a', 'b', 'c']);
    expect(target).toStrictEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });
});
