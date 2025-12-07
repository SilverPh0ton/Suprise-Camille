import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {wordScrambleDataFactory} from './game-data';
import {ProgressStore} from '../../../lobby/progress.state';

type WordScrambleType = {
  answers: string[];
  scrambledAnswers: string[];
  currentIndex: number;
  nbrOfAttempt: number;
};

const initialState: WordScrambleType = {
  answers: [],
  scrambledAnswers: [],
  currentIndex: 0,
  nbrOfAttempt: 0
};

export const WordScrambleStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed(({answers, scrambledAnswers, currentIndex}) => {
    const nbrOfWords = computed(() => answers().length);
    const progressPercentage = computed(() => Math.round(currentIndex() / nbrOfWords() * 100));
    const isComplete = computed(() => currentIndex() === nbrOfWords());
    const currentQuestion = computed(() => scrambledAnswers()[currentIndex()]);

    return {
      nbrOfWords,
      progressPercentage,
      currentQuestion,
      isComplete
    }
  }),
  withMethods((store, progressStore = inject(ProgressStore)) => ({
    initGameData(answers: string[]): void {
      const {randomOrderAnswers, scrambledAnswers} = wordScrambleDataFactory(answers);
      const initAlreadyResolved = progressStore.isCurrentTargetUnlocked();

      patchState(store, {
        answers: randomOrderAnswers,
        scrambledAnswers,
        currentIndex: initAlreadyResolved ? answers.length : 0,
        nbrOfAttempt: 0
      });
    },

    resetGame(answers: string[]): void {
      const {randomOrderAnswers, scrambledAnswers} = wordScrambleDataFactory(answers);

      patchState(store, {
        answers: randomOrderAnswers,
        scrambledAnswers,
        currentIndex: 0,
        nbrOfAttempt: 0
      });
      progressStore.resetCurrentTarget();
    },
    submitAnswer: (guess: string) => {
      patchState(store, {
        nbrOfAttempt: store.nbrOfAttempt() + 1,
      });

      if (guess.toLowerCase() === store.answers()[store.currentIndex()]) {
        patchState(store, {
          currentIndex: store.currentIndex() + 1,
        });
        if (store.isComplete()) {
          progressStore.unlockCurrentTarget()
        }
        return true
      } else {
        return false;
      }
    }
  }))
);
