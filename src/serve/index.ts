import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'granate';
import { readTextFile, requireRelative } from '../lib/index';

export type ServeOptions = {
    graphiql: boolean,
    rootValue: string,
    contextValue: string
};

export default function (schemaFileName: string, port: number, options: ServeOptions) {
    const schemaText = readTextFile(schemaFileName);
    const graphqlHTTPConfig = {
        schema: buildSchema(schemaText),
        graphiql: options.graphiql,
        rootValue: options.rootValue && requireRelative(options.rootValue),
        context: options.contextValue && requireRelative(options.contextValue)
    };

    if (!graphqlHTTPConfig.graphiql) {
        console.info('GraphiQL will not be deployed.');
    }

    if (graphqlHTTPConfig.rootValue) {
        console.info(`Using: '${options.rootValue}' as root value.`);
    }

    if (graphqlHTTPConfig.context) {
        console.info(`Using: '${options.contextValue}' as context value.`);
    }

    express()
        .use('/graphql', graphqlHTTP(graphqlHTTPConfig))
        .listen(port, () => console.log(`Granate server listening on port: '${port}'.`));
}
