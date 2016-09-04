import { execWithArguments } from '../support.spec';

describe('serve command', function () {
    it('should show usage when no command is specified', function () {
        return execWithArguments('').then(({stderr}) => stderr.should.contain('Usage: '));
    });

    it('should show an error when no recognized command is specified', function () {
        return execWithArguments('foo').then(({stderr}) => stderr.should.contain('Unknown argument: foo'));
    });

    it('should show an error when no path is specified', function () {
        return execWithArguments('serve').then(({stderr}) => stderr.should.contain('path must be a string'));
    });

    it('should show an error when the specified path does not exist', function () {
        return execWithArguments('serve foo').then(({stderr}) => stderr.should.contain('no such file or directory'));
    });

    it('should start a server on port 4000 when the schema exists @slow', function () {
        return execWithArguments('serve test/schema.graphql').then(({stdout}) => {
            stdout.should.contain(`port: '4000'`);
            stdout.should.not.contain('GraphiQL');
        });
    });

    it('should start a server on another port when the --port option is used @slow', function () {
        return execWithArguments('serve test/schema.graphql --port 5000') .then(({stdout}) => {
            stdout.should.contain(`port: '5000'`);
            stdout.should.not.contain('GraphiQL');
        });
    });

    it('should start a server on another port when the -p option is used @slow', function () {
        return execWithArguments('serve test/schema.graphql -p 5000').then(({stdout}) => {
            stdout.should.contain(`port: '5000'`);
            stdout.should.not.contain('GraphiQL');
        });
    });

    it('should start a server and not deploy GraphiQL when the --graphiql option is false @slow', function () {
        return execWithArguments('serve test/schema.graphql --graphiql false').then(({stdout}) => {
            stdout.should.contain(`port: '4000'`);
            stdout.should.contain('GraphiQL');
        });
    });

    it('should start a server and not deploy GraphiQL when the -g option is false @slow', function () {
        return execWithArguments('serve test/schema.graphql -g false').then(({stdout}) => {
            stdout.should.contain(`port: '4000'`);
            stdout.should.contain('GraphiQL');
        });
    });

    it('should start a server and use root value and context when --root and --context options are used @slow', function () {
        return execWithArguments('serve test/schema.graphql --root test/root-value.js --context test/context-value.js')
            .then(({stdout}) => {
                stdout.should.contain(`port: '4000'`);
                stdout.should.contain(`Using: 'test/root-value.js' as root value.`);
                stdout.should.contain(`Using: 'test/context-value.js' as context value.`);
            });
    });

    it('should start a server and use root value and context when -r and -c options are used @slow', function () {
        return execWithArguments('serve test/schema.graphql -r test/root-value.js -c test/context-value.js')
            .then(({stdout}) => {
                stdout.should.contain(`port: '4000'`);
                stdout.should.contain(`Using: 'test/root-value.js' as root value.`);
                stdout.should.contain(`Using: 'test/context-value.js' as context value.`);
            });
    });
});
