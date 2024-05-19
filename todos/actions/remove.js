const fs = require('fs');
const todosPath = require('path').join(__dirname, '..', 'todos.json');

function remove(request, response) {
    if (request.url.match(/^\/todos\/([0-9]+)$/)) {
        const id = parseInt(request.url.split('/')[2]);
        return removeTodoById(id, request, response);
    }
}

function removeTodoById(id, request, response) {
    fs.readFile(todosPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading todos.json:', err);
            response.statusCode = 500;
            response.end('Internal Server Error');
            return;
        }

        let todos;
        try {
            todos = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing todos.json:', e);
            response.statusCode = 400;
            response.end('Bad Request');
            return;
        }

        const todoIndex = todos.findIndex(todo => todo.id === id);

        if (todoIndex === -1) {
            response.statusCode = 404;
            response.end('Not Found Todo');
            return;
        }

        todos.splice(todoIndex, 1);

        fs.writeFile(todosPath, JSON.stringify(todos), (err) => {
            if (err) {
                console.error('Error writing todos.json:', err);
                response.statusCode = 500;
                response.end('Internal Server Error');
                return;
            }

            response.statusCode = 204;
            response.end();
        });
    });
    return;
}

module.exports = remove;