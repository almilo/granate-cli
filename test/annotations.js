module.exports = [mockAnnotationFactory];

function mockAnnotationFactory(directiveInfo, typeName, fieldName) {
    var valueArgument = directiveInfo.arguments.find(function (argument) {
        return argument.name = 'value';
    });

    return {
        apply: function (schema, mocks) {
            mocks[typeName] = fieldName ?
                createFieldMock(fieldName, valueArgument.value) :
                createMock(valueArgument.value);
        }
    };
}

mockAnnotationFactory.TAG = 'mock';

function createFieldMock(fieldName, value) {
    return function () {
        var typeMock = {};

        typeMock[fieldName] = createMock(value);

        return typeMock;
    }
}

function createMock(value) {
    return function () {
        return value;
    }
}
