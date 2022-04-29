import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';

export interface PlayerData {
  nbPlayers: number;
  playersName: string[];
}

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css'],
})
export class NewGameComponent implements OnInit {

  nbPlayersControl = new FormControl('', Validators.required);
  data: PlayerData = {
    nbPlayers: 2,
    playersName: []
  }

  constructor(public dashboardComponent: DashboardComponent) { }

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
  counter(){
    if(parseInt(this.nbPlayersControl.value)){
      return new Array(parseInt(this.nbPlayersControl.value));
    }else{
      return[]
    }
  }

  checkData(nbPlayers: number): boolean{

    for (let i =0; i< nbPlayers; i++){
      if (!this.data.playersName[i]){
        return false;
      }
    }
    return true;
  }

}
