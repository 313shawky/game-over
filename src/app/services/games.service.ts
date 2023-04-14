import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from '../game';



@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private _HttpClient: HttpClient) { }

  apiHeaders: any = {
    'X-RapidAPI-Key': '0bd116ddafmshcb91bdd603052eep1ccecbjsnd047b1309f0d',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  };

  getAllGames(): Observable<Game[]> {
    return this._HttpClient.get<Game[]>('https://free-to-play-games-database.p.rapidapi.com/api/games',
      { headers: this.apiHeaders })
  }

  getGamesByPlatform(platform: string): Observable<Game[]> {
    return this._HttpClient.get<Game[]>(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`,
      { headers: this.apiHeaders })
  }

  getGamesSortedBy(sortBy: string): Observable<Game[]> {
    return this._HttpClient.get<Game[]>(`https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${sortBy}`,
      { headers: this.apiHeaders })
  }

  getGamesByCategory(category: string): Observable<Game[]> {
    return this._HttpClient.get<Game[]>(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      { headers: this.apiHeaders })
  }

  getGameDetails(id: any): Observable<Game> {
    return this._HttpClient.get<Game>(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      { headers: this.apiHeaders });
  }
}
