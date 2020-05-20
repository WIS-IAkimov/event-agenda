import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';


@Component({
  selector: 'app-event',
  templateUrl: './event.view.html',
  styleUrls: ['./event.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-block container-fluid',
  },
})
export class EventView implements OnInit {

  public search$: Observable<string>;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit() {
    this.search$ = this._activatedRoute
      .queryParams
      .pipe(
        pluck('search'),
      );
  }

}
