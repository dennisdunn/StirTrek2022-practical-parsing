const { Stream } = require('@dennisdunn/tiny-parse');
const G = require('../src/grammar');

test('parse 1 + 2', () => {
    const r = G.start(new Stream('1 + 2'));
    
    expect(JSON.stringify(r)).toBe('{"value":"+","right":{"value":"2"},"left":{"value":"1"}}');
})

test('parse (1 + 2)* (1 - 2 * 3)', () => {
    const r = G.start(new Stream('(1 + 2)* (1 - 2 * 3)'));

    expect(JSON.stringify(r)).toBe('{"value":"*","right":{"value":"-","right":{"value":"*","right":{"value":"3"},"left":{"value":"2"}},"left":{"value":"1"}},"left":{"value":"+","right":{"value":"2"},"left":{"value":"1"}}}')
})
