import { Statement } from './statement.model';


export class Session {
  public startTimestamp: Date;
  public statements: Statement[];

  constructor(startTimestamp: string, data: any[]) {
    this._fromJson(startTimestamp, data);
  }

  private _fromJson(startTimestamp: string, data: any[]): void {
    this.startTimestamp = new Date(+startTimestamp);
    this.statements = data.map((item) => new Statement(item));
  }
}
