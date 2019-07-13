import React, { useState } from 'react'
import styles from './RollDice.module.sass'
import { tsConstructorType } from '@babel/types';
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { number } from 'prop-types';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import { Die } from '../Die/Die';

enum buttonText {
    idle = 'Roll dices',
    rolling = 'Rolling...'
}

enum Hand {
    player,
    enemy
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
    enHandName: string
}

type die = {
    number: number,
    icon: IconDefinition
}

const dicesList: die[] = [{ number: 1, icon: faDiceOne }, { number: 2, icon: faDiceTwo }, { number: 3, icon: faDiceThree },
{ number: 4, icon: faDiceFour }, { number: 5, icon: faDiceFive }, { number: 6, icon: faDiceSix }]


export const RollDice = () => {

    const randomizeDicesSet = (dices: die[], numberOfDies: number = dices.length): die[] => {
        const randomDie = () => Math.floor(Math.random() * dicesList.length)
        let rolledDices:die[] = []
        for (let i = 0; i < numberOfDies; i++) {
            rolledDices = [...rolledDices, dices[randomDie()]]
        }
        return rolledDices
    }

    const [state, setState] = useState<State>({
        plDices: randomizeDicesSet(dicesList),
        enDices: randomizeDicesSet(dicesList),
        buttonText: buttonText.idle,
        dicesStyle: styles.dices,
        round: 1,
        plPoints: 0,
        enPoints: 0,
        plHandName: "",
        enHandName: ""
    })

    const rollSet = (st: State) => {
        const plHandPoints = calculateHand(st.plDices);
        const enHandPoints = calculateHand(st.enDices);
        const plHandName = HandName(plHandPoints);
        const enHandName = HandName(enHandPoints);

        return {
            ...st,
            plDices: randomizeDicesSet(dicesList),
            enDices: randomizeDicesSet(dicesList),
            buttonText: buttonText.idle,
            dicesStyle: `${styles.dices}`,
            round: st.round + 1,
            plPoints: st.plPoints + plHandPoints,
            enPoints: st.enPoints + enHandPoints,
            plHandName: plHandName,
            enHandName: enHandName

        }    
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
        // calculateHand(state.plDices, Hand.player);
        // calculateHand(state.enDices, Hand.enemy);
        
    }

    const HandName = (points: number): string => {
        switch(points){
            case 2000:
                return 'Full House'
            case 1500:
                return 'Straight'
            case 1000: 
                return 'Five of a Kind'
            case 800: 
                return 'Four of a Kind'
            case 400: 
                return 'Three of a Kind'
            case 200: 
                return 'Double Pair'
            case 100: 
                return 'Double Pair'
            default: return 'Buck'
        }
    }

    const calculateHand = (diceSet: die[]): number => {
        const diceInNumbers: number[] = diceSet.map(el => el.number) 
        const sortedDice: number[] = diceInNumbers.sort()

        if(checkFullHouse(sortedDice)) { return 2000 }
        else if(checkStraight(sortedDice)) { return 1500 }
        else if(checkFiveOfAKind(sortedDice)) { return 1000 }
        else if(checkFourOfAKind(sortedDice)) { return 800 }
        else if(checkThreeOfAKind(sortedDice)) { return 400 }
        else if(checkDoublePair(sortedDice)) { return 200 }
        else if(checkPair(sortedDice)) { return 100 }
        else { return 0 }

    }

    const checkPair = (sortedDice: number[]): boolean => {
        const sd = sortedDice
        for(let i = 0; i < sd.length - 1; i++) {
            const currentDie = sd[i];
            const nextDie = sd[i + 1];
            if(currentDie === nextDie) { return true } 
        } 
        return false
    }
    
    const checkDoublePair = (sortedDice: number[]): boolean => {
        const sd = sortedDice
        for(let i = 0; i < sd.length - 1;i++) {
            const currentDie = sd[i];
            const nextDie = sd[i + 1];
            if(currentDie === nextDie) { 
                checkPair(sortedDice.splice(i, 2))
                return true;
            } 
        }
        return false;
    }

    const checkThreeOfAKind = (sortedDice: number[]): boolean => {
        const sd = sortedDice
        for(let i = 0; i < sd.length - 2;i++) {
            const firstDie = sd[i];
            const secondDie = sd[i + 1];
            const thirdDie = sd[i + 2];
            if(firstDie === secondDie && secondDie === thirdDie) { 
                return true
            } 
        }
        return false
    }

    const checkFourOfAKind = (sortedDice: number[]): boolean => {
        const sd = sortedDice
        let badDies = 0
        for(let i = 0; i < sd.length - 2;i++) {
            const currentDie = sd[i];
            const nextDie = sd[i + 1];
            if(currentDie !== nextDie) { ++badDies }
            if(badDies >= 2) { return false } 
        }
        return true
    }
    
    const checkFiveOfAKind = (sortedDice: number[]): boolean => {
        const sd = sortedDice
        let badDies = 0
        for(let i = 0; i < sd.length - 2;i++) {
            const currentDie = sd[i];
            const nextDie = sd[i + 1];
            if(currentDie !== nextDie) { ++badDies }
            if(badDies >= 1) { return false } 
        }
        return true
    }

    const checkFullHouse = (sortedDice: number[]): boolean => {
        const sd = sortedDice
        for(let i = 0; i < sd.length - 2;i++) {
            const firstDie = sd[i];
            const secondDie = sd[i + 1];
            const thirdDie = sd[i + 2];
            if(firstDie === secondDie && secondDie === thirdDie) { 
                return checkPair(sortedDice.splice(i, 3))
            } 
        }
        return false
    }

    const checkStraight = (sortedDice: number[]): boolean => [1,2,3,4,5,6] === sortedDice 

    const presentDices = (diceSet: die[]) => diceSet.map(el => <Die numberOfDies={el.icon} />)

    return (
        <>
        {console.log(state)}
            <div>
                <div>
                    <h3 className={styles.handName}>Enemy's set: {state.enHandName} <span className={styles.enemyPoints}>{state.enPoints} Pts</span></h3>
                    <div className={state.dicesStyle}> {presentDices(state.enDices)} </div>
                </div>
                <div className={styles.round}>Round: {state.round}</div>
                <div>
                    <h3 className={styles.handName}>Player's set: {state.plHandName} <span className={styles.playerPoints}>{state.plPoints} Pts</span></h3>
                    <div className={state.dicesStyle}> {presentDices(state.plDices)} </div>
                </div>
            </div>
            <button className={styles.rollButton} onClick={() => rollDice()}>{state.buttonText}</button>
        </>
    )
}