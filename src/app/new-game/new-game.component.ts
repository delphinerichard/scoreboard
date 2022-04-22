import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CurrentGameComponent } from '../current-game/current-game.component';

export interface PlayerData {
  player1: string;
  player2: string;
  player3?: string;
  player4?: string;
  player5?: string;
  nbPlayers: number;
}

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css'],
})
export class NewGameComponent implements OnInit {

  nbPlayersControl = new FormControl('', Validators.required);
  data: PlayerData = {
    player1: "",
    player2: "",
    nbPlayers: 2
  }

  constructor(private router: Router, public dashboardComponent: DashboardComponent) { }

  ngOnInit(): void {
    if(localStorage.getItem('playerList') !== null){
      this.dashboardComponent.activate = true;
      this.dashboardComponent.selectedIndex = 1;
    }
  }


  onClick(){
    if(this.checkData(parseInt(this.nbPlayersControl.value))){
      this.data = {...this.data, nbPlayers: parseInt(this.nbPlayersControl.value)}
      this.dashboardComponent.activate = true;
      this.dashboardComponent.selectedIndex = 1;

      localStorage.setItem('playerList', JSON.stringify(this.data));
    }
  }

  checkData(nbPlayers: number){
    switch(nbPlayers){
      case 2: return (this.data.player1 !== "" && this.data.player2 !== ""); 
      case 3: return (
        this.data.player1 !== "" && 
        this.data.player2 !== "" &&
        this.data.player3
      );
      case 4: return (
        this.data.player1 !== "" && 
        this.data.player2 !== "" &&
        this.data.player3 &&
        this.data.player4
      );
      case 5: return (
        this.data.player1 !== "" && 
        this.data.player2 !== "" &&
        this.data.player3 &&
        this.data.player4 &&
        this.data.player5 
      );
      default: return false;
    }
  }

}
