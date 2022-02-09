const { choice, many, sequence, optional, anyOfChar, whitespace, number, map, str, between } = require('@dennisdunn/tiny-parse');
const { AST } = require('./ast');

// run a parser and remove any trailing whitespace
const ignore_ws = parser => map(sequence(parser, optional(many(whitespace))), value => Array.isArray(value) ? value[0] : value);

// summation operator
const sop = map(ignore_ws(anyOfChar('+-')), AST.sum_op);

// product operator
const pop = map(ignore_ws(anyOfChar('*/')), AST.prod_op);

// open paren
const lpar = map(ignore_ws(str('(')), AST.open_lparen);

// close paren
const rpar = map(ignore_ws(str(')')), AST.close_paren);

// numbers
const number_ws = map(ignore_ws(number), AST.number);

// expression (head)
function E(ctx) {
    return map(sequence(T, E1), AST.head_handler)(ctx);
}

// expression prime (tail)
function E1(ctx) {
    return map(optional(sequence(sop, T, E1)), AST.tail_handler)(ctx)
}

// term (head)
function T(ctx) {
    return map(sequence(F, T1), AST.head_handler)(ctx)
}

// term (tail)
function T1(ctx) {
    return map(optional(sequence(pop, F, T1)), AST.tail_handler)(ctx)
}

// factor
function F(ctx) {
    return choice(number_ws, between(lpar, E, rpar))(ctx);
}

module.exports = {
    start: E
}
