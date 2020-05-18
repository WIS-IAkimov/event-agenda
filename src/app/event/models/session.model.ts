import { Statement } from './statement.model';


export class Session {
  public startedAt: Date;
  public statements: Statement[];

  constructor(startTimestamp: string, data: any[]) {
    this._fromJson(startTimestamp, data);
  }

  private _fromJson(startTimestamp: string, data: any[]): void {
    this.startedAt = new Date(+startTimestamp);
    this.statements = data.map((item) => new Statement(item));
  }
}
