import { LETTER_POOL, SCORE_CHART } from './constants.js';

const HAND_SIZE = 10;

export const drawLetters = () => {
  let trackingPool = [];

  for (const [letter, count] of Object.entries(LETTER_POOL)) {
    for (let i = 0; i < count; i++) {
      trackingPool.push(letter);
    }
  }
  const generateLetters = (handsize) => {
    let hand = [];

    for (let i = 0; i < handsize; i++) {
      const randonIndex = Math.floor(Math.random() * trackingPool.length);
      hand.push(trackingPool[randonIndex]);
      // overwrite last z with added one's position and remove the last one
      trackingPool[randonIndex] = trackingPool[trackingPool.length - 1];
      trackingPool.pop();
    }
    return hand;
  };

  return generateLetters(HAND_SIZE);
};

export const usesAvailableLetters = (input, lettersInHand) => {
  input = input.toUpperCase();
  // create copy for tracking so original not modified
  let updatedHand = [...lettersInHand];

  for (const char of input) {
    const index = updatedHand.indexOf(char);
    //if not found, index is -1
    if (index === -1) return false;
    //if found, remove it from hand
    updatedHand.splice(index, 1);
  }
  return true;
};

export const scoreWord = (word) => {
  word = word.toUpperCase();
  let score = 0;

  if (!word) return 0;

  for (const char of word) {
    score += SCORE_CHART[char];
  }

  const BONUS_MIN_LENGTH = 7;
  const BONUS_POINTS = 8;

  if (word.length >= BONUS_MIN_LENGTH) {
    score += BONUS_POINTS ;
  }
  return score;
};

export const highestScoreFrom = (words) => {
  const scores = words.map((word) => scoreWord(word));
  const maxScore = Math.max(...scores);

  const highestWords = words.filter((word, index) => scores[index] === maxScore
  );

  //if only one word
  if (highestWords.length === 1) {
    return {
      word: highestWords[0],
      score: maxScore
    };
  };
  //if there are more, 10 letters wins
  const wordLengthIs10 = highestWords.filter(word => word.length === 10);

  if (wordLengthIs10.length > 0) {
    return {
      word: wordLengthIs10[0],
      score: maxScore
    };
  };
  //otherwise shorter word wins
  const shortestWord = highestWords.reduce((shortest, current) => { if (current.length < shortest.length) {
    return current;
  };
  return shortest;
  });

  return {
    word: shortestWord,
    score: maxScore
  };
};


