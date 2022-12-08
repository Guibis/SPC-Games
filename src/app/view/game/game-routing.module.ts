import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'game', redirectTo: 'game/index', pathMatch: 'full'},
  { path: 'game/index', component: IndexComponent },
  { path: 'game/:gameId/view', component: ViewComponent },
  { path: 'game/create', component: CreateComponent },
  { path: 'game/:gameId/edit', component: EditComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
