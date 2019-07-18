import React, { useState } from 'react'
import styles from './RollDice.module.sass'
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { Die } from '../Die/Die';
import * as CalculateHand from '../scripts/calculateHands'

enum buttonText {
    idle = 'Roll dices',
    rolling = 'Rolling...'
}
interface State {
    plDices: die[],
    enDices: die[],
    buttonText: buttonText,
    dicesStyle: string,
    round: number,
    plPoints: any,
    enPoints: any,
    plHandName: string,
    enHandName: string,
    wonGames: number,
    lostGames: number
}

export type die = {
    number: number,
    icon: IconDefinition,
}

const dicesList: die[] = [{ number: 1, icon: faDiceOne }, { number: 2, icon: faDiceTwo }, { number: 3, icon: faDiceThree },
{ number: 4, icon: faDiceFour }, { number: 5, icon: faDiceFive }, { number: 6, icon: faDiceSix }]

export const RollDice: React.FC = () => {
    const uuid = require('uuid/v4');

    const [state, setState] = useState<State>({
        plDices: [],
        enDices: [],
        buttonText: buttonText.idle,
        dicesStyle: styles.dices,
        round: 0,
        plPoints: 0,
        enPoints: 0,
        plHandName: "",
        enHandName: "",
        wonGames: 0,
        lostGames: 0
    })

    const randomDieIndex = () => Math.floor(Math.random() * dicesList.length)
    const randomizeDie = (dice: die[] = dicesList) => dice[randomDieIndex()] 
    const randomizeDicesSet = (dices: die[] = dicesList, numberOfDies: number = dices.length - 1): die[] => {
        let rolledDices: die[] = []
        for (let i = 0; i < numberOfDies; i++) {
            rolledDices = [...rolledDices, dices[randomDieIndex()]]
        }
        return rolledDices
    }

    const rollSet = (st: State) => {
        console.log(state.plDices)
        const plHand = st.round === 0 ? randomizeDicesSet() : rollSelectedDices(state.plDices)
        const enHand = randomizeDicesSet()
        const plHandPoints = CalculateHand.calculateHand(plHand);
        const enHandPoints = CalculateHand.calculateHand(enHand);
        const plHandName = CalculateHand.HandName(plHandPoints);
        const enHandName = CalculateHand.HandName(enHandPoints);
        return {
            ...st,
            plDices: plHand,
            enDices: enHand,
            buttonText: buttonText.idle,
            dicesStyle: `${styles.dices}`,
            round: st.round + 1,
            plPoints: st.plPoints + plHandPoints,
            enPoints: st.enPoints + enHandPoints,
            plHandName: plHandName,
            enHandName: enHandName,
        }
    }

    let diesToStay: any[] = [];
    const click = (die: any) => {
        if(die.selected) {
            diesToStay = [...diesToStay, die].map(el => el.id === undefined ? el : el.id)
            diesToStay = [...new Set(diesToStay)]
        }  else {
            diesToStay = diesToStay.filter(el => el !== die.id)
        }       
        console.log(die, 'WOOOOW', diesToStay);
    }

    const rollSelectedDices = (dices: die[]) => {
        diesToStay = diesToStay.sort();
        for(let i = 0; i < dices.length; i++) {
            // [2,0,3]
            if(diesToStay[i] === i) {
                dices[i] = randomizeDie();
            } 
        }
        return dices
    }

    const rollingAnimation = (st: State) => {
        return {
            ...st,
            buttonText: buttonText.rolling,
            dicesStyle: `${styles.dices} ${styles.rollingAnimation}`
        }
    }
    

    const rollDice = () => {
        setState(rollingAnimation)
        setTimeout(() => setState(rollSet), 200)
        if (state.round === 2) { setState(sumGame()) }
    }

    const sumGame = () => {
        const plWonGames = state.plPoints > state.enPoints ? state.wonGames + 1 : state.wonGames;
        const enWonGames = state.plPoints < state.enPoints ? state.lostGames + 1 : state.lostGames;
        return ({
            ...state,
            round: 0,
            plPoints: 0,
            enPoints: 0,
            wonGames: plWonGames,
            lostGames: enWonGames,
            buttonText: buttonText.rolling,
            dicesStyle: `${styles.dices} ${styles.rollingAnimation}`
        })
    }   
    // use idx in map function to create indexes for dies, which will allow to do sth like this: die[idx]
    const presentDices = (diceSet: die[]) => diceSet.map((el, idx) => <Die key={uuid()} id={idx}  selected={false} 
                            value={el.number}  click={click} currentTurn={state.round} numberOfDies={el.icon} />)

    const [game, setGame] = useState(false)
    const newGame = () => {
        const turns = state.round === 0 ? 1 : state.round;
        const whoWon = state.plPoints > state.enPoints ? 'You won!' : "You lost";
        const roundGame = state.round === 2 ? `${whoWon}` : `Turn: ${turns}`;

        return (
            <>
                <div>
                    <div className={`${state.dicesStyle} ${styles.disabled}`}> {presentDices(state.enDices)} </div>
                    <div className={styles.enemy}>
                        <div>Won Games: <span className={styles.wonGames}>{state.lostGames}</span></div>
                        <div>
                            <div className={styles.handName}>Enemy's set: {state.enHandName} </div>
                            <div className={styles.enemyPoints}>Points: {state.enPoints} Pts</div>
                        </div>

                    </div>
                    <div className={styles.round}>{roundGame}</div>
                    <div className={styles.player}>
                        <div>Won Games: <span className={styles.playerWonGames}>{state.wonGames}</span></div>
                        <div>
                            <div className={styles.handName}>Player's set: {state.plHandName} </div>
                            <div className={styles.playerPoints}>Points: {state.plPoints} Pts</div>
                        </div>
                    </div>

                    <div className={state.dicesStyle}> {presentDices(state.plDices)} </div>

                </div>
                <button className={styles.rollButton} onClick={() => rollDice()}>{state.buttonText}</button>
            </>
        )
    }

    const initialScreen = () => {
        return (
            <>
                <div className={styles.header}> Welcome to Dice Poker!</div>
                <button className={styles.initialButton} onClick={() => { setGame(true); rollDice() }}> Roll the dices!! </button>
            </>
        )
    }

    return (
        <>
            {game === false ? initialScreen() : newGame()}
        </>
    )
}

