import { LETTER_POOL } from './constants.js';

const HAND_SIZE = 10;

export const drawLetters = () => {
  let trackingPool = [];

  for (const [letter, count] of Object.entries(LETTER_POOL)) {
    for (let i = 0; i < count; i++) {
      trackingPool.push(letter);
    }
  }
  console.log(trackingPool);

  let letters = [];

  for (let i = 0; i < HAND_SIZE; i++) {
    const randonIndex = Math.floor(Math.random() * trackingPool.length);
    letters.push(trackingPool[randonIndex]);
    trackingPool[randonIndex] = trackingPool[trackingPool.length - 1];
    trackingPool.pop();
  }
  // console.log(letters)
  return letters;

};
// drawLetters()

export const usesAvailableLetters = (input, lettersInHand) => {
  // input = dog, lettersInHand = letters 'daioqgnmac' 
  // create copy for tracking so original hand not modified
  input = input.toUpperCase();
  let updatedHand = [...lettersInHand];

  for (const char of input) {
    const index = updatedHand.indexOf(char);
    if (index == -1) return false;
    updatedHand.splice(index, 1);
  }
  return true;
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
