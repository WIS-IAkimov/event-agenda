export class Event {
  public id: string;
  public name: string;
  public companyId: string;
  public startDate: Date;
  public endDate: Date;
  public timezone: string;
  public address: string;
  public city: string;
  public zip: string;

  constructor(data: any) {
    this._fromJson(data);
  }

  public _fromJson(data: any): void {
    this.id = data.hasOwnProperty('id') ? data.id : this.id;
    this.name = data.hasOwnProperty('name') ? data.name : this.name;
    this.companyId = data.hasOwnProperty('company_id') ? data['company_id'] : this.companyId;
    this.startDate = data.hasOwnProperty('start_date_timestamp') ? data['start_date_timestamp'] : this.startDate;
    this.endDate = data.hasOwnProperty('end_date_timestamp') ? data['end_date_timestamp'] : this.endDate;
    this.timezone = data.hasOwnProperty('timezone') ? data.timezone : this.timezone;
    this.address = data.hasOwnProperty('address') ? data.address : this.address;
    this.city = data.hasOwnProperty('city') ? data.city : this.city;
    this.zip = data.hasOwnProperty('zip') ? data.zip : this.zip;
  }
}
