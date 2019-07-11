import React from 'react'
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
    diceOne: die,
    diceTwo: die,
    buttonText: buttonText,
    dices: string
}

type die = {
    number: number, 
    icon: IconDefinition
}

const dicesList: die[] = [{number: 1, icon: faDiceOne},{number: 2, icon: faDiceTwo}, {number:3, icon: faDiceThree},
              {number: 4, icon: faDiceFour},{number: 5, icon: faDiceFive},{number: 6, icon: faDiceSix}]

export class RollDice extends React.Component<IProps,State> {
    constructor(props: IProps){
        super(props)
        this.state = {
            diceOne: dicesList[0],
            diceTwo: dicesList[5],
            buttonText: buttonText.idle,
            dices: styles.dices 
        }
    }

    private rollDice = () => {
        const randomDice = () => Math.floor(Math.random() * dicesList.length)
        this.setState({buttonText: buttonText.rolling, dices: `${styles.dices} ${styles.rollingAnimation}`})
        setTimeout(() => 
                this.setState({
                    diceOne: dicesList[randomDice()], 
                    diceTwo: dicesList[randomDice()], 
                    buttonText: buttonText.idle,
                    dices:  `${styles.dices}`})
                                          ,200)
        
    }

    render() {
        return (
            <>
            <div className={this.state.dices}>
               <Die numberOfDies={this.state.diceOne.icon}/>
               <Die numberOfDies={this.state.diceTwo.icon}/>
            </div>
            <button className={styles.rollButton} onClick={() => this.rollDice()}>{this.state.buttonText}</button>
            </>
        )
    }
   
}
