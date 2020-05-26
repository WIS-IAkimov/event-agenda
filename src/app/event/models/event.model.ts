export class Event {

  public id: string;
  public name: string;
  public companyId: string;
  public startedAt: Date;
  public endedAt: Date;
  public timezone: string;
  public address: string;
  public city: string;
  public zip: string;

  constructor(data: any) {
    this._fromJson(data);
  }

  private _fromJson(data: any): void {
    this.id = data.hasOwnProperty('id') ? data.id : this.id;
    this.name = data.hasOwnProperty('name') ? data.name : this.name;
    this.companyId = data.hasOwnProperty('company_id') ? data['company_id'] : this.companyId;
    this.startedAt = data.hasOwnProperty('start_date_timestamp')
      ? new Date(data['start_date_timestamp'])
      : this.startedAt;
    this.endedAt = data.hasOwnProperty('end_date_timestamp')
      ? new Date(data['end_date_timestamp'])
      : this.endedAt;
    this.timezone = data.hasOwnProperty('timezone') ? data.timezone : this.timezone;
    this.address = data.hasOwnProperty('address') ? data.address : this.address;
    this.city = data.hasOwnProperty('city') ? data.city : this.city;
    this.zip = data.hasOwnProperty('zip') ? data.zip : this.zip;
  }

}
