import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface GameData {
  players: string[];
  nbPlayers: number;
  nbRounds: number;
  rounds: Round[];
  total: number[];
  winner: string;
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

  constructor(private store: AngularFirestore) { }

  ngOnInit(): void {

    const test = this.store.collection('games').valueChanges() as Observable<GameData[]>;
    test.subscribe((o) => this.testData = o);
  }
  

  testData: GameData[] = [
    {
      players: ['Delphine', 'Jérémie'],
      nbPlayers: 2,
      nbRounds: 4,
      rounds: [
        {
          round_id: 1,
          player1: 12,
          player2: 13
        },
        {
          round_id: 2,
          player1: 5,
          player2: 6
        },
        {
          round_id: 3,
          player1: 9,
          player2: 6
        },
        {
          round_id: 4,
          player1: 14,
          player2: 15
        },
      ],
      total: [4, 5],
      winner: 'Delphine'
    },
    {
      players: ['Delphine', 'Jérémie', 'Thomas'],
      nbPlayers: 3,
      nbRounds: 4,
      rounds: [
        {
          round_id: 1,
          player1: 12,
          player2: 13,
          player3: 5
        },
        {
          round_id: 2,
          player1: 5,
          player2: 6,
          player3: 5,
        },
        {
          round_id: 3,
          player1: 9,
          player2: 6,
          player3: 4
        },
        {
          round_id: 4,
          player1: 14,
          player2: 15,
          player3: 12
        },
      ],
      total: [4, 5, 6], 
      winner: 'Toto'
    },
    {
      players: ['Delphine', 'Jérémie', 'Thomas', 'Zoé'],
      nbPlayers: 4,
      nbRounds: 4,
      rounds: [
        {
          round_id: 1,
          player1: 12,
          player2: 13,
          player3: 5, 
          player4: 12
        },
        {
          round_id: 2,
          player1: 5,
          player2: 6,
          player3: 5, 
          player4: 14
        },
        {
          round_id: 3,
          player1: 9,
          player2: 6,
          player3: 4, 
          player4: 17
        },
        {
          round_id: 4,
          player1: 14,
          player2: 15,
          player3: 12, 
          player4: 0
        },
      ],
      total: [4, 5, 6, 7],
      winner: 'tata'
    },
  ]

  displayedColumns(nbPlayers: number) {
    switch (nbPlayers){
      case 1: return ["round_id", "player1"];
      case 2: return ["round_id", "player1", "player2"];
      case 3: return ["round_id", "player1", "player2", "player3"];
      case 4: return ["round_id", "player1", "player2", "player3", "player4"];
      case 5: return ["round_id", "player1", "player2", "player3", "player4", "player5"];
      default: return [];
    }
  }
}
