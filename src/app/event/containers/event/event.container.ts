import {
  Input,
  Component,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Params } from '@angular/router';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EventStoreService } from '../../services/event-store.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.container.html',
  styleUrls: ['./event.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-flex row',
  },
})
export class EventContainer implements OnChanges, OnDestroy {

  @Input()
  public queryParams: Params;

  private readonly _destroy$ = new Subject<void>();
  private readonly _event$ = new BehaviorSubject<Event>(null);

  constructor(
    private readonly _eventService: EventStoreService,
  ) { }

  get event$(): Observable<Event> {
    return this._event$.asObservable();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.queryParams?.event || !this.queryParams?.token) { return; }

    this._getEvent();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getEvent(): void {
    this._eventService
      .getEvent(this.queryParams.event, this.queryParams.token)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((event) => this._event$.next(event));
  }

}
