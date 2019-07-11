import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons'
import styles from './Die.module.sass'
import { IconProp } from '@fortawesome/fontawesome-svg-core';


interface IProps {
    numberOfDies: IconProp
}


export const Die = (props: IProps) =>  {
    return (
        <>
            <FontAwesomeIcon className={styles.dice} icon={props.numberOfDies}/>
        </>
    )
}
