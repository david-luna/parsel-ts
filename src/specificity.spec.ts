/* eslint-disable @typescript-eslint/no-magic-numbers */
import { specificity } from './specificity';

describe('specificity', () => {
  it('should return specificity for the web example', () => {
    // eslint-disable-next-line prettier/prettier
    const selector = '#foo > .bar + div.k1.k2 [id=\'baz\']:hello(2):not(:where(#yolo))::before';

    expect(specificity(selector)).toEqual([1, 5, 2]);
  });
});
