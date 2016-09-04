import { Yargs, Argv } from 'yargs';
import { readTextFile } from '../lib/index';
import serve from './index';

export default function (yargs: Yargs): Yargs {
    return yargs
        .command(
            'serve [schema-file]',
            'create a GraphQL server with the given schema.',
            {
                'schema-file': {
                    type: 'string',
                    normalize: true
                },
                port: {
                    alias: 'p',
                    type: 'number',
                    'default': 4000,
                    describe: 'the server port'
                },
                'graphiql': {
                    alias: 'g',
                    type: 'boolean',
                    'default': true,
                    describe: 'deploy GraphiQL'
                }
            },
            (argv: Argv) => serve(
                readTextFile(argv['schema-file']),
                argv['port'],
                {
                    graphiql: argv['graphiql']
                }
            )
        );
}
