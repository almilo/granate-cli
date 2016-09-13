import { Yargs, Argv } from 'yargs';
import { getPackageConfig } from '../lib/index';
import serve from './index';

export default function (yargs: Yargs): Yargs {
    const defaults: {
        schema?: string,
        port?: number,
        graphiql?: boolean,
        root?: string,
        context?: string,
        mocks?: string,
        annotations?: string
    } = getPackageConfig('serve');

    return yargs
        .command(
            'serve [schema-file]',
            'create a GraphQL server with the given schema.',
            {
                'schema-file': {
                    type: 'string',
                    normalize: true,
                    'default': defaults['schema-file'],
                    describe: 'the schema text file'
                },
                port: {
                    alias: 'p',
                    type: 'number',
                    'default': defaults.port || 4000,
                    describe: 'the server port'
                },
                graphiql: {
                    alias: 'g',
                    type: 'boolean',
                    'default': defaults.graphiql || true,
                    describe: 'deploy GraphiQL'
                },
                root: {
                    alias: 'r',
                    type: 'string',
                    'default': defaults.root,
                    describe: 'JS module to use as root value. Module must export an object.'
                },
                context: {
                    alias: 'c',
                    type: 'string',
                    'default': defaults.context,
                    describe: 'JS module to use as context value. Module must export an object.'
                },
                mocks: {
                    alias: 'm',
                    type: 'string',
                    'default': defaults.mocks,
                    describe: 'JS module to use as custom mocks. Module must export an object.'
                },
                annotations: {
                    alias: 'a',
                    type: 'string',
                    'default': defaults.annotations,
                    describe: [
                        'JS module to use as annotation factories.' +
                        'Module must export a list of annotation factories.' +
                        'Or comma-separated list of standard annotations.' +
                        'If no value is passed, all the standard annotations are enabled.'
                    ].join(' ')
                }
            },
            (argv: Argv) => serve(
                argv['schema-file'],
                {
                    port: argv['port'],
                    graphiql: argv['graphiql'],
                    rootValue: argv['root'],
                    contextValue: argv['context'],
                    mocks: argv['mocks'],
                    annotationFactories: argv['annotations']
                }
            )
        );
}
