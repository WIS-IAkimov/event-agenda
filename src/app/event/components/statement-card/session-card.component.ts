import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Session } from '../../models';


@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-block card',
  },
})
export class SessionCardComponent implements OnInit {

  @Input()
  public session: Session;

  constructor() { }

  public ngOnInit() {}

}
