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
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      namej: new FormControl('', [Validators.required]),
      descricao: new FormControl('', Validators.required),
      plataformas: new FormControl('', Validators.required),
      lancamento: new FormControl('', Validators.required),
      modo: new FormControl('', Validators.required),
      nota: new FormControl('', Validators.required),
    });
  }

  ngAfterViewInit() {
    this.load();
  }

  get f() {
    return this.form.controls;
  }

  load() {
    this.id = this.activatedRoute.snapshot.params['gameId'];
    this.gameService.findById(this.id).subscribe((data: Game) => {
      this.form.patchValue(data);
    });
  }

  submit() {
    this.gameService.update(this.form.value).subscribe((res: any) => {
      this.snackBar.open('Jogo atualizado com sucesso.', 'OK', {
        duration: 3000,
      });
      this.router.navigateByUrl('game/index');
    });
  }
}
