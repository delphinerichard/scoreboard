import { Component, OnInit } from '@angular/core';

export interface GameData {
  id: number;
  players: string[];
  nbPlayers: number;
  nbRounds: number;
  rounds: number[][];
  total: number[];
}

export interface Round {
  round_id: number;
  player1: number;
  player2?: number;
  player3?: number;
  player4?:number;
  player5?: number;
}

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  panelOpenState = false;

  testData: GameData[] = [
    {
      id: 1,
      players: ['Delphine', 'Jérémie'],
      nbPlayers: 2,
      nbRounds: 4,
      rounds: [[12, 13], [5, 6], [9, 6], [14, 15]],
      total: [4, 5]
    },
    {
      id: 2,
      players: ['Delphine', 'Jérémie', 'Thomas'],
      nbPlayers: 3,
      nbRounds: 4,
      rounds: [[12, 13, 5], [5, 6, 5], [9, 6, 5], [14, 15, 5]],
      total: [4, 5, 6]
    },
    {
      id: 3,
      players: ['Delphine', 'Jérémie', 'Thomas', 'Zoé'],
      nbPlayers: 4,
      nbRounds: 4,
      rounds: [[12, 13, 5, 7], [5, 6, 5, 7], [9, 6, 5, 2], [14, 15, 5, 2]],
      total: [4, 5, 6, 7]
    },
  ]

  displayedColumns = ["player1"]

  // setColumns(){
  //   const finalColumns: any[] = [];
  //   const tempColumns = [
  //     {
  //       columnDef: 'round',
  //       formDef: 'newRound',
  //       header: 'Round',
  //       cell: (element: Round) => `${element.player1}`,
  //       footer: () => 'Total'
  //     },
  //     {
  //       columnDef: 'player1',
  //       formDef: 'player1Form',
  //       header: this.players.player1,
  //       cell: (element: Round) => `${element.player1}`,
  //     },
  //     {
  //       columnDef: 'player2',
  //       formDef: 'player2Form',
  //       header: this.players.player2,
  //       cell: (element: Round) => `${element.player2}`,
  //     },
  //     {
  //       columnDef: 'player3',
  //       formDef: 'player3Form',
  //       header: this.players.player3,
  //       cell: (element: Round) => `${element.player3}`,
  //     },
  //     {
  //       columnDef: 'player4',
  //       formDef: 'player4Form',
  //       header: this.players.player4,
  //       cell: (element: Round) => `${element.player4}`,
  //     },
  //     {
  //       columnDef: 'player5',
  //       formDef: 'player5Form',
  //       header: this.players.player5,
  //       cell: (element: Round) => `${element.player5}`,
  //     },
  //   ];
  //   tempColumns.forEach((col, i) => {
  //     if(i < this.testData[i].nbPlayers + 1 ){
  //       finalColumns.push(col)
  //     }
  //   });
  //   return finalColumns;
  // }

}
