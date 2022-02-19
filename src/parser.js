const { many, sequence, anyOfChar, flat, join, digit } = require('@dennisdunn/tiny-parse');

// 1 or more
const atLeastOneOf = parser => join(flat(sequence(parser, many(parser))));

// lower case
const lower = anyOfChar('abcdefghijklmnopqrstuvwxyz');

// identifier
const ident = atLeastOneOf(lower);

// positive integers
const integer = atLeastOneOf(digit);

module.exports = {
    atLeastOneOf,
    lower,
    ident,
    integer
}
