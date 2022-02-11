const { Stream } = require('@dennisdunn/tiny-parse');
const G = require('../src/grammar');

const log = obj => {
    console.log(`${expect.getState().currentTestName} =>\n ${JSON.stringify(obj.result)}`);
}

const run = text => {
    const result = G.start(new Stream(text)).eval();
    log(result);
}

test('evaluate 1 + 2', () => {
    run('1 + 2');
})

test('evaluate (1 + 2)* (1 - 2 * 3)', () => {
    run('(1 + 2)* (1 - 2 * 3)');
})
