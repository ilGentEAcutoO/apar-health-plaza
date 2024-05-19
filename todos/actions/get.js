const fs = require('fs');
const todosPath = require('path').join(__dirname, '..', 'todos.json');

function get(request, response) {
    if (request.url === '/todos') {
        return getAllTodos(request, response)
    }
    if (request.url.match(/^\/todos\/([0-9]+)$/)) {
        const id = parseInt(request.url.split('/')[2]);
        return getTodoById(id, request, response);
    }
    response.statusCode = 400;
    response.end('Bad Request');
}

function getTodoById(id, request, response) {
    fs.readFile(todosPath, 'utf8', (err, data) => {
        if (err) {
            errorReading(err, response)
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

        const todo = todos.find(todo => todo.id === id);

        if (!todo) {
            response.statusCode = 404;
            response.end('Not Found Todo');
            return;
        }

        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(todo));
    });
    return;
}

function getAllTodos(request, response) {
    fs.readFile(todosPath, 'utf8', (err, data) => {
        if (err) {
            errorReading(err, response)
        }

        // 3. Parse the JSON data
        let todos;
        try {
            todos = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing todos.json:', e);
            response.statusCode = 400;
            response.end('Bad Request');
            return;
        }

        // 4. Send the response with the todos
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(todos));
    });
    return;
}

function errorReading(err, response) {
    console.error('Error reading todos.json:', err);
    response.statusCode = 500;
    response.end('Internal Server Error');
}

module.exports = get;
