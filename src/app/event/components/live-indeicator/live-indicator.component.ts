import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-live-indicator',
  templateUrl: './live-indicator.component.html',
  styleUrls: ['./live-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'px-1',
  },
})
export class LiveIndicatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
