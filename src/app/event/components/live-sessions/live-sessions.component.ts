import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { Statement } from '../../models';
import { EventStoreService } from '../../services/event-store.service';


@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveSessionsComponent implements OnInit {

  public readonly statements$: Observable<Statement[]>;

  constructor(
    private readonly _eventService: EventStoreService,
  ) {
    this.statements$ = this._eventService.getLiveStatements();
  }


}
