import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Game } from 'src/app/interfaces/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {

  games: Game[] = [];

  constructor(
    private gameService: GameService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.gameService.getAll().subscribe((data: Game[]) => {
      this.games = data;
    });
  }

  deleteGame(id: number) {
    this.gameService.delete(id).subscribe((res) => {
      this.games = this.games.filter((item) => item.id !== id);
      this.snackBar.open('Jogo deletado com sucesso.', 'OK', {
        duration: 3000,
      });
    });
  }
}
