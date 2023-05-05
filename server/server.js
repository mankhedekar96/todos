const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Todo } = require('./db');

const app = express();
const port = 3001;
const path = require('path');

app.use(cors());
app.use(bodyParser.json());

// Handle API routes here
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    console.error('Error retrieving todos:', err);
    res.status(500).json({ error: 'Failed to retrieve todos' });
  }
});

app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  try {
    const todo = await Todo.create({ text });
    res.json(todo);
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

app.delete('/api/todos', async (req, res) => {
  const { ids } = req.body;
  try {
    const result = await Todo.destroy({ where: { id: ids }});
    res.json(result);
  } catch (err) {
    console.error('Error deleting todos:', err);
    res.status(500).json({ error: 'Failed to delete todos' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// static route
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
