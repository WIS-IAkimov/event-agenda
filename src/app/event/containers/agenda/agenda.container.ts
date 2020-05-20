import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

import { EventStoreService } from '../../services/event-store.service';
import { Session } from '../../models';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.container.html',
  styleUrls: ['./agenda.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaContainer implements OnChanges, OnInit {

  @Input()
  public search: string;

  public readonly sessions$ = new BehaviorSubject<Session[]>([]);

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _eventService: EventStoreService,
  ) { }

  public ngOnChanges(changes: SimpleChanges) {
    if (!changes.search.firstChange) {
      this._getSessions(this.search);
    }
  }

  public ngOnInit() {
    this._getSessions(this.search);
  }

  private _getSessions(search?: string) {
    this._eventService.getSessions(search)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((sessions) => {
        this.sessions$.next(sessions);
      });

  }

}
