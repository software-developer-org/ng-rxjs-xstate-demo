import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeMonkeyClubComponent } from './code-monkey-club/code-monkey-club.component';
import { CodeMonkeyClubsComponent } from './code-monkey-clubs/code-monkey-clubs.component';

const routes: Routes = [
  { path: '', redirectTo: '/code-monkey-club', pathMatch: 'full' },
  { path: 'code-monkey-club', component: CodeMonkeyClubsComponent },
  { path: 'code-monkey-club/:id', component: CodeMonkeyClubComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
