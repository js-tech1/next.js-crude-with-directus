import { useState, useEffect } from 'react';
import style from '../styles/form.module.css'
import { useRouter } from 'next/router';

export default function About() {
  const router = useRouter();

  useEffect(() => {
    // const accessToken = localStorage.getItem('accessToken');
    // if (accessToken) {
        router.push('/login');
    // }
}, []);
  const [items, setItems] = useState([]);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setInputValue] = useState('');
  const [displayTable, setDisplayTable] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const apiUrl = 'http://localhost:8055/items/user';
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer rQ6lIiyR1r4DJ2AOCXmcGyIeWbyK98-m");

  function generateAccessToken(userId) {
    const jwt = require('jsonwebtoken');
    const secretKey = `mysecret`  ; // Replace with your secret key

    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    // return token;
}
  const handleCreate = async () => {
    const id = Math.floor(Math.random() * Date.now())
    const newItem = { id: id, email: emailValue, password: passwordValue };
    generateAccessToken(id);
    await fetch(apiUrl, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newItem),
    })
      .then((response) => response.status)
      .then((data) => {
        console.log('Created item:', data);
      });
  };

  const handleRead = () => {
    fetch(apiUrl, {
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setItems(JSON.stringify(data.data));
        setDisplayTable(!displayTable);
      });
  };

  const handleUpdate = () => {
    const updatedItem = { name: updateName };
    fetch(`${apiUrl}/${updateId}`, {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify(updatedItem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Updated item:', data);
      });
  };

  const handleDelete = () => {
    fetch(`${apiUrl}/${parseInt(deleteId)}`, {
      method: 'DELETE',
      headers: myHeaders,
    })
      .then((response) => response.status)
      .then((data) => {
        console.log('Deleted item:', data);
      });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handlepassChange = (event) =>{
    setEmailValue(event.target.value);

  }

  const handleUpdateIdChange = (event) => {
    setUpdateId(event.target.value);
  };

  const handleUpdateNameChange = (event) => {
    setUpdateName(event.target.value);
  };

  const handleDeleteIdChange = (event) => {
    setDeleteId(event.target.value);
  };

  return (
    <>
      <input type="text" value={emailValue} onChange={handlepassChange} />
      <input type="text" value={passwordValue} onChange={handleInputChange} />

      <button onClick={handleCreate} className={style.button}>Create Item</button>
      <button onClick={handleRead} className={style.button}>Read Items</button>
      {displayTable && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>email</th>
              <th>password</th>
            </tr>
          </thead>
          <tbody>
            {JSON.parse(items).map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <input type="text" value={updateId} onChange={handleUpdateIdChange} />
        <input type="text" value={updateName} onChange={handleUpdateNameChange} />
        <button onClick={handleUpdate} className={style.button}>Update Item</button>
      </div>
      <div>
        <input type="text" value={deleteId} onChange={handleDeleteIdChange} />
        <button onClick={handleDelete} className={style.button}>Delete Item</button>
      </div>
    </>
  );
}