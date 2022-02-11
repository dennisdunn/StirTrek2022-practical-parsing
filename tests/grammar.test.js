const { Stream } = require('@dennisdunn/tiny-parse');
const G = require('../src/grammar');

test('parse 1 + 2', () => {
    const r = G.start(new Stream('1 + 2'));
    
    expect(JSON.stringify(r)).toBe('{"type":"BINARY_OP","value":"+","right":{"type":"NUMBER","value":"2"},"left":{"type":"NUMBER","value":"1"}}');
})

test('parse (1 + 2)* (1 - 2 * 3)', () => {
    const r = G.start(new Stream('(1 + 2)* (1 - 2 * 3)'));

    expect(JSON.stringify(r)).toBe('{"type":"BINARY_OP","value":"*","right":{"type":"BINARY_OP","value":"-","right":{"type":"BINARY_OP","value":"*","right":{"type":"NUMBER","value":"3"},"left":{"type":"NUMBER","value":"2"}},"left":{"type":"NUMBER","value":"1"}},"left":{"type":"BINARY_OP","value":"+","right":{"type":"NUMBER","value":"2"},"left":{"type":"NUMBER","value":"1"}}}')
})
