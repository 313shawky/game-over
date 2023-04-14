import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../services/games.service';
import { Game } from '../game';

@Component({
  selector: 'app-gamedetails',
  templateUrl: './gamedetails.component.html',
  styleUrls: ['./gamedetails.component.css']
})
export class GamedetailsComponent implements OnInit{

  constructor(private _ActivatedRoute:ActivatedRoute, private _GamesService:GamesService) {}

  gameId:any = '';
  isLoading:boolean = false;
  videoLink:string = '';
  
  gameDetails:Game = {
    id:0,
    title:'',
    thumbnail:'',
    short_description:'',
    description:'',
    game_url:'',
    genre:'',
    platform:'',
    publisher:'',
    developer:'',
    release_date:'',
    freetogame_profile_url:'',
    minimum_system_requirements:{
        os:'',
        processor:'',
        memory:'',
        graphics:'',
        storage:''
    },
    screenshots:[]
  };

  ngOnInit(): void {
    this.isLoading = true;
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.gameId = params.get('id');
        this.videoLink = `https://www.freetogame.com/g/${this.gameId}/videoplayback.webm`     
      }
    });

    this._GamesService.getGameDetails(this.gameId).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.gameDetails = res
      }
    });
  }

}
