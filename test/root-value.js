module.exports = {
    todos: function (source, args, context) {
        return context.todos.map(enhancer);

        function enhancer(todo, index) {
            return {id: 1000 + index, title: todo.title, completed: todo.completed};
        }
    }
};
