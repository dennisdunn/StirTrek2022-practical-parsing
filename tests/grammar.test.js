const { context } = require('@dennisdunn/tiny-parse');
const G = require('../src/grammar');

const log = obj => {
    console.log(`${expect.getState().currentTestName} =>\n ${JSON.stringify(obj.result)}`);
}

const run = str => {
    const parser = G.start;
    const result = parser(context(str));
    log(result);
}

test('parse 1 + 2', () => {
    run('1 + 2');
})

test('parse (1 + 2)* (1 - 2 * 3)', () => {
    run('(1 + 2)* (1 - 2 * 3)');
})