import {MemoryCardType} from './memory-card.type';

export const gameDataFactory = (sources: string[]): MemoryCardType[] => {
  const result: MemoryCardType[] = [];

  sources.forEach((src, index) => {
    result.push(
      {
        id: (index * 2),
        matchID: (index * 2) + 1,
        src: src,
        isOpen: false,
        isResolved: false,
      },
      {
        id: (index * 2) + 1,
        matchID: (index * 2),
        src: src,
        isOpen: false,
        isResolved: false,
      }
    )
  });

  shuffle(result);

  return result;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: MemoryCardType[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

