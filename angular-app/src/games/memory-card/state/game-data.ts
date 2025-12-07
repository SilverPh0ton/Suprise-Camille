import {MemoryCardType} from './memory-card.state';
import {shuffleArray} from '../../../utils/suffle';

export const memoryCardDataFactory = (sources: string[], initAlreadyResolved = false): MemoryCardType[] => {
  const result: MemoryCardType[] = [];

  sources.forEach((src, index) => {
    result.push(
      {
        id: (index * 2),
        matchID: (index * 2) + 1,
        src: src,
        isOpen: false,
        isResolved: initAlreadyResolved,
      },
      {
        id: (index * 2) + 1,
        matchID: (index * 2),
        src: src,
        isOpen: false,
        isResolved: initAlreadyResolved,
      }
    )
  });

  return shuffleArray(result);
}

