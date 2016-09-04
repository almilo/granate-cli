import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'granate';

export default function (schemaText: string, port: number, {graphiql}) {
    const graphqlHTTPConfig = {
        schema: buildSchema(schemaText),
        graphiql
    };

    if (!graphqlHTTPConfig.graphiql) {
        console.info('GraphiQL will not be deployed.');
    }

    express()
        .use('/graphql', graphqlHTTP(graphqlHTTPConfig))
        .listen(port, () => console.log(`Granate server listening on port: '${port}'.`));
}
