"use strict";

function True() {
    return { type: "True" };
}

function False() {
    return { type: "False" };
}

function If(t1, t2, t3) {
    return { type: "If", t1, t2, t3 };
}

function Zero() {
    return { type: "Zero" };
}

function Pred(t1) {
    return { type: "Pred", t1 };
}

function Succ(t1) {
    return { type: "Succ", t1 };
}

function IsZero(t1) {
    return { type: "IsZero", t1 };
}

function evaluate(t) {
    try {
        return evaluate(eval1(t));
    } catch (e) {
        return t;
    }
}

function eval1(t) {
    switch (t.type) {
    case "If":
        switch (t.t1.type) {
        case "True":
            // E-IfTrue
            return t.t2;
        case "False":
            // E-IfFalse
            return t.t3;
        default:
            // E-If
            return If(eval1(t.t1), t.t2, t.t3);
        }
    case "Pred":
        switch (t.t1.type) {
        case "Zero":
            // E-PredZero
            return Zero();
        case "Succ":
            // E-PredSucc
            return t.t1.t1;
        default:
            // E-Pred
            return Pred(eval1(t.t1));
        }
    case "Succ":
        // E-Succ
        return Succ(eval1(t.t1));
    case "IsZero":
        switch (t.t1.type) {
        case "Succ":
            // E-IsZeroSucc
            return False();
        case "Zero":
            // E-IsZeroZero
            return True();
        default:
            // E-IsZero
            return IsZero(eval1(t.t1));
        }
    default:
        throw "No rule applies";
    }
}

module.exports = {
    True: True,
    False: False,
    If: If,
    Zero: Zero,
    Pred: Pred,
    Succ: Succ,
    IsZero: IsZero,
    eval1: eval1,
    evaluate: evaluate
};
