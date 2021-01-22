import { toString as toString_1 } from "../fable-library.3.0.1/Decimal.js";
import { mapIndexed, map as map_2, fold, getEnumerator } from "../fable-library.3.0.1/Seq.js";
import { empty, map as map_3, tryFind, add, toList } from "../fable-library.3.0.1/Map.js";
import { toString as toString_2 } from "../fable-library.3.0.1/BigInt.js";
import { toString as toString_3 } from "../fable-library.3.0.1/Date.js";
import { toString as toString_4 } from "../fable-library.3.0.1/TimeSpan.js";
import { Lazy, mapCurriedArgs, uncurry } from "../fable-library.3.0.1/Util.js";
import { defaultArg, value as value_34, map, defaultArgWith, some } from "../fable-library.3.0.1/Option.js";
import { toString as toString_5, FSharpRef } from "../fable-library.3.0.1/Types.js";
import { class_type, getGenerics, getGenericTypeDefinition, getTupleFields, getTupleElements, isTuple, isGenericType, getEnumUnderlyingType, isEnum, getElementType, isArray, getUnionCaseFields, getUnionFields, isUnion, getRecordElements, getRecordField, name, isRecord, fullName } from "../fable-library.3.0.1/Reflection.js";
import { fill, map as map_1 } from "../fable-library.3.0.1/Array.js";
import { Util_CachedEncoders, Util_Cache$1__GetOrAdd_43981464, CaseStrategy, Util_Casing_convert } from "./Types.fs.js";
import { toFail, printf, toText } from "../fable-library.3.0.1/String.js";

export function guid(value) {
    return value;
}

export function decimal(value) {
    return toString_1(value);
}

export const nil = null;

export function object(values) {
    const o = {};
    const enumerator = getEnumerator(values);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const forLoopVar = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            o[forLoopVar[0]] = forLoopVar[1];
        }
    }
    finally {
        enumerator.Dispose();
    }
    return o;
}

export function list(values) {
    return Array.from(values);
}

export function seq(values) {
    return Array.from(values);
}

export function dict(values) {
    return object(toList(values));
}

export function bigint(value) {
    return toString_2(value);
}

export function datetimeOffset(value) {
    return toString_3(value, "O", {});
}

export function timespan(value) {
    return toString_4(value);
}

export function sbyte(value) {
    return String(value);
}

export function byte(value) {
    return String(value);
}

export function int16(value) {
    return String(value);
}

export function uint16(value) {
    return String(value);
}

export function int64(value) {
    return String(value);
}

export function uint64(value) {
    return String(value);
}

export function unit() {
    return null;
}

export function tuple2(enc1, enc2, v1, v2) {
    return [enc1(v1), enc2(v2)];
}

export function tuple3(enc1, enc2, enc3, v1, v2, v3) {
    return [enc1(v1), enc2(v2), enc3(v3)];
}

export function tuple4(enc1, enc2, enc3, enc4, v1, v2, v3, v4) {
    return [enc1(v1), enc2(v2), enc3(v3), enc4(v4)];
}

export function tuple5(enc1, enc2, enc3, enc4, enc5, v1, v2, v3, v4, v5) {
    return [enc1(v1), enc2(v2), enc3(v3), enc4(v4), enc5(v5)];
}

export function tuple6(enc1, enc2, enc3, enc4, enc5, enc6, v1, v2, v3, v4, v5, v6) {
    return [enc1(v1), enc2(v2), enc3(v3), enc4(v4), enc5(v5), enc6(v6)];
}

export function tuple7(enc1, enc2, enc3, enc4, enc5, enc6, enc7, v1, v2, v3, v4, v5, v6, v7) {
    return [enc1(v1), enc2(v2), enc3(v3), enc4(v4), enc5(v5), enc6(v6), enc7(v7)];
}

export function tuple8(enc1, enc2, enc3, enc4, enc5, enc6, enc7, enc8, v1, v2, v3, v4, v5, v6, v7, v8) {
    return [enc1(v1), enc2(v2), enc3(v3), enc4(v4), enc5(v5), enc6(v6), enc7(v7), enc8(v8)];
}

export function Enum_byte(value) {
    return byte(value);
}

export function Enum_sbyte(value) {
    return sbyte(value);
}

export function Enum_int16(value) {
    return int16(value);
}

export function Enum_uint16(value) {
    return uint16(value);
}

export function Enum_int(value) {
    return value;
}

export function Enum_uint32(value) {
    return value;
}

export function datetime(value) {
    return toString_3(value, "O", {});
}

