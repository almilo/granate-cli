var id = 42;

module.exports = {
    ID: function () {
        return id++;
    },
    Query: function () {
        return {
            todos: function () {
                return [
                    {title: 'custom title 1'},
                    {title: 'custom title 2'}
                ];
            }
        };
    }
};
