"use strict";

const { True, False, If, Zero, Pred, Succ, IsZero, eval1, evaluate } = require('../lib/arith');

describe("eval1", () => {
    test("if true then true else false evaluates to true", () => {
        expect(eval1(If(True(), True(), False()))).toEqual(True());
    });

    test("evaluating true throws an exception", () => {
        expect(() => { eval1(True()) }).toThrow("No rule applies");
    });

    test("if if true then false else true then true else false evaluates to if false then true else false", () => {
        expect(eval1(If(If(True(), False(), True()), True(), False()))).toEqual(If(False(), True(), False()));
    });

    test("pred 0 evaluates to 0", () => {
        expect(eval1(Pred(Zero()))).toEqual(Zero());
    });

    test("pred succ 0 evaluates to 0", () => {
        expect(eval1(Pred(Succ(Zero())))).toEqual(Zero());
    });

    test("succ pred 0 evaluates to succ 0", () => {
        expect(eval1(Succ(Pred(Zero())))).toEqual(Succ(Zero()));
    });

    test("if iszero succ 0 then true else false evaluates to if false then true else false", () => {
        expect(eval1(If(IsZero(Succ(Zero())), True(), False()))).toEqual(If(False(), True(), False()));
    });

    test("iszero 0 evaluates to true", () => {
        expect(eval1(IsZero(Zero()))).toEqual(True());
    });

    test("pred pred succ 0 evaluates to pred 0", () => {
        expect(eval1(Pred(Pred(Succ(Zero()))))).toEqual(Pred(Zero()));
    });

    test("iszero pred 0 evaluates to iszero 0", () => {
        expect(eval1(IsZero(Pred(Zero())))).toEqual(IsZero(Zero()));
    });

    test.skip("pred succ true", () => {
        expect(() => { eval1(Pred(Succ(True()))) }).toThrow("No rule applies");
    });
});

describe("eval", () => {
    test("if if true then false else true then true else false evaluates to false", () => {
        expect(evaluate(If(If(True(), False(), True()), True(), False()))).toEqual(False());
    });

    test("true evaluates to true", () => {
        expect(evaluate(True())).toEqual(True());
    });

    test("if iszero succ 0 then true else false evaluates to false", () => {
        expect(evaluate(If(IsZero(Succ(Zero())), True(), False()))).toEqual(False());
    });

    test("succ 0 evaluates to succ 0", () => {
        expect(evaluate(Succ(Zero()))).toEqual(Succ(Zero()));
    });
});

