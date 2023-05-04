import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
        setText('');
      });
  };

  const handleRemove = (todo) => {
    fetch('/api/todos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: [todo.id]  }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos.filter(el => el.id !== todo.id)]);
        setText('');
      });
  }

  return (
    <div>
      <h1 className='AppHeader'>Todo List</h1>
      <form onSubmit={handleSubmit} className='AppForm'>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">Add</button>
      </form>
      <ul className='TodoList'>
        {todos.length === 0 && 'No Todos'}
        {todos.map((todo, index) => (
          <li key={index} className='TodoItem'>
            <p>{todo.text}</p>
            <button onClick={(e) => handleRemove(todo)} className='RemoveItem'>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
