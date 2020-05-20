import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Event, Speaker, Session } from '../models';


@Injectable({
  providedIn: 'root',
})
export class EventStoreService {

  public event: Event;

  private readonly _speakerMap = new Map<string, Speaker>([]);
  private readonly _sessions$ = new BehaviorSubject<Session[]>([]);

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public getEvent(): Observable<any> {
    return this._httpClient.get<any>(
      'https://app.highattendance.com/api/v2/events/710?token=https://app.highattendance.com/api/v2/events?company_id=98&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcC5oaWdoYXR0ZW5kYW5jZS5jb20vYXBpL3YyL2F1dGhlbnRpY2F0ZSIsImlhdCI6MTU4Nzk5MDg4MCwiZXhwIjoxNjE0OTkwODgwLCJuYmYiOjE1ODc5OTA4ODAsImp0aSI6ImJadVhuSVlwWm1ZN0JOeTYiLCJzdWIiOjM5NTksInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.ici87OpTYeO8g3hnawv16RJcOQ6fRSOe0vLvm1K2FgI',
      )
      .pipe(
        tap((response) => {
          const sessions = Object.keys(response.schedules.sessions)
            .map((key: string) => {
              const items: any[] = response.schedules.sessions[key];

              return items.map((item) => new Session(item));
            })
            .reduce((acc, session) => acc.concat(session));

          this.event = new Event(response.event);
          this._sessions$.next(sessions);

          response.schedules.speakers.forEach((item) => {
            const speaker = new Speaker(item);

            this._speakerMap.set(speaker.id, speaker);
          });
        }),
      );
  }

  public getLiveSessions(): Observable<Session[]> {
    return this._sessions$
      .pipe(
        map((sessions) => {
          return sessions.filter((session) => session.live);
        }),
      );
  }

  public getSessions(search?: string): Observable<Session[]> {
    return this._sessions$
      .pipe(
        map((sessions) => {
          if (!search) {
            return sessions;
          }

          return sessions.filter((session) => {
            const lowerCaseSearch = search.toLowerCase();
            const lowerCaseName = session.name.toLowerCase();

            return lowerCaseName.includes(lowerCaseSearch);
          })
        })
      )
  }

  public getSpeaker(id: string): Speaker {
    return this._speakerMap.get(id);
  }

}
