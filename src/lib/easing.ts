export function easeInQuad(t: number) {
  return t * t;
}

export function easeOutQuad(t: number) {
  return  -t * (t - 2);
}

export function easeInOutQuad(t: number) {
  return ((t *= 2) < 1) ? (t ** 3 / 2) :
    (((t -= 2) * t * t + 2) / 2);
}

export function easeInCubic(t: number) {
  return t ** 3;
}

export function easeOutCubic(t: number) {
  return (t = t - 1) * t * t + 1;
}

export function easeInOutCubic(t: number) {
  return ((t *= 2) < 1) ?  (t ** 3 / 2) :
    (((t -= 2) * t * t + 2) / 2);
}

export function easeInQuart(t: number) {
  return t ** 4;
}

export function easeOutQuart(t: number) {
  return -1 * ((t = t - 1) * t * t * t - 1);
}

export function easeInOutQuart(t: number) {
  return ((t *= 2) < 1) ? (t ** 4 / 2) :
   (((t -= 2) * t ** 3 - 2) / -2);
}

export function easeInQuint(t: number) {
  return t ** 5;
}

export function easeOutQuint(t: number) {
  return (t = t - 1) * t ** 4 + 1;
}

export function easeInOutQuint(t: number) {
  return  ((t *= 2) < 1) ? (t ** 5 / 2) :
    (((t -= 2) * t ** 4 + 2) / 2);
}

export function easeInSine(t: number) {
  return -1 * Math.cos(t * (Math.PI / 2)) + 1;
}

export function easeOutSine(t: number) {
  return Math.sin(t * (Math.PI / 2));
}

export function easeInOutSine(t: number) {
  return (Math.cos(Math.PI * t) - 1) / 2;
}

export function easeInExpo(t: number) {
  return (t === 0) ? 0 : Math.pow(2, 10 * (t - 1));
}

export function easeOutExpo(t: number) {
  return (t === 1) ? 1 : (-Math.pow(2, -10 * t) + 1);
}

export function easeInOutExpo(t: number) {
  if (t === 0) return 0;
  if (t === 1) return 1;
  if ((t *= 2) < 1) return Math.pow(2, 10 * (t - 1)) / 2;
  return (-Math.pow(2, -10 * --t) + 2) / 2;
}

export function easeInCirc(t: number) {
  return -(Math.sqrt(1 - t * t) - 1);
}

export function easeOutCirc(t: number) {
  return Math.sqrt(1 - (t = t - 1) * t);
}

export function easeInOutCirc(t: number) {
  if ((t *= 2) < 1) return (Math.sqrt(1 - t * t) - 1) / -2;
  return (Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}

const DOUBLE_PI = 6.283185307179586;
const ASIN_1 = Math.asin(1);
const p1 = 0.3;
const ev1 = p1 / DOUBLE_PI * ASIN_1;

export function easeInElastic(t: number) {
  if (t === 0) return 0;
  if (t === 1) return 1;
  return -1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - ev1) * DOUBLE_PI / p1);
}

const p2 = 0.3;
const ev2 = p2 / DOUBLE_PI * ASIN_1;

export function easeOutElastic(t: number) {
  if (t === 0) return 0;
  if (t === 1) return 1;
  return Math.pow(2 , -10 * t) * Math.sin((t * 1 - ev2) * DOUBLE_PI / p2) + 1;
}

const p3 = 0.45;
const ev3 = p3 / DOUBLE_PI * ASIN_1;

export function easeInOutElastic(t: number) {
  if (t === 0) return 0;
  if ((t /= 1/2) === 2) return 1;
  let x: number;
  let m: number;
  if (t < 1) {
    x = 1;
    m = 0;
  } else {
    x = -1;
    m = 1;
  }
  t -= 1;
  return Math.pow(2, x * 10 * t) * Math.sin((t - ev3) * DOUBLE_PI / p3) / (x * 2) + m;
}

const s = 1.70158;

export function easeInBack(t: number) {
  return t * t * ((s + 1) * t - s);
}

export function easeOutBack(t: number) {
  return (t = t - 1) * t * ((s + 1) * t + s) + 1;
}

export function easeInOutBack(t: number) { 
  const s1 = s * 1.525;
  if ((t *= 2) < 1) {
    return (t * t * ((s1 + 1) * t - s1)) / 2;
  }
  return ((t -= 2) * t * ((s1 + 1) * t + s1) + 2) / 2;
}

const step1 = 4 / 11;
const step2 = 8 / 11;
const step3 = 10 / 11;
const a2 = 6 / 11;
const a3 = 9 / 11;
const a4 = 21 / 22;
const acc = 7.5625;

export function easeInBounce(t: number) {
  return 1 - easeOutBounce(1 - t);
}

export function easeOutBounce(t: number) {
  if (t < step1) {
    return acc * t * t;
  } else if (t < step2) {
    return acc * (t -= a2) * t + 0.75;
  } else if (t < step3) {
    return acc * (t -= a3) * t + 0.9375;
  } else {
    return acc * (t -= a4) * t + 0.984375;
  }
}

export function easeInOutBounce(t: number) {
  if (t < 1/2) return easeInBounce(t * 2) / 2;
  return easeOutBounce(t) / 2 + 0.5;
}


/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */