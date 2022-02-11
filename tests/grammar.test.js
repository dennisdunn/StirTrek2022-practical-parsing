const { Stream } = require('@dennisdunn/tiny-parse');
const G = require('../src/grammar');

test('evaluate 1 + 2', () => {
    const r = G.start(new Stream('1 + 2')).eval();

    expect(r).toBe(3);
})

test('evaluate (1 + 2)* (1 - 2 * 3)', () => {
    const r = G.start(new Stream('(1 + 2)* (1 - 2 * 3)')).eval();

    expect(r).toBe(-15);
})

test('evaluate 1 + 2 * (1 - 2 * 3)', () => {
    const r = G.start(new Stream('1 + 2 * (1 - 2 * 3)')).eval();

    expect(r).toBe(-9);
})
