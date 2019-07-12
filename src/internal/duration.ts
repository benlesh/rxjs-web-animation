import { FRAMES } from './frames';
import { Observable } from 'rxjs';

export function duration(ms: number, frames = FRAMES) {
  return new Observable<number>(subscriber => {
    // NOTE: FRAMES cannot error or complete.
    return frames.subscribe((elapsed) => {
      let d = ms / elapsed;
      if (d < 1) {
        subscriber.next(d);
      } else {
        subscriber.next(1);
        subscriber.complete();
      }
    });
  })
}