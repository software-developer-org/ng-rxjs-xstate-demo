import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeMonkeyClubComponent } from './code-monkey-club/code-monkey-club.component';
import { CodeMonkeyClubsComponent } from './code-monkey-clubs/code-monkey-clubs.component';
import { EntityCardComponent } from './entity-card/entity-card.component';

@NgModule({
  declarations: [
    AppComponent,
    EntityCardComponent,
    CodeMonkeyClubsComponent,
    CodeMonkeyClubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
