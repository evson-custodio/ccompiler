const Parser = require('jison').Parser;

let operation = 'console.log($1);';

let grammar = {
    // lex.rules substitui uma captura por uma string retornada
    // bnf.<property> analisador sintatico, busca capturar grupos lexicos realizados pelo lex.rules
    lex: {
        rules: [
            // Qualquer espacamento
            [ '\\s', '' ],
            // EOF
            [ '$', 'return "EOF";'],
            // Tipos
            [ 'int', 'return "INT";' ],
            [ 'char', 'return "CHAR";' ],
            [ 'float', 'return "FLOAT";' ],
            [ 'double', 'return "DOUBLE";' ],
            [ 'long', 'return "LONG";' ],
            // Separadores
            [ ',', 'return "COMMA";' ],
            [ ';', 'return "SEMICOLON";' ],
            [ ':', 'return "COLON";' ],
            [ '\\.', 'return "POINT";' ],
            // Circuladores
            [ '\'', 'return "QUOTE";' ],
            [ '\"', 'return "DOUBLE_QUOTE";' ],
            [ '\\(', 'return "PARENTHESES_OPEN";' ],
            [ '\\)', 'return "PARENTHESES_CLOSED";' ],
            [ '\\[', 'return "BRACKETS_OPEN";' ],
            [ '\\]', 'return "BRACKETS_CLOSED";' ],
            [ '\\{', 'return "KEYS_OPEN";' ],
            [ '\\}', 'return "KEYS_CLOSED";' ],
            // Operadores Logicos Quantitativos
            [ '<', 'return "LT";' ],
            [ '>', 'return "GT";' ],
            [ '<=', 'return "LE";' ],
            [ '>=', 'return "GE";' ],
            [ '==', 'return "EQ";' ],
            [ '!=', 'return "NE";' ],
            // Operadores Logicos Bitwise
            // [ '~', 'return "}";' ],
            // [ '&', 'return "}";' ],
            // [ '|', 'return "}";' ],
            // Operadores Logicos Unarios
            [ '!', 'return "NOT";' ],
            // Operadores Logicos Binarios
            [ '&&', 'return "AND";' ],
            [ '\\|\\|', 'return "OR";' ],
            // Operadores Aritmeticos
            [ '=', 'return "ATTRIBUTION";' ],
            [ '\\+', 'return "SUM";' ],
            [ '-', 'return "SUBTRACTION";' ],
            [ '\\*', 'return "MULTIPLICATION";' ],
            [ '/', 'return "DIVISION";' ],
            [ '%', 'return "MOD";' ],
            // Key words
            [ 'if', 'return "IF";' ],
            [ 'else', 'return "ELSE";' ],
            [ 'switch', 'return "SWITCH";' ],
            [ 'case', 'return "CASE";' ],
            [ 'break', 'return "BREAK";' ],
            [ 'default', 'return "DEFAULT";' ],
            [ 'for', 'return "FOR";' ],
            [ 'do', 'return "DO";' ],
            [ 'while', 'return "WHILE";' ],
            [ 'return', 'return "RETURN";' ],
            // Pre-compilers
            [ '#(include|INCLUDE)', 'return "INCLUDE";' ],
            [ '#(define|DEFINE)', 'return "DEFINE";' ],
            // Literais
            [ '\\b\\d+\\b', 'return "INTEGER";' ],
            [ '\\b\\d+\\.\\d+\\b', 'return "DECIMAL";' ],
            [ '\'\\w?\'', 'return "CHARACTER";' ],
            [ '\"\w*\"', 'return "STRING";' ],
            // Identificador
            [ '\\b[a-zA-Z_]\\w*', 'return "IDENTIFIER";' ]
        ]
    },
    bnf: {
        a: [
            [ 'type a', operation ],
            [ 'separator a', operation ],
            [ 'circulators a', operation ],
            [ 'quantitative a', operation ],
            [ 'unary a', operation ],
            [ 'binary a', operation ],
            [ 'operator a', operation ],
            [ 'keyword a', operation ],
            [ 'pre_compilers a', operation ],
            [ 'literal a', operation ],
            [ 'identifier a', operation ],
            [ 'EOF', operation]
        ],
        type: [
            [ 'INT', operation ],
            [ 'CHAR', operation ],
            [ 'FLOAT', operation ],
            [ 'DOUBLE', operation ],
            [ 'LONG', operation ]
        ],
        separator: [
            [ 'COMMA', operation ],
            [ 'SEMICOLON', operation ],
            [ 'COLON', operation ],
            [ 'POINT', operation ]
        ],
        circulators: [
            [ 'QUOTE', operation ],
            [ 'DOUBLE_QUOTE', operation ],
            [ 'PARENTHESES_OPEN', operation ],
            [ 'PARENTHESES_CLOSED', operation ],
            [ 'BRACKETS_OPEN', operation ],
            [ 'BRACKETS_CLOSED', operation ],
            [ 'KEYS_OPEN', operation ],
            [ 'KEYS_CLOSED', operation ]
        ],
        quantitative: [
            [ 'LT', operation ],
            [ 'GT', operation ],
            [ 'LE', operation ],
            [ 'GE', operation ],
            [ 'EQ', operation ],
            [ 'NE', operation ]
        ],
        unary: [
            [ 'NOT', operation ]
        ],
        binary: [
            [ 'AND', operation ],
            [ 'OR', operation ]
        ],
        operator: [
            [ 'ATTRIBUTION', operation ],
            [ 'SUM', operation ],
            [ 'SUBTRACTION', operation ],
            [ 'MULTIPLICATION', operation ],
            [ 'DIVISION', operation ],
            [ 'MOD', operation ]
        ],
        keyword: [
            [ 'IF', operation ],
            [ 'ELSE', operation ],
            [ 'SWITCH', operation ],
            [ 'CASE', operation ],
            [ 'BREAK', operation ],
            [ 'DEFAULT', operation ],
            [ 'FOR', operation ],
            [ 'DO', operation ],
            [ 'WHILE', operation ],
            [ 'RETURN', operation ]
        ],
        pre_compilers: [
            [ 'INCLUDE', operation ],
            [ 'DEFINE', operation ]
        ],
        literal: [
            [ 'INTEGER', operation ],
            [ 'DECIMAL', operation ],
            [ 'CHARACTER', operation ],
            [ 'STRING', operation ]
        ],
        identifier: [
            [ 'IDENTIFIER', operation ]
        ]
    }
}

let parser = Parser(grammar);

let parserSource = parser.generate();

parser.parse('int main() { int _4 = 4; printf("%d\n", _4); return 0; }');