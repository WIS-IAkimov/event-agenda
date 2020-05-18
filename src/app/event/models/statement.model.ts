export class Statement {
  public id: string;
  public name: string;
  public image: string;
  public abstract: string;
  public check: number;
  public startedAt: Date;
  public endedAt: Date;
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
    this.startedAt = data.hasOwnProperty('start_timestamp') ? new Date(data['start_timestamp']) : this.startedAt;
    this.endedAt = data.hasOwnProperty('end_timestamp') ? new Date(data['end_timestamp']) : this.endedAt;
    this.speakers = data.hasOwnProperty('speakers')
      ? data.speakers.map((id) => id.toString())
      : this.speakers;
  }
}
