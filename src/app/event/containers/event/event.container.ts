import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
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
export class EventContainer implements OnInit {

  @Input()
  public search: string;

  public event$: Observable<Event>;

  constructor(
    private readonly _eventService: EventStoreService,
  ) { }

  public ngOnInit() {
    this.event$ = this._eventService.getEvent();
  }

}
