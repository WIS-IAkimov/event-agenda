import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {
  map,
  debounceTime,
  takeUntil,
  distinctUntilChanged,
} from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'd-block',
  }
})
export class SearchComponent implements OnInit, OnDestroy {

  public readonly inputControl = new FormControl();

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.inputControl.setValue(
      this._activatedRoute.snapshot.queryParams?.search,
      { emitEvent: false },
    );
    this.inputControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((value: string) => value.toLowerCase()),
        takeUntil(this._destroy$),
      )
      .subscribe((search) => {
        const queryParams = {
          search,
        };

        this._router.navigate([], { queryParams });
      });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
