import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {WordScrambleStore} from '../../state/word-scramble.state';
import {GameHeader} from '../../../header/game-header.component';

@Component({
  selector: 'word-scramble',
  imports: [
    FormsModule,
    InputText,
    Button,
    RouterLink,
    GameHeader
  ],
  templateUrl: './word-scramble-game.component.html'
})
export class WordScrambleGame implements OnInit {
  protected wordScrambleStore = inject(WordScrambleStore);
  protected route = inject(ActivatedRoute);

  private setId: number = 1;
  private sourcesMap: Record<number, string[]> = {
    1: ['loup', 'cerf', 'requin', 'souris', 'girafe', 'moustique', 'mouche', 'morue'],
    2: ['pain', 'amande', 'champignon', 'aubergine', 'brocoli', 'fromage', 'poivron', 'agrumes'],
    3: ['camion', 'train', 'tricycle', 'radeau', 'dirigeable', 'tramway', 'hydravion', 'snowboard'],
    4: ['mari', 'neveu', 'jumelle', 'cousine', 'soeur', 'gendre', 'tante', 'enfant'],
    5: ['chef', 'plombier', 'opticienne', 'astronome', 'musicienne', 'chimiste', 'forgeron', 'psychologue'],
    6: ['peau', 'visage', 'poignet', 'abdomen', 'jambe', 'estomac', 'poitrine', 'cuisse']
  }

  private categoryMap: Record<number, string> = {
    1: 'Animaux',
    2: 'Nouritures',
    3: 'Transports',
    4: 'Famille',
    5: 'Professions',
    6: 'Coprs humain',
  }
  protected value = signal('');
  protected wrongAnswer = signal(false);

  protected currentCategory = computed(() =>
    this.categoryMap[this.setId]
  );

  protected scrambleLetters = computed(() => {
      const answerLetter = this.wordScrambleStore.currentQuestion().split('');
      let typedLetter = this.value().toLowerCase().split('');

      return answerLetter.map((letter: string) => {
        const matchingIndex = typedLetter.indexOf(letter);
        if (matchingIndex === -1) {
          return {
            letter: letter.toUpperCase(),
            isTyped: false
          }
        } else {
          typedLetter.splice(matchingIndex, 1);
          return {
            letter: letter.toUpperCase(),
            isTyped: true
          }
        }
      })

      //return this.wordScrambleStore.currentQuestion().toUpperCase().split('').join('  ')
    }
  );

  protected isGuessLongEnough = computed(() =>
    this.wordScrambleStore.currentQuestion().length === this.value().length
  );

  public ngOnInit() {
    this.setId = Number(this.route.snapshot.paramMap.get('set'));
    this.wordScrambleStore.initGameData(this.sourcesMap[this.setId]);
  }

  protected resetGame(): void {
    this.wordScrambleStore.resetGame(this.sourcesMap[this.setId]);
  }

  protected submit() {
    const isValid = this.wordScrambleStore.submitAnswer(this.value())
    if (isValid) {
      this.wrongAnswer.set(false);
      this.value.set('')
    } else {
      this.wrongAnswer.set(true);
      setTimeout(() => {
        this.wrongAnswer.set(false);
      }, 1000);
    }
  }
}
