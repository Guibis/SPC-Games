import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/interfaces/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  game!: Game;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute
   ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['gameId'];

    this.gameService.findById(this.id).subscribe((data: Game)=>{
      this.game = data;
    });
  }

}
