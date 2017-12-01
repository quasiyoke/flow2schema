import * as yaml from 'yaml-js';
import * as optimist from 'optimist';

import collect from '.';

const argv = optimist
    .usage('Usage: $0 <path> ...')
    .argv;

argv._.forEach(run);

function run(path: string) {
    if (path === '-') {
        path = '/dev/stdin';
    }

    try {
        const {types} = collect(path);

        const output = yaml.dump(types, null, null, {
            indent: 4,
            width: 100,
        });

        console.log(output.trimRight());
    } catch (ex) {
        console.error(ex.message);
        console.error(ex.stack);
    }
}
