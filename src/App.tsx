import React from 'react';
import styles from  './App.module.sass';
import { RollDice } from './components/RollDice/RollDice';


const App: React.FC = () => {
  return (
    <div className={styles.board}>
      <RollDice/>
    </div>
  );
}

export default App;
