import {getState, patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {effect} from '@angular/core';

type ProgressState = {
  lettersUnlocked: boolean[];
  unlockedHint: number;
  unlockTarget: {
    type: 'letter' | 'hint';
    index: number;
  } | null;
};

const initialState: ProgressState = {
  lettersUnlocked: [false, false, false, false, false, false],
  unlockedHint: -1,
  unlockTarget: null,
};

export const ProgressStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed(({lettersUnlocked, unlockedHint, unlockTarget}) => ({
    isFirstLetterUnlocked: () => lettersUnlocked()[0],
    isSecondLetterUnlocked: () => lettersUnlocked()[1],
    isThirdLetterUnlocked: () => lettersUnlocked()[2],
    isFourthLetterUnlocked: () => lettersUnlocked()[3],
    isFifthLetterUnlocked: () => lettersUnlocked()[4],
    isSixthLetterUnlocked: () => lettersUnlocked()[5],
    areAllLettersUnlocked: () => lettersUnlocked().every(isUnlocked => isUnlocked),
    isFirstHintUnlocked: () => unlockedHint() >= 0,
    isSecondHintUnlocked: () => unlockedHint() >= 1,
    isThirdHintUnlocked: () => unlockedHint() >= 2,
    isFourthHintUnlocked: () => unlockedHint() >= 3,
    isSolutionUnlocked: () => unlockedHint() >= 4,
    isCurrentTargetUnlocked: () => {
      const target = unlockTarget();
      if (!target) return false;
      if (target.type === 'letter') {
        return lettersUnlocked()[target.index];
      } else if (target.type === 'hint') {
        return unlockedHint() >= target.index;
      }
      return false
    }
  })),
  withMethods((store) => ({
    setUnlockTarget(type: 'letter' | 'hint', index: number): void {
      if (type === 'letter' && (index < 0 || index > 5))
        throw new Error('Invalid letter index');

      if (type === 'hint' && index > store.unlockedHint() + 1)
        throw new Error('Not all previous index unlocked');

      patchState(store, {unlockTarget: {type, index}});
    },
    unlockCurrentTarget(): void {
      const unlockTarget = store.unlockTarget();
      if (!unlockTarget)
        throw new Error('No unlock target');

      if (unlockTarget.type === 'letter') {
        const lettersUnlocked = [...store.lettersUnlocked()]
        lettersUnlocked[unlockTarget.index] = true;
        patchState(store, {lettersUnlocked});
      } else if (unlockTarget.type === 'hint') {
        patchState(store, {unlockedHint: unlockTarget.index});
      }
    },
    resetCurrentTarget(): void {
      const unlockTarget = store.unlockTarget();
      if (!unlockTarget)
        throw new Error('No unlock target');

      if (unlockTarget.type === 'letter') {
        const lettersUnlocked = [...store.lettersUnlocked()]
        lettersUnlocked[unlockTarget.index] = false;
        patchState(store, {lettersUnlocked});
      } else if (unlockTarget.type === 'hint') {
        patchState(store, {unlockedHint: unlockTarget.index - 1});
      }
    }
  })),
  withHooks({
    onInit(store) {
      const savedState = window.sessionStorage.getItem('code-cryptex-progress');
      if (savedState) {
        const parsedState: ProgressState = JSON.parse(savedState);
        patchState(store, parsedState);
      }
      effect(() => {
        const state = getState(store);
        window.sessionStorage.setItem('code-cryptex-progress', JSON.stringify(state));
      });
    }
  }),
);
