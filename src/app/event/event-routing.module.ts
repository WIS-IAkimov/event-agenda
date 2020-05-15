import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendaContainer } from './containers/agenda';


const routes: Routes = [
  {
    path: '',
    component: AgendaContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