export function toString(space, value) {
    return JSON.stringify(value, uncurry(2, null), some(space));
}

export function option(encoder) {
    return (arg) => defaultArgWith(map(encoder, arg), () => nil);
}

function autoEncodeRecordsAndUnions(extra, caseStrategy, skipNullField, t) {
    const encoderRef = new FSharpRef(null);
    const extra_1 = add(fullName(t), encoderRef, extra);
    let encoder;
    if (isRecord(t, true)) {
        const setters = map_1((fi) => {
            const targetKey = Util_Casing_convert(caseStrategy, name(fi));
            const encode_1 = autoEncoder(extra_1, caseStrategy, skipNullField, fi[1]);
            return (source) => ((target) => {
                const value = getRecordField(source, fi);
                if ((!skipNullField) ? true : (skipNullField ? (!(value == null)) : false)) {
                    target[targetKey]=encode_1(value);
                }
                return target;
            });
        }, getRecordElements(t, true));
        encoder = ((source_1) => fold(uncurry(2, mapCurriedArgs((target_1) => ((set$) => set$(source_1, target_1)), [0, [0, 2]])), {}, setters));
    }
    else if (isUnion(t, true)) {
        encoder = ((value_1) => {
            const patternInput = getUnionFields(value_1, t, true);
            const info = patternInput[0];
            const fields = patternInput[1];
            const matchValue = fields.length | 0;
            if (matchValue === 0) {
                return name(info);
            }
            else {
                const len = matchValue | 0;
                const fieldTypes = getUnionCaseFields(info);
                const target_2 = fill(new Array(len + 1), 0, len + 1, null);
                target_2[0] = name(info);
                for (let i = 1; i <= len; i++) {
                    const encode_2 = autoEncoder(extra_1, caseStrategy, skipNullField, fieldTypes[i - 1][1]);
                    target_2[i] = encode_2(fields[i - 1]);
                }
                return target_2;
            }
        });
    }
    else {
        let message;
        const arg10 = fullName(t);
        message = toText(printf("Cannot generate auto encoder for %s. Please pass an extra encoder."))(arg10);
        throw (new Error(message));
    }
    encoderRef.contents = encoder;
    return encoder;
}

