import { Parser } from 'jison';

export class ManapelParser {
  parser: Parser;

  constructor() {
    const grammar = {
      lex: {
        rules: [
          ['\\s+', '/* skip whitespace */'],
          ['[a-zA-Z]+', "return 'WORD';"],
          ['[0-9][0-9a-zA-Z/]+', "return 'NUMBER';"],
          ['$', "return 'EOF'"],
        ],
      },

      bnf: {
        article: [
          ['product EOF', 'return [$1]'],
          ['product packaging EOF', 'return [$1,$2]'],
        ],
        product: [
          ['product WORD', '$$ = `${$1} ${$2}`'],
          ['WORD', '$$ = $1'],
        ],
        packaging: [
          ['packaging NUMBER', '$$ = `${$1} ${$2}`'],
          ['NUMBER', '$$ = $1'],
        ],
      },
    };

    this.parser = new Parser(grammar);
  }

  parseProduct(productName: string) {
    return this.parser.parse(productName);
  }
}
