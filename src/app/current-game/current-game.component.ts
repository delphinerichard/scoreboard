import { Location } from '@angular/common';
import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';

export interface Round {
  round_id: number;
  player1: number;
  player2?: number;
  player3?: number;
  player4?:number;
  player5?: number;
}

export interface PlayerData {
  player1: string;
  player2: string;
  player3?: string;
  player4?: string;
  player5?: string;
  nbPlayers: number;
}

export interface NewRoundData {
  player1: {name: string; score: number};
  player2: {name: string; score: number};
  player3?: {name: string; score: number};
  player4?: {name: string; score: number};
  player5?: {name: string; score: number};
}


@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.css']
})
export class CurrentGameComponent implements OnInit {

  constructor(public dialog: MatDialog, private store: AngularFirestore, private dashboardComponent: DashboardComponent) { 
    // let data: any = this.location.getState();
    const data = JSON.parse(localStorage.getItem('playerList') || '{}') 
    if(data.player1 === undefined || data.player1 === ''){
      this.dashboardComponent.selectedIndex = 0;
      this.dashboardComponent.activate = false;
    }else{
      this.dashboardComponent.selectedIndex = 1;
      this.dashboardComponent.activate = true;
    }
    this.players = data;
    this.nbPlayers = data.nbPlayers;
    localStorage.setItem('playerList', JSON.stringify(this.players));
    this.rounds = JSON.parse(localStorage.getItem('roundList') || '[]') 
    this.columns = this.setColumns();
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.displayedFormColumns = this.columns.map(c => c.formDef);
  }

  ngOnInit()  { 
  }

  
  player1Value = '';
  player2Value = '';
  player3Value = '';
  player4Value = '';
  player5Value = '';

  scorePlayer1!: number;
  scorePlayer2!: number;
  scorePlayer3!: number;
  scorePlayer4!: number;
  scorePlayer5!: number;


  rounds: Round[] = [];

  players: PlayerData;
  nbPlayers: number;
  columns;
  displayedColumns;
  displayedFormColumns;

  @ViewChild(MatTable)
  table!: MatTable<Round>;


  newGame(fromSave: boolean){
    if(!fromSave){    
      if (window.confirm("Créer une nouvelle partie ? \nCette action supprimera la partie en cours.")){
        localStorage.clear();
        this.dashboardComponent.selectedIndex = 0;
        this.dashboardComponent.activate = false;
      }
    }
  }

  getTotal(player: number) {
    if(this.rounds.length === 0 || player > this.nbPlayers){
      return null;
    }

    switch (player){
      case 1: return this.rounds.map(t => t.player1).reduce((acc, value) => acc + value, 0); break;
      case 2: 
        let totalPlayer2 = 0;
        this.rounds.forEach((round) => {
          if(round.player2){
            totalPlayer2 += round.player2;
          }
        });
        return totalPlayer2
        break;
      case 3: 
        let totalPlayer3 = 0;
        this.rounds.forEach((round) => {
          if(round.player3){
            totalPlayer3 += round.player3;
          }
        });
        return totalPlayer3
      case 4: 
        let totalPlayer4 = 0;
        this.rounds.forEach((round) => {
          if(round.player4){
            totalPlayer4 += round.player4;
          }
        });
        return totalPlayer4
      case 5: 
          let totalPlayer5 = 0;
          this.rounds.forEach((round) => {
            if(round.player5){
              totalPlayer5 += round.player5;
            }
          });
          return totalPlayer5
      default: return 0
    }
  }

  setColumns(){
    const finalColumns: any[] = [];
    const tempColumns = [
      {
        columnDef: 'round',
        formDef: 'newRound',
        header: 'Round',
        cell: (element: Round) => `${element.round_id}`,
        footer: () => 'Total'
      },
      {
        columnDef: 'player1',
        formDef: 'player1Form',
        header: this.players.player1,
        cell: (element: Round) => `${element.player1}`,
        footer: () => this.getTotal(1)
      },
      {
        columnDef: 'player2',
        formDef: 'player2Form',
        header: this.players.player2,
        cell: (element: Round) => `${element.player2}`,
        footer: () => this.getTotal(2)
      },
      {
        columnDef: 'player3',
        formDef: 'player3Form',
        header: this.players.player3,
        cell: (element: Round) => `${element.player3}`,
        footer: () => this.getTotal(3)
      },
      {
        columnDef: 'player4',
        formDef: 'player4Form',
        header: this.players.player4,
        cell: (element: Round) => `${element.player4}`,
        footer: () => this.getTotal(4)
      },
      {
        columnDef: 'player5',
        formDef: 'player5Form',
        header: this.players.player5,
        cell: (element: Round) => `${element.player5}`,
        footer: () => this.getTotal(5)
      },
    ];
    tempColumns.forEach((col, i) => {
      if(i < this.nbPlayers + 1 ){
        finalColumns.push(col)
      }
    });
    return finalColumns;
  }

