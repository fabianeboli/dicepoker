import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RollDice } from './components/RollDice/RollDice';


const App: React.FC = () => {
  return (
    <div className="App">
      <RollDice/>
    </div>
  );
}

export default App;
