// Copyright 2023 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-%typedarray%.prototype.indexof
description: >
  TypedArray.p.indexOf behaves correctly when receiver is shrunk
  during argument coercion
includes: [resizableArrayBufferUtils.js]
features: [resizable-arraybuffer]
---*/

function MayNeedBigInt(ta, n) {
  if (typeof n == 'number' && (ta instanceof BigInt64Array || ta instanceof BigUint64Array)) {
    return BigInt(n);
  }
  return n;
}

// Shrinking + fixed-length TA.
for (let ctor of ctors) {
  const rab = CreateResizableArrayBuffer(4 * ctor.BYTES_PER_ELEMENT, 8 * ctor.BYTES_PER_ELEMENT);
  const fixedLength = new ctor(rab, 0, 4);
  let evil = {
    valueOf: () => {
      rab.resize(2 * ctor.BYTES_PER_ELEMENT);
      return 0;
    }
  };
  let n0 = MayNeedBigInt(fixedLength, 0);
  assert.sameValue(fixedLength.indexOf(n0), 0);
  // The TA is OOB so indexOf returns -1.
  assert.sameValue(fixedLength.indexOf(n0, evil), -1);
}
for (let ctor of ctors) {
  const rab = CreateResizableArrayBuffer(4 * ctor.BYTES_PER_ELEMENT, 8 * ctor.BYTES_PER_ELEMENT);
  const fixedLength = new ctor(rab, 0, 4);
  let evil = {
    valueOf: () => {
      rab.resize(2 * ctor.BYTES_PER_ELEMENT);
      return 0;
    }
  };
  let n0 = MayNeedBigInt(fixedLength, 0);
  assert.sameValue(fixedLength.indexOf(n0), 0);
  // The TA is OOB so indexOf returns -1, also for undefined).
  assert.sameValue(fixedLength.indexOf(undefined, evil), -1);
}

// Shrinking + length-tracking TA.
for (let ctor of ctors) {
  const rab = CreateResizableArrayBuffer(4 * ctor.BYTES_PER_ELEMENT, 8 * ctor.BYTES_PER_ELEMENT);
  const lengthTracking = new ctor(rab);
  for (let i = 0; i < 4; ++i) {
    WriteToTypedArray(lengthTracking, i, i);
  }
  let evil = {
    valueOf: () => {
      rab.resize(2 * ctor.BYTES_PER_ELEMENT);
      return 0;
    }
  };
  let n2 = MayNeedBigInt(lengthTracking, 2);
  assert.sameValue(lengthTracking.indexOf(n2), 2);
  // 2 no longer found.
  assert.sameValue(lengthTracking.indexOf(n2, evil), -1);
}
