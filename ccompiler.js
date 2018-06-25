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
            // [ '\'', 'return "QUOTE";' ],
            // [ '\"', 'return "DOUBLE_QUOTE";' ],
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
            [ '\\b\\d+\\.\\d+\\b', 'return "DECIMAL";' ],
            [ '\\b\\d+\\b', 'return "INTEGER";' ],
            [ '\'\\w?\'', 'return "CHARACTER";' ],
            [ '\\"[\\s\\wáâãéêíîóôõúûüç$#%\\(\\)\\[\\]\\{\\}\\+\\-\\*\\/\\.;,\\!<>=]*\\"', 'return "STRING";' ],
            // Identificador
            [ '\\b[a-zA-Z_]\\w*', 'return "IDENTIFIER";' ]
        ]
    },
    bnf: {
        start: [
            [ 'syntatic EOF', 'return $1'],
        ],
        includeLib: [
            [ 'INCLUDE LT identifier POINT identifier GT', 'console.log("Include Lib 1");' ]
        ],
        defFunction: [
            [ 'type identifier PARENTHESES_OPEN PARENTHESES_CLOSED', 'console.log("defFunction empry");' ],
            [ 'type identifier PARENTHESES_OPEN declarationArgs PARENTHESES_CLOSED', 'console.log("defFunction args");' ]
        ],
        expression: [
            [ 'identifier', operation ],
            [ 'literal', operation ],
            [ 'expression operator expression', operation ],
            [ 'PARENTHESES_OPEN expression PARENTHESES_CLOSED', operation ]
        ],
        declarationSequen: [
            [ 'COMMA identifier declarationSequen', 'console.log("declarationVar Sequence 1");' ],
            [ 'COMMA identifier ATTRIBUTION literal declarationSequen', 'console.log("declarationVar Sequence 2");' ],
            [ 'SEMICOLON', 'console.log("declarationVar Sequence 3");' ]
        ],
        declarationVar: [
            [ 'type identifier declarationSequen', 'console.log("declarationVar 1");' ],
            [ 'type identifier ATTRIBUTION literal declarationSequen', 'console.log("declarationVar 2");' ]
        ],
        defIf: [
            [ 'IF PARENTHESES_OPEN expression PARENTHESES_CLOSED block', 'console.log("defIf");' ]
        ],
        declarationArgs: [
            [ 'type identifier', 'console.log("declarationArgs final");' ],
            [ 'type identifier COMMA declarationArgs', 'console.log("declarationArgs inter");' ]
        ],
        functionCallerArgs: [
            [ 'identifier', 'console.log("functionCallerArgs 1");' ],
            [ 'literal', 'console.log("functionCallerArgs 2");' ],
            [ 'functionCallerArgs COMMA functionCallerArgs', 'console.log("functionCallerArgs 3");' ],
        ],
        functionCaller: [
            [ 'identifier PARENTHESES_OPEN PARENTHESES_CLOSED', 'console.log("functionCaller 1");' ],
            [ 'identifier PARENTHESES_OPEN functionCallerArgs PARENTHESES_CLOSED', 'console.log("functionCaller 2");' ],
        ],
        blockArgs: [
            [ 'declarationVar blockArgs', 'console.log("blockArgs 1");' ],
            [ 'defIf blockArgs', 'console.log("blockArgs 2");' ],
            [ 'expression SEMICOLON blockArgs', 'console.log("blockArgs 3");' ],
            [ 'functionCaller SEMICOLON blockArgs', 'console.log("blockArgs 4");' ],
            [ 'defReturn', 'console.log("blockArgs 5");' ],
            [ '', 'console.log("blockArgs 6");' ]
        ],
        block: [
            [ 'KEYS_OPEN KEYS_CLOSED', 'console.log("Block empry");' ],
            [ 'KEYS_OPEN blockArgs KEYS_CLOSED', 'console.log("Block empry");' ] //Terminar
        ],
        syntatic: [
            [ 'includeLib syntatic', 'console.log("Valid!");' ],
            [ 'defFunction block', 'console.log("Valid!");' ]
        ],
        identifier: [
            [ 'IDENTIFIER', operation ]
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
            // [ 'QUOTE', operation ],
            // [ 'DOUBLE_QUOTE', operation ],
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
            [ 'LT', operation ],
            [ 'GT', operation ],
            [ 'LE', operation ],
            [ 'GE', operation ],
            [ 'EQ', operation ],
            [ 'NE', operation ],
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
        defReturn: [
            [ 'RETURN expression SEMICOLON', 'console.log("defReturn 1");' ]
        ]
    }
}

let parser = Parser(grammar);

let parserSource = parser.generate();

parser.parse('#include <stdio.h> #include <stdlib.h> int main() { int variavelA = 15; int variavelB = 20; int resultado; resultado = variavelB / variavelA; if (resultado > 1.0) { printf("O Resultado eh maior que 1.0!\n"); } printf("O Resultado eh %.f\n", resultado); return 0; }');