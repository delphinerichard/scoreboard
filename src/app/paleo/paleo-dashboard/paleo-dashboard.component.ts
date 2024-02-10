import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paleo-dashboard',
  templateUrl: './paleo-dashboard.component.html',
  styleUrls: ['./paleo-dashboard.component.css']
})
export class PaleoDashboardComponent implements OnInit {
    selectedIndex: number = (localStorage.getItem('playerList') === '{}') ? 1 : 0;
    activate: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
