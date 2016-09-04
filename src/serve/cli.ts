import { Yargs, Argv } from 'yargs';
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
                },
                'root': {
                    alias: 'r',
                    type: 'string',
                    describe: 'JS module to use as root value'
                },
                'context': {
                    alias: 'c',
                    type: 'string',
                    describe: 'JS module to use as context value'
                }
            },
            (argv: Argv) => serve(
                argv['schema-file'],
                argv['port'],
                {
                    graphiql: argv['graphiql'],
                    rootValue: argv['root'],
                    contextValue: argv['context']
                }
            )
        );
}
