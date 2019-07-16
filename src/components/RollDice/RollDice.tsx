import React, { useState } from 'react'
import styles from './RollDice.module.sass'
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { Die } from '../Die/Die';

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
}

type die = {
    number: number,
    icon: IconDefinition
}

const dicesList: die[] = [{ number: 1, icon: faDiceOne }, { number: 2, icon: faDiceTwo }, { number: 3, icon: faDiceThree },
{ number: 4, icon: faDiceFour }, { number: 5, icon: faDiceFive }, { number: 6, icon: faDiceSix }]

const checkPairs = (sortedDice: number[], numOfSearchedPairs: number): boolean => {
    const sd = sortedDice;
    let numOfPairs = 0;
    for (let i = 0; i < sd.length - 1; i++) {
        const currentDie = sd[i];
        const nextDie = sd[i + 1];
        if (currentDie === nextDie) {
            ++i;
            ++numOfPairs;
            if (numOfPairs === numOfSearchedPairs) {
                return true
            }
        }
    }
    return false;
}

const checkNKinds = (sortedDice: number[], Nkind: number): boolean => {
    const sd = sortedDice;
    let sameNeighbourDies = 0;
    console.log(sortedDice)
    for (let i = 0; i < sd.length - 1; i++) {
        const currentDie = sd[i];
        const nextDie = sd[i + 1];
        if (currentDie === nextDie) { sameNeighbourDies += 1 }
    }
    if (sameNeighbourDies === Nkind - 1) { return true }
    return false;
}

export const checkFullHouse = (sortedDice: number[]): boolean => {
    const sd = sortedDice;
    for (let i = 0; i < sd.length - 2; i++) {
        const firstDie = sd[i];
        const secondDie = sd[i + 1];
        const thirdDie = sd[i + 2];
        console.log(firstDie, secondDie, thirdDie)
        if (firstDie === secondDie && secondDie === thirdDie) {
         sd.splice(i, 3)
            if (checkPairs(sd, 1)) {
                return true
            }
        }
    }
    return false
}

export const compareArrays = (array1: any[], array2: any[]) => {
    let i = array1.length;
    while (i--) {
        if (array1[i] !== array2[i]) return false;
    }
    return true
}

export const checkStraight = (sortedDice: number[]): boolean => { return compareArrays(sortedDice, [1, 2, 3, 4, 5]) || compareArrays(sortedDice, [2, 3, 4, 5, 6]) ? true : false }

export const randomizeDicesSet = (dices: die[] = dicesList, numberOfDies: number = dices.length - 1): die[] => {
    const randomDie = () => Math.floor(Math.random() * dicesList.length)
    let rolledDices: die[] = []
    for (let i = 0; i < numberOfDies; i++) {
        rolledDices = [...rolledDices, dices[randomDie()]]
    }
    return rolledDices
}
const testPair = [1, 1, 2, 3, 4].sort();
const testDoublePair = [1, 1, 2, 4, 4].sort();
const testThreeOfAKind = [1, 3, 4, 4, 4].sort();
const testFourOfAKind = [2, 2, 2, 2, 4].sort();
const testFiveOfAKind = [4, 4, 4, 4, 4].sort();
const testStraight = [2, 3, 4, 5, 6].sort();
const testFullHouse = [2, 5, 5, 2, 5].sort();

console.log("---PAIR TEST: ", checkPairs(testPair,1), testPair)
console.log("---DOUBLE PAIR TEST: ", checkPairs(testDoublePair, 2), testDoublePair)
console.log("---THREE OF A KIND TEST: ", checkNKinds(testThreeOfAKind, 3), testThreeOfAKind)
console.log("---FOUR OF A KIND TEST: ", checkNKinds(testFourOfAKind, 4), testFourOfAKind)
console.log("---FIVE OF A KIND TEST: ", checkNKinds(testFiveOfAKind, 5), testFiveOfAKind)
console.log("---STRAIGHT TEST: ", checkStraight(testStraight), testStraight)
console.log("---FULLHOUSE TEST: ", checkFullHouse(testFullHouse), testFullHouse)

export const RollDice = () => {
    const [state, setState] = useState<State>({
        plDices: [],
        enDices: [],
        buttonText: buttonText.idle,
        dicesStyle: styles.dices,
        round: 1,
        plPoints: 0,
        enPoints: 0,
        plHandName: "",
        enHandName: ""
    })

    const rollSet = (st: State) => {
        const plHand = randomizeDicesSet()
        const enHand = randomizeDicesSet()
        const plHandPoints = calculateHand(plHand);
        const enHandPoints = calculateHand(enHand);
        const plHandName = HandName(plHandPoints);
        const enHandName = HandName(enHandPoints);
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
            wonGames: 0, 
            lostGames: 0
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
    }

    const HandName = (points: number): string => {
        switch (points) {
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
                return 'Pair'
            default: return 'Buck'
        }
    }

    const calculateHand = (diceSet: die[]): number => {
        const diceInNumbers: number[] = diceSet.map(el => el.number);
        const sortedDice: number[] = diceInNumbers.sort();
        if (checkStraight(sortedDice)) { return 1500; }
        else if (checkNKinds(sortedDice, 5)) { return 1000; }
        else if (checkNKinds(sortedDice, 4)) { return 800; }
        else if (checkFullHouse(sortedDice)) { return 2000; }
        else if (checkNKinds(sortedDice, 3)) { return 400; }
        else if (checkPairs(sortedDice, 2)) { return 200; }
        else if (checkPairs(sortedDice, 1)) { return 100; }
        else { return 0; }
    }

    const presentDices = (diceSet: die[]) => diceSet.map(el => <Die numberOfDies={el.icon} />)

    return (
        <>
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

