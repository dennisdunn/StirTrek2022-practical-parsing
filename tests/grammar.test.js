const { context, map } = require('@dennisdunn/tiny-parse');
const G = require('../src/grammar');

const log = obj => {
    console.log(`${expect.getState().currentTestName} => ${JSON.stringify(obj.result)}`);
}

const run = str => {
    const parser = map(G.start, value => value.eval());
    const result = parser(context(str));
    log(result);
}

test('parse 1 + 2', () => {
    run('1 + 2');
})

test('parse (1 + 2)* (1 - 2 * 3)', () => {
    run('(1 + 2)* (1 - 2 * 3)');
})
