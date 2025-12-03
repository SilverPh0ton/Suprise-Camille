import {Routes} from '@angular/router';
import {WordScramble} from '../games/word-scramble/word-scramble';
import {MemoryCardGame} from '../games/memory-card/components/game/memory-card-game';
import {Lobby} from '../lobby/lobby';

export const routes: Routes = [
  {path: '', component: Lobby},
  {path: 'memory-card/:set', component: MemoryCardGame},
  {path: 'word-scramble', component: WordScramble},
];
