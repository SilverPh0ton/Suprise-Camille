import {patchState, signalStore, withComputed, withMethods,} from '@ngrx/signals';
import {MemoryCardType} from './memory-card.type';
import {addEntities, updateAllEntities, updateEntity, withEntities} from '@ngrx/signals/entities';

export const MemoryCardsStore = signalStore(
  withEntities<MemoryCardType>(),
  withComputed(({entities}) => ({
    nbrOfOpenCards: () => entities().filter(card => card.isOpen).length,
  })),
  withMethods((store) => ({
    initGameData(memoryCards: MemoryCardType[]): void {
      patchState(store, addEntities(memoryCards));
    },
    flipCard(memoryCard: MemoryCardType): void {
      if (store.nbrOfOpenCards() > 1) return;

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

      if (store.nbrOfOpenCards() > 1) {
        setTimeout(() => {
          patchState(store, updateAllEntities({isOpen: false}));
        }, 1000)
      }
    },

  }))
);
