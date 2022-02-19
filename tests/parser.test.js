const { Stream } = require('@dennisdunn/tiny-parse');
const P = require('../src/parser');

test('parse an identifier', () => {
    const r = P.ident(new Stream('cosine'))

    expect(r).toBe('cosine');
})

test('parse an integer', () => {
    const r = P.integer(new Stream('123'))

    expect(r).toBe('123');
})