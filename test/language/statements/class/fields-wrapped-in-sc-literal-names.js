// This file was procedurally generated from the following sources:
// - src/class-fields/literal-names.case
// - src/class-fields/default/cls-decl-wrapped-in-sc.template
/*---
description: Literal property names (fields definition wrapped in semicolons)
esid: prod-FieldDefinition
features: [class-fields]
flags: [generated]
includes: [propertyHelper.js]
info: |
    ClassElement:
      ...
      FieldDefinition ;

    FieldDefinition:
      ClassElementName Initializer_opt

    ClassElementName:
      PropertyName

---*/
const fn = function() {}



class C {
  ;;;;
  ;;;;;;a; b = 42;
  c = fn;;;;;;;
  ;;;;
}

var c = new C();

assert.sameValue(Object.hasOwnProperty.call(C.prototype, "a"), false);
assert.sameValue(Object.hasOwnProperty.call(C, "a"), false);

verifyProperty(c, "a", {
  value: undefined,
  enumerable: true,
  writable: true,
  configurable: true
});

assert.sameValue(Object.hasOwnProperty.call(C.prototype, "b"), false);
assert.sameValue(Object.hasOwnProperty.call(C, "b"), false);

verifyProperty(c, "b", {
  value: 42,
  enumerable: true,
  writable: true,
  configurable: true
});

assert.sameValue(Object.hasOwnProperty.call(C.prototype, "c"), false);
assert.sameValue(Object.hasOwnProperty.call(C, "c"), false);

verifyProperty(c, "c", {
  value: fn,
  enumerable: true,
  writable: true,
  configurable: true
});

