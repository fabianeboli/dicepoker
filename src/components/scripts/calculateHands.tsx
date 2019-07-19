import { die } from '../RollDice/RollDice'

export enum Points {
    FiveOfAKind = 2000,
    FourOfAKind = 1500,
    FullHouse = 1000,
    Straight = 800,
    ThreeOfAKind = 400,
    DoublePair = 200,
    Pair = 100,
    Buck = 0
}

export const checkPairs = (sortedDice: number[], numOfSearchedPairs: number): boolean => {
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

export const checkFullHouse = (sortedDice: number[]): boolean => {
    const sd = sortedDice;
    let pairFound = false;
    for (let i = 0; i < sd.length - 2; i++) {
        const firstDie = sd[i];
        const secondDie = sd[i + 1];
        const thirdDie = sd[i + 2];
        if (firstDie === secondDie && secondDie !== thirdDie) {
            pairFound = true;
        }
        else if (firstDie === secondDie && secondDie === thirdDie) {
            const threeOfAKindFound = true;
            if (pairFound && threeOfAKindFound) {
                return true
            }
        }
    }
    return false
}

export const checkNKinds = (sortedDice: number[], Nkind: number): boolean => {
    const sd = sortedDice;
    let sameNeighbourDies = 0;
    for (let i = 0; i < sd.length - 1; i++) {
        const previousDie = i === 0 ? sd[i] : sd[i - 1];
        const currentDie = sd[i];
        const nextDie = sd[i + 1];
        if (previousDie !== currentDie) { sameNeighbourDies = 0 }
        if (currentDie === nextDie) { sameNeighbourDies += 1 }
        if (sameNeighbourDies === Nkind - 1) { return true }
    }
    return false;
}

export const compareArrays = (array1: any[], array2: any[]) => {
    let i = array1.length;
    while (i--) {
        if (array1[i] !== array2[i]) return false;
    }
    return true
}

export const checkStraight = (sortedDice: number[]): boolean => { return compareArrays(sortedDice, [1, 2, 3, 4, 5]) || compareArrays(sortedDice, [2, 3, 4, 5, 6]) ? true : false }

export const calculateHand = (diceSet: die[]): number => {
    const diceInNumbers: number[] = diceSet.map(el => el.number);
    const sortedDice: number[] = diceInNumbers.sort();
    if (checkStraight(sortedDice)) { return Points.Straight; }
    else if (checkNKinds(sortedDice, 5)) { return Points.FiveOfAKind; }
    else if (checkNKinds(sortedDice, 4)) { return Points.FourOfAKind; }
    else if (checkFullHouse(sortedDice)) { return Points.FullHouse; }
    else if (checkNKinds(sortedDice, 3)) { return Points.ThreeOfAKind; }
    else if (checkPairs(sortedDice, 2)) { return Points.DoublePair; }
    else if (checkPairs(sortedDice, 1)) { return Points.Pair; }
    else { return Points.Buck; }
}

export const HandName = (points: number): string => {
    switch (points) {
        case Points.FiveOfAKind:
            return 'Five of a Kind'
        case Points.FourOfAKind:
            return 'Four of a Kind'
        case Points.FullHouse:
            return 'Full House'
        case Points.Straight:
            return 'Straight'
        case Points.ThreeOfAKind:
            return 'Three of a Kind'
        case Points.DoublePair:
            return 'Double Pair'
        case Points.Pair:
            return 'Pair'
        default: return 'Buck'
    }
}


// const testPair = [1, 1, 2, 3, 4].sort();
// const testDoublePair = [1, 1, 2, 4, 4].sort();
// const testThreeOfAKind = [1, 3, 4, 4, 4].sort();
// const testFourOfAKind = [2, 2, 2, 2, 4].sort();
// const testFiveOfAKind = [4, 4, 4, 4, 4].sort();
// const testStraight = [2, 3, 4, 5, 6].sort();
// const testFullHouse = [2, 5, 2, 2, 5].sort();

// console.log("---PAIR TEST: ", checkPairs(testPair, 1), testPair)
// console.log("---DOUBLE PAIR TEST: ", checkPairs(testDoublePair, 2), testDoublePair)
// console.log("---THREE OF A KIND TEST: ", checkNKinds(testThreeOfAKind, 3), testThreeOfAKind)
// console.log("---FOUR OF A KIND TEST: ", checkNKinds(testFourOfAKind, 4), testFourOfAKind)
// console.log("---FIVE OF A KIND TEST: ", checkNKinds(testFiveOfAKind, 5), testFiveOfAKind)
// console.log("---STRAIGHT TEST: ", checkStraight(testStraight), testStraight)
// console.log("---FULLHOUSE TEST: ", checkFullHouse(testFullHouse), testFullHouse)