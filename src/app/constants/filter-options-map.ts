import { Filter } from '../enums/filter.enum';
import { Label } from '../enums/label.enum';
import { Priority } from '../enums/priority.enum';
import { Status } from '../enums/status.enum';

export const filterOptionsMap = {
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
