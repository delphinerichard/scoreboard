import { Component, OnInit} from '@angular/core';
import {ChangeDetectorRef } from '@angular/core';

export interface PlayerData {
  player1: string;
  player2: string;
  player3?: string;
  player4?: string;
  player5?: string;
  nbPlayers: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(private cdref: ChangeDetectorRef) { 
    
  }

  selectedIndex: number = (localStorage.getItem('playerList') === '{}') ? 1 : 0;
  activate: boolean = false;
 

  ngOnInit()  { 
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

}