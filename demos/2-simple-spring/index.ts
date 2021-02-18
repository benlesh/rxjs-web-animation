import { fromEvent } from 'rxjs'
import { exhaustMap, tap, finalize, map } from 'rxjs/operators';
import { DefSpringConfig, spring } from '../..'
const btnElem = document.querySelector<HTMLElement>('button');
const targetElem = document.querySelector<HTMLElement>('#app');

const LEFT_STATE = [0, 300];
let currentStateIdx = 0;

const effect = (elem: HTMLElement, state: number) => {
  Object.assign(elem.style, {
    left: state + 'px'
  })
}

fromEvent(btnElem, 'click').pipe(
  exhaustMap(() =>
    spring(LEFT_STATE[currentStateIdx], LEFT_STATE[Number(!currentStateIdx)], DefSpringConfig.WOBBLY).pipe(
      tap(left => effect(targetElem, left)),
      finalize(() => currentStateIdx = Number(!currentStateIdx)),
    )),
).subscribe();
