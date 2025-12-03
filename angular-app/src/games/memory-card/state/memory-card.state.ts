import {patchState, signalStore, withComputed, withMethods,} from '@ngrx/signals';
import {MemoryCardType} from './memory-card.type';
import {addEntities, updateAllEntities, updateEntity, withEntities} from '@ngrx/signals/entities';
import {gameDataFactory} from './game-data';

export const MemoryCardsStore = signalStore(
  withEntities<MemoryCardType>(),
  withComputed(({entities}) => ({
    nbrOfOpenedCards: () => entities().filter(card => card.isOpen).length,
    nbrOfResolvedCards: () => entities().filter(card => card.isResolved).length,
  })),
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

      if (store.nbrOfOpenedCards() > 1) {
        setTimeout(() => {
          patchState(store, updateAllEntities({isOpen: false}));
        }, 700)
      }
    },
  }))
);
