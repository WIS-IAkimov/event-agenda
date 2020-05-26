import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';


@Component({
  templateUrl: './event.view.html',
  styleUrls: ['./event.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-block container-fluid',
  },
})
export class EventView implements OnInit {

  public queryParams$: Observable<Params>;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.queryParams$ = this._activatedRoute.queryParams;
  }

}
