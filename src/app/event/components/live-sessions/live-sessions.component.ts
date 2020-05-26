import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { Session } from '../../models';
import { EventStoreService } from '../../services/event-store.service';


@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveSessionsComponent {

  public readonly sessions$: Observable<Session[]>;

  constructor(
    private readonly _eventService: EventStoreService,
  ) {
    this.sessions$ = this._eventService.getLiveSessions();
  }

  public trackById(index: number, item: Session): string {
    return item.id;
  }


}
