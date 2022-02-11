const { Stream, flat } = require('@dennisdunn/tiny-parse');
const G = require('../src/grammar');

test('parse 1 + 2', () => {
    const r = flat(G.start)(new Stream('1 + 2'));

    expect(r).toStrictEqual([{ "type": "NUMBER", "value": "1" }, { "type": "SUM_OP", "value": "+" }, { "type": "NUMBER", "value": "2" }]);
})

test('parse (1 + 2)* (1 - 2 * 3)', () => {
    const r = flat(G.start)(new Stream('(1 + 2)* (1 - 2 * 3)'));

    expect(r).toStrictEqual([{ "type": "OPEN_PAREN", "value": "(" }, { "type": "NUMBER", "value": "1" }, { "type": "SUM_OP", "value": "+" }, { "type": "NUMBER", "value": "2" }, { "type": "CLOSE_PAREN", "value": ")" }, { "type": "PROD_OP", "value": "*" }, { "type": "OPEN_PAREN", "value": "(" }, { "type": "NUMBER", "value": "1" }, { "type": "SUM_OP", "value": "-" }, { "type": "NUMBER", "value": "2" }, { "type": "PROD_OP", "value": "*" }, { "type": "NUMBER", "value": "3" }, { "type": "CLOSE_PAREN", "value": ")" }]);
})
