import { FRAMES } from "./frames";
import { scan, takeWhile, map } from 'rxjs/operators';

export interface SpringConfig {
  stiffness: number;
  damping: number;
  precision: number;
}

interface SpringStepState {
  v: number;
  x: number;
  completed: boolean;
}

export const DefSpringConfig = {
  NO_WOBBLE: { stiffness: 170, damping: 26, precision: 0.01 },
  GENTLE: { stiffness: 120, damping: 14, precision: 0.01 },
  WOBBLY: { stiffness: 180, damping: 12, precision: 0.01 },
  STIFF: { stiffness: 210, damping: 20, precision: 0.01 }
};

const FPS = 60;
const SECOND_PERM_FRAME = 1000 / FPS / 1000;
const MASS = 1;

const INIT_STATE: SpringStepState = Object.freeze({
  x: 0,
  v: 0,
  completed: false,
})
const DEST_STATE: SpringStepState = Object.freeze({
  x: 1,
  v: 0,
  completed: true,
});

function stepper(state: SpringStepState, spring: SpringConfig) {
  const { stiffness: k, damping: b, precision } = spring;
  const { x, v } = state;

  const Fspring = -k * (x - DEST_STATE.x);
  const Fdamper = -b * v;
  const a = (Fspring + Fdamper) / MASS;

  const newV = v + a * SECOND_PERM_FRAME;
  const newX = x + newV * SECOND_PERM_FRAME;
  if (Math.abs(newV) < precision && Math.abs(newX - DEST_STATE.x) < precision) {
    return DEST_STATE;
  }
  return {
    x: newX,
    v: newV,
    completed: false
  };
}

/**
 * @param start start point
 * @param end end point
 * @param config SpringConfig 
 * @param frames The frame source, an observable of milliseconds elapsed since start. {@see FRAMES}
 */
export function spring(start: number, end: number, config: SpringConfig = DefSpringConfig.NO_WOBBLE, frames = FRAMES) {
  const diff = end - start;
  return frames.pipe(
    scan((state) => stepper(state, config), INIT_STATE),
    takeWhile(s => !s.completed, true),
    map(s => s.x * diff + start),
  )
}