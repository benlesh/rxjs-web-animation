import { fromEvent } from 'rxjs'
import { exhaustMap, tap, finalize } from 'rxjs/operators';
import { tween, easeInBack } from '../..'
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
  exhaustMap(() => tween({
    start: LEFT_STATE[currentStateIdx],
    end: LEFT_STATE[Number(!currentStateIdx)],
    easing: easeInBack,
    duration: 300,
  }).pipe(
    tap(left => effect(targetElem, left)),
    finalize(() => currentStateIdx = Number(!currentStateIdx)),
  )),
).subscribe();
