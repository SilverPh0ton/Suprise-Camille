import { Routes } from '@angular/router';
import {WordScramble} from '../components/word-scramble/word-scramble';
import {MemoryCardGame} from '../components/memory-card/game/memory-card-game';

export const routes: Routes = [
  { path: 'memory-card', component: MemoryCardGame }, // Default route
  { path: 'word-scramble', component: WordScramble },
];
