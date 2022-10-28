/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Complex, List, Token } from './types';
import { walk, WalkOptions } from './walk';

describe('walk', () => {
  const callbackSpy = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return void if no node passed', () => {
    walk(void 0, callbackSpy);

    expect(callbackSpy).not.toHaveBeenCalled();
  });

  it('should walk left & right for a complex node', () => {
    const complexNode = { type: 'complex', left: {}, right: {} } as unknown as Complex;

    walk(complexNode, callbackSpy);

    expect(callbackSpy).toHaveBeenCalledTimes(3);
    expect(callbackSpy).toHaveBeenCalledWith(complexNode.left, complexNode);
    expect(callbackSpy).toHaveBeenCalledWith(complexNode.right, complexNode);
    expect(callbackSpy).toHaveBeenCalledWith(complexNode, void 0);
  });

  it('should walk all the items on a list node', () => {
    const listNode = { type: 'list', list: [{}, {}] } as unknown as List;

    walk(listNode, callbackSpy);

    expect(callbackSpy).toHaveBeenCalledTimes(3);
    expect(callbackSpy).toHaveBeenCalledWith(listNode.list[0], listNode);
    expect(callbackSpy).toHaveBeenCalledWith(listNode.list[1], listNode);
    expect(callbackSpy).toHaveBeenCalledWith(listNode, void 0);
  });

  it('should walk all the items on a compound node', () => {
    const compoundNode = { type: 'compound', list: [{}, {}] } as unknown as List;

    walk(compoundNode, callbackSpy);

    expect(callbackSpy).toHaveBeenCalledTimes(3);
    expect(callbackSpy).toHaveBeenCalledWith(compoundNode.list[0], compoundNode);
    expect(callbackSpy).toHaveBeenCalledWith(compoundNode.list[1], compoundNode);
    expect(callbackSpy).toHaveBeenCalledWith(compoundNode, void 0);
  });

  it('should walk recusively on a subtree of if subtree option is set to true', () => {
    const nodeWithSubtree = { type: 'combinator', subtree: {} } as unknown as Token;
    const options = { subtree: true } as WalkOptions;

    walk(nodeWithSubtree, callbackSpy, options);

    expect(callbackSpy).toHaveBeenCalledTimes(2);
    expect(callbackSpy).toHaveBeenCalledWith(nodeWithSubtree.subtree, nodeWithSubtree);
    expect(callbackSpy).toHaveBeenCalledWith(nodeWithSubtree, void 0);
  });

  it('should NOT walk recusively on a subtree of if options is not defined', () => {
    const nodeWithSubtree = { type: 'combinator', subtree: {} } as unknown as Token;

    walk(nodeWithSubtree, callbackSpy);

    expect(callbackSpy).toHaveBeenCalledTimes(1);
    expect(callbackSpy).toHaveBeenCalledWith(nodeWithSubtree, void 0);
  });

  it('should NOT walk recusively on a subtree of if subtree option set to false', () => {
    const nodeWithSubtree = { type: 'combinator', subtree: {} } as unknown as Token;
    const options = {} as unknown as WalkOptions;

    walk(nodeWithSubtree, callbackSpy, options);

    expect(callbackSpy).toHaveBeenCalledTimes(1);
    expect(callbackSpy).toHaveBeenCalledWith(nodeWithSubtree, void 0);
  });
});
