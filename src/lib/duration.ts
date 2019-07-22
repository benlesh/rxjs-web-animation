import { FRAMES } from './frames';
import { Observable } from 'rxjs';

/**
 * Returns an observable that emits numbers between 0 and 1 for a give duration of time.
 * 
 * If the `ms` argument is `5000`, and an animation frame fires at 2500ms, then it will emit
 * `0.5`. If the animation frame fires at 4000ms, then it will emit `0.8`. If the animation
 * frame first at 5000ms or later, it will emit `1` and complete.
 * 
 * @param ms The number of milliseconds for the observable to last
 * @param frames A frame source for milliseconds elapsed since subscription
 */
export function duration(ms: number, frames = FRAMES) {
  return new Observable<number>(subscriber => {
    // NOTE: FRAMES cannot error or complete.
    return frames.subscribe((elapsed) => {
      let d = elapsed / ms;
      if (d < 1) {
        subscriber.next(d);
      } else {
        subscriber.next(1);
        subscriber.complete();
      }
    });
  })
}