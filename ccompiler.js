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
            [ '\\+\\+', 'return "INCREASE";' ],
            [ '--', 'return "DECREASE";' ],
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
            [ '\\"[\\s\\wÃ¡Ã¢Ã£Ã©ÃªÃ­Ã®Ã³Ã´ÃµÃºÃ»Ã¼Ã§$#%\\(\\)\\[\\]\\{\\}\\+\\-\\*\\/\\.;,\\!<>=]*\\"', 'return "STRING";' ],
            // Identificador
            [ '\\b[a-zA-Z_]\\w*', 'return "IDENTIFIER";' ]
        ]
    },
    bnf: {
        start: [
            [ 'syntatic EOF', 'return $1'],
        ],
        // Análise de inclusão de biblioteca
        includeLib: [
            [ 'INCLUDE LT identifier POINT identifier GT', 'console.log("Include Library 1");' ]
        ],
        // Análise de define
        defineExp: [
            [ 'DEFINE identifier literal', 'console.log("Define Expression 1");' ]
        ],
        // Definição de função
        defFunction: [
            [ 'type identifier PARENTHESES_OPEN PARENTHESES_CLOSED', 'console.log("Empty Function Definition");' ],
            [ 'type identifier PARENTHESES_OPEN declarationArgs PARENTHESES_CLOSED', 'console.log("Function Arguments Definition");' ]
        ],
        // Definição de expressão
        expression: [
            [ 'identifier', operation ],
            [ 'literal', operation ],
            [ 'expression operator expression', operation ],
            [ 'PARENTHESES_OPEN expression PARENTHESES_CLOSED', operation ]
        ],
        // Sequencia de declaração
        declarationSequen: [
            [ 'COMMA identifier declarationSequen', 'console.log("Variable Sequence Declaration 1");' ],
            [ 'COMMA identifier ATTRIBUTION expression declarationSequen', 'console.log("Variable Sequence Declaration 2");' ],
            [ 'SEMICOLON', 'console.log("Variable Sequence Declaration 3");' ]
        ],
        // Declaração de variaveis
        declarationVar: [
            [ 'type identifier declarationSequen', 'console.log("Variable Declaration 1");' ],
            [ 'type identifier ATTRIBUTION expression declarationSequen', 'console.log("Variable Declaration 2");' ]
        ],
        // Definição do IF
        defIf: [
            [ 'IF PARENTHESES_OPEN expression PARENTHESES_CLOSED block defElse', 'console.log("IF Definition");' ]
        ],
        // Definição do ELSE
        defElse: [
            [ '', 'console.log("Else Definition 1");' ],
            [ 'ELSE block', 'console.log("Else Definition 2");' ],
            [ 'ELSE defIf', 'console.log("Else Definition 3");' ]
        ],
        // Definição do DO (while)
        defDo: [
            [ 'DO block WHILE PARENTHESES_OPEN expression PARENTHESES_CLOSED SEMICOLON', 'console.log("Do (while) Definition");' ]
        ],
        // Definição do WHILE
        defWhile: [
            [ 'WHILE PARENTHESES_OPEN expression PARENTHESES_CLOSED block', 'console.log("While Definition");' ]
        ],
        // Segunda parte do FOR
        expressionFor: [
            [ 'expression', 'console.log("FOR Expression 1");' ],
            [ 'expression COMMA expressionFor', 'console.log("FOR Expression 2");' ]
        ],
        // Primeira parte do FOR
        initialFor: [
            [ '', 'console.log("FOR Initialization 1");' ],
            [ 'declarationVar', 'console.log("FOR Initialization 2");' ],
            [ 'expressionFor', 'console.log("FOR Initialization 3");' ]
        ],
        // Expressão Unária
        expressionUnary: [
            [ 'identifier unary', 'console.log("Unary Expression 1");' ]
        ],
        // Terceira parte do FOR
        iterateFor: [
            [ '', 'console.log("FOR Iteration 1");' ],
            [ 'expressionFor', 'console.log("FOR Iteration 2");' ],
            [ 'expressionUnary', 'console.log("FOR Iteration 3");' ]
        ],
        // Definição do FOR
        defFor: [
            [ 'FOR PARENTHESES_OPEN initialFor SEMICOLON expression SEMICOLON iterateFor PARENTHESES_CLOSED block', 'console.log("FOR Definition 1");' ]
        ],
        // Bloco que pode estar dentro do CASE
        caseBlock: [
            [ 'block caseBlock', 'console.log("Case Block 1");' ],
            [ 'defineExp caseBlock', 'console.log("Case Block 2");' ],
            [ 'declarationVar caseBlock', 'console.log("Case Block 3");' ],
            [ 'defIf caseBlock', 'console.log("Case Block 4");' ],
            [ 'defWhile caseBlock', 'console.log("Case Block 5");' ],
            [ 'defDo caseBlock', 'console.log("Case Block 6");' ],
            [ 'defFor caseBlock', 'console.log("Case Block 7");' ],
            [ 'defSwitch caseBlock', 'console.log("Case Block 8");' ],
            [ 'expression SEMICOLON caseBlock', 'console.log("Case Block 9");' ],
            [ 'functionCaller SEMICOLON caseBlock', 'console.log("Case Block 10");' ],
            [ 'expressionUnary SEMICOLON caseBlock', 'console.log("Case Block 11");' ],
            [ 'defReturn', 'console.log("Case Block 12");' ],
            [ '', 'console.log("Case Block 13");' ]
        ],
        // Chamada dos comandos CASE
        interSwitch: [
            [ 'CASE expression COLON interSwitch', 'console.log("Inter Switch 1");' ],
            [ 'CASE expression COLON caseBlock BREAK SEMICOLON DEFAULT COLON caseBlock', 'console.log("Inter Switch 2");' ],
            [ 'CASE expression COLON caseBlock BREAK SEMICOLON', 'console.log("Inter Switch 3");' ],
        ],
        // Definição do bloco interno do SWITCH
        switchBlock: [
            [ 'KEYS_OPEN KEYS_CLOSED', 'console.log("Switch Block 1");' ],
            [ 'KEYS_OPEN interSwitch KEYS_CLOSED', 'console.log("Switch Block 2");' ]
        ],
        // Definição do SWITCH
        defSwitch: [
            [ 'SWITCH PARENTHESES_OPEN expression PARENTHESES_CLOSED switchBlock', 'console.log("Switch Definition 1");' ],
        ],
        // Declaração de função
        declarationArgs: [
            [ 'type identifier', 'console.log("Final Args Declaration");' ],
            [ 'type identifier COMMA declarationArgs', 'console.log("Inter Args Declaration");' ]
        ],
        // Argumentos da função
        functionCallerArgs: [
            [ 'identifier', 'console.log("Function Caller Arguments 1");' ],
            [ 'literal', 'console.log("Function Caller Arguments 2");' ],
            [ 'functionCallerArgs COMMA functionCallerArgs', 'console.log("Function Caller Arguments 3");' ],
        ],
        // Chamada de função
        functionCaller: [
            [ 'identifier PARENTHESES_OPEN PARENTHESES_CLOSED', 'console.log("Function Caller 1");' ],
            [ 'identifier PARENTHESES_OPEN functionCallerArgs PARENTHESES_CLOSED', 'console.log("Function Caller 2");' ],
        ],
        // Argumentos do bloco geral
        blockArgs: [
            [ 'block blockArgs', 'console.log("Arguments Block 1");' ],
            [ 'defineExp blockArgs', 'console.log("Arguments Block 2");' ],
            [ 'declarationVar blockArgs', 'console.log("Arguments Block 3");' ],
            [ 'defIf blockArgs', 'console.log("Arguments Block 4");' ],
            [ 'defWhile blockArgs', 'console.log("Arguments Block 5");' ],
            [ 'defDo blockArgs', 'console.log("Arguments Block 6");' ],
            [ 'defFor blockArgs', 'console.log("Arguments Block 7");' ],
            [ 'defSwitch blockArgs', 'console.log("Arguments Block 8");' ],
            [ 'expression SEMICOLON blockArgs', 'console.log("Arguments Block 9");' ],
            [ 'functionCaller SEMICOLON blockArgs', 'console.log("Arguments Block 10");' ],
            [ 'expressionUnary SEMICOLON blockArgs', 'console.log("Arguments Block 11");' ],
            [ 'defReturn', 'console.log("Arguments Block 12");' ],
            [ '', 'console.log("Arguments Block 13");' ]
        ],
        // Definição do bloco padrão
        block: [
            [ 'KEYS_OPEN KEYS_CLOSED', 'console.log("Empty Block");' ],
            [ 'KEYS_OPEN blockArgs KEYS_CLOSED', 'console.log("Empty Block");' ] //Terminar
        ],
        // Inicia a chamada da análise sintática
        syntatic: [
            [ 'includeLib syntatic', 'console.log("Valid Code!");' ],
            [ 'defineExp syntatic', 'console.log("Valid Code!");' ],
            [ 'defFunction block', 'console.log("Valid Code!");' ]
        ],
        //
        // Daqui para baixo é a identificação dos operadores
        //
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
            [ 'PARENTHESES_OPEN', operation ],
            [ 'PARENTHESES_CLOSED', operation ],
            [ 'BRACKETS_OPEN', operation ],
            [ 'BRACKETS_CLOSED', operation ],
            [ 'KEYS_OPEN', operation ],
            [ 'KEYS_CLOSED', operation ]
        ],
        unary: [
            [ 'NOT', operation ],
            [ 'INCREASE', operation ],
            [ 'DECREASE', operation ]
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
            [ 'MOD', operation ],
            [ 'NOT', operation ],
            [ 'AND', operation ],
            [ 'OR', operation ],
            [ 'INCREASE', operation ],
            [ 'DECREASE', operation ]
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

// parser.parse('#include <stdio.h> #include <stdlib.h> int main() { int variavelA = 15; int variavelB = 20; int resultado; resultado = variavelB / variavelA; if (resultado > 1.0) { printf("O Resultado eh maior que 1.0!\n"); } printf("O Resultado eh %.f\n", resultado); return 0; }');
parser.parse('#include <stdio.h> #include <stdlib.h> #define TAM 10 int main() { int var1 = 4, var2, var3 = 5; var2 = var1 * var3 / var1; #define TAM 10 if (var2 == 5 || var1 != 2) { printf("Deu 20! Porrah!\n"); } else if (var1 == 0) {} do { } while(var1 == 0); for(; i < 3; ) {} switch(var1) { case 1: case 2: case 3: var; break; default: var; } return 0; }');