function autoEncoder(extra, caseStrategy, skipNullField, t) {
    const fullname = fullName(t);
    const matchValue = tryFind(fullname, extra);
    if (matchValue == null) {
        if (isArray(t)) {
            const encoder = autoEncoder(extra, caseStrategy, skipNullField, getElementType(t));
            return (value) => seq(map_2(encoder, value));
        }
        else if (isEnum(t)) {
            const enumType = fullName(getEnumUnderlyingType(t));
            if (enumType === "System.SByte") {
                return sbyte;
            }
            else if (enumType === "System.Byte") {
                return byte;
            }
            else if (enumType === "System.Int16") {
                return int16;
            }
            else if (enumType === "System.UInt16") {
                return uint16;
            }
            else if (enumType === "System.Int32") {
                return (value_5) => value_5;
            }
            else if (enumType === "System.UInt32") {
                return (value_7) => value_7;
            }
            else {
                const arg10 = fullName(t);
                const clo2 = toFail(printf("Cannot generate auto encoder for %s.\nThoth.Json.Net only support the folluwing enum types:\n- sbyte\n- byte\n- int16\n- uint16\n- int\n- uint32\nIf you can\u0027t use one of these types, please pass an extra encoder.\n                    "))(arg10);
                return clo2;
            }
        }
        else if (isGenericType(t)) {
            if (isTuple(t)) {
                const encoders = map_1((t_2) => autoEncoder(extra, caseStrategy, skipNullField, t_2), getTupleElements(t));
                return (value_9) => seq(mapIndexed((i, x) => encoders[i](x), getTupleFields(value_9)));
            }
            else {
                const fullname_1 = fullName(getGenericTypeDefinition(t));
                if (fullname_1 === "Microsoft.FSharp.Core.FSharpOption`1[System.Object]") {
                    const encoder_2 = new Lazy(() => option(autoEncoder(extra, caseStrategy, skipNullField, getGenerics(t)[0])));
                    return (value_10) => {
                        if (value_10 == null) {
                            return nil;
                        }
                        else {
                            return encoder_2.Value(value_10);
                        }
                    };
                }
                else if ((fullname_1 === "Microsoft.FSharp.Collections.FSharpList`1[System.Object]") ? true : (fullname_1 === "Microsoft.FSharp.Collections.FSharpSet`1[System.Object]")) {
                    const encoder_3 = autoEncoder(extra, caseStrategy, skipNullField, getGenerics(t)[0]);
                    return (value_11) => seq(map_2(encoder_3, value_11));
                }
                else if (fullname_1 === "Microsoft.FSharp.Collections.FSharpMap`2[System.Object,System.Object]") {
                    const keyType = getGenerics(t)[0];
                    const valueEncoder = autoEncoder(extra, caseStrategy, skipNullField, getGenerics(t)[1]);
                    if ((fullName(keyType) === "System.String") ? true : (fullName(keyType) === "System.Guid")) {
                        return (value_12) => fold((target, _arg1) => {
                            const activePatternResult11764 = _arg1;
                            target[activePatternResult11764[0]]=valueEncoder(activePatternResult11764[1]);
                            return target;
                        }, {}, value_12);
                    }
                    else {
                        let keyEncoder;
                        const clo4 = autoEncoder(extra, caseStrategy, skipNullField, keyType);
                        keyEncoder = (clo4);
                        return (value_13) => seq(map_2((_arg2) => {
                            const activePatternResult11768 = _arg2;
                            return [keyEncoder(activePatternResult11768[0]), valueEncoder(activePatternResult11768[1])];
                        }, value_13));
                    }
                }
                else {
                    return autoEncodeRecordsAndUnions(extra, caseStrategy, skipNullField, t);
                }
            }
        }
        else if (fullname === "System.Boolean") {
            return (value_14) => value_14;
        }
        else if (fullname === "Microsoft.FSharp.Core.Unit") {
            return unit;
        }
        else if (fullname === "System.String") {
            return (value_16) => value_16;
        }
        else if (fullname === "System.SByte") {
            return sbyte;
        }
        else if (fullname === "System.Byte") {
            return byte;
        }
        else if (fullname === "System.Int16") {
            return int16;
        }
        else if (fullname === "System.UInt16") {
            return uint16;
        }
        else if (fullname === "System.Int32") {
            return (value_22) => value_22;
        }
        else if (fullname === "System.UInt32") {
            return (value_24) => value_24;
        }
        else if (fullname === "System.Double") {
            return (value_26) => value_26;
        }
        else if (fullname === "System.Single") {
            return (value_28) => value_28;
        }
        else if (fullname === "System.DateTime") {
            return datetime;
        }
        else if (fullname === "System.DateTimeOffset") {
            return datetimeOffset;
        }
        else if (fullname === "System.TimeSpan") {
            return timespan;
        }
        else if (fullname === "System.Guid") {
            return guid;
        }
        else if (fullname === "System.Object") {
            return (x_1) => x_1;
        }
        else {
            return autoEncodeRecordsAndUnions(extra, caseStrategy, skipNullField, t);
        }
    }
    else {
        const encoderRef = matchValue;
        return (v) => encoderRef.contents(v);
    }
}

function makeExtra(extra) {
    if (extra != null) {
        return map_3((_arg2, tupledArg) => (new FSharpRef(tupledArg[0])), extra.Coders);
    }
    else {
        return empty();
    }
}

export class Auto {
    constructor() {
    }
}

export function Auto$reflection() {
    return class_type("Thoth.Json.Encode.Auto", void 0, Auto);
}

export function Auto_generateEncoderCached_Z127D9D79(caseStrategy, extra, skipNullField, resolver) {
    let y_1, y;
    const t = value_34(resolver).ResolveType();
    const caseStrategy_1 = defaultArg(caseStrategy, new CaseStrategy(0));
    const skipNullField_1 = defaultArg(skipNullField, true);
    return Util_Cache$1__GetOrAdd_43981464(Util_CachedEncoders, (y_1 = (y = fullName(t), toString_5(caseStrategy_1) + y), defaultArg(map((e) => e.Hash, extra), "") + y_1), () => autoEncoder(makeExtra(extra), caseStrategy_1, skipNullField_1, t));
}

export function Auto_generateEncoder_Z127D9D79(caseStrategy, extra, skipNullField, resolver) {
    const caseStrategy_1 = defaultArg(caseStrategy, new CaseStrategy(0));
    const skipNullField_1 = defaultArg(skipNullField, true);
    const t = value_34(resolver).ResolveType();
    return autoEncoder(makeExtra(extra), caseStrategy_1, skipNullField_1, t);
}

export function Auto_toString_5A41365E(space, value, caseStrategy, extra, skipNullField, resolver) {
    return toString(space, Auto_generateEncoder_Z127D9D79(caseStrategy, extra, skipNullField, resolver)(value));
}

export function encode(space, value) {
    return toString(space, value);
}
