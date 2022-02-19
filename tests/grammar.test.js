const { Stream } = require('@dennisdunn/tiny-parse');
const G = require('../src/grammar');

test('evaluate 1 + 2', () => {
    const tree = G.start(new Stream('1 + 2'));
    const r = tree.eval();

    expect(r).toBe(3);
})

test('evaluate (1 + 2)* (1 - 2 * 3)', () => {
    const tree = G.start(new Stream('(1 + 2)* (1 - 2 * 3)'));
    const r = tree.eval();

    expect(r).toBe(-15);
})

test('evaluate 1 + 2 * (1 - 2 * 3)', () => {
    const tree = G.start(new Stream('1 + 2 * (1 - 2 * 3)'));
    const r = tree.eval();

    expect(r).toBe(-9);
})

test('evaluate 19 % 12', () => {
    const tree = G.start(new Stream('19 % 12'));
    const r = tree.eval();

    expect(r).toBe(7);
})

test('evaluate 19 rem 12', () => {
    const tree = G.start(new Stream('19 % 12'));
    const r = tree.eval();

    expect(r).toBe(7);
})

test('evaluate 2^3', () => {
    const tree = G.start(new Stream('2^3'));
    const r = tree.eval();

    expect(r).toBe(8);
})

test('evaluate 19 mod 12', () => {
    const tree = G.start(new Stream('19 mod 12'));
    const r = tree.eval();

    expect(r).toBe(7);
})

test('evaluate -19 mod 12', () => {
    const tree = G.start(new Stream('-19 mod 12'));
    const r = tree.eval();

    expect(r).toBe(5);
})

test('evaluate 19 mod -12', () => {
    const tree = G.start(new Stream('19 mod -12'));
    const r = tree.eval();

    expect(r).toBe(-5);
})

test('evaluate -12', () => {
    const tree = G.start(new Stream('-12'));
    const r = tree.eval();

    expect(r).toBe(-12);
})