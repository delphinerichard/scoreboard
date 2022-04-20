import { Location } from '@angular/common';
import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

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
}

export interface NewRoundData {
  player1: {name: string; score: number};
  player2: {name: string; score: number};
  player3?: {name: string; score: number};
  player4?: {name: string; score: number};
  player5?: {name: string; score: number};
}

export interface GameData {
  players: string[];
  nbPlayers: number;
  nbRounds: number;
  rounds: number[][];
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog, private location: Location, private router: Router) { 
    let data: any = this.location.getState();
    if(data.player1 === undefined){
      const list = JSON.parse(localStorage.getItem('playerList') || '{}') 
      if( list === JSON.parse('{}')){
        this.router.navigateByUrl('/newGame')
      }else{
        data = list;
      }
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

  rounds: Round[] = [];

  players: PlayerData;
  nbPlayers: number;
  columns;
  displayedColumns;
  displayedFormColumns;

  @ViewChild(MatTable)
  table!: MatTable<Round>;

  newGame(){
    localStorage.clear();
    this.router.navigateByUrl('/newGame')
  }

  getTotalCost(player: number) {
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
        footer: () => this.getTotalCost(1)
      },
      {
        columnDef: 'player2',
        formDef: 'player2Form',
        header: this.players.player2,
        cell: (element: Round) => `${element.player2}`,
        footer: () => this.getTotalCost(2)
      },
      {
        columnDef: 'player3',
        formDef: 'player3Form',
        header: this.players.player3,
        cell: (element: Round) => `${element.player3}`,
        footer: () => this.getTotalCost(3)
      },
      {
        columnDef: 'player4',
        formDef: 'player4Form',
        header: this.players.player4,
        cell: (element: Round) => `${element.player4}`,
        footer: () => this.getTotalCost(4)
      },
      {
        columnDef: 'player5',
        formDef: 'player5Form',
        header: this.players.player5,
        cell: (element: Round) => `${element.player5}`,
        footer: () => this.getTotalCost(5)
      },
    ];
    tempColumns.forEach((col, i) => {
      if(i < this.nbPlayers + 1 ){
        finalColumns.push(col)
      }
    });
    return finalColumns;
  }

  addRound(){

    const player1 = (this.nbPlayers >= 1)? {name: this.players.player1, score: this.player1Value} : null;
    const player5 = (this.nbPlayers >= 5)? {name: this.players.player5, score: this.player5Value} : null;

    const dialogRef = this.dialog.open(AddRoundValidate, {
      width: '500px',
      data: {
        player1: {name: this.players.player1, score: this.player1Value},
        player2: {name: this.players.player2, score: this.player2Value},
        player3: {name: this.players.player3, score: this.player3Value}, 
        player4: {name: this.players.player4, score: this.player4Value},
        player5!: player5
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.rounds.push(
          {
            round_id: this.rounds.length + 1,
            player1: parseInt(this.player1Value),
            player2: parseInt(this.player2Value),
            player3: parseInt(this.player3Value),
            player4: parseInt(this.player4Value),
            player5: parseInt(this.player5Value)
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
    })
  }
}



@Component({
  selector: 'addRoundValidate',
  templateUrl: 'addRoundValidate.html',
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