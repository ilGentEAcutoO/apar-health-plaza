const fs = require('fs');
const todosPath = require('path').join(__dirname, '..', 'todos.json');

function create(request, response) {

    if (request.headers['content-type'] !== 'application/json' || request.url !== '/todos') {
        response.statusCode = 400;
        response.end('Bad URL or Content-Type');
    }

    let body = '';
    request.on('data', (chunk) => {
        body += chunk;
    });

    return request.on('end', () => {
        try {
            let todo = JSON.parse(body);
            if (!todo.title || todo.completed === undefined) {
                response.statusCode = 400;
                response.end('Bad Body Request');
                return;
            }

            // Filter out unwanted properties
            const allowedProperties = ['title', 'completed'];
            todo = Object.fromEntries(
                Object.entries(todo).filter(([key]) => allowedProperties.includes(key))
            );

            // Validate completed property
            if (typeof todo.completed !== 'boolean') {
                response.statusCode = 400;
                response.end('Invalid completed property: must be a boolean');
                return;
            }

            // Validate title property
            if (typeof todo.title !== 'string') {
                response.statusCode = 400;
                response.end('Invalid title property: must be a string');
                return;
            }

            const todos = fs.existsSync(todosPath) ? JSON.parse(fs.readFileSync(todosPath)) : [];

            // Generate a unique ID for the new todo
            const newId = Math.max(...todos.map(todo => todo.id)) + 1;

            // Add the new todo to the todos array
            todos.push({
                id: newId,
                ...todo
            });

            // Write the updated todos array to the file
            return fs.writeFile(todosPath, JSON.stringify(todos), (err) => {
                if (err) {
                    console.error('Error writing todos.json:', err);
                    response.statusCode = 500;
                    response.end('Internal Server Error');
                    return;
                }

                // 7. Send the response with the new todo
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify({ id: newId, ...todo }));
            });
        } catch (e) {
            console.error('Error parsing request body:', e);
            response.statusCode = 400;
            response.end('Bad Request');
            return;
        }
    });
}

module.exports = create;