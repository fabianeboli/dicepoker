import React, {useState} from 'react'
import styles from './RollDice.module.sass'
import { tsConstructorType } from '@babel/types';
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { number } from 'prop-types';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import { Die } from '../Die/Die';

interface IProps {
    die?: die 
}

enum buttonText {
    idle = 'Roll dices',
    rolling = 'Rolling...'
}

interface State {
    plDices: die[],
    enDices: die[],
    diceOne: die,
    diceTwo: die,
    buttonText: buttonText,
    dicesStyle: string,
    round: number
}

type die = {
    number: number, 
    icon: IconDefinition
}

const dicesList: die[] = [{number: 1, icon: faDiceOne},{number: 2, icon: faDiceTwo}, {number:3, icon: faDiceThree},
              {number: 4, icon: faDiceFour},{number: 5, icon: faDiceFive},{number: 6, icon: faDiceSix}]

// export class RollDice extends React.Component<IProps,State> {
   

//     constructor(props: IProps){
//         super(props)
//         this.state = {
//             plDices: [],
//             enDices: [],
//             diceOne: dicesList[0],
//             diceTwo: dicesList[5],
//             buttonText: buttonText.idle,
//             dicesStyle: styles.dices,
//             round: 1 
//         }
//     }

//     private rollSet = (st: State) => {
//         const randomDice = () => Math.floor(Math.random() * dicesList.length)
//         return {
//             ...st,
//             diceOne: dicesList[randomDice()], 
//             diceTwo: dicesList[randomDice()], 
//             buttonText: buttonText.idle,
//             dicesStyle:  `${styles.dices}`
//         }
//     }

//     private rollingAnimation = () => {
//         return {
//             buttonText: buttonText.rolling, 
//             dicesStyle: `${styles.dices} ${styles.rollingAnimation}`
//         }
//     }

//     private rollDice = () => {
//         this.setState(this.rollingAnimation)
//         setTimeout(() => this.setState(this.rollSet), 200)
        
//     }

//     private presentDices = () => {}

//     render() {
//         return (
//             <>
//             <div className={this.state.dicesStyle}>
//                <Die numberOfDies={this.state.diceOne.icon}/>
//                <Die numberOfDies={this.state.diceTwo.icon}/>
//             </div>
//             <button className={styles.rollButton} onClick={() => this.rollDice()}>{this.state.buttonText}</button>
//             </>
//         )
//     }
   
// }


export const RollDice = () => {
    const [state, setState] = useState<State>({ plDices: [],
        enDices: [],
        diceOne: dicesList[0],
        diceTwo: dicesList[5],
        buttonText: buttonText.idle,
        dicesStyle: styles.dices,
        round: 1 })

        const rollSet = (st: State) => {
            const randomDice = () => Math.floor(Math.random() * dicesList.length)
            return {
                ...st,
                diceOne: dicesList[randomDice()], 
                diceTwo: dicesList[randomDice()], 
                buttonText: buttonText.idle,
                dicesStyle:  `${styles.dices}`
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
    
        const presentDices = () => {}

        return (
            <>
            <div className={state.dicesStyle}>
               <Die numberOfDies={state.diceOne.icon}/>
               <Die numberOfDies={state.diceTwo.icon}/>
            </div>
            <button className={styles.rollButton} onClick={() => rollDice()}>{state.buttonText}</button>
            </>
        )
}