  correctInputFormat(){
    switch(this.nbPlayers){
      case 2: return this.scorePlayer1 && this.scorePlayer2;
      case 3: return this.scorePlayer1 &&  this.scorePlayer2 && this.scorePlayer3;
      case 4: return this.scorePlayer1 &&  this.scorePlayer2 && this.scorePlayer3 && this.scorePlayer4;
      case 5: return this.scorePlayer1 &&  this.scorePlayer2 && this.scorePlayer3 && this.scorePlayer4 && this.scorePlayer5;
      default: return false;
    }
  }

  addRound(){

    this.scorePlayer1 = parseInt(this.player1Value);
    this.scorePlayer2 = parseInt(this.player2Value);
    this.scorePlayer3 = parseInt(this.player3Value);
    this.scorePlayer4 = parseInt(this.player4Value);
    this.scorePlayer5 = parseInt(this.player5Value);

    if( this.correctInputFormat() ){

      const player1 = (this.nbPlayers >= 1)? {name: this.players.player1, score: this.scorePlayer1} : null;
      const player2 = (this.nbPlayers >= 2)? {name: this.players.player2, score: this.scorePlayer2} : null;
      const player3 = (this.nbPlayers >= 3)? {name: this.players.player3, score: this.scorePlayer3} : null;
      const player4 = (this.nbPlayers >= 4)? {name: this.players.player4, score: this.scorePlayer4} : null;
      const player5 = (this.nbPlayers >= 5)? {name: this.players.player5, score: this.scorePlayer5} : null;

      const dialogRef = this.dialog.open(AddRoundValidate, {
        width: '500px',
        data: {
          player1: player1,
          player2: player2,
          player3: player3, 
          player4: player4,
          player5!: player5
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.rounds.push(
            {
              round_id: this.rounds.length + 1,
              player1: this.scorePlayer1,
              player2: this.scorePlayer2,
              player3: this.scorePlayer3,
              player4: this.scorePlayer4,
              player5: this.scorePlayer5
            }
          );
          localStorage.setItem('roundList', JSON.stringify(this.rounds));
          this.columns = this.setColumns();
          this.table.renderRows();
          this.player1Value = '';
          this.player2Value = '';
          this.player3Value = '';
          this.player4Value = '';
          this.player5Value = '';
        }
      });
    }
  }

  async saveGame(){
    if (window.confirm("Enregistrer la partie ? \nCette action est irréversible.")){
    let playersToSave: (string|undefined)[] = []
    switch (this.players.nbPlayers){
      case 2: playersToSave = [this.players.player1, this.players.player2]; break;
      case 3: playersToSave = [this.players.player1, this.players.player2, this.players.player3]; break;
      case 4: playersToSave = [this.players.player1, this.players.player2, this.players.player3, this.players.player4]; break;
      case 5: playersToSave = [this.players.player1, this.players.player2, this.players.player3, this.players.player4, this.players.player5]; break;
    }
    const total = this.computeTotal();
    const item = {
      players: playersToSave,
      nbPlayers: this.players.nbPlayers,
      nbRounds: this.rounds.length,
      rounds: this.rounds,
      total: total,
      winner: this.computeWinner(total)
    }
    this.store.collection('games').add(item);
    this.newGame(true);
  }
  }


  computeTotal(){
    let total: number[] = [];
    for(let i = 0; i<this.nbPlayers; i++){
      const totalByPlayer = this.getTotal(i+1) || 0;
      total.push(totalByPlayer)
    }
    return total
  }

  computeWinner(total: number[]){
    const idWinner = total.indexOf(Math.min(...total));
    switch (idWinner){
      case 0: return this.players.player1;
      case 1: return this.players.player2;
      case 2: return this.players.player3;
      case 3: return this.players.player4;
      case 4: return this.players.player5;
      default: return '';
    }
  }

}



@Component({
  selector: 'addRoundValidate',
  templateUrl: './addRoundValidate.html',
})
export class AddRoundValidate {
  constructor(
    public dialogRef: MatDialogRef<AddRoundValidate>,
    @Inject(MAT_DIALOG_DATA) public data: NewRoundData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}