import { isAfter, isBefore } from 'date-fns';


interface ITrack {

  name: string;
  description: string;
  title: string;
  color: string;
}

interface IRoom {

  id: number;
  name: string;
  floor: string;
  number: string;
  capacity: string;
}

export class Session {

  public id: string;
  public name: string;
  public image: string;
  public abstract: string;
  public track: ITrack;
  public room: IRoom[];
  public check: number;
  public startedAt: Date;
  public endedAt: Date;
  public speakers: string[];
  public broadcastLink: string;

  public live: boolean;

  constructor(data: any) {
    this._fromJson(data);
  }

  private _fromJson(data: any): void {
    this.id = data.hasOwnProperty('id') ? data.id.toString() : this.id;
    this.name = data.hasOwnProperty('name') ? data.name : this.name;
    this.image = data.hasOwnProperty('image') ? data.image : this.image;
    this.abstract = data.hasOwnProperty('abstract') ? data.abstract : this.abstract;
    this.check = data.hasOwnProperty('check') ? data.check : this.check;
    this.track = data.hasOwnProperty('track') ? data.track : this.track;
    this.room = data.hasOwnProperty('room') ? data.room : this.room;
    this.broadcastLink = data.hasOwnProperty('broadcast') ? data.broadcast : this.broadcastLink;
    this.startedAt = data.hasOwnProperty('start_timestamp')
      ? new Date(data['start_timestamp'])
      : this.startedAt;
    this.endedAt = data.hasOwnProperty('end_timestamp')
      ? new Date(data['end_timestamp'])
      : this.endedAt;
    this.speakers = data.hasOwnProperty('speakers')
      ? data.speakers.map((id) => id.toString())
      : this.speakers;

    this.live = isAfter(new Date(), this.startedAt) && isBefore(new Date(), this.endedAt);
  }

}
