import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EventRoutingModule } from './event-routing.module';
import { AgendaContainer } from './containers/agenda';
import { SpeakerComponent } from './components/speaker';
import { StatementCardComponent } from './components/statement-card';
import { SessionComponent } from './components/session';
import { LiveIndicatorComponent } from './components/live-indeicator';
import { SearchComponent } from './components/search';
import { EventView } from './views/event';


@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EventView,
    AgendaContainer,
    SpeakerComponent,
    StatementCardComponent,
    SessionComponent,
    LiveIndicatorComponent,
    SearchComponent,
  ],
})
export class EventModule {}
