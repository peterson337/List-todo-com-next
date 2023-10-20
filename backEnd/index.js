const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');


// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/todos/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
        res.json(todo.rows[0]);
    }catch(err){
        console.log(err.message);
    }
})

//?                  LISTAR TODOS OS ITENS

app.get('/todos', async (req, res) => {
    try{
        const todo = await pool.query('SELECT * FROM todo');
        res.json(todo.rows);
    }catch(err){
        console.log(err.message);
    }
})

app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (description) VALUES($1) RETURNING *',
            [description]
        );

        res.json(newTodo.rows[0]);
} catch (err) {
    console.log(err.message);
}
})

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            'UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *',
            [description, id]
        );
        }
    catch (err) {
        console.log(err.message);
    }})   

app.listen(5000, () => {
    console.log('Server started on port 5000');
})
