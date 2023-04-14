import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { Game } from '../game';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor(private _GamesService: GamesService, private _ActivatedRoute: ActivatedRoute) { }

  games: Game[] = [];
  showMoreCount: number = 20;


  ngOnInit(): void {

    console.log(this._ActivatedRoute.url.subscribe({
      next: (result) => {
        if (result[0].path == 'all') {
          this._GamesService.getAllGames().subscribe({
            next: (res) => this.games = res
          })
        }
        else if (result[0].path == 'platforms') {
          this._GamesService.getGamesByPlatform(result[1].path).subscribe({
            next: (res) => this.games = res
          })
        }
        else if (result[0].path == 'sort-by') {
          this._GamesService.getGamesSortedBy(result[1].path).subscribe({
            next: (res) => this.games = res
          })
        }
        else if (result[0].path == 'categories') {
          this._GamesService.getGamesByCategory(result[1].path).subscribe({
            next: (res) => this.games = res
          })
        }
      }
    }));
    
  }

  showMore() {
    this.showMoreCount += 20;
  }

}
