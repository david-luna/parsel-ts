export interface Token {
  type: 'class' | 'attribute' | 'id' | 'type' | 'pseudo-element' | 'pseudo-class' | 'comma' | 'combinator';
  content: string;
  name: string;
  namespace?: string;
  value?: string;
  pos: [number, number];
  operator?: string;
  argument?: string;
  subtree?: AST;
  caseSensitive?: 'i';
}

export interface Complex {
  type: 'complex';
  combinator: string;
  right: AST;
  left: AST;
}

export interface Compound {
  type: 'compound';
  list: Token[];
}

export interface List {
  type: 'list';
  list: AST[];
}

export type AST = Complex | Compound | List | Token;
