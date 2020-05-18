import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Speaker } from '../../models';
import { EventStoreService } from '../../services/event-store.service';


@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-flex align-items-center',
  },
})
export class SpeakerComponent {

  @Input()
  set speakerIds(value: string) {
    this.speaker = this._eventSoreService.getSpeaker(value);
  }

  public speaker: Speaker;

  constructor(
    private readonly _eventSoreService: EventStoreService,
  ) { }

}
