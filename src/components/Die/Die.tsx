import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Die.module.sass'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IProps {
    id: number | string,
    numberOfDies: IconProp
    value: number,
    selected?: boolean
    currentTurn?: number,
    click: any
}
 
export const Die = (props: IProps) =>  {
    const changeDices = props.currentTurn === 1 ? styles.clickable : styles.unClickable;
    const [selected, setSelected] = React.useState(false);
    const selectedButton = selected ? styles.selected : ''; 

 
    const handleClick = () => {
        setSelected(!selected);
        const selectedDie = !selected;
        const die = props.id;
        props.click({ id: die, selected: selectedDie });
        return props.value;
    }


    return (
        <>
            <button onClick={() => handleClick()} className={`${changeDices} ${styles.dieButton} ${selectedButton}`}><FontAwesomeIcon className={styles.die} icon={props.numberOfDies}/></button>
        </>
    )
}
