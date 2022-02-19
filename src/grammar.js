const { choice, many, sequence, optional, anyOfChar, whitespace, number: parseNumber, map, str, between } = require('@dennisdunn/tiny-parse');
const { ident: parseIdent } = require('../src/parser');
const { AST } = require('./ast');

// run a parser and remove any trailing whitespace
const ignore_ws = parser => map(sequence(parser, optional(many(whitespace))), result => result[0]);

// precedence 0 operators
const binary_0 = map(ignore_ws(anyOfChar('+-')), AST.binary);

// precedence 1 operators
const binary_1 = map(ignore_ws(choice(str('mod'), str('rem'), anyOfChar('*/%^'))), AST.binary);

// unary operators
const unary = map(ignore_ws(anyOfChar('!')), AST.unary);

// open paren
const open = ignore_ws(str('('));

// close paren
const close = ignore_ws(str(')'));

// numbers
const number = map(ignore_ws(parseNumber), AST.number);

// functions
const ident = map(ignore_ws(parseIdent), AST.unary);
const func = map(sequence(ident, open, Expr, close), AST.func);

// postfix unary operations
const postfix = map(sequence(number, unary), AST.post); // change number to Expr and watch it blow up. now fix it.

// expression (head)
function Expr(ctx) {
    return map(sequence(Term, Expr_Prime), AST.head_handler)(ctx);
}

// expression prime (tail)
function Expr_Prime(ctx) {
    return map(optional(sequence(binary_0, Term, Expr_Prime)), AST.tail_handler)(ctx)
}

// term (head)
function Term(ctx) {
    return map(sequence(Factor, Term_Prime), AST.head_handler)(ctx)
}

// term (tail)
function Term_Prime(ctx) {
    return map(optional(sequence(binary_1, Factor, Term_Prime)), AST.tail_handler)(ctx)
}

// factor
function Factor(ctx) {
    return choice(postfix, number, func, between(open, Expr, close))(ctx);
}

module.exports = {
    start: Expr
}
