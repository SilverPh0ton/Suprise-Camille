import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  Router,
  RouterStateSnapshot,
  Routes,
  UrlTree
} from '@angular/router';
import {WordScrambleGame} from '../games/word-scramble/components/game/word-scramble-game.component';
import {MemoryCardGame} from '../games/memory-card/components/game/memory-card-game';
import {Lobby} from '../lobby/lobby/lobby';
import {inject} from '@angular/core';
import {ProgressStore} from '../lobby/progress.state';

export const targetSelectedGuard: CanActivateChildFn = (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const progressStore = inject(ProgressStore);
  const router: Router = inject(Router);

  const urlTree: UrlTree = router.parseUrl('/');
  return progressStore.hasTarget() ? true : urlTree;
};

export const routes: Routes = [
  {path: '', component: Lobby},
  {path: 'memory-card/:set', canActivate: [targetSelectedGuard], component: MemoryCardGame},
  {path: 'word-scramble/:set', canActivate: [targetSelectedGuard], component: WordScrambleGame},
];
