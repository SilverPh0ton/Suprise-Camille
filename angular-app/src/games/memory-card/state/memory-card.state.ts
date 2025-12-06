import {patchState, signalStore, withComputed, withMethods, withState,} from '@ngrx/signals';
import {MemoryCardType} from './memory-card.type';
import {setAllEntities, updateAllEntities, updateEntity, withEntities} from '@ngrx/signals/entities';
import {gameDataFactory} from './game-data';
import {computed, inject} from '@angular/core';
import {ProgressStore} from '../../../lobby/progress.state';

export const MemoryCardsStore = signalStore(
  {providedIn: 'root'},
  withEntities<MemoryCardType>(),
  withState({nbrOfCardFlipped: 0}),
  withComputed(({entities, nbrOfCardFlipped}) => {
    const nbrOfCards = computed(() => entities().length);
    const nbrOfOpenedCards = computed(() => entities().filter(card => card.isOpen).length);
    const nbrOfResolvedCards = computed(() => entities().filter(card => card.isResolved).length);
    const progressPercentage = computed(() => Math.round(nbrOfResolvedCards() / nbrOfCards() * 100));
    const nbrOfAttempt = computed(() => Math.floor(nbrOfCardFlipped() / 2));
    const isComplete = computed(() => progressPercentage() === 100);

    return {
      nbrOfCards,
      nbrOfOpenedCards,
      nbrOfResolvedCards,
      progressPercentage,
      nbrOfAttempt,
      isComplete
    }

  }),
  withMethods((store, progressStore = inject(ProgressStore)) => ({
    initGameData(sources: string[]): void {
      const initAlreadyResolved = progressStore.isCurrentTargetUnlocked();
      patchState(store, setAllEntities(gameDataFactory(sources, initAlreadyResolved)));
      patchState(store, {nbrOfCardFlipped: 0});
    },
    resetGame(sources: string[]): void {
      patchState(store, setAllEntities(gameDataFactory(sources)));
      patchState(store, {nbrOfCardFlipped: 0});
      progressStore.resetCurrentTarget();
    },
    flipCard(memoryCard: MemoryCardType): boolean {
      if (store.nbrOfOpenedCards() > 1) return false;

      const selectedCard = store.entityMap()[memoryCard.id];
      const matchingCard = store.entityMap()[selectedCard.matchID];
      if (matchingCard.isOpen) {
        patchState(
          store,
          updateEntity({id: matchingCard.id, changes: {isResolved: true}})
        )
      }

      patchState(
        store,
        updateEntity({
          id: memoryCard.id,
          changes: (memoryCard) => ({
            isOpen: !memoryCard.isOpen,
            isResolved: matchingCard.isOpen
          }),
        })
      );
      patchState(store, {nbrOfCardFlipped: store.nbrOfCardFlipped() + 1});

      if (store.nbrOfOpenedCards() > 1) {
        setTimeout(() => {
          patchState(store, updateAllEntities({isOpen: false}));
        }, 700)
      }

      if (store.isComplete()) {
        progressStore.unlockCurrentTarget()
        return true;
      }
      return false
    },
    completeGame(): void {
      patchState(store, updateAllEntities({isResolved: true}));
    },
  }))
);
