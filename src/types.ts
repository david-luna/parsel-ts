// Tokenize types
interface GenericToken {
  content: string;
  namespace?: string;
  pos: [number, number];
}

interface IdToken extends GenericToken {
  type: 'id';
  name: string;
}

interface IdToken extends GenericToken {
  type: 'id';
  name: string;
}

interface TypeToken extends GenericToken {
  type: 'type';
  name: string;
}

interface ClassToken extends GenericToken {
  type: 'class';
  name: string;
}

interface AttributeToken extends GenericToken {
  type: 'attribute';
  name: string;
  operator: string;
  value: string;
  caseSensitive?: 'i' | 's';
}

interface PseudoClassToken extends GenericToken {
  type: 'pseudo-class';
  name: string;
  argument: string;
  subtree?: AST;
}

interface PseudoElementToken extends GenericToken {
  type: 'pseudo-element';
  name: string;
}

interface CommaToken extends GenericToken {
  type: 'comma';
  content: ',';
}

interface CombinatorToken extends GenericToken {
  type: 'combinator';
}

export type Token =
  | IdToken
  | TypeToken
  | ClassToken
  | AttributeToken
  | PseudoClassToken
  | PseudoElementToken
  | CommaToken
  | CombinatorToken;

// AST types
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
