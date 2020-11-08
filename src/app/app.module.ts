import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeMonkeyClubComponent } from './code-monkey-club/code-monkey-club.component';
import { CodeMonkeyNetworkComponent } from './code-monkey-network/code-monkey-network.component';
import { EntityCardComponent } from './entity-card/entity-card.component';
import { ExamplesComponent } from './examples/examples.component';
import { ImperativeProgrammingComponent } from './examples/imperative-programming/imperative-programming.component';
import { ObservableUnicastComponent } from './examples/observable-unicast/observable-unicast.component';
import { ReactiveProgrammingComponent } from './examples/reactive-programming/reactive-programming.component';
import { SubjectMulticastComponent } from './examples/subject-multicast/subject-multicast.component';
import { StatusBarComponent } from './status-bar/status-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    EntityCardComponent,
    CodeMonkeyNetworkComponent,
    CodeMonkeyClubComponent,
    StatusBarComponent,
    ExamplesComponent,
    ImperativeProgrammingComponent,
    ReactiveProgrammingComponent,
    ObservableUnicastComponent,
    SubjectMulticastComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    MatInputModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
