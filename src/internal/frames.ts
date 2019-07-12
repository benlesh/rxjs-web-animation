import { Observable, Subscriber } from 'rxjs';

let _subscribers: Subscriber<void>[] = [];
let active = false;
let id = -1;

function start() {
  id = requestAnimationFrame(tick);
}

function tick() {
  const copy = _subscribers.slice();
  for (let i = 0; i < copy.length; i++) {
    const subscriber = copy[i];
    subscriber.next();
  }
  if (_subscribers.length) {
    id = requestAnimationFrame(tick);
  }
}

function removeSubscriber(index: number) {
  _subscribers.splice(index, 1);
  if (_subscribers.length === 0) {
    cancelAnimationFrame(id);
  }
}

/**
 * A hot observable of animation frames.
 * 
 * Since animation frames are global in nature, all subscriptions to this
 * observable are inherently shared. Emits `undefined` on each tick. This
 * observable does not end.
 */
export const FRAMES = new Observable<void>(subscriber => {
  _subscribers.push(subscriber);
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