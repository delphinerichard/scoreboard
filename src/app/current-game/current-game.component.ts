import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DashboardComponent } from '../dashboard/dashboard.component';

export interface Round {
  round_id: number;
  scores: number[];
}
export interface PlayerData {
  nbPlayers: number;
  playersName: string[];
}
export interface NewRoundData {
  nbPlayers: number,
  playersName: string[],
  scores: number[]
}


@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.css']
})
export class CurrentGameComponent implements OnInit {

  constructor(public dialog: MatDialog, private store: AngularFirestore, private dashboardComponent: DashboardComponent) { 
    const data = JSON.parse(localStorage.getItem('playerList') || '{}') 
    if(data.playersName === undefined || data.playersName === []){
      this.dashboardComponent.selectedIndex = 0;
      this.dashboardComponent.activate = false;
    }else{
      this.dashboardComponent.selectedIndex = 1;
      this.dashboardComponent.activate = true;
    }
    this.players = data;
    localStorage.setItem('playerList', JSON.stringify(this.players));
    this.rounds = JSON.parse(localStorage.getItem('roundList') || '[]') 
    this.columns = this.setColumns();
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.displayedFormColumns = this.columns.map(c => c.formDef);
  }

  ngOnInit()  { 
  }

  

  playerScoreInput: string[] = [];
  scorePlayers: number[] = [];
  rounds: Round[] = [];
  players: PlayerData;
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
    localStorage.clear();
    this.dashboardComponent.selectedIndex = 2;
    this.dashboardComponent.activate = false;
  }

  getTotal(player: number) {
    if(this.rounds.length === 0 || player > this.players.nbPlayers){
      return 0;
    }
    let totalPlayer = 0;
    this.rounds.forEach((round) => {
      totalPlayer += round.scores[ player - 1 ];
    });
    return totalPlayer
  }

  counter(){
    if(this.players.nbPlayers){
      return new Array(this.players.nbPlayers);
    }else{
      return[]
    }
  }

  setColumns(){    
    const columns = [
      {
        columnDef: 'round',
        formDef: 'newRound',
        header: 'Round',
        cell: (element: Round) => `${element.round_id} `,
        footer: () => 'Total'
      }
    ];

    for (let i = 0; i < this. players.nbPlayers; i++ ){
      const columnDef: string = 'player' + i
      const columnDefForm: string = 'player' + i + 'Form'
      columns.push( 
        {
          columnDef: columnDef,
          formDef: columnDefForm,
          header: this.players.playersName[i],
          cell: (element: Round) => `${element.scores[i]}`,
          footer: () => this.getTotal(i+1).toString()
        }
      )
    }
    return columns;
  }

  correctInputFormat(): boolean{
    for (let i = 0; i < this.players.nbPlayers; i++){
      if(isNaN(this.scorePlayers[i])){
        return false;
      }
    }
    return true;
  }

  addRound(){

    this.scorePlayers = [];
    this.playerScoreInput.forEach((score) => {
      this.scorePlayers.push(parseInt(score))
    })

    if( this.correctInputFormat() ){

      const dialogRef = this.dialog.open(AddRoundValidate, {
        width: '500px',
        data: {
          nbPlayers: this.players.nbPlayers,
          playersName: this.players.playersName,
          scores: this.scorePlayers
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.rounds.push(
            {
              round_id: this.rounds.length + 1,
              scores: this.scorePlayers
            }
          );
          localStorage.setItem('roundList', JSON.stringify(this.rounds));
          this.columns = this.setColumns();
          this.table.renderRows();
          this.playerScoreInput = [];
        }
      });
    }
  }

  async saveGame(){
    if (window.confirm("Enregistrer la partie ? \nCette action est irréversible.")){
      let playersToSave: string[] = this.players.playersName;
      const total = this.computeTotal();
      const item = {
        players: playersToSave,
        nbPlayers: this.players.nbPlayers,
        nbRounds: this.rounds.length,
        rounds: this.rounds,
        total: total,
        winner: this.computeWinner(total),
        date: new Date()
      }
      this.store.collection('gamesData').add(item);
      this.newGame(true);
    }
  }

  computeTotal(){
    let total: number[] = [];
    for(let i = 0; i<this.players.nbPlayers; i++){
      const totalByPlayer = this.getTotal(i+1) || 0;
      total.push(totalByPlayer)
    }
    return total
  }

  computeWinner(total: number[]){
    const idWinner = total.indexOf(Math.min(...total));
    return this.players.playersName[idWinner];
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

  counter(){
    if(this.data.nbPlayers){
      return new Array(this.data.nbPlayers);
    }else{
      return[]
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}