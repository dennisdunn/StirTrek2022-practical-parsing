const { Stream } = require('@dennisdunn/tiny-parse');
const G = require('../src/grammar');

test('parse 1 + 2', () => {
    const r = G.start(new Stream('1 + 2'));

    expect(r).toStrictEqual([["1"], ["+", ["2"]]])
})

test('parse (1 + 2)* (1 - 2 * 3)', () => {
    const r = G.start(new Stream('(1 + 2)* (1 - 2 * 3)'));

    expect(r).toStrictEqual([[["(", [["1"], ["+", ["2"]]], ")"], ["*", ["(", [["1"], ["-", ["2", ["*", "3"]]]], ")"]]]]);
})
