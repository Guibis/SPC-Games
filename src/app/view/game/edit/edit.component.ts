import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Game } from 'src/app/interfaces/game';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {

  id!: number;
  game!: Game;
  form!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['gameId'];
    this.gameService.find(this.id).subscribe((data: Game) => {
      this.game = data;
    });

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.gameService.update(this.id, this.form.value).subscribe((res: any) => {
      this.snackBar.open('Jogo atualizado com sucesso.', 'OK', {
        duration: 3000,
      });
      this.router.navigateByUrl('game/index');
    });
  }
}
