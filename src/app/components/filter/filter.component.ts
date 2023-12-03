import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { Filter } from '../../enums/filter.enum';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  private _titleCasePipe = new TitleCasePipe();
  items: MenuItem[] = Object.keys(Filter).map((key) => ({
    id: Filter[key as keyof typeof Filter],
    label: this._titleCasePipe.transform(key),
    command: () => this.setFilter(Filter[key as keyof typeof Filter]),
  }));

  selectedFilter$ = this._service.selectedFilter$;

  constructor(private _service: FilterService) {}

  setFilter(filter: Filter) {
    this._service.setFilter(filter);
  }

  clearFilter() {
    this._service.clearFilter();
  }
}
