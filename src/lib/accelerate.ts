import { FRAMES } from './frames';
import { scan, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * A construct for providing information about an accelerating value.
 */
export interface VelocityData {
  /** The current velocity the value is increasing at */
  velocity: number;
  /** The current value */
  value: number;
}

export interface AccelerateConfig {
  unitsPerMs2: number;
  initialVelocity?: number;
  frames?: Observable<number>;
}

/**
 * Returns an observable of values that increase at an ever increasing velocity, given a specific acceleration.
 * 
 */
export function accelerate({ unitsPerMs2, initialVelocity, frames = FRAMES } : AccelerateConfig): Observable<VelocityData> {
  return frames.pipe(
    scan((state, elapsed) => {
      const velocity = state.velocity += unitsPerMs2 * elapsed;
      state.value += velocity;
      return state;
    }, {
      velocity: initialVelocity,
      value: 0,
    }),
  )
}