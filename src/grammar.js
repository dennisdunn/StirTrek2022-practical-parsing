const { choice, many, sequence, optional, anyOfChar, whitespace, number:parseNumber, map, str } = require('@dennisdunn/tiny-parse');

const token = tag => value => ({ type: tag.toUpperCase(), value });

// run a parser and remove any trailing whitespace
const ignore_ws = parser => map(sequence(parser, optional(many(whitespace))), value => Array.isArray(value) ? value[0] : value);

// summation operator
const sop = ignore_ws(map(anyOfChar('+-'), token('sum_op')));

// product operator
const pop = ignore_ws(map(anyOfChar('*/'), token('prod_op')));

// open paren
const open = ignore_ws(map(str('('), token('open_paren')));

// close paren
const close = ignore_ws(map(str(')'), token('close_paren')));

// numbers
const number = ignore_ws(map(parseNumber, token('number')));

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