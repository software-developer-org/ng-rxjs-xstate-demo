import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeMonkeyClubComponent } from './code-monkey-club/code-monkey-club.component';
import { CodeMonkeyNetworkComponent as CodeMonkeyNetworkComponent } from './code-monkey-network/code-monkey-network.component';
import { ExamplesComponent } from './examples/examples.component';

const routes: Routes = [
  { path: '', redirectTo: '/code-monkey-club', pathMatch: 'full' },
  { path: 'examples', component: ExamplesComponent },
  { path: 'code-monkey-club', component: CodeMonkeyNetworkComponent },
  { path: 'code-monkey-club/:id', component: CodeMonkeyClubComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
