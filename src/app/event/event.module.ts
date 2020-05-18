import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { AgendaContainer } from './containers/agenda';
import { SpeakerComponent } from './components/speaker';
import { StatementCardComponent } from './components/statement-card';


@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
  ],
  declarations: [
    AgendaContainer,
    SpeakerComponent,
    StatementCardComponent,
  ],
})
export class EventModule {}
