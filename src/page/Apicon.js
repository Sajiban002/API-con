import React, { useState } from 'react';
import '../index.css';

const App = () => {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs ] = useState("");
  const [items, setItems] = useState([]);

  const getUsers = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const userNames = data.map(user => user.name);
        setNames(userNames);
        setLoading(false);
      })
  };

  const inputchange = (event) => {
    setInputs (event.target.value);
  };

  const add = () => {
    if (inputs.trim() !== "") {
      setItems([...items, inputs]);
      setInputs ("");
    }
  };

  return (
    <div className="app">      
      <div className="content">
        <div className="api">
          <h2>Список пользователей</h2>
          <button className="load" onClick={getUsers}>
            {loading ? 'Загрузка...' : 'Показать пользователей'}
          </button>
          {names.length > 0 && (
            <ul className="lists">
              {names.map((name, index) => (
                <li key={index} className="items">{name}</li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="todolist">
          <h2>To Do List</h2>
          <input type="text" value={inputs} onChange={inputchange} placeholder="Введите текст" />
          <button onClick={add}>Добавить</button>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="items">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;