export class Session {
  public id: string;
  public name: string;
  public image: string;
  public abstract: string;
  public check: number;
  public startTimestamp: Date;
  public endTimestamp: Date;
  public speakers: string[];

  constructor(data: any) {
   this._fromJson(data);
  }

  private _fromJson(data: any): void {
    this.id = data.hasOwnProperty('id') ? data.id.toString() : this.id;
    this.name = data.hasOwnProperty('name') ? data.name : this.name;
    this.image = data.hasOwnProperty('image') ? data.image : this.image;
    this.abstract = data.hasOwnProperty('abstract') ? data.abstract : this.abstract;
    this.check = data.hasOwnProperty('check') ? data.check : this.check;
    this.startTimestamp = data.hasOwnProperty('start_timestamp') ? data['start_timestamp'] : this.startTimestamp;
    this.endTimestamp = data.hasOwnProperty('end_timestamp') ? data['end_timestamp'] : this.endTimestamp;
    this.speakers = data.hasOwnProperty('speakers')
      ? data.speakers.map((id) => id.toString())
      : this.speakers;
  }
}
