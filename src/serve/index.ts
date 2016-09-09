import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema, AnnotationFactory, standardAnnotationFactories } from 'granate';
import { readTextFile, requireRelative } from '../lib/index';

export type ServeOptions = {
    port: number,
    graphiql: boolean,
    rootValue: string,
    contextValue: string,
    mocks: string,
    annotationFactories: string
};

export default function (schemaFileName: string, options: ServeOptions) {
    const schemaText = readTextFile(schemaFileName);
    const mocks = requireAsObjectIfPresent(options.mocks);
    const rootValue = requireAsObjectIfPresent(options.rootValue);
    const context = requireAsObjectIfPresent(options.contextValue);
    const annotationFactories = processAnnotationFactories(options.annotationFactories);
    const graphqlHTTPConfig = {
        schema: buildSchema(schemaText, mocks, annotationFactories),
        graphiql: options.graphiql,
        rootValue,
        context
    };

    if (!graphqlHTTPConfig.graphiql) {
        console.info('GraphiQL will not be deployed.');
    }

    if (rootValue) {
        console.info(`Using: '${options.rootValue}' as root value.`);
    }

    if (context) {
        console.info(`Using: '${options.contextValue}' as context value.`);
    }

    if (mocks) {
        console.info(`Using: '${options.mocks}' as custom mocks.`);
    }

    if (annotationFactories) {
        console.info(`Annotations: '${getAnnotationNames(annotationFactories)}' enabled.`);
    }

    express()
        .use('/graphql', graphqlHTTP(graphqlHTTPConfig))
        .listen(options.port, () => console.log(`Granate server listening on: 'http://localhost:${options.port}/graphql'.`));
}

function getAnnotationNames(annotationFactories: Array<AnnotationFactory>): String {
    return annotationFactories
        .map(annotationFactory => annotationFactory.TAG)
        .join(',');
}

function processAnnotationFactories(annotationFactoriesNames: string): Array<AnnotationFactory> {
    if (annotationFactoriesNames === '') {
        return standardAnnotationFactories;
    }

    const selectedAnnotationFactories = selectAnnotationFactories(standardAnnotationFactories, annotationFactoriesNames);

    if (selectedAnnotationFactories.length > 0) {
        return selectedAnnotationFactories;
    } else {
        return requireAsObjectIfPresent(annotationFactoriesNames);
    }
}

function selectAnnotationFactories(annotationFactories: Array<AnnotationFactory>, names: String): Array<AnnotationFactory> {
    const selectedNames = (names && names.split(',')) || [];

    return annotationFactories.filter(annotationFactory => selectedNames.indexOf(annotationFactory.TAG) !== -1);
}

function requireAsObjectIfPresent(modulePath: string) {
    if (modulePath) {
        const exported = requireRelative(modulePath);

        if (!(exported instanceof Object)) {
            throw new Error(`The module: '${modulePath}' exported type: '${typeof exported}'. Must be of type object instead.`);
        }

        return exported;
    }
}
