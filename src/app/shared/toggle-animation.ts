import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const toggleAlertAnimation = trigger('notification', [
  state(
    'closed',
    style({
      opacity: 0,
      visibility: 'hidden',
    })
  ),
  state(
    'open',
    style({
      opacity: 1,
      visibility: 'visible'
    })
  ),
  transition('closed => open', animate('600ms ease-out')),
  transition('open => closed', animate('600ms ease-in')),
]);
