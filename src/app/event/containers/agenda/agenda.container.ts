import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { EventStoreService } from '../../services/event-store.service';
import { Session } from '../../models/session.model';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.container.html',
  styleUrls: ['./agenda.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaContainer implements OnInit {

  public sessions$: Observable<Session[]>;

  constructor(
    private _eventService: EventStoreService,
  ) { }

  public ngOnInit() {
    this.sessions$ = this._eventService.sessions$;
    this._eventService.getEvent().subscribe();
  }

}
