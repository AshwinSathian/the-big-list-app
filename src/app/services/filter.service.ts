import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from '../enums/filter.enum';
import { Status } from '../enums/status.enum';
import { Label } from '../enums/label.enum';
import { Priority } from '../enums/priority.enum';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _filterOptionsMap = {
    [Filter.status]: [
      Status.triage,
      Status.backlog,
      Status.todo,
      Status.in_progress,
      Status.in_review,
      Status.done,
    ],
    [Filter.labels]: [
      Label.bug,
      Label.feature,
      Label.performance,
      Label.security,
      Label.documentation,
      Label.user_request,
      Label.immediate,
      Label.next_release,
      Label.major_release,
    ],
    [Filter.priority]: [
      Priority.none,
      Priority.low,
      Priority.medium,
      Priority.high,
      Priority.critical,
    ],
    [Filter.assignee]: ['Has Assignee', 'No Assignee'],
  };

  private _selectedFilter = new BehaviorSubject<Filter | null>(null);
  selectedFilter$ = this._selectedFilter.asObservable();

  private _selectedFilterOptions = new BehaviorSubject<string[]>([]);
  selectedFilterOptions$ = this._selectedFilterOptions.asObservable();

  constructor() {}

  setFilter(filter: Filter) {
    this._selectedFilter.next(filter);
    this._selectedFilterOptions.next(this._filterOptionsMap[filter]);
  }

  clearFilter() {
    this._selectedFilter.next(null);
    this._selectedFilterOptions.next([]);
  }
}
