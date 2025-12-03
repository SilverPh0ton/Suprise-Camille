import {patchState, signalStore, withComputed, withMethods, withState,} from '@ngrx/signals';
import {MemoryCardType} from './memory-card.type';
import {addEntities, updateAllEntities, updateEntity, withEntities} from '@ngrx/signals/entities';
import {gameDataFactory} from './game-data';
import {computed} from '@angular/core';

export const MemoryCardsStore = signalStore(
  withEntities<MemoryCardType>(),
  withState({nbrOfCardFlipped: 0}),
  withComputed(({entities, nbrOfCardFlipped}) => {
    const nbrOfCards = computed(() => entities().length);
    const nbrOfOpenedCards = computed(() => entities().filter(card => card.isOpen).length);
    const nbrOfResolvedCards = computed(() => entities().filter(card => card.isResolved).length);
    const progressPercentage = computed(() => Math.round(nbrOfResolvedCards() / nbrOfCards() * 100));
    const nbrOfAttempt = computed(() => Math.floor(nbrOfCardFlipped() / 2));

    return {
      nbrOfCards,
      nbrOfOpenedCards,
      nbrOfResolvedCards,
      progressPercentage,
      nbrOfAttempt
    }

  }),
  withMethods((store) => ({
    initGameData(sources: string[]): void {
      patchState(store, addEntities(gameDataFactory(sources)));
    },
    flipCard(memoryCard: MemoryCardType): void {
      if (store.nbrOfOpenedCards() > 1) return;

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
    },
  }))
);
