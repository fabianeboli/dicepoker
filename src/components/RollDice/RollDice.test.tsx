// src/components/Hello.test.tsx

import * as React from 'react';
import * as enzyme from 'enzyme';
import * as RollDice from './RollDice';
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix, IconDefinition } from '@fortawesome/free-solid-svg-icons'


test('Check Full House', () => {
  // const correctDice = [1,1,1,2,2];
  // const falseDice = [5,1,1,2,2];
  // expect((2+3).toEqual(6))
  // expect()
  
})

test("Rolling dices changes the dice", () => {
  const dice = [{ number: 1, icon: faDiceOne }, { number: 2, icon: faDiceTwo }, { number: 3, icon: faDiceThree },
    { number: 4, icon: faDiceFour }, { number: 5, icon: faDiceFive }, { number: 6, icon: faDiceSix }]
  const newDice = RollDice.randomizeDicesSet(dice)
  expect(dice === newDice)
})
// it('renders the correct text when no enthusiasm level is given', () => {
//   const hello = enzyme.shallow(<Hello name='Daniel' />);
//   expect(hello.find(".greeting").text()).toEqual('Hello Daniel!')
// });

// it('renders the correct text with an explicit enthusiasm of 1', () => {
//   const hello = enzyme.shallow(<Hello name='Daniel' enthusiasmLevel={1}/>);
//   expect(hello.find(".greeting").text()).toEqual('Hello Daniel!')
// });

// it('renders the correct text with an explicit enthusiasm level of 5', () => {
//   const hello = enzyme.shallow(<Hello name='Daniel' enthusiasmLevel={5} />);
//   expect(hello.find(".greeting").text()).toEqual('Hello Daniel!!!!!');
// });

// it('throws when the enthusiasm level is 0', () => {
//   expect(() => {
//     enzyme.shallow(<Hello name='Daniel' enthusiasmLevel={0} />);
//   }).toThrow();
// });

// it('throws when the enthusiasm level is negative', () => {
//   expect(() => {
//     enzyme.shallow(<Hello name='Daniel' enthusiasmLevel={-1} />);
//   }).toThrow();
// });