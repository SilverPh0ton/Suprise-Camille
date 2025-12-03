import {Routes} from '@angular/router';
import {WordScramble} from '../games/word-scramble/word-scramble';
import {MemoryCardGame} from '../games/memory-card/components/game/memory-card-game';

export const routes: Routes = [
  {path: 'memory-card', component: MemoryCardGame}, // Default route
  {path: 'word-scramble', component: WordScramble},
];
