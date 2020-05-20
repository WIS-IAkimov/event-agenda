import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Event, Speaker, Statement } from '../models';
import { Session } from '../models/session.model';


@Injectable({
  providedIn: 'root',
})
export class EventStoreService {

  public event: Event;

  private readonly _speakerMap = new Map<string, Speaker>([]);
  private readonly _statements$ = new BehaviorSubject<Statement[]>([]);
  private readonly _sessions$ = new BehaviorSubject<Session[]>([]);

  constructor(
    private _httpClient: HttpClient,
  ) { }

  get sessions$(): Observable<Session[]> {
    return this._sessions$.asObservable();
  }

  public getEvent(): Observable<any> {
    return this._httpClient.get<any>(
      'https://app.highattendance.com/api/v2/events/710?token=https://app.highattendance.com/api/v2/events?company_id=98&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcC5oaWdoYXR0ZW5kYW5jZS5jb20vYXBpL3YyL2F1dGhlbnRpY2F0ZSIsImlhdCI6MTU4Nzk5MDg4MCwiZXhwIjoxNjE0OTkwODgwLCJuYmYiOjE1ODc5OTA4ODAsImp0aSI6ImJadVhuSVlwWm1ZN0JOeTYiLCJzdWIiOjM5NTksInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.ici87OpTYeO8g3hnawv16RJcOQ6fRSOe0vLvm1K2FgI',
      )
      .pipe(
        tap((response) => {
          const sessions: Session[] = Object.keys(response.schedules.sessions)
            .map((key: string) => {
              return new Session(key, response.schedules.sessions[key]);
            });

          const statements = sessions
            .map((session) => session.statements)
            .reduce((acc, session) => acc.concat(session));

          this.event = new Event(response.event);
          this._sessions$.next(sessions);
          this._statements$.next(statements);

          response.schedules.speakers.forEach((item) => {
            const speaker = new Speaker(item);

            this._speakerMap.set(speaker.id, speaker);
          });
        }),
      );
  }

  public getLiveStatements(): Observable<Statement[]> {
    return this._statements$
      .pipe(
        map((statements) => {
          return statements.filter((statement) => statement.live);
        }),
      );
  }

  public getStatements(search?: string): Observable<Statement[]> {
    return this._statements$
      .pipe(
        map((statements) => {
          if (!search) {
            return statements;
          }

          return statements.filter((statement) => {
            const lowerCaseSearch = search.toLowerCase();
            const lowerCaseName = statement.name.toLowerCase();

            return lowerCaseName.includes(lowerCaseSearch);
          })
        })
      )
  }

  public getSpeaker(id: string): Speaker {
    return this._speakerMap.get(id);
  }

}
