import { Parser } from 'jison';

export class ManapelParser {
  parser: Parser;

  constructor() {
    const grammar = {
      lex: {
        rules: [
          ['\\s+', '/* skip whitespace */'],
          ['[a-zA-Z]+', "return 'word';"],
          ['[0-9][0-9a-zA-Z/]+', "return 'number';"],
          ['$', "return 'EOF'"],
        ],
      },

      bnf: {
        article: [
          ['product EOF', 'return [$1]'],
          ['product packaging EOF', 'return [$1,$2]'],
        ],
        product: [
          ['product word', '$$ = `${$1} ${$2}`'],
          ['word', '$$ = $1'],
        ],
        packaging: [
          ['packaging number', '$$ = `${$1} ${$2}`'],
          //   ['packaging number word', '$$ = `${$1} ${$2} ${$3}`'],
          ['number', '$$ = $1'],
        ],
      },
    };

    this.parser = new Parser(grammar);
  }

  parseProduct(productName: string) {
    return this.parser.parse(productName);
  }
}
