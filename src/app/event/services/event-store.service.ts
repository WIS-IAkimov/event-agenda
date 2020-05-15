import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Event, Speaker, Session } from '../models';


@Injectable({
  providedIn: 'root',
})
export class EventStoreService {

  public event: Event;
  public readonly speakerMap = new Map<string, Speaker>([]);
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
          this.event = new Event(response.event);

          const sessionsGroups: Session[] = Object.keys(response.schedules.sessions)
            .map((key: string) => {
              return response.schedules.sessions[key];
            })
            .map((group: any[]) => {
              return group.map((item) => new Session(item));
            })
            .reduce((acc, value) => acc.concat(value));

          this._sessions$.next(sessionsGroups);

          response.schedules.speakers.forEach((item) => {
            const speaker = new Speaker(item);

            this.speakerMap.set(speaker.id, speaker);
          });
        }),
      );
  }

  public getSpeaker(id: string): Speaker {
    return this.speakerMap.get(id);
  }


}
