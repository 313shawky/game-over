import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { Game } from '../game';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _GamesService: GamesService, private _Router: Router) { }

  games: Game[] = [];

  ngOnInit(): void {
    this._GamesService.getGamesSortedBy('popularity').subscribe({
      next: (res) => {
        this.games = res.slice(0, 3);
      }
    })
  }

  goToGames() {
    this._Router.navigate(['/games/all'])
  }
}
