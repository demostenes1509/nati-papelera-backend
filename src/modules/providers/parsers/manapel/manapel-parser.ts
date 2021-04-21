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
          ['wordlist EOF', 'return [$1]'],
          ['wordlist number EOF', 'return [$1,$2]'],
          ['wordlist number trailing EOF', 'return [$1,`${$2} ${$3}`]'],
        ],
        wordlist: [
          ['wordlist word', '$$ = `${$1} ${$2}`'],
          ['word', '$$ = $1'],
        ],
        trailing: [
          ['trailing word', '$$ = `${$1} ${$2}`'],
          ['trailing number', '$$ = `${$1} ${$2}`'],
          ['word', '$$ = $1'],
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
