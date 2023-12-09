/// <reference lib="webworker" />

import { Ticket } from '../app/interfaces/ticket';

const TOTAL_PAGES = 10;
const API_BASE_URL = 'https://sfe-interview.hoppscotch.com/issues';
let tickets: Ticket[] = [];

addEventListener('message', ({ data }) => {
  const { nextPage } = data;
  loadRemainingTickets(nextPage);
});

const loadRemainingTickets = (nextPage: number) => {
  if (nextPage <= TOTAL_PAGES) {
    const url = `${API_BASE_URL}-${nextPage}.json`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        tickets = [...tickets, ...(response?.tickets || [])];
        console.log(nextPage, tickets?.length);
        postMessage(tickets);
      });
  }
};
