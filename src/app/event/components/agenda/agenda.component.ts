import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges, OnDestroy,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

import { differenceInDays } from 'date-fns';

import { EventStoreService } from '../../services/event-store.service';
import { Session } from '../../models';


interface ISessionGroup {
  startedAt: Date;
  sessions: Session[];
}


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaComponent implements OnChanges, OnInit, OnDestroy {

  @Input()
  public search: string;

  public readonly groups$ = new BehaviorSubject<ISessionGroup[]>([]);

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _eventService: EventStoreService,
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.search.firstChange) {
      this._getSessions(this.search);
    }
  }

  public ngOnInit(): void {
    this._getSessions(this.search);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public trackById(index: number, item: Session): string {
    return item.id;
  }

  private _getSessions(search?: string): void {
    this._eventService.getSessions(search)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((sessions) => {
        const days = sessions
          .map((item) => item.startedAt)
          .reduce((acc: Date[], value: Date) => {
            const index = acc.findIndex((item) => differenceInDays(item, value) === 0);

            return index === -1 ? [...acc, value] : acc;
          }, []);

        const groups: ISessionGroup[] = days.map((day: Date) => {
          return {
            startedAt: day,
            sessions: sessions.filter((session) => differenceInDays(day, session.startedAt) === 0),
          };
        });

        this.groups$.next(groups);
      });
  }

}
