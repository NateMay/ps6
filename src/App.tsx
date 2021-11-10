import React from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  const log = (value: boolean) => console.log(value)
  return (
    <main className="container">
      <a href="">GitHub Repository</a>
      <h1>Rhyme Finder (579 Problem Set 5)</h1>
      <Button onClick={() => log(true)}>Show Toast</Button>
    </main>
  );
}

export default App;
