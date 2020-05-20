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
import { Statement } from '../../models';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.container.html',
  styleUrls: ['./agenda.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaContainer implements OnChanges, OnInit {

  @Input()
  public search: string;

  public readonly statements$ = new BehaviorSubject<Statement[]>([]);

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _eventService: EventStoreService,
  ) { }

  public ngOnChanges(changes: SimpleChanges) {
    if (!changes.search.firstChange) {
      this._getStatements(this.search);
    }
  }

  public ngOnInit() {
    this._getStatements(this.search);
  }

  private _getStatements(search?: string) {
    this._eventService.getStatements(search)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((statements) => {
        this.statements$.next(statements);
      });

  }

}
