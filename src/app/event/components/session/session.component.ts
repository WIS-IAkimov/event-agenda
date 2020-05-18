import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Session } from '../../models/session.model';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-flex align-items-baseline',
  }
})
export class SessionComponent implements OnInit {

  @Input()
  public session: Session;

  constructor() { }

  ngOnInit(): void {
  }

}
