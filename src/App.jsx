import { useState, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import wayneLogo from './assets/wayne.svg';
import viteLogo from '/vite.svg';
import './App.css';
import jwt from './jwt';

function login(username, password) {
  return fetch('/api/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then(res => res.json());
}

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const userRef = useRef(null);
  const passwordRef = useRef(null);

  async function auth(event) {
    event.preventDefault();
    const username = userRef.current.value;
    const password = passwordRef.current.value;

    const res = await login(username, password);
    if (res.result) {
      setToken(res.result);
      localStorage.setItem('jwt:token', token);
      setError(null);
    } else if (res.error) {
      setError(res.error);
    }
    userRef.current.value = '';
    passwordRef.current.value = '';
  }

  function logout() {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('jwt:token');
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt:token');
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token !== null) {
      localStorage.setItem('jwt:token', token);
    }
  }, [token]);

  useEffect(() => {
    if (token !== null) {
      jwt.verify(token).then(payload => {
        const { username } = payload;
        setUsername(username);
      }).catch(e => {
        setError(e.message);
      });
    }
  }, [token]);

  return (
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <a href="https://github.com/jcubic/wayne" target="_blank">
        <img src={wayneLogo} className="logo wayne" alt="Wayne logo" />
      </a>
      <h1>Vite + React + Wayne</h1>
      <div className="card">
        {token && (
          <div>
            <p>Welcome {username}</p>
            <button onClick={logout}>logout</button>
          </div>
        )}
        {!token && (
          <form onSubmit={auth}>
            <div>
              <label for="user">username</label>
              <input id="user" ref={userRef}/>
            </div>
            <div>
              <label for="password">password</label>
              <input id="password" ref={passwordRef} type="password"/>
            </div>
            <button>login</button>
          </form>
        )}
      </div>
      {error && <p className="error">{ error }</p>}
    </div>
  )
}

export default App;
