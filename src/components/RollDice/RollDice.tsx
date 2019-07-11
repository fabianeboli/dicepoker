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

interface State {
    plDices: die[],
    enDices: die[],
    buttonText: buttonText,
    dicesStyle: string,
    round: number
}

type die = {
    number: number,
    icon: IconDefinition
}

const dicesList: die[] = [{ number: 1, icon: faDiceOne }, { number: 2, icon: faDiceTwo }, { number: 3, icon: faDiceThree },
{ number: 4, icon: faDiceFour }, { number: 5, icon: faDiceFive }, { number: 6, icon: faDiceSix }]


export const RollDice = () => {
    const randomDie = () => Math.floor(Math.random() * dicesList.length)

    const randomizeDicesSet = (dices: die[], numberOfDies: number = dices.length): die[] => {
        for (let i = 0; i < numberOfDies; i++) {
            const rndDie = randomDie()
            const swp = dices[rndDie]
            dices[rndDie] = dices[i]
            dices[i] = swp
        }
        return dices
    }

    const [state, setState] = useState<State>({
        plDices: randomizeDicesSet(dicesList),
        enDices: randomizeDicesSet(dicesList),
        buttonText: buttonText.idle,
        dicesStyle: styles.dices,
        round: 1
    })

    const rollSet = (st: State) => {
        return {
            ...st,
            buttonText: buttonText.idle,
            dicesStyle: `${styles.dices}`
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

    const presentDices = (diceSet: die[]) => diceSet.map(el => <Die numberOfDies={el.icon} />)

    return (
        <>
            <div >
                <div > 
                    <h3 className={styles.handName}>Enemy's set</h3>
               <div className={state.dicesStyle}> {presentDices(state.enDices)} </div>
                </div>
                <div >
                    <h3 className={styles.handName}>Player's set</h3>
               <div className={state.dicesStyle}> {presentDices(state.plDices)} </div>
                </div>
            </div>
            <button className={styles.rollButton} onClick={() => rollDice()}>{state.buttonText}</button>
        </>
    )
}