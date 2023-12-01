export interface Ticket {
  teamID: string;
  id: string;
  title: string;
  parentID?: string;
  status: string;
  labels: string[];
  priority: string;
  assignee: string;
}

export interface SampleData {
  tickets: Ticket[];
}
