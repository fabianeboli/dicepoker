import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RollDice } from './components/RollDice/RollDice';
import { Die } from './components/Die/Die';
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons'


const App: React.FC = () => {
  return (
    <div className="App">
      <RollDice/>
    </div>
  );
}

export default App;
