import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DashboardComponent } from './skyjo/dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewGameComponent } from './skyjo/new-game/new-game.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CurrentGameComponent, AddRoundValidate } from './skyjo/current-game/current-game.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ScoresComponent } from './skyjo/scores/scores.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { PaleoDashboardComponent } from './paleo/paleo-dashboard/paleo-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewGameComponent,
    AddRoundValidate,
    ToolbarComponent,
    CurrentGameComponent,
    ScoresComponent,
    MainDashboardComponent,
    PaleoDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatSliderModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase, 'scoreboard-47ae9'),
    AngularFirestoreModule,
    MatTabsModule,
    MatExpansionModule
  ],
  providers: [DashboardComponent, NewGameComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
