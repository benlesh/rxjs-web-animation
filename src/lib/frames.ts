import { Observable, Subscriber } from 'rxjs';

/**
 * An alternating array of Subscribers and their start times.
 */
let _subscribers: (Subscriber<number>|number)[] = [];

let active = false;
let id = -1;

function start() {
  active = true;
  id = requestAnimationFrame(tick);
}

function tick() {
  const copy = _subscribers.slice();
  const now = Date.now();
  for (let i = 0; i < copy.length; i+=2) {
    const subscriber = copy[i] as Subscriber<number>;
    const start = copy[i+1] as number;
    subscriber.next(now - start);
  }
  if (_subscribers.length) {
    id = requestAnimationFrame(tick);
  }
}

function removeSubscriber(index: number) {
  _subscribers.splice(index, 2);
  if (_subscribers.length === 0) {
    active = false;
    cancelAnimationFrame(id);
  }
}

/**
 * A shared observable of animation frames.
 * 
 * Since animation frames are global in nature, all subscriptions to this
 * observable are inherently shared. Emits a `number` that is the number of 
 * milliseconds since subscription started on each tick. This observable
 * does not end.
 */
export const FRAMES = new Observable<number>(subscriber => {
  _subscribers.push(subscriber, Date.now());
  if (!active) {
    start();
  }
  return () => {
    const index = _subscribers.indexOf(subscriber);
    if (index) {
      removeSubscriber(index);
    }
  };
});