import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Session } from '../../models';


@Component({
  selector: 'app-statement-card',
  templateUrl: './statement-card.component.html',
  styleUrls: ['./statement-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-block',
  },
})
export class StatementCardComponent implements OnInit {

  @Input()
  public session: Session;

  constructor() { }

  public ngOnInit() {}

}
