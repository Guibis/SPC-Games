import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {

  form!: FormGroup;

  constructor(
    private gameService: GameService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      namej: new FormControl('', [Validators.required]),
      desenvolvedora: new FormControl('', Validators.required),
      plataformas: new FormControl('', Validators.required),
      lancamento: new FormControl('', Validators.required),
      modo: new FormControl('', Validators.required),
      nota: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.gameService.create(this.form.value).subscribe((res: any) => {
      this.snackBar.open('Jogo salvo com sucesso.', 'OK', {
        duration: 3000,
      });
      this.router.navigateByUrl('game/index');
    });
  }
}
