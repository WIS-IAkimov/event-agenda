import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventView } from './views/event';


const routes: Routes = [
  {
    path: '',
    component: EventView,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
