import { AST, Token } from './types';

// Traverse an AST (or part thereof), in depth-first order
export function walk(node: AST | void, callback: (n: AST, p?: AST) => void, o?: Token, parent?: AST): void {
  if (!node) {
    return;
  }

  if (node.type === 'complex') {
    walk(node.left, callback, o, node);
    walk(node.right, callback, o, node);
  } else if (node.type === 'compound' || node.type === 'list') {
    for (const n of node.list) {
      walk(n, callback, o, node);
    }
  } else if (node.subtree && o && o.subtree) { // TODO: looking at the usage this seems not reachable
    walk(node.subtree, callback, o, node);
  }

  callback(node, parent);
}
