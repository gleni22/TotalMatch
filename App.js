import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [preferences, setPreferences] = useState({});
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  const register = () => {
    axios.post('http://localhost:5000/register', {
      username, password, age, gender, preferences, bio, location
    })
    .then(response => alert('User registered'))
    .catch(error => console.error(error));
  };

  const login = () => {
    axios.post('http://localhost:5000/login', {
      username, password
    })
    .then(response => alert('Login successful'))
    .catch(error => alert('Invalid credentials'));
  };

  return (
    <div>
      <h1>TotalMatch App</h1>

      <div>
        <h2>Register</h2>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
        <input type="text" placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <textarea placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)} />
        <button onClick={register}>Register</button>
      </div>

      <div>
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default App;
