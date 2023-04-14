import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { GamesService } from '../services/games.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _AuthenticationService: AuthenticationService, private _GamesService: GamesService) { }


  platforms: string[] = ['pc', 'browser'];
  sortByArr: string[] = ['release-date', 'popularity', 'alphabetical', 'relevance'];
  categories: string[] = ['racing', 'sports', 'social', 'shooter', 'open-world', 'zombie', 'fantasy', 'action-rpg', 'action', 'flight', 'battle-royale'];

  isLogin: boolean = false;

  ngOnInit(): void {
    this._AuthenticationService.userData.subscribe({
      next: () => {
        if (this._AuthenticationService.userData.getValue() !== null) {
          this.isLogin = true;
        }
        else {
          this.isLogin = false;
        }
      }
    })
  }

  logout() {
    this._AuthenticationService.logout();
  }

}
