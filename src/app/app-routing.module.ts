import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { GamesComponent } from './games/games.component';
import { AuthenticationGuard } from './authentication.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { GamedetailsComponent } from './gamedetails/gamedetails.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthenticationGuard], component: HomeComponent },
  { path: 'games', children: [
    { path: 'all', canActivate: [AuthenticationGuard], component:GamesComponent },
    { path: 'platforms/:r', canActivate: [AuthenticationGuard], component:GamesComponent },
    { path: 'sort-by/:r', canActivate: [AuthenticationGuard], component:GamesComponent },
    { path: 'categories/:r', canActivate: [AuthenticationGuard], component:GamesComponent }
  ] },
  { path: 'gamedetails/:id', canActivate: [AuthenticationGuard], component:GamedetailsComponent },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'games', canActivate: [AuthenticationGuard], component: GamesComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
