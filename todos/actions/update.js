const fs = require('fs');
const todosPath = require('path').join(__dirname, '..', 'todos.json');

function update(request, response) {

    if (request.headers['content-type'] !== 'application/json') {
        response.statusCode = 400;
        response.end('Bad Request');
    }

    if (request.url.match(/^\/todos\/([0-9]+)$/)) {
        const id = parseInt(request.url.split('/')[2]);
        return updateTodoById(id, request, response);
    }
}

function updateTodoById(id, request, response) {
    return fs.readFile(todosPath, 'utf8', (err, data) => {
        let todos;
        let body = '';
        let updatedTodo;

        if (err) {
            console.error('Error reading todos.json:', err);
            response.statusCode = 500;
            response.end('Internal Server Error');
            return;
        }

        try {
            todos = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing todos.json:', e);
            response.statusCode = 400;
            response.end('Bad Data Request');
            return;
        }

        const todoIndex = todos.findIndex(todo => todo.id === id);

        if (todoIndex === -1) {
            response.statusCode = 404;
            response.end('Not Found Todo');
            return;
        }

        request.on('data', (chunk) => {
            body += chunk;
        });

        return request.on('end', () => {
            try {
                updatedTodo = JSON.parse(body);

                // Filter out unwanted properties
                const allowedProperties = ['title', 'completed'];
                updatedTodo = Object.fromEntries(
                    Object.entries(updatedTodo).filter(([key]) => allowedProperties.includes(key))
                );

                // Validate completed property
                if (updatedTodo.completed !== undefined && typeof updatedTodo.completed !== 'boolean') {
                    response.statusCode = 400;
                    response.end('Invalid completed property: must be a boolean');
                    return;
                }

                // Validate title property
                if (updatedTodo.title !== undefined && typeof updatedTodo.title !== 'string') {
                    response.statusCode = 400;
                    response.end('Invalid title property: must be a string');
                    return;
                }

                todos[todoIndex] = {...todos[todoIndex], ...updatedTodo};
                return fs.writeFile(todosPath, JSON.stringify(todos), (err) => {
                    if (err) {
                        console.error('Error writing todos.json:', err);
                        response.statusCode = 500;
                        response.end('Internal Server Error');
                        return;
                    }

                    response.statusCode = 204;
                    response.end();
                });

            } catch (e) {
                console.error('Error parsing request body:', e);
                response.statusCode = 400;
                response.end('Bad Body Request');
                return;
            }
        })

    });
}

module.exports = update;