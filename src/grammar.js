const { choice, many, sequence, optional, anyOfChar, whitespace, number: parseNumber, map, str } = require('@dennisdunn/tiny-parse');

// run a parser and remove any trailing whitespace
const ignore_ws = parser => map(sequence(parser, optional(many(whitespace))), value => Array.isArray(value) ? value[0] : value);

// summation operator
const sop = ignore_ws(anyOfChar('+-'));

// product operator
const pop = ignore_ws(anyOfChar('*/'));

// open paren
const open = ignore_ws(str('('));

// close paren
const close = ignore_ws(str(')'));

// numbers
const number = ignore_ws(parseNumber);

// expression (head)
function Expr(ctx) {
    return sequence(Term, Expr_Prime)(ctx);
}

// expression' (tail)
function Expr_Prime(ctx) {
    return optional(sequence(sop, Term, Expr_Prime))(ctx)
}

// term (head)
function Term(ctx) {
    return sequence(Factor, Term_Prime)(ctx)
}

// term' (tail)
function Term_Prime(ctx) {
    return optional(sequence(pop, Factor, Term_Prime))(ctx)
}

// factor
function Factor(ctx) {
    return choice(number, sequence(open, Expr, close))(ctx);
}

module.exports = {
    start: Expr
}