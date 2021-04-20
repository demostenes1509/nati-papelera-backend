import { Parser } from 'jison';

export class ManapelParser {
  parser: Parser;

  constructor() {
    const grammar = {
      lex: {
        rules: [
          ['\\s+', '/* skip whitespace */'],
          ['[xX]', "return 'number';"],
          ['[nN][ ]', "return 'number';"],
          ['[nN][\\*][0-9a-zA-Z/\\(\\)\\.\\-]*', "return 'number';"],
          ['[a-zA-ZñÑ/\\)\\-="][0-9a-zA-Z/\\(\\)\\.\\-:,éó"ñÑ]*', "return 'word';"],
          ['[0-9\\(][0-9a-zA-Z/\\.\\(\\)\\-,%:]*', "return 'number';"],
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
          ['number', '$$ = $1'],
          ['number number', '$$ = `${$1} ${$2}`'],
          ['number number number', '$$ = `${$1} ${$2} ${$3}`'],
          ['number word', '$$ = `${$1} ${$2}`'],
          ['number word word', '$$ = `${$1} ${$2} ${$3}`'],
          ['number word word word', '$$ = `${$1} ${$2} ${$3} ${$4}`'],
          ['number word word word number', '$$ = `${$1} ${$2} ${$3} ${$4} ${$5}`'],
          ['number word word number', '$$ = `${$1} ${$2} ${$3} ${$4}`'],
          ['number word word number word word', '$$ = `${$1} ${$2} ${$3} ${$4} ${$5} ${$6}`'],
          ['number word number', '$$ = `${$1} ${$2} ${$3}`'],
          ['number word number word', '$$ = `${$1} ${$2} ${$3} ${$4}`'],
          ['number word number number', '$$ = `${$1} ${$2} ${$3} ${$4}`'],
          ['number word number number word', '$$ = `${$1} ${$2} ${$3} ${$4} ${$5}`'],
          ['number word word number word', '$$ = `${$1} ${$2} ${$3} ${$4} ${$5}`'],
          ['number word word number number word', '$$ = `${$1} ${$2} ${$3} ${$4} ${$5} ${$6}`'],
          ['number number word', '$$ = `${$1} ${$2} ${$3}`'],
          ['number number word word', '$$ = `${$1} ${$2} ${$3} ${$4}`'],
          ['number number word number', '$$ = `${$1} ${$2} ${$3} ${$4}`'],
          ['number number number word', '$$ = `${$1} ${$2} ${$3} ${$4}`'],
          ['number number number word number', '$$ = `${$1} ${$2} ${$3} ${$4} ${$5}`'],
          ['number number word number number', '$$ = `${$1} ${$2} ${$3} ${$4} ${$5}`'],
          ['number number word number word', '$$ = `${$1} ${$2} ${$3} ${$4} ${$5}`'],
          ['number number number word number number', '$$ = `${$1} ${$2} ${$3} ${$4} ${$5} ${$6}`'],
          ['number number number number', '$$ = `${$1} ${$2} ${$3} ${$4}`'],
          ['number number number number word', '$$ = `${$1} ${$2} ${$3} ${$4} ${$5}`'],
          ['number number word word number', '$$ = `${$1} ${$2} ${$3} ${$4} ${$5}`'],
          ['number number number number number number', '$$ = `${$1} ${$2} ${$3} ${$4} ${$5} ${$6}`'],
          ['number number word number number word', '$$ = `${$1} ${$2} ${$3} ${$4} ${$5} ${$6}`'],
          ['number word word number word number', '$$ = `${$1} ${$2} ${$3} ${$4} ${$5} ${$6}`'],
        ],
      },
    };

    this.parser = new Parser(grammar);
  }

  parseProduct(productName: string) {
    return this.parser.parse(productName);
  }
}
