const { choice, many, sequence, optional, anyOfChar, whitespace, number:parseNumber, map, str,between } = require('@dennisdunn/tiny-parse');
const { AST } = require('./ast');

// run a parser and remove any trailing whitespace
const ignore_ws = parser => map(sequence(parser, optional(many(whitespace))), result=>result[0]);

// summation operator
const sum = map(ignore_ws(anyOfChar('+-')), AST.sum);

// product operator
const product = map(ignore_ws(anyOfChar('*/')), AST.product);

// open paren
const open = ignore_ws(str('('));

// close paren
const close = ignore_ws(str(')'));

// numbers
const number = map(ignore_ws(parseNumber), AST.number);

// expression (head)
function Expr(ctx) {
    return map(sequence(Term, Expr_Prime), AST.head_handler)(ctx);
}

// expression prime (tail)
function Expr_Prime(ctx) {
    return map(optional(sequence(sum, Term, Expr_Prime)), AST.tail_handler)(ctx)
}

// term (head)
function Term(ctx) {
    return map(sequence(Factor, Term_Prime), AST.head_handler)(ctx)
}

// term (tail)
function Term_Prime(ctx) {
    return map(optional(sequence(product, Factor, Term_Prime)), AST.tail_handler)(ctx)
}

// factor
function Factor(ctx) {
    return choice(number, between(open, Expr, close))(ctx);
}

module.exports = {
    start: Expr
}
