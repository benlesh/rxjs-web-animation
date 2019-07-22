import { duration } from './duration';
import { FRAMES } from './frames';
import { map, takeWhile, endWith } from 'rxjs/operators';
import { Observable, identity } from 'rxjs';

/**
 * Configuration for a {@link tween} call.
 */
export interface TweenConfig {
  /**
   * The starting number of the tween
   */
  start: number;
  /**
   * The final number to tween to.
   */
  end: number;
  /**
   * The amount of time to tween between the `start` and the `end` values.
   */
  duration: number;
  /**
   * An optional global frame source. An observable of elapsed milliseconds since subscription.
   */
  frames?: Observable<number>;
  /**
   * An optional easing function
   */
  easing?: (input: number) => number; // TODO: create a type.
}

/**
 * Returns an observable of numbers between a `start` and an `end` value, incrementally moving 
 * from `start` toward `end` over the period specified as `duration` in the config object.
 * 
 * Additionally, an easing function can be provided.
 * 
 * @param config The tween configuration
 */
export function tween({
  start,
  end,
  duration: ms,
  easing = identity,
  frames = FRAMES
}: TweenConfig) {
  const diff = end - start;
  // TODO: This may need to be optimized later
  return duration(ms, frames).pipe(map(d => easing(d) * diff + start));
}