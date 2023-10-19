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

app.listen(5000, () => {
    console.log('Server started on port 5000');
})
