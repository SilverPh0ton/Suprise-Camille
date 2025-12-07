import {shuffleArray} from '../../../utils/suffle';
import {wordSimilarity} from '../../../utils/word-similarity';

export const wordScrambleDataFactory = (answers: string[]): {
  randomOrderAnswers: string[],
  scrambledAnswers: string[]
} => {
  const randomOrderAnswers = shuffleArray(answers);
  const scrambledAnswers = randomOrderAnswers.map((answer: string, i) => {
    let wordSimilarityScore = 1;
    let scrambledAnswer = ''
    while (wordSimilarityScore > 0.3) {
      scrambledAnswer = shuffleArray(answer.split('')).join('');
      wordSimilarityScore = wordSimilarity(answer, scrambledAnswer);
    }

    return scrambledAnswer;
  })

  return {randomOrderAnswers, scrambledAnswers,};
}

