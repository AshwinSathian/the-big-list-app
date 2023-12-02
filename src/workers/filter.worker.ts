/// <reference lib="webworker" />

import { filterOptionsMap } from '../app/constants/filter-options-map';
import { Filter } from '../app/enums/filter.enum';
import { Ticket } from '../app/interfaces/ticket';

addEventListener('message', ({ data }) => {
  const { tickets, filterKey } = data;
  const groupedTickets = _groupTickets(tickets, filterKey);

  postMessage(groupedTickets);
});

addEventListener('error', (error) => {
  console.error('Worker error:', error);
});

const _groupTickets = (
  tickets: Ticket[],
  filterKey: Filter
): { [option: string]: Ticket[] } => {
  const options = filterOptionsMap[filterKey];
  let grouped: { [option: string]: Ticket[] } = {};
  for (const option of options) {
    grouped[option] = [];
  }

  for (const ticket of tickets) {
    const value = ticket[filterKey];

    if ([Filter.priority, Filter.status].includes(filterKey)) {
      grouped[value as string].push(ticket);
    } else if (filterKey === Filter.labels) {
      // Since value is an array
      for (const val of value) {
        grouped[val as string].push(ticket);
      }
    } else if (filterKey === Filter.assignee) {
      // Handling differently since we're grouping not based on certain values, but just ehther there's an assignee or not
      if (value) {
        grouped['Has Assignee'].push(ticket);
      } else {
        grouped['No Assignee'].push(ticket);
      }
    }
  }

  return grouped;
};
