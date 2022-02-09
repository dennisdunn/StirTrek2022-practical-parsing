const { choice, many, sequence, optional, anyOfChar, whitespace, number, map, str } = require('@dennisdunn/tiny-parse');

const token = tag => value => ({ type: tag.toUpperCase(), value });

// run a parser and remove any trailing whitespace
const ignore_ws = parser => map(sequence(parser, optional(many(whitespace))), value => Array.isArray(value) ? value[0] : value);

// summation operator
const sop = ignore_ws(map(anyOfChar('+-'), token('sum_op')));

// product operator
const pop = ignore_ws(map(anyOfChar('*/'), token('prod_op')));

// open paren
const lpar = ignore_ws(map(str('('), token('open_paren')));

// close paren
const rpar = ignore_ws(map(str(')'), token('close_paren')));

// numbers
const number_ws = ignore_ws(map(number, token('number')));

// expression (head)
function E(ctx) {
    return sequence(T, E1)(ctx);
}

// expression' (tail)
function E1(ctx) {
    return optional(sequence(sop, T, E1))(ctx)
}

// term (head)
function T(ctx) {
    return sequence(F, T1)(ctx)
}

// term' (tail)
function T1(ctx) {
    return optional(sequence(pop, F, T1))(ctx)
}

// factor
function F(ctx) {
    return choice(number_ws, sequence(lpar, E, rpar))(ctx);
}

module.exports = {
    start: E
}