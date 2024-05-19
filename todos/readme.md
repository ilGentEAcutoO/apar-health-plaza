run 
`node index.js`
to start server.

access api via `http://localhost:8585/todos`

Methods | Action            | URI        | Require                       |
--- |-------------------|------------|-------------------------------| 
GET | All todos         | /todos     |
GET | By Id             | /todos/:id |
POST | Create Todo       | /todos     | content-type: application/json 
PUT | Update Todo By Id | /todos/:id        | content-type: application/json 
DELETE | Remove Todo By Id | /todos/:id       |

What to improve next....
- Refactor Duplicate code
- Add authentication
- Add Tests
- Add logging
- You next...