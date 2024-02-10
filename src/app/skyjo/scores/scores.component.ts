import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface GameData {
  players: string[];
  nbPlayers: number;
  nbRounds: number;
  rounds: Round[];
  total: number[];
  winner: string;
  date: Timestamp;
}

export interface Round {
  round_id: number;
  scores: number[];
}

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  constructor(private store: AngularFirestore) { }

  ngOnInit(): void {

    const dataRef = this.store.collection<GameData>("skyjo", data => data.orderBy("date", "desc")).valueChanges() as Observable<GameData[]>;
    dataRef.subscribe((o) => this.data = o)
  }
  

  data: GameData[] = []

  displayedColumns(nbPlayers: number) {
    let columns = ["round_id"];
    for (let i = 1; i < nbPlayers + 1; i++){
      const name = "player"+i;
      columns.push(name);
    }
    return columns;
  }

  getDay(time: Timestamp){
    const current = new Date(time.seconds *1000);
    const currentDay = current.getDate();
    const currentMonth = current.getMonth() + 1;
    const currentYear = current.getFullYear();
    let month = "";
    switch (currentMonth){
        case 1: month = "Janvier"; break;
        case 2: month = "Février"; break;
        case 3: month = "Mars"; break;
        case 4: month = "Avril"; break;
        case 5: month = "Mai"; break;
        case 6: month = "Juin"; break;
        case 7: month = "Juillet"; break;
        case 8: month = "Août"; break;
        case 9: month = "Septembre"; break;
        case 10: month = "Octobre"; break;
        case 11: month = "Novembre"; break;
        case 12: month = "Décembre"; break;
        default: month = `${currentMonth}`;
    }
    return `${currentDay} ${month} ${currentYear}`;
  }

  counter(nbPlayers: number){
    if(nbPlayers){
      return new Array(nbPlayers);
    }else{
      return[]
    }
  }
}
