/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("tsickle/src/type-translator", ["require", "exports", "path", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var path = require("path");
    var ts = require("typescript");
    /**
     * Determines if fileName refers to a builtin lib.d.ts file.
     * This is a terrible hack but it mirrors a similar thing done in Clutz.
     */
    function isBuiltinLibDTS(fileName) {
        return fileName.match(/\blib\.(?:[^/]+\.)?d\.ts$/) != null;
    }
    exports.isBuiltinLibDTS = isBuiltinLibDTS;
    /**
     * @return True if the named type is considered compatible with the Closure-defined
     *     type of the same name, e.g. "Array".  Note that we don't actually enforce
     *     that the types are actually compatible, but mostly just hope that they are due
     *     to being derived from the same HTML specs.
     */
    function isClosureProvidedType(symbol) {
        return symbol.declarations != null &&
            symbol.declarations.some(function (n) { return isBuiltinLibDTS(n.getSourceFile().fileName); });
    }
    function typeToDebugString(type) {
        var debugString = "flags:0x" + type.flags.toString(16);
        if (type.aliasSymbol) {
            debugString += " alias:" + symbolToDebugString(type.aliasSymbol);
        }
        if (type.aliasTypeArguments) {
            debugString += " aliasArgs:<" + type.aliasTypeArguments.map(typeToDebugString).join(',') + ">";
        }
        // Just the unique flags (powers of two). Declared in src/compiler/types.ts.
        var basicTypes = [
            ts.TypeFlags.Any, ts.TypeFlags.String, ts.TypeFlags.Number,
            ts.TypeFlags.Boolean, ts.TypeFlags.Enum, ts.TypeFlags.StringLiteral,
            ts.TypeFlags.NumberLiteral, ts.TypeFlags.BooleanLiteral, ts.TypeFlags.EnumLiteral,
            ts.TypeFlags.ESSymbol, ts.TypeFlags.Void, ts.TypeFlags.Undefined,
            ts.TypeFlags.Null, ts.TypeFlags.Never, ts.TypeFlags.TypeParameter,
            ts.TypeFlags.Object, ts.TypeFlags.Union, ts.TypeFlags.Intersection,
            ts.TypeFlags.Index, ts.TypeFlags.IndexedAccess, ts.TypeFlags.NonPrimitive,
        ];
        try {
            for (var basicTypes_1 = __values(basicTypes), basicTypes_1_1 = basicTypes_1.next(); !basicTypes_1_1.done; basicTypes_1_1 = basicTypes_1.next()) {
                var flag = basicTypes_1_1.value;
                if ((type.flags & flag) !== 0) {
                    debugString += " " + ts.TypeFlags[flag];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (basicTypes_1_1 && !basicTypes_1_1.done && (_a = basicTypes_1.return)) _a.call(basicTypes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (type.flags === ts.TypeFlags.Object) {
            var objType = type;
            // Just the unique flags (powers of two). Declared in src/compiler/types.ts.
            var objectFlags = [
                ts.ObjectFlags.Class,
                ts.ObjectFlags.Interface,
                ts.ObjectFlags.Reference,
                ts.ObjectFlags.Tuple,
                ts.ObjectFlags.Anonymous,
                ts.ObjectFlags.Mapped,
                ts.ObjectFlags.Instantiated,
                ts.ObjectFlags.ObjectLiteral,
                ts.ObjectFlags.EvolvingArray,
                ts.ObjectFlags.ObjectLiteralPatternWithComputedProperties,
            ];
            try {
                for (var objectFlags_1 = __values(objectFlags), objectFlags_1_1 = objectFlags_1.next(); !objectFlags_1_1.done; objectFlags_1_1 = objectFlags_1.next()) {
                    var flag = objectFlags_1_1.value;
                    if ((objType.objectFlags & flag) !== 0) {
                        debugString += " object:" + ts.ObjectFlags[flag];
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (objectFlags_1_1 && !objectFlags_1_1.done && (_b = objectFlags_1.return)) _b.call(objectFlags_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (type.symbol && type.symbol.name !== '__type') {
            debugString += " symbol.name:" + JSON.stringify(type.symbol.name);
        }
        if (type.pattern) {
            debugString += " destructuring:true";
        }
        return "{type " + debugString + "}";
        var e_1, _a, e_2, _b;
    }
    exports.typeToDebugString = typeToDebugString;
    function symbolToDebugString(sym) {
        var debugString = JSON.stringify(sym.name) + " flags:0x" + sym.flags.toString(16);
        // Just the unique flags (powers of two). Declared in src/compiler/types.ts.
        var symbolFlags = [
            ts.SymbolFlags.FunctionScopedVariable,
            ts.SymbolFlags.BlockScopedVariable,
            ts.SymbolFlags.Property,
            ts.SymbolFlags.EnumMember,
            ts.SymbolFlags.Function,
            ts.SymbolFlags.Class,
            ts.SymbolFlags.Interface,
            ts.SymbolFlags.ConstEnum,
            ts.SymbolFlags.RegularEnum,
            ts.SymbolFlags.ValueModule,
            ts.SymbolFlags.NamespaceModule,
            ts.SymbolFlags.TypeLiteral,
            ts.SymbolFlags.ObjectLiteral,
            ts.SymbolFlags.Method,
            ts.SymbolFlags.Constructor,
            ts.SymbolFlags.GetAccessor,
            ts.SymbolFlags.SetAccessor,
            ts.SymbolFlags.Signature,
            ts.SymbolFlags.TypeParameter,
            ts.SymbolFlags.TypeAlias,
            ts.SymbolFlags.ExportValue,
            ts.SymbolFlags.Alias,
            ts.SymbolFlags.Prototype,
            ts.SymbolFlags.ExportStar,
            ts.SymbolFlags.Optional,
            ts.SymbolFlags.Transient,
        ];
        try {
            for (var symbolFlags_1 = __values(symbolFlags), symbolFlags_1_1 = symbolFlags_1.next(); !symbolFlags_1_1.done; symbolFlags_1_1 = symbolFlags_1.next()) {
                var flag = symbolFlags_1_1.value;
                if ((sym.flags & flag) !== 0) {
                    debugString += " " + ts.SymbolFlags[flag];
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (symbolFlags_1_1 && !symbolFlags_1_1.done && (_a = symbolFlags_1.return)) _a.call(symbolFlags_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return debugString;
        var e_3, _a;
    }
    exports.symbolToDebugString = symbolToDebugString;
    /** TypeTranslator translates TypeScript types to Closure types. */
    var TypeTranslator = /** @class */ (function () {
        /**
         * @param node is the source AST ts.Node the type comes from.  This is used
         *     in some cases (e.g. anonymous types) for looking up field names.
         * @param pathBlackList is a set of paths that should never get typed;
         *     any reference to symbols defined in these paths should by typed
         *     as {?}.
         * @param symbolsToAliasedNames a mapping from symbols (`Foo`) to a name in scope they should be
         *     emitted as (e.g. `tsickle_forward_declare_1.Foo`). Can be augmented during type
         *     translation, e.g. to blacklist a symbol.
         */
        function TypeTranslator(typeChecker, node, pathBlackList, symbolsToAliasedNames) {
            if (symbolsToAliasedNames === void 0) { symbolsToAliasedNames = new Map(); }
            this.typeChecker = typeChecker;
            this.node = node;
            this.pathBlackList = pathBlackList;
            this.symbolsToAliasedNames = symbolsToAliasedNames;
            /**
             * A list of type literals we've encountered while emitting; used to avoid getting stuck in
             * recursive types.
             */
            this.seenTypeLiterals = new Set();
            /**
             * Whether to write types suitable for an \@externs file. Externs types must not refer to
             * non-externs types (i.e. non ambient types) and need to use fully qualified names.
             */
            this.isForExterns = false;
            // Normalize paths to not break checks on Windows.
            if (this.pathBlackList != null) {
                this.pathBlackList =
                    new Set(Array.from(this.pathBlackList.values()).map(function (p) { return path.normalize(p); }));
            }
        }
        /**
         * Converts a ts.Symbol to a string.
         * Other approaches that don't work:
         * - TypeChecker.typeToString translates Array as T[].
         * - TypeChecker.symbolToString emits types without their namespace,
         *   and doesn't let you pass the flag to control that.
         * @param useFqn whether to scope the name using its fully qualified name. Closure's template
         *     arguments are always scoped to the class containing them, where TypeScript's template args
         *     would be fully qualified. I.e. this flag is false for generic types.
         */
        TypeTranslator.prototype.symbolToString = function (sym, useFqn) {
            // This follows getSingleLineStringWriter in the TypeScript compiler.
            var str = '';
            var symAlias = sym;
            if (symAlias.flags & ts.SymbolFlags.Alias) {
                symAlias = this.typeChecker.getAliasedSymbol(symAlias);
            }
            var alias = this.symbolsToAliasedNames.get(symAlias);
            if (alias)
                return alias;
            if (useFqn && this.isForExterns) {
                // For regular type emit, we can use TypeScript's naming rules, as they match Closure's name
                // scoping rules. However when emitting externs files for ambients, naming rules change. As
                // Closure doesn't support externs modules, all names must be global and use global fully
                // qualified names. The code below uses TypeScript to convert a symbol to a full qualified
                // name and then emits that.
                var fqn = this.typeChecker.getFullyQualifiedName(sym);
                if (fqn.startsWith("\"") || fqn.startsWith("'")) {
                    // Quoted FQNs mean the name is from a module, e.g. `'path/to/module'.some.qualified.Name`.
                    // tsickle generally re-scopes names in modules that are moved to externs into the global
                    // namespace. That does not quite match TS' semantics where ambient types from modules are
                    // local. However value declarations that are local to modules but not defined do not make
                    // sense if not global, e.g. "declare class X {}; new X();" cannot work unless `X` is
                    // actually a global.
                    // So this code strips the module path from the type and uses the FQN as a global.
                    fqn = fqn.replace(/^["'][^"']+['"]\./, '');
                }
                // Declarations in module can re-open global types using "declare global { ... }". The fqn
                // then contains the prefix "global." here. As we're mapping to global types, just strip the
                // prefix.
                var isInGlobal = (sym.declarations || []).some(function (d) {
                    var current = d;
                    while (current) {
                        if (current.flags & ts.NodeFlags.GlobalAugmentation)
                            return true;
                        current = current.parent;
                    }
                    return false;
                });
                if (isInGlobal) {
                    fqn = fqn.replace(/^global\./, '');
                }
                return this.stripClutzNamespace(fqn);
            }
            var writeText = function (text) { return str += text; };
            var doNothing = function () {
                return;
            };
            var builder = this.typeChecker.getSymbolDisplayBuilder();
            var writer = {
                writeKeyword: writeText,
                writeOperator: writeText,
                writePunctuation: writeText,
                writeSpace: writeText,
                writeStringLiteral: writeText,
                writeParameter: writeText,
                writeProperty: writeText,
                writeSymbol: writeText,
                writeLine: doNothing,
                increaseIndent: doNothing,
                decreaseIndent: doNothing,
                clear: doNothing,
                trackSymbol: function (symbol, enclosingDeclaration, meaning) {
                    return;
                },
                reportInaccessibleThisError: doNothing,
                reportPrivateInBaseOfClassExpression: doNothing,
            };
            builder.buildSymbolDisplay(sym, writer, this.node);
            return this.stripClutzNamespace(str);
        };
        // Clutz (https://github.com/angular/clutz) emits global type symbols hidden in a special
        // ಠ_ಠ.clutz namespace. While most code seen by Tsickle will only ever see local aliases, Clutz
        // symbols can be written by users directly in code, and they can appear by dereferencing
        // TypeAliases. The code below simply strips the prefix, the remaining type name then matches
        // Closure's type.
        TypeTranslator.prototype.stripClutzNamespace = function (name) {
            if (name.startsWith('ಠ_ಠ.clutz.'))
                return name.substring('ಠ_ಠ.clutz.'.length);
            return name;
        };
        TypeTranslator.prototype.translate = function (type, resolveAlias) {
            // NOTE: Though type.flags has the name "flags", it usually can only be one
            // of the enum options at a time (except for unions of literal types, e.g. unions of boolean
            // values, string values, enum values). This switch handles all the cases in the ts.TypeFlags
            // enum in the order they occur.
            if (resolveAlias === void 0) { resolveAlias = false; }
            // NOTE: Some TypeFlags are marked "internal" in the d.ts but still show up in the value of
            // type.flags. This mask limits the flag checks to the ones in the public API. "lastFlag" here
            // is the last flag handled in this switch statement, and should be kept in sync with
            // typescript.d.ts.
            // NonPrimitive occurs on its own on the lower case "object" type. Special case to "!Object".
            if (type.flags === ts.TypeFlags.NonPrimitive)
                return '!Object';
            // Avoid infinite loops on recursive type literals.
            // It would be nice to just emit the name of the recursive type here (in type.aliasSymbol
            // below), but Closure Compiler does not allow recursive type definitions.
            if (this.seenTypeLiterals.has(type))
                return '?';
            // If type is an alias, e.g. from type X = A|B, then always emit the alias, not the underlying
            // union type, as the alias is the user visible, imported symbol.
            if (!resolveAlias && type.aliasSymbol) {
                return this.symbolToString(type.aliasSymbol, /* useFqn */ true);
            }
            var isAmbient = false;
            var isNamespace = false;
            var isModule = false;
            if (type.symbol) {
                try {
                    for (var _a = __values(type.symbol.declarations || []), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var decl = _b.value;
                        if (ts.isExternalModule(decl.getSourceFile()))
                            isModule = true;
                        var current = decl;
                        while (current) {
                            if (ts.getCombinedModifierFlags(current) & ts.ModifierFlags.Ambient)
                                isAmbient = true;
                            if (current.kind === ts.SyntaxKind.ModuleDeclaration)
                                isNamespace = true;
                            current = current.parent;
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
            // tsickle cannot generate types for non-ambient namespaces.
            if (isNamespace && !isAmbient)
                return '?';
            // Types in externs cannot reference types from external modules.
            // However ambient types in modules get moved to externs, too, so type references work and we
            // can emit a precise type.
            if (this.isForExterns && isModule && !isAmbient)
                return '?';
            var lastFlag = ts.TypeFlags.IndexedAccess;
            var mask = (lastFlag << 1) - 1;
            switch (type.flags & mask) {
                case ts.TypeFlags.Any:
                    return '?';
                case ts.TypeFlags.String:
                case ts.TypeFlags.StringLiteral:
                    return 'string';
                case ts.TypeFlags.Number:
                case ts.TypeFlags.NumberLiteral:
                    return 'number';
                case ts.TypeFlags.Boolean:
                case ts.TypeFlags.BooleanLiteral:
                    // See the note in translateUnion about booleans.
                    return 'boolean';
                case ts.TypeFlags.Enum:
                    if (!type.symbol) {
                        this.warn("EnumType without a symbol");
                        return '?';
                    }
                    return this.symbolToString(type.symbol, true);
                case ts.TypeFlags.ESSymbol:
                    // NOTE: currently this is just a typedef for {?}, shrug.
                    // https://github.com/google/closure-compiler/blob/55cf43ee31e80d89d7087af65b5542aa63987874/externs/es3.js#L34
                    return 'symbol';
                case ts.TypeFlags.Void:
                    return 'void';
                case ts.TypeFlags.Undefined:
                    return 'undefined';
                case ts.TypeFlags.Null:
                    return 'null';
                case ts.TypeFlags.Never:
                    this.warn("should not emit a 'never' type");
                    return '?';
                case ts.TypeFlags.TypeParameter:
                    // This is e.g. the T in a type like Foo<T>.
                    if (!type.symbol) {
                        this.warn("TypeParameter without a symbol"); // should not happen (tm)
                        return '?';
                    }
                    // In Closure Compiler, type parameters *are* scoped to their containing class.
                    var useFqn = false;
                    return this.symbolToString(type.symbol, useFqn);
                case ts.TypeFlags.Object:
                    return this.translateObject(type);
                case ts.TypeFlags.Union:
                    return this.translateUnion(type);
                case ts.TypeFlags.Intersection:
                case ts.TypeFlags.Index:
                case ts.TypeFlags.IndexedAccess:
                    // TODO(ts2.1): handle these special types.
                    this.warn("unhandled type flags: " + ts.TypeFlags[type.flags]);
                    return '?';
                default:
                    // Handle cases where multiple flags are set.
                    // Types with literal members are represented as
                    //   ts.TypeFlags.Union | [literal member]
                    // E.g. an enum typed value is a union type with the enum's members as its members. A
                    // boolean type is a union type with 'true' and 'false' as its members.
                    // Note also that in a more complex union, e.g. boolean|number, then it's a union of three
                    // things (true|false|number) and ts.TypeFlags.Boolean doesn't show up at all.
                    if (type.flags & ts.TypeFlags.Union) {
                        return this.translateUnion(type);
                    }
                    if (type.flags & ts.TypeFlags.EnumLiteral) {
                        return this.translateEnumLiteral(type);
                    }
                    // The switch statement should have been exhaustive.
                    throw new Error("unknown type flags " + type.flags + " on " + typeToDebugString(type));
            }
            var e_4, _c;
        };
        TypeTranslator.prototype.translateUnion = function (type) {
            var _this = this;
            var parts = type.types.map(function (t) { return _this.translate(t); });
            // Union types that include literals (e.g. boolean, enum) can end up repeating the same Closure
            // type. For example: true | boolean will be translated to boolean | boolean.
            // Remove duplicates to produce types that read better.
            parts = parts.filter(function (el, idx) { return parts.indexOf(el) === idx; });
            return parts.length === 1 ? parts[0] : "(" + parts.join('|') + ")";
        };
        TypeTranslator.prototype.translateEnumLiteral = function (type) {
            // Suppose you had:
            //   enum EnumType { MEMBER }
            // then the type of "EnumType.MEMBER" is an enum literal (the thing passed to this function)
            // and it has type flags that include
            //   ts.TypeFlags.NumberLiteral | ts.TypeFlags.EnumLiteral
            //
            // Closure Compiler doesn't support literals in types, so this code must not emit
            // "EnumType.MEMBER", but rather "EnumType".
            var enumLiteralBaseType = this.typeChecker.getBaseTypeOfLiteralType(type);
            if (!enumLiteralBaseType.symbol) {
                this.warn("EnumLiteralType without a symbol");
                return '?';
            }
            return this.symbolToString(enumLiteralBaseType.symbol, true);
        };
        // translateObject translates a ts.ObjectType, which is the type of all
        // object-like things in TS, such as classes and interfaces.
        TypeTranslator.prototype.translateObject = function (type) {
            var _this = this;
            if (type.symbol && this.isBlackListed(type.symbol))
                return '?';
            // NOTE: objectFlags is an enum, but a given type can have multiple flags.
            // Array<string> is both ts.ObjectFlags.Reference and ts.ObjectFlags.Interface.
            if (type.objectFlags & ts.ObjectFlags.Class) {
                if (!type.symbol) {
                    this.warn('class has no symbol');
                    return '?';
                }
                return '!' + this.symbolToString(type.symbol, /* useFqn */ true);
            }
            else if (type.objectFlags & ts.ObjectFlags.Interface) {
                // Note: ts.InterfaceType has a typeParameters field, but that
                // specifies the parameters that the interface type *expects*
                // when it's used, and should not be transformed to the output.
                // E.g. a type like Array<number> is a TypeReference to the
                // InterfaceType "Array", but the "number" type parameter is
                // part of the outer TypeReference, not a typeParameter on
                // the InterfaceType.
                if (!type.symbol) {
                    this.warn('interface has no symbol');
                    return '?';
                }
                if (type.symbol.flags & ts.SymbolFlags.Value) {
                    // The symbol is both a type and a value.
                    // For user-defined types in this state, we don't have a Closure name
                    // for the type.  See the type_and_value test.
                    if (!isClosureProvidedType(type.symbol)) {
                        this.warn("type/symbol conflict for " + type.symbol.name + ", using {?} for now");
                        return '?';
                    }
                }
                return '!' + this.symbolToString(type.symbol, /* useFqn */ true);
            }
            else if (type.objectFlags & ts.ObjectFlags.Reference) {
                // A reference to another type, e.g. Array<number> refers to Array.
                // Emit the referenced type and any type arguments.
                var referenceType = type;
                // A tuple is a ReferenceType where the target is flagged Tuple and the
                // typeArguments are the tuple arguments.  Just treat it as a mystery
                // array, because Closure doesn't understand tuples.
                if (referenceType.target.objectFlags & ts.ObjectFlags.Tuple) {
                    return '!Array<?>';
                }
                var typeStr = '';
                if (referenceType.target === referenceType) {
                    // We get into an infinite loop here if the inner reference is
                    // the same as the outer; this can occur when this function
                    // fails to translate a more specific type before getting to
                    // this point.
                    throw new Error("reference loop in " + typeToDebugString(referenceType) + " " + referenceType.flags);
                }
                typeStr += this.translate(referenceType.target);
                // Translate can return '?' for a number of situations, e.g. type/value conflicts.
                // `?<?>` is illegal syntax in Closure Compiler, so just return `?` here.
                if (typeStr === '?')
                    return '?';
                if (referenceType.typeArguments) {
                    var params = referenceType.typeArguments.map(function (t) { return _this.translate(t); });
                    typeStr += "<" + params.join(', ') + ">";
                }
                return typeStr;
            }
            else if (type.objectFlags & ts.ObjectFlags.Anonymous) {
                if (!type.symbol) {
                    // This comes up when generating code for an arrow function as passed
                    // to a generic function.  The passed-in type is tagged as anonymous
                    // and has no properties so it's hard to figure out what to generate.
                    // Just avoid it for now so we don't crash.
                    this.warn('anonymous type has no symbol');
                    return '?';
                }
                if (type.symbol.flags & ts.SymbolFlags.TypeLiteral) {
                    return this.translateTypeLiteral(type);
                }
                else if (type.symbol.flags & ts.SymbolFlags.Function ||
                    type.symbol.flags & ts.SymbolFlags.Method) {
                    var sigs = this.typeChecker.getSignaturesOfType(type, ts.SignatureKind.Call);
                    if (sigs.length === 1) {
                        return this.signatureToClosure(sigs[0]);
                    }
                }
                this.warn('unhandled anonymous type');
                return '?';
            }
            /*
            TODO(ts2.1): more unhandled object type flags:
              Tuple
              Mapped
              Instantiated
              ObjectLiteral
              EvolvingArray
              ObjectLiteralPatternWithComputedProperties
            */
            this.warn("unhandled type " + typeToDebugString(type));
            return '?';
        };
        /**
         * translateTypeLiteral translates a ts.SymbolFlags.TypeLiteral type, which
         * is the anonymous type encountered in e.g.
         *   let x: {a: number};
         */
        TypeTranslator.prototype.translateTypeLiteral = function (type) {
            this.seenTypeLiterals.add(type);
            // Gather up all the named fields and whether the object is also callable.
            var callable = false;
            var indexable = false;
            var fields = [];
            if (!type.symbol || !type.symbol.members) {
                this.warn('type literal has no symbol');
                return '?';
            }
            // special-case construct signatures.
            var ctors = type.getConstructSignatures();
            if (ctors.length) {
                // TODO(martinprobst): this does not support additional properties defined on constructors
                // (not expressible in Closure), nor multiple constructors (same).
                var params = this.convertParams(ctors[0]);
                var paramsStr = params.length ? (', ' + params.join(', ')) : '';
                var constructedType = this.translate(ctors[0].getReturnType());
                // In the specific case of the "new" in a function, it appears that
                //   function(new: !Bar)
                // fails to parse, while
                //   function(new: (!Bar))
                // parses in the way you'd expect.
                // It appears from testing that Closure ignores the ! anyway and just
                // assumes the result will be non-null in either case.  (To be pedantic,
                // it's possible to return null from a ctor it seems like a bad idea.)
                return "function(new: (" + constructedType + ")" + paramsStr + "): ?";
            }
            try {
                // members is an ES6 map, but the .d.ts defining it defined their own map
                // type, so typescript doesn't believe that .keys() is iterable
                // tslint:disable-next-line:no-any
                for (var _a = __values(type.symbol.members.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var field = _b.value;
                    switch (field) {
                        case '__call':
                            callable = true;
                            break;
                        case '__index':
                            indexable = true;
                            break;
                        default:
                            var member = type.symbol.members.get(field);
                            // optional members are handled by the type including |undefined in a union type.
                            var memberType = this.translate(this.typeChecker.getTypeOfSymbolAtLocation(member, this.node));
                            fields.push(field + ": " + memberType);
                            break;
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_5) throw e_5.error; }
            }
            // Try to special-case plain key-value objects and functions.
            if (fields.length === 0) {
                if (callable && !indexable) {
                    // A function type.
                    var sigs = this.typeChecker.getSignaturesOfType(type, ts.SignatureKind.Call);
                    if (sigs.length === 1) {
                        return this.signatureToClosure(sigs[0]);
                    }
                }
                else if (indexable && !callable) {
                    // A plain key-value map type.
                    var keyType = 'string';
                    var valType = this.typeChecker.getIndexTypeOfType(type, ts.IndexKind.String);
                    if (!valType) {
                        keyType = 'number';
                        valType = this.typeChecker.getIndexTypeOfType(type, ts.IndexKind.Number);
                    }
                    if (!valType) {
                        this.warn('unknown index key type');
                        return "!Object<?,?>";
                    }
                    return "!Object<" + keyType + "," + this.translate(valType) + ">";
                }
                else if (!callable && !indexable) {
                    // Special-case the empty object {} because Closure doesn't like it.
                    // TODO(evanm): revisit this if it is a problem.
                    return '!Object';
                }
            }
            if (!callable && !indexable) {
                // Not callable, not indexable; implies a plain object with fields in it.
                return "{" + fields.join(', ') + "}";
            }
            this.warn('unhandled type literal');
            return '?';
            var e_5, _c;
        };
        /** Converts a ts.Signature (function signature) to a Closure function type. */
        TypeTranslator.prototype.signatureToClosure = function (sig) {
            // TODO(martinprobst): Consider harmonizing some overlap with emitFunctionType in tsickle.ts.
            this.blacklistTypeParameters(this.symbolsToAliasedNames, sig.declaration.typeParameters);
            var params = this.convertParams(sig);
            var typeStr = "function(" + params.join(', ') + ")";
            var retType = this.translate(this.typeChecker.getReturnTypeOfSignature(sig));
            if (retType) {
                typeStr += ": " + retType;
            }
            return typeStr;
        };
        TypeTranslator.prototype.convertParams = function (sig) {
            var paramTypes = [];
            // The Signature itself does not include information on optional and var arg parameters.
            // Use its declaration to recover that information.
            var decl = sig.declaration;
            for (var i = 0; i < sig.parameters.length; i++) {
                var param = sig.parameters[i];
                var paramDecl = decl.parameters[i];
                var optional = !!paramDecl.questionToken;
                var varArgs = !!paramDecl.dotDotDotToken;
                var paramType = this.typeChecker.getTypeOfSymbolAtLocation(param, this.node);
                if (varArgs) {
                    var typeRef = paramType;
                    paramType = typeRef.typeArguments[0];
                }
                var typeStr = this.translate(paramType);
                if (varArgs)
                    typeStr = '...' + typeStr;
                if (optional)
                    typeStr = typeStr + '=';
                paramTypes.push(typeStr);
            }
            return paramTypes;
        };
        TypeTranslator.prototype.warn = function (msg) {
            // By default, warn() does nothing.  The caller will overwrite this
            // if it wants different behavior.
        };
        /** @return true if sym should always have type {?}. */
        TypeTranslator.prototype.isBlackListed = function (symbol) {
            if (this.pathBlackList === undefined)
                return false;
            var pathBlackList = this.pathBlackList;
            // Some builtin types, such as {}, get represented by a symbol that has no declarations.
            if (symbol.declarations === undefined)
                return false;
            return symbol.declarations.every(function (n) {
                var fileName = path.normalize(n.getSourceFile().fileName);
                return pathBlackList.has(fileName);
            });
        };
        /**
         * Closure doesn not support type parameters for function types, i.e. generic function types.
         * Blacklist the symbols declared by them and emit a ? for the types.
         *
         * This mutates the given blacklist map. The map's scope is one file, and symbols are
         * unique objects, so this should neither lead to excessive memory consumption nor introduce
         * errors.
         *
         * @param blacklist a map to store the blacklisted symbols in, with a value of '?'. In practice,
         *     this is always === this.symbolsToAliasedNames, but we're passing it explicitly to make it
         *    clear that the map is mutated (in particular when used from outside the class).
         * @param decls the declarations whose symbols should be blacklisted.
         */
        TypeTranslator.prototype.blacklistTypeParameters = function (blacklist, decls) {
            if (!decls || !decls.length)
                return;
            try {
                for (var decls_1 = __values(decls), decls_1_1 = decls_1.next(); !decls_1_1.done; decls_1_1 = decls_1.next()) {
                    var tpd = decls_1_1.value;
                    var sym = this.typeChecker.getSymbolAtLocation(tpd.name);
                    if (!sym) {
                        this.warn("type parameter with no symbol");
                        continue;
                    }
                    this.symbolsToAliasedNames.set(sym, '?');
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (decls_1_1 && !decls_1_1.done && (_a = decls_1.return)) _a.call(decls_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
            var e_6, _a;
        };
        return TypeTranslator;
    }());
    exports.TypeTranslator = TypeTranslator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS10cmFuc2xhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGUtdHJhbnNsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFSCwyQkFBNkI7SUFDN0IsK0JBQWlDO0lBR2pDOzs7T0FHRztJQUNILHlCQUFnQyxRQUFnQjtRQUM5QyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUM3RCxDQUFDO0lBRkQsMENBRUM7SUFFRDs7Ozs7T0FLRztJQUNILCtCQUErQixNQUFpQjtRQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxJQUFJO1lBQzlCLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsZUFBZSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRCwyQkFBa0MsSUFBYTtRQUM3QyxJQUFJLFdBQVcsR0FBRyxhQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBRyxDQUFDO1FBRXZELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLFdBQVcsSUFBSSxZQUFVLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUcsQ0FBQztRQUNuRSxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUM1QixXQUFXLElBQUksaUJBQWUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBRyxDQUFDO1FBQzVGLENBQUM7UUFFRCw0RUFBNEU7UUFD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QyxDQUFDO3dCQUMzQyxRQUFRLENBQUM7b0JBQ1gsQ0FBQztvQkFDRCxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDMUM7Ozs7Ozs7Ozs7UUFDSCxDQUFDO1FBQ0gscUJBQUM7SUFBRCxDQUFDLEFBM2lCRCxJQTJpQkM7SUEzaUJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQge2dldElkZW50aWZpZXJUZXh0fSBmcm9tICcuL3Jld3JpdGVyJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGZpbGVOYW1lIHJlZmVycyB0byBhIGJ1aWx0aW4gbGliLmQudHMgZmlsZS5cbiAqIFRoaXMgaXMgYSB0ZXJyaWJsZSBoYWNrIGJ1dCBpdCBtaXJyb3JzIGEgc2ltaWxhciB0aGluZyBkb25lIGluIENsdXR6LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCdWlsdGluTGliRFRTKGZpbGVOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGZpbGVOYW1lLm1hdGNoKC9cXGJsaWJcXC4oPzpbXi9dK1xcLik/ZFxcLnRzJC8pICE9IG51bGw7XG59XG5cbi8qKlxuICogQHJldHVybiBUcnVlIGlmIHRoZSBuYW1lZCB0eXBlIGlzIGNvbnNpZGVyZWQgY29tcGF0aWJsZSB3aXRoIHRoZSBDbG9zdXJlLWRlZmluZWRcbiAqICAgICB0eXBlIG9mIHRoZSBzYW1lIG5hbWUsIGUuZy4gXCJBcnJheVwiLiAgTm90ZSB0aGF0IHdlIGRvbid0IGFjdHVhbGx5IGVuZm9yY2VcbiAqICAgICB0aGF0IHRoZSB0eXBlcyBhcmUgYWN0dWFsbHkgY29tcGF0aWJsZSwgYnV0IG1vc3RseSBqdXN0IGhvcGUgdGhhdCB0aGV5IGFyZSBkdWVcbiAqICAgICB0byBiZWluZyBkZXJpdmVkIGZyb20gdGhlIHNhbWUgSFRNTCBzcGVjcy5cbiAqL1xuZnVuY3Rpb24gaXNDbG9zdXJlUHJvdmlkZWRUeXBlKHN5bWJvbDogdHMuU3ltYm9sKTogYm9vbGVhbiB7XG4gIHJldHVybiBzeW1ib2wuZGVjbGFyYXRpb25zICE9IG51bGwgJiZcbiAgICAgIHN5bWJvbC5kZWNsYXJhdGlvbnMuc29tZShuID0+IGlzQnVpbHRpbkxpYkRUUyhuLmdldFNvdXJjZUZpbGUoKS5maWxlTmFtZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHlwZVRvRGVidWdTdHJpbmcodHlwZTogdHMuVHlwZSk6IHN0cmluZyB7XG4gIGxldCBkZWJ1Z1N0cmluZyA9IGBmbGFnczoweCR7dHlwZS5mbGFncy50b1N0cmluZygxNil9YDtcblxuICBpZiAodHlwZS5hbGlhc1N5bWJvbCkge1xuICAgIGRlYnVnU3RyaW5nICs9IGAgYWxpYXM6JHtzeW1ib2xUb0RlYnVnU3RyaW5nKHR5cGUuYWxpYXNTeW1ib2wpfWA7XG4gIH1cbiAgaWYgKHR5cGUuYWxpYXNUeXBlQXJndW1lbnRzKSB7XG4gICAgZGVidWdTdHJpbmcgKz0gYCBhbGlhc0FyZ3M6PCR7dHlwZS5hbGlhc1R5cGVBcmd1bWVudHMubWFwKHR5cGVUb0RlYnVnU3RyaW5nKS5qb2luKCcsJyl9PmA7XG4gIH1cblxuICAvLyBKdXN0IHRoZSB1bmlxdWUgZmxhZ3MgKHBvd2VycyBvZiB0d28pLiBEZWNsYXJlZCBpbiBzcmMvY29tcGlsZXIvdHlwZXMudHMuXG4gIGNvbnN0IGJhc2ljVHlwZXM6IHRzLlR5cGVGbGFnc1tdID0gW1xuICAgIHRzLlR5cGVGbGFncy5BbnksICAgICAgICAgICB0cy5UeXBlRmxhZ3MuU3RyaW5nLCAgICAgICAgIHRzLlR5cGVGbGFncy5OdW1iZXIsXG4gICAgdHMuVHlwZUZsYWdzLkJvb2xlYW4sICAgICAgIHRzLlR5cGVGbGFncy5FbnVtLCAgICAgICAgICAgdHMuVHlwZUZsYWdzLlN0cmluZ0xpdGVyYWwsXG4gICAgdHMuVHlwZUZsYWdzLk51bWJlckxpdGVyYWwsIHRzLlR5cGVGbGFncy5Cb29sZWFuTGl0ZXJhbCwgdHMuVHlwZUZsYWdzLkVudW1MaXRlcmFsLFxuICAgIHRzLlR5cGVGbGFncy5FU1N5bWJvbCwgICAgICB0cy5UeXBlRmxhZ3MuVm9pZCwgICAgICAgICAgIHRzLlR5cGVGbGFncy5VbmRlZmluZWQsXG4gICAgdHMuVHlwZUZsYWdzLk51bGwsICAgICAgICAgIHRzLlR5cGVGbGFncy5OZXZlciwgICAgICAgICAgdHMuVHlwZUZsYWdzLlR5cGVQYXJhbWV0ZXIsXG4gICAgdHMuVHlwZUZsYWdzLk9iamVjdCwgICAgICAgIHRzLlR5cGVGbGFncy5VbmlvbiwgICAgICAgICAgdHMuVHlwZUZsYWdzLkludGVyc2VjdGlvbixcbiAgICB0cy5UeXBlRmxhZ3MuSW5kZXgsICAgICAgICAgdHMuVHlwZUZsYWdzLkluZGV4ZWRBY2Nlc3MsICB0cy5UeXBlRmxhZ3MuTm9uUHJpbWl0aXZlLFxuICBdO1xuICBmb3IgKGNvbnN0IGZsYWcgb2YgYmFzaWNUeXBlcykge1xuICAgIGlmICgodHlwZS5mbGFncyAmIGZsYWcpICE9PSAwKSB7XG4gICAgICBkZWJ1Z1N0cmluZyArPSBgICR7dHMuVHlwZUZsYWdzW2ZsYWddfWA7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGUuZmxhZ3MgPT09IHRzLlR5cGVGbGFncy5PYmplY3QpIHtcbiAgICBjb25zdCBvYmpUeXBlID0gdHlwZSBhcyB0cy5PYmplY3RUeXBlO1xuICAgIC8vIEp1c3QgdGhlIHVuaXF1ZSBmbGFncyAocG93ZXJzIG9mIHR3bykuIERlY2xhcmVkIGluIHNyYy9jb21waWxlci90eXBlcy50cy5cbiAgICBjb25zdCBvYmplY3RGbGFnczogdHMuT2JqZWN0RmxhZ3NbXSA9IFtcbiAgICAgIHRzLk9iamVjdEZsYWdzLkNsYXNzLFxuICAgICAgdHMuT2JqZWN0RmxhZ3MuSW50ZXJmYWNlLFxuICAgICAgdHMuT2JqZWN0RmxhZ3MuUmVmZXJlbmNlLFxuICAgICAgdHMuT2JqZWN0RmxhZ3MuVHVwbGUsXG4gICAgICB0cy5PYmplY3RGbGFncy5Bbm9ueW1vdXMsXG4gICAgICB0cy5PYmplY3RGbGFncy5NYXBwZWQsXG4gICAgICB0cy5PYmplY3RGbGFncy5JbnN0YW50aWF0ZWQsXG4gICAgICB0cy5PYmplY3RGbGFncy5PYmplY3RMaXRlcmFsLFxuICAgICAgdHMuT2JqZWN0RmxhZ3MuRXZvbHZpbmdBcnJheSxcbiAgICAgIHRzLk9iamVjdEZsYWdzLk9iamVjdExpdGVyYWxQYXR0ZXJuV2l0aENvbXB1dGVkUHJvcGVydGllcyxcbiAgICBdO1xuICAgIGZvciAoY29uc3QgZmxhZyBvZiBvYmplY3RGbGFncykge1xuICAgICAgaWYgKChvYmpUeXBlLm9iamVjdEZsYWdzICYgZmxhZykgIT09IDApIHtcbiAgICAgICAgZGVidWdTdHJpbmcgKz0gYCBvYmplY3Q6JHt0cy5PYmplY3RGbGFnc1tmbGFnXX1gO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlLnN5bWJvbCAmJiB0eXBlLnN5bWJvbC5uYW1lICE9PSAnX190eXBlJykge1xuICAgIGRlYnVnU3RyaW5nICs9IGAgc3ltYm9sLm5hbWU6JHtKU09OLnN0cmluZ2lmeSh0eXBlLnN5bWJvbC5uYW1lKX1gO1xuICB9XG5cbiAgaWYgKHR5cGUucGF0dGVybikge1xuICAgIGRlYnVnU3RyaW5nICs9IGAgZGVzdHJ1Y3R1cmluZzp0cnVlYDtcbiAgfVxuXG4gIHJldHVybiBge3R5cGUgJHtkZWJ1Z1N0cmluZ319YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbFRvRGVidWdTdHJpbmcoc3ltOiB0cy5TeW1ib2wpOiBzdHJpbmcge1xuICBsZXQgZGVidWdTdHJpbmcgPSBgJHtKU09OLnN0cmluZ2lmeShzeW0ubmFtZSl9IGZsYWdzOjB4JHtzeW0uZmxhZ3MudG9TdHJpbmcoMTYpfWA7XG5cbiAgLy8gSnVzdCB0aGUgdW5pcXVlIGZsYWdzIChwb3dlcnMgb2YgdHdvKS4gRGVjbGFyZWQgaW4gc3JjL2NvbXBpbGVyL3R5cGVzLnRzLlxuICBjb25zdCBzeW1ib2xGbGFncyA9IFtcbiAgICB0cy5TeW1ib2xGbGFncy5GdW5jdGlvblNjb3BlZFZhcmlhYmxlLFxuICAgIHRzLlN5bWJvbEZsYWdzLkJsb2NrU2NvcGVkVmFyaWFibGUsXG4gICAgdHMuU3ltYm9sRmxhZ3MuUHJvcGVydHksXG4gICAgdHMuU3ltYm9sRmxhZ3MuRW51bU1lbWJlcixcbiAgICB0cy5TeW1ib2xGbGFncy5GdW5jdGlvbixcbiAgICB0cy5TeW1ib2xGbGFncy5DbGFzcyxcbiAgICB0cy5TeW1ib2xGbGFncy5JbnRlcmZhY2UsXG4gICAgdHMuU3ltYm9sRmxhZ3MuQ29uc3RFbnVtLFxuICAgIHRzLlN5bWJvbEZsYWdzLlJlZ3VsYXJFbnVtLFxuICAgIHRzLlN5bWJvbEZsYWdzLlZhbHVlTW9kdWxlLFxuICAgIHRzLlN5bWJvbEZsYWdzLk5hbWVzcGFjZU1vZHVsZSxcbiAgICB0cy5TeW1ib2xGbGFncy5UeXBlTGl0ZXJhbCxcbiAgICB0cy5TeW1ib2xGbGFncy5PYmplY3RMaXRlcmFsLFxuICAgIHRzLlN5bWJvbEZsYWdzLk1ldGhvZCxcbiAgICB0cy5TeW1ib2xGbGFncy5Db25zdHJ1Y3RvcixcbiAgICB0cy5TeW1ib2xGbGFncy5HZXRBY2Nlc3NvcixcbiAgICB0cy5TeW1ib2xGbGFncy5TZXRBY2Nlc3NvcixcbiAgICB0cy5TeW1ib2xGbGFncy5TaWduYXR1cmUsXG4gICAgdHMuU3ltYm9sRmxhZ3MuVHlwZVBhcmFtZXRlcixcbiAgICB0cy5TeW1ib2xGbGFncy5UeXBlQWxpYXMsXG4gICAgdHMuU3ltYm9sRmxhZ3MuRXhwb3J0VmFsdWUsXG4gICAgdHMuU3ltYm9sRmxhZ3MuQWxpYXMsXG4gICAgdHMuU3ltYm9sRmxhZ3MuUHJvdG90eXBlLFxuICAgIHRzLlN5bWJvbEZsYWdzLkV4cG9ydFN0YXIsXG4gICAgdHMuU3ltYm9sRmxhZ3MuT3B0aW9uYWwsXG4gICAgdHMuU3ltYm9sRmxhZ3MuVHJhbnNpZW50LFxuICBdO1xuICBmb3IgKGNvbnN0IGZsYWcgb2Ygc3ltYm9sRmxhZ3MpIHtcbiAgICBpZiAoKHN5bS5mbGFncyAmIGZsYWcpICE9PSAwKSB7XG4gICAgICBkZWJ1Z1N0cmluZyArPSBgICR7dHMuU3ltYm9sRmxhZ3NbZmxhZ119YDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGVidWdTdHJpbmc7XG59XG5cbi8qKiBUeXBlVHJhbnNsYXRvciB0cmFuc2xhdGVzIFR5cGVTY3JpcHQgdHlwZXMgdG8gQ2xvc3VyZSB0eXBlcy4gKi9cbmV4cG9ydCBjbGFzcyBUeXBlVHJhbnNsYXRvciB7XG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgdHlwZSBsaXRlcmFscyB3ZSd2ZSBlbmNvdW50ZXJlZCB3aGlsZSBlbWl0dGluZzsgdXNlZCB0byBhdm9pZCBnZXR0aW5nIHN0dWNrIGluXG4gICAqIHJlY3Vyc2l2ZSB0eXBlcy5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgc2VlblR5cGVMaXRlcmFscyA9IG5ldyBTZXQ8dHMuVHlwZT4oKTtcblxuICAvKipcbiAgICogV2hldGhlciB0byB3cml0ZSB0eXBlcyBzdWl0YWJsZSBmb3IgYW4gXFxAZXh0ZXJucyBmaWxlLiBFeHRlcm5zIHR5cGVzIG11c3Qgbm90IHJlZmVyIHRvXG4gICAqIG5vbi1leHRlcm5zIHR5cGVzIChpLmUuIG5vbiBhbWJpZW50IHR5cGVzKSBhbmQgbmVlZCB0byB1c2UgZnVsbHkgcXVhbGlmaWVkIG5hbWVzLlxuICAgKi9cbiAgaXNGb3JFeHRlcm5zID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBub2RlIGlzIHRoZSBzb3VyY2UgQVNUIHRzLk5vZGUgdGhlIHR5cGUgY29tZXMgZnJvbS4gIFRoaXMgaXMgdXNlZFxuICAgKiAgICAgaW4gc29tZSBjYXNlcyAoZS5nLiBhbm9ueW1vdXMgdHlwZXMpIGZvciBsb29raW5nIHVwIGZpZWxkIG5hbWVzLlxuICAgKiBAcGFyYW0gcGF0aEJsYWNrTGlzdCBpcyBhIHNldCBvZiBwYXRocyB0aGF0IHNob3VsZCBuZXZlciBnZXQgdHlwZWQ7XG4gICAqICAgICBhbnkgcmVmZXJlbmNlIHRvIHN5bWJvbHMgZGVmaW5lZCBpbiB0aGVzZSBwYXRocyBzaG91bGQgYnkgdHlwZWRcbiAgICogICAgIGFzIHs/fS5cbiAgICogQHBhcmFtIHN5bWJvbHNUb0FsaWFzZWROYW1lcyBhIG1hcHBpbmcgZnJvbSBzeW1ib2xzIChgRm9vYCkgdG8gYSBuYW1lIGluIHNjb3BlIHRoZXkgc2hvdWxkIGJlXG4gICAqICAgICBlbWl0dGVkIGFzIChlLmcuIGB0c2lja2xlX2ZvcndhcmRfZGVjbGFyZV8xLkZvb2ApLiBDYW4gYmUgYXVnbWVudGVkIGR1cmluZyB0eXBlXG4gICAqICAgICB0cmFuc2xhdGlvbiwgZS5nLiB0byBibGFja2xpc3QgYSBzeW1ib2wuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgdHlwZUNoZWNrZXI6IHRzLlR5cGVDaGVja2VyLCBwcml2YXRlIHJlYWRvbmx5IG5vZGU6IHRzLk5vZGUsXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IHBhdGhCbGFja0xpc3Q/OiBTZXQ8c3RyaW5nPixcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgc3ltYm9sc1RvQWxpYXNlZE5hbWVzID0gbmV3IE1hcDx0cy5TeW1ib2wsIHN0cmluZz4oKSkge1xuICAgIC8vIE5vcm1hbGl6ZSBwYXRocyB0byBub3QgYnJlYWsgY2hlY2tzIG9uIFdpbmRvd3MuXG4gICAgaWYgKHRoaXMucGF0aEJsYWNrTGlzdCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnBhdGhCbGFja0xpc3QgPVxuICAgICAgICAgIG5ldyBTZXQ8c3RyaW5nPihBcnJheS5mcm9tKHRoaXMucGF0aEJsYWNrTGlzdC52YWx1ZXMoKSkubWFwKHAgPT4gcGF0aC5ub3JtYWxpemUocCkpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSB0cy5TeW1ib2wgdG8gYSBzdHJpbmcuXG4gICAqIE90aGVyIGFwcHJvYWNoZXMgdGhhdCBkb24ndCB3b3JrOlxuICAgKiAtIFR5cGVDaGVja2VyLnR5cGVUb1N0cmluZyB0cmFuc2xhdGVzIEFycmF5IGFzIFRbXS5cbiAgICogLSBUeXBlQ2hlY2tlci5zeW1ib2xUb1N0cmluZyBlbWl0cyB0eXBlcyB3aXRob3V0IHRoZWlyIG5hbWVzcGFjZSxcbiAgICogICBhbmQgZG9lc24ndCBsZXQgeW91IHBhc3MgdGhlIGZsYWcgdG8gY29udHJvbCB0aGF0LlxuICAgKiBAcGFyYW0gdXNlRnFuIHdoZXRoZXIgdG8gc2NvcGUgdGhlIG5hbWUgdXNpbmcgaXRzIGZ1bGx5IHF1YWxpZmllZCBuYW1lLiBDbG9zdXJlJ3MgdGVtcGxhdGVcbiAgICogICAgIGFyZ3VtZW50cyBhcmUgYWx3YXlzIHNjb3BlZCB0byB0aGUgY2xhc3MgY29udGFpbmluZyB0aGVtLCB3aGVyZSBUeXBlU2NyaXB0J3MgdGVtcGxhdGUgYXJnc1xuICAgKiAgICAgd291bGQgYmUgZnVsbHkgcXVhbGlmaWVkLiBJLmUuIHRoaXMgZmxhZyBpcyBmYWxzZSBmb3IgZ2VuZXJpYyB0eXBlcy5cbiAgICovXG4gIHB1YmxpYyBzeW1ib2xUb1N0cmluZyhzeW06IHRzLlN5bWJvbCwgdXNlRnFuOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICAvLyBUaGlzIGZvbGxvd3MgZ2V0U2luZ2xlTGluZVN0cmluZ1dyaXRlciBpbiB0aGUgVHlwZVNjcmlwdCBjb21waWxlci5cbiAgICBsZXQgc3RyID0gJyc7XG4gICAgbGV0IHN5bUFsaWFzID0gc3ltO1xuICAgIGlmIChzeW1BbGlhcy5mbGFncyAmIHRzLlN5bWJvbEZsYWdzLkFsaWFzKSB7XG4gICAgICBzeW1BbGlhcyA9IHRoaXMudHlwZUNoZWNrZXIuZ2V0QWxpYXNlZFN5bWJvbChzeW1BbGlhcyk7XG4gICAgfVxuICAgIGNvbnN0IGFsaWFzID0gdGhpcy5zeW1ib2xzVG9BbGlhc2VkTmFtZXMuZ2V0KHN5bUFsaWFzKTtcbiAgICBpZiAoYWxpYXMpIHJldHVybiBhbGlhcztcbiAgICBpZiAodXNlRnFuICYmIHRoaXMuaXNGb3JFeHRlcm5zKSB7XG4gICAgICAvLyBGb3IgcmVndWxhciB0eXBlIGVtaXQsIHdlIGNhbiB1c2UgVHlwZVNjcmlwdCdzIG5hbWluZyBydWxlcywgYXMgdGhleSBtYXRjaCBDbG9zdXJlJ3MgbmFtZVxuICAgICAgLy8gc2NvcGluZyBydWxlcy4gSG93ZXZlciB3aGVuIGVtaXR0aW5nIGV4dGVybnMgZmlsZXMgZm9yIGFtYmllbnRzLCBuYW1pbmcgcnVsZXMgY2hhbmdlLiBBc1xuICAgICAgLy8gQ2xvc3VyZSBkb2Vzbid0IHN1cHBvcnQgZXh0ZXJucyBtb2R1bGVzLCBhbGwgbmFtZXMgbXVzdCBiZSBnbG9iYWwgYW5kIHVzZSBnbG9iYWwgZnVsbHlcbiAgICAgIC8vIHF1YWxpZmllZCBuYW1lcy4gVGhlIGNvZGUgYmVsb3cgdXNlcyBUeXBlU2NyaXB0IHRvIGNvbnZlcnQgYSBzeW1ib2wgdG8gYSBmdWxsIHF1YWxpZmllZFxuICAgICAgLy8gbmFtZSBhbmQgdGhlbiBlbWl0cyB0aGF0LlxuICAgICAgbGV0IGZxbiA9IHRoaXMudHlwZUNoZWNrZXIuZ2V0RnVsbHlRdWFsaWZpZWROYW1lKHN5bSk7XG4gICAgICBpZiAoZnFuLnN0YXJ0c1dpdGgoYFwiYCkgfHwgZnFuLnN0YXJ0c1dpdGgoYCdgKSkge1xuICAgICAgICAvLyBRdW90ZWQgRlFOcyBtZWFuIHRoZSBuYW1lIGlzIGZyb20gYSBtb2R1bGUsIGUuZy4gYCdwYXRoL3RvL21vZHVsZScuc29tZS5xdWFsaWZpZWQuTmFtZWAuXG4gICAgICAgIC8vIHRzaWNrbGUgZ2VuZXJhbGx5IHJlLXNjb3BlcyBuYW1lcyBpbiBtb2R1bGVzIHRoYXQgYXJlIG1vdmVkIHRvIGV4dGVybnMgaW50byB0aGUgZ2xvYmFsXG4gICAgICAgIC8vIG5hbWVzcGFjZS4gVGhhdCBkb2VzIG5vdCBxdWl0ZSBtYXRjaCBUUycgc2VtYW50aWNzIHdoZXJlIGFtYmllbnQgdHlwZXMgZnJvbSBtb2R1bGVzIGFyZVxuICAgICAgICAvLyBsb2NhbC4gSG93ZXZlciB2YWx1ZSBkZWNsYXJhdGlvbnMgdGhhdCBhcmUgbG9jYWwgdG8gbW9kdWxlcyBidXQgbm90IGRlZmluZWQgZG8gbm90IG1ha2VcbiAgICAgICAgLy8gc2Vuc2UgaWYgbm90IGdsb2JhbCwgZS5nLiBcImRlY2xhcmUgY2xhc3MgWCB7fTsgbmV3IFgoKTtcIiBjYW5ub3Qgd29yayB1bmxlc3MgYFhgIGlzXG4gICAgICAgIC8vIGFjdHVhbGx5IGEgZ2xvYmFsLlxuICAgICAgICAvLyBTbyB0aGlzIGNvZGUgc3RyaXBzIHRoZSBtb2R1bGUgcGF0aCBmcm9tIHRoZSB0eXBlIGFuZCB1c2VzIHRoZSBGUU4gYXMgYSBnbG9iYWwuXG4gICAgICAgIGZxbiA9IGZxbi5yZXBsYWNlKC9eW1wiJ11bXlwiJ10rWydcIl1cXC4vLCAnJyk7XG4gICAgICB9XG4gICAgICAvLyBEZWNsYXJhdGlvbnMgaW4gbW9kdWxlIGNhbiByZS1vcGVuIGdsb2JhbCB0eXBlcyB1c2luZyBcImRlY2xhcmUgZ2xvYmFsIHsgLi4uIH1cIi4gVGhlIGZxblxuICAgICAgLy8gdGhlbiBjb250YWlucyB0aGUgcHJlZml4IFwiZ2xvYmFsLlwiIGhlcmUuIEFzIHdlJ3JlIG1hcHBpbmcgdG8gZ2xvYmFsIHR5cGVzLCBqdXN0IHN0cmlwIHRoZVxuICAgICAgLy8gcHJlZml4LlxuICAgICAgY29uc3QgaXNJbkdsb2JhbCA9IChzeW0uZGVjbGFyYXRpb25zIHx8IFtdKS5zb21lKGQgPT4ge1xuICAgICAgICBsZXQgY3VycmVudDogdHMuTm9kZXx1bmRlZmluZWQgPSBkO1xuICAgICAgICB3aGlsZSAoY3VycmVudCkge1xuICAgICAgICAgIGlmIChjdXJyZW50LmZsYWdzICYgdHMuTm9kZUZsYWdzLkdsb2JhbEF1Z21lbnRhdGlvbikgcmV0dXJuIHRydWU7XG4gICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGlzSW5HbG9iYWwpIHtcbiAgICAgICAgZnFuID0gZnFuLnJlcGxhY2UoL15nbG9iYWxcXC4vLCAnJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5zdHJpcENsdXR6TmFtZXNwYWNlKGZxbik7XG4gICAgfVxuICAgIGNvbnN0IHdyaXRlVGV4dCA9ICh0ZXh0OiBzdHJpbmcpID0+IHN0ciArPSB0ZXh0O1xuICAgIGNvbnN0IGRvTm90aGluZyA9ICgpID0+IHtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgY29uc3QgYnVpbGRlciA9IHRoaXMudHlwZUNoZWNrZXIuZ2V0U3ltYm9sRGlzcGxheUJ1aWxkZXIoKTtcbiAgICBjb25zdCB3cml0ZXI6IHRzLlN5bWJvbFdyaXRlciA9IHtcbiAgICAgIHdyaXRlS2V5d29yZDogd3JpdGVUZXh0LFxuICAgICAgd3JpdGVPcGVyYXRvcjogd3JpdGVUZXh0LFxuICAgICAgd3JpdGVQdW5jdHVhdGlvbjogd3JpdGVUZXh0LFxuICAgICAgd3JpdGVTcGFjZTogd3JpdGVUZXh0LFxuICAgICAgd3JpdGVTdHJpbmdMaXRlcmFsOiB3cml0ZVRleHQsXG4gICAgICB3cml0ZVBhcmFtZXRlcjogd3JpdGVUZXh0LFxuICAgICAgd3JpdGVQcm9wZXJ0eTogd3JpdGVUZXh0LFxuICAgICAgd3JpdGVTeW1ib2w6IHdyaXRlVGV4dCxcbiAgICAgIHdyaXRlTGluZTogZG9Ob3RoaW5nLFxuICAgICAgaW5jcmVhc2VJbmRlbnQ6IGRvTm90aGluZyxcbiAgICAgIGRlY3JlYXNlSW5kZW50OiBkb05vdGhpbmcsXG4gICAgICBjbGVhcjogZG9Ob3RoaW5nLFxuICAgICAgdHJhY2tTeW1ib2woc3ltYm9sOiB0cy5TeW1ib2wsIGVuY2xvc2luZ0RlY2xhcmF0aW9uPzogdHMuTm9kZSwgbWVhbmluZz86IHRzLlN5bWJvbEZsYWdzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0sXG4gICAgICByZXBvcnRJbmFjY2Vzc2libGVUaGlzRXJyb3I6IGRvTm90aGluZyxcbiAgICAgIHJlcG9ydFByaXZhdGVJbkJhc2VPZkNsYXNzRXhwcmVzc2lvbjogZG9Ob3RoaW5nLFxuICAgIH07XG4gICAgYnVpbGRlci5idWlsZFN5bWJvbERpc3BsYXkoc3ltLCB3cml0ZXIsIHRoaXMubm9kZSk7XG4gICAgcmV0dXJuIHRoaXMuc3RyaXBDbHV0ek5hbWVzcGFjZShzdHIpO1xuICB9XG5cbiAgLy8gQ2x1dHogKGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NsdXR6KSBlbWl0cyBnbG9iYWwgdHlwZSBzeW1ib2xzIGhpZGRlbiBpbiBhIHNwZWNpYWxcbiAgLy8g4LKgX+CyoC5jbHV0eiBuYW1lc3BhY2UuIFdoaWxlIG1vc3QgY29kZSBzZWVuIGJ5IFRzaWNrbGUgd2lsbCBvbmx5IGV2ZXIgc2VlIGxvY2FsIGFsaWFzZXMsIENsdXR6XG4gIC8vIHN5bWJvbHMgY2FuIGJlIHdyaXR0ZW4gYnkgdXNlcnMgZGlyZWN0bHkgaW4gY29kZSwgYW5kIHRoZXkgY2FuIGFwcGVhciBieSBkZXJlZmVyZW5jaW5nXG4gIC8vIFR5cGVBbGlhc2VzLiBUaGUgY29kZSBiZWxvdyBzaW1wbHkgc3RyaXBzIHRoZSBwcmVmaXgsIHRoZSByZW1haW5pbmcgdHlwZSBuYW1lIHRoZW4gbWF0Y2hlc1xuICAvLyBDbG9zdXJlJ3MgdHlwZS5cbiAgcHJpdmF0ZSBzdHJpcENsdXR6TmFtZXNwYWNlKG5hbWU6IHN0cmluZykge1xuICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ+CyoF/gsqAuY2x1dHouJykpIHJldHVybiBuYW1lLnN1YnN0cmluZygn4LKgX+CyoC5jbHV0ei4nLmxlbmd0aCk7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICB0cmFuc2xhdGUodHlwZTogdHMuVHlwZSwgcmVzb2x2ZUFsaWFzID0gZmFsc2UpOiBzdHJpbmcge1xuICAgIC8vIE5PVEU6IFRob3VnaCB0eXBlLmZsYWdzIGhhcyB0aGUgbmFtZSBcImZsYWdzXCIsIGl0IHVzdWFsbHkgY2FuIG9ubHkgYmUgb25lXG4gICAgLy8gb2YgdGhlIGVudW0gb3B0aW9ucyBhdCBhIHRpbWUgKGV4Y2VwdCBmb3IgdW5pb25zIG9mIGxpdGVyYWwgdHlwZXMsIGUuZy4gdW5pb25zIG9mIGJvb2xlYW5cbiAgICAvLyB2YWx1ZXMsIHN0cmluZyB2YWx1ZXMsIGVudW0gdmFsdWVzKS4gVGhpcyBzd2l0Y2ggaGFuZGxlcyBhbGwgdGhlIGNhc2VzIGluIHRoZSB0cy5UeXBlRmxhZ3NcbiAgICAvLyBlbnVtIGluIHRoZSBvcmRlciB0aGV5IG9jY3VyLlxuXG4gICAgLy8gTk9URTogU29tZSBUeXBlRmxhZ3MgYXJlIG1hcmtlZCBcImludGVybmFsXCIgaW4gdGhlIGQudHMgYnV0IHN0aWxsIHNob3cgdXAgaW4gdGhlIHZhbHVlIG9mXG4gICAgLy8gdHlwZS5mbGFncy4gVGhpcyBtYXNrIGxpbWl0cyB0aGUgZmxhZyBjaGVja3MgdG8gdGhlIG9uZXMgaW4gdGhlIHB1YmxpYyBBUEkuIFwibGFzdEZsYWdcIiBoZXJlXG4gICAgLy8gaXMgdGhlIGxhc3QgZmxhZyBoYW5kbGVkIGluIHRoaXMgc3dpdGNoIHN0YXRlbWVudCwgYW5kIHNob3VsZCBiZSBrZXB0IGluIHN5bmMgd2l0aFxuICAgIC8vIHR5cGVzY3JpcHQuZC50cy5cblxuICAgIC8vIE5vblByaW1pdGl2ZSBvY2N1cnMgb24gaXRzIG93biBvbiB0aGUgbG93ZXIgY2FzZSBcIm9iamVjdFwiIHR5cGUuIFNwZWNpYWwgY2FzZSB0byBcIiFPYmplY3RcIi5cbiAgICBpZiAodHlwZS5mbGFncyA9PT0gdHMuVHlwZUZsYWdzLk5vblByaW1pdGl2ZSkgcmV0dXJuICchT2JqZWN0JztcblxuICAgIC8vIEF2b2lkIGluZmluaXRlIGxvb3BzIG9uIHJlY3Vyc2l2ZSB0eXBlIGxpdGVyYWxzLlxuICAgIC8vIEl0IHdvdWxkIGJlIG5pY2UgdG8ganVzdCBlbWl0IHRoZSBuYW1lIG9mIHRoZSByZWN1cnNpdmUgdHlwZSBoZXJlIChpbiB0eXBlLmFsaWFzU3ltYm9sXG4gICAgLy8gYmVsb3cpLCBidXQgQ2xvc3VyZSBDb21waWxlciBkb2VzIG5vdCBhbGxvdyByZWN1cnNpdmUgdHlwZSBkZWZpbml0aW9ucy5cbiAgICBpZiAodGhpcy5zZWVuVHlwZUxpdGVyYWxzLmhhcyh0eXBlKSkgcmV0dXJuICc/JztcblxuICAgIC8vIElmIHR5cGUgaXMgYW4gYWxpYXMsIGUuZy4gZnJvbSB0eXBlIFggPSBBfEIsIHRoZW4gYWx3YXlzIGVtaXQgdGhlIGFsaWFzLCBub3QgdGhlIHVuZGVybHlpbmdcbiAgICAvLyB1bmlvbiB0eXBlLCBhcyB0aGUgYWxpYXMgaXMgdGhlIHVzZXIgdmlzaWJsZSwgaW1wb3J0ZWQgc3ltYm9sLlxuICAgIGlmICghcmVzb2x2ZUFsaWFzICYmIHR5cGUuYWxpYXNTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0aGlzLnN5bWJvbFRvU3RyaW5nKHR5cGUuYWxpYXNTeW1ib2wsIC8qIHVzZUZxbiAqLyB0cnVlKTtcbiAgICB9XG5cbiAgICBsZXQgaXNBbWJpZW50ID0gZmFsc2U7XG4gICAgbGV0IGlzTmFtZXNwYWNlID0gZmFsc2U7XG4gICAgbGV0IGlzTW9kdWxlID0gZmFsc2U7XG4gICAgaWYgKHR5cGUuc3ltYm9sKSB7XG4gICAgICBmb3IgKGNvbnN0IGRlY2wgb2YgdHlwZS5zeW1ib2wuZGVjbGFyYXRpb25zIHx8IFtdKSB7XG4gICAgICAgIGlmICh0cy5pc0V4dGVybmFsTW9kdWxlKGRlY2wuZ2V0U291cmNlRmlsZSgpKSkgaXNNb2R1bGUgPSB0cnVlO1xuICAgICAgICBsZXQgY3VycmVudDogdHMuTm9kZXx1bmRlZmluZWQgPSBkZWNsO1xuICAgICAgICB3aGlsZSAoY3VycmVudCkge1xuICAgICAgICAgIGlmICh0cy5nZXRDb21iaW5lZE1vZGlmaWVyRmxhZ3MoY3VycmVudCkgJiB0cy5Nb2RpZmllckZsYWdzLkFtYmllbnQpIGlzQW1iaWVudCA9IHRydWU7XG4gICAgICAgICAgaWYgKGN1cnJlbnQua2luZCA9PT0gdHMuU3ludGF4S2luZC5Nb2R1bGVEZWNsYXJhdGlvbikgaXNOYW1lc3BhY2UgPSB0cnVlO1xuICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRzaWNrbGUgY2Fubm90IGdlbmVyYXRlIHR5cGVzIGZvciBub24tYW1iaWVudCBuYW1lc3BhY2VzLlxuICAgIGlmIChpc05hbWVzcGFjZSAmJiAhaXNBbWJpZW50KSByZXR1cm4gJz8nO1xuXG4gICAgLy8gVHlwZXMgaW4gZXh0ZXJucyBjYW5ub3QgcmVmZXJlbmNlIHR5cGVzIGZyb20gZXh0ZXJuYWwgbW9kdWxlcy5cbiAgICAvLyBIb3dldmVyIGFtYmllbnQgdHlwZXMgaW4gbW9kdWxlcyBnZXQgbW92ZWQgdG8gZXh0ZXJucywgdG9vLCBzbyB0eXBlIHJlZmVyZW5jZXMgd29yayBhbmQgd2VcbiAgICAvLyBjYW4gZW1pdCBhIHByZWNpc2UgdHlwZS5cbiAgICBpZiAodGhpcy5pc0ZvckV4dGVybnMgJiYgaXNNb2R1bGUgJiYgIWlzQW1iaWVudCkgcmV0dXJuICc/JztcblxuICAgIGNvbnN0IGxhc3RGbGFnID0gdHMuVHlwZUZsYWdzLkluZGV4ZWRBY2Nlc3M7XG4gICAgY29uc3QgbWFzayA9IChsYXN0RmxhZyA8PCAxKSAtIDE7XG4gICAgc3dpdGNoICh0eXBlLmZsYWdzICYgbWFzaykge1xuICAgICAgY2FzZSB0cy5UeXBlRmxhZ3MuQW55OlxuICAgICAgICByZXR1cm4gJz8nO1xuICAgICAgY2FzZSB0cy5UeXBlRmxhZ3MuU3RyaW5nOlxuICAgICAgY2FzZSB0cy5UeXBlRmxhZ3MuU3RyaW5nTGl0ZXJhbDpcbiAgICAgICAgcmV0dXJuICdzdHJpbmcnO1xuICAgICAgY2FzZSB0cy5UeXBlRmxhZ3MuTnVtYmVyOlxuICAgICAgY2FzZSB0cy5UeXBlRmxhZ3MuTnVtYmVyTGl0ZXJhbDpcbiAgICAgICAgcmV0dXJuICdudW1iZXInO1xuICAgICAgY2FzZSB0cy5UeXBlRmxhZ3MuQm9vbGVhbjpcbiAgICAgIGNhc2UgdHMuVHlwZUZsYWdzLkJvb2xlYW5MaXRlcmFsOlxuICAgICAgICAvLyBTZWUgdGhlIG5vdGUgaW4gdHJhbnNsYXRlVW5pb24gYWJvdXQgYm9vbGVhbnMuXG4gICAgICAgIHJldHVybiAnYm9vbGVhbic7XG4gICAgICBjYXNlIHRzLlR5cGVGbGFncy5FbnVtOlxuICAgICAgICBpZiAoIXR5cGUuc3ltYm9sKSB7XG4gICAgICAgICAgdGhpcy53YXJuKGBFbnVtVHlwZSB3aXRob3V0IGEgc3ltYm9sYCk7XG4gICAgICAgICAgcmV0dXJuICc/JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zeW1ib2xUb1N0cmluZyh0eXBlLnN5bWJvbCwgdHJ1ZSk7XG4gICAgICBjYXNlIHRzLlR5cGVGbGFncy5FU1N5bWJvbDpcbiAgICAgICAgLy8gTk9URTogY3VycmVudGx5IHRoaXMgaXMganVzdCBhIHR5cGVkZWYgZm9yIHs/fSwgc2hydWcuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1jb21waWxlci9ibG9iLzU1Y2Y0M2VlMzFlODBkODlkNzA4N2FmNjViNTU0MmFhNjM5ODc4NzQvZXh0ZXJucy9lczMuanMjTDM0XG4gICAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICAgIGNhc2UgdHMuVHlwZUZsYWdzLlZvaWQ6XG4gICAgICAgIHJldHVybiAndm9pZCc7XG4gICAgICBjYXNlIHRzLlR5cGVGbGFncy5VbmRlZmluZWQ6XG4gICAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICAgIGNhc2UgdHMuVHlwZUZsYWdzLk51bGw6XG4gICAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgICBjYXNlIHRzLlR5cGVGbGFncy5OZXZlcjpcbiAgICAgICAgdGhpcy53YXJuKGBzaG91bGQgbm90IGVtaXQgYSAnbmV2ZXInIHR5cGVgKTtcbiAgICAgICAgcmV0dXJuICc/JztcbiAgICAgIGNhc2UgdHMuVHlwZUZsYWdzLlR5cGVQYXJhbWV0ZXI6XG4gICAgICAgIC8vIFRoaXMgaXMgZS5nLiB0aGUgVCBpbiBhIHR5cGUgbGlrZSBGb288VD4uXG4gICAgICAgIGlmICghdHlwZS5zeW1ib2wpIHtcbiAgICAgICAgICB0aGlzLndhcm4oYFR5cGVQYXJhbWV0ZXIgd2l0aG91dCBhIHN5bWJvbGApOyAgLy8gc2hvdWxkIG5vdCBoYXBwZW4gKHRtKVxuICAgICAgICAgIHJldHVybiAnPyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSW4gQ2xvc3VyZSBDb21waWxlciwgdHlwZSBwYXJhbWV0ZXJzICphcmUqIHNjb3BlZCB0byB0aGVpciBjb250YWluaW5nIGNsYXNzLlxuICAgICAgICBjb25zdCB1c2VGcW4gPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ltYm9sVG9TdHJpbmcodHlwZS5zeW1ib2wsIHVzZUZxbik7XG4gICAgICBjYXNlIHRzLlR5cGVGbGFncy5PYmplY3Q6XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZU9iamVjdCh0eXBlIGFzIHRzLk9iamVjdFR5cGUpO1xuICAgICAgY2FzZSB0cy5UeXBlRmxhZ3MuVW5pb246XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVVuaW9uKHR5cGUgYXMgdHMuVW5pb25UeXBlKTtcbiAgICAgIGNhc2UgdHMuVHlwZUZsYWdzLkludGVyc2VjdGlvbjpcbiAgICAgIGNhc2UgdHMuVHlwZUZsYWdzLkluZGV4OlxuICAgICAgY2FzZSB0cy5UeXBlRmxhZ3MuSW5kZXhlZEFjY2VzczpcbiAgICAgICAgLy8gVE9ETyh0czIuMSk6IGhhbmRsZSB0aGVzZSBzcGVjaWFsIHR5cGVzLlxuICAgICAgICB0aGlzLndhcm4oYHVuaGFuZGxlZCB0eXBlIGZsYWdzOiAke3RzLlR5cGVGbGFnc1t0eXBlLmZsYWdzXX1gKTtcbiAgICAgICAgcmV0dXJuICc/JztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEhhbmRsZSBjYXNlcyB3aGVyZSBtdWx0aXBsZSBmbGFncyBhcmUgc2V0LlxuXG4gICAgICAgIC8vIFR5cGVzIHdpdGggbGl0ZXJhbCBtZW1iZXJzIGFyZSByZXByZXNlbnRlZCBhc1xuICAgICAgICAvLyAgIHRzLlR5cGVGbGFncy5VbmlvbiB8IFtsaXRlcmFsIG1lbWJlcl1cbiAgICAgICAgLy8gRS5nLiBhbiBlbnVtIHR5cGVkIHZhbHVlIGlzIGEgdW5pb24gdHlwZSB3aXRoIHRoZSBlbnVtJ3MgbWVtYmVycyBhcyBpdHMgbWVtYmVycy4gQVxuICAgICAgICAvLyBib29sZWFuIHR5cGUgaXMgYSB1bmlvbiB0eXBlIHdpdGggJ3RydWUnIGFuZCAnZmFsc2UnIGFzIGl0cyBtZW1iZXJzLlxuICAgICAgICAvLyBOb3RlIGFsc28gdGhhdCBpbiBhIG1vcmUgY29tcGxleCB1bmlvbiwgZS5nLiBib29sZWFufG51bWJlciwgdGhlbiBpdCdzIGEgdW5pb24gb2YgdGhyZWVcbiAgICAgICAgLy8gdGhpbmdzICh0cnVlfGZhbHNlfG51bWJlcikgYW5kIHRzLlR5cGVGbGFncy5Cb29sZWFuIGRvZXNuJ3Qgc2hvdyB1cCBhdCBhbGwuXG4gICAgICAgIGlmICh0eXBlLmZsYWdzICYgdHMuVHlwZUZsYWdzLlVuaW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlVW5pb24odHlwZSBhcyB0cy5VbmlvblR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUuZmxhZ3MgJiB0cy5UeXBlRmxhZ3MuRW51bUxpdGVyYWwpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVFbnVtTGl0ZXJhbCh0eXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBzd2l0Y2ggc3RhdGVtZW50IHNob3VsZCBoYXZlIGJlZW4gZXhoYXVzdGl2ZS5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIHR5cGUgZmxhZ3MgJHt0eXBlLmZsYWdzfSBvbiAke3R5cGVUb0RlYnVnU3RyaW5nKHR5cGUpfWApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNsYXRlVW5pb24odHlwZTogdHMuVW5pb25UeXBlKTogc3RyaW5nIHtcbiAgICBsZXQgcGFydHMgPSB0eXBlLnR5cGVzLm1hcCh0ID0+IHRoaXMudHJhbnNsYXRlKHQpKTtcbiAgICAvLyBVbmlvbiB0eXBlcyB0aGF0IGluY2x1ZGUgbGl0ZXJhbHMgKGUuZy4gYm9vbGVhbiwgZW51bSkgY2FuIGVuZCB1cCByZXBlYXRpbmcgdGhlIHNhbWUgQ2xvc3VyZVxuICAgIC8vIHR5cGUuIEZvciBleGFtcGxlOiB0cnVlIHwgYm9vbGVhbiB3aWxsIGJlIHRyYW5zbGF0ZWQgdG8gYm9vbGVhbiB8IGJvb2xlYW4uXG4gICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZXMgdG8gcHJvZHVjZSB0eXBlcyB0aGF0IHJlYWQgYmV0dGVyLlxuICAgIHBhcnRzID0gcGFydHMuZmlsdGVyKChlbCwgaWR4KSA9PiBwYXJ0cy5pbmRleE9mKGVsKSA9PT0gaWR4KTtcbiAgICByZXR1cm4gcGFydHMubGVuZ3RoID09PSAxID8gcGFydHNbMF0gOiBgKCR7cGFydHMuam9pbignfCcpfSlgO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2xhdGVFbnVtTGl0ZXJhbCh0eXBlOiB0cy5UeXBlKTogc3RyaW5nIHtcbiAgICAvLyBTdXBwb3NlIHlvdSBoYWQ6XG4gICAgLy8gICBlbnVtIEVudW1UeXBlIHsgTUVNQkVSIH1cbiAgICAvLyB0aGVuIHRoZSB0eXBlIG9mIFwiRW51bVR5cGUuTUVNQkVSXCIgaXMgYW4gZW51bSBsaXRlcmFsICh0aGUgdGhpbmcgcGFzc2VkIHRvIHRoaXMgZnVuY3Rpb24pXG4gICAgLy8gYW5kIGl0IGhhcyB0eXBlIGZsYWdzIHRoYXQgaW5jbHVkZVxuICAgIC8vICAgdHMuVHlwZUZsYWdzLk51bWJlckxpdGVyYWwgfCB0cy5UeXBlRmxhZ3MuRW51bUxpdGVyYWxcbiAgICAvL1xuICAgIC8vIENsb3N1cmUgQ29tcGlsZXIgZG9lc24ndCBzdXBwb3J0IGxpdGVyYWxzIGluIHR5cGVzLCBzbyB0aGlzIGNvZGUgbXVzdCBub3QgZW1pdFxuICAgIC8vIFwiRW51bVR5cGUuTUVNQkVSXCIsIGJ1dCByYXRoZXIgXCJFbnVtVHlwZVwiLlxuXG4gICAgY29uc3QgZW51bUxpdGVyYWxCYXNlVHlwZSA9IHRoaXMudHlwZUNoZWNrZXIuZ2V0QmFzZVR5cGVPZkxpdGVyYWxUeXBlKHR5cGUpO1xuICAgIGlmICghZW51bUxpdGVyYWxCYXNlVHlwZS5zeW1ib2wpIHtcbiAgICAgIHRoaXMud2FybihgRW51bUxpdGVyYWxUeXBlIHdpdGhvdXQgYSBzeW1ib2xgKTtcbiAgICAgIHJldHVybiAnPyc7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN5bWJvbFRvU3RyaW5nKGVudW1MaXRlcmFsQmFzZVR5cGUuc3ltYm9sLCB0cnVlKTtcbiAgfVxuXG4gIC8vIHRyYW5zbGF0ZU9iamVjdCB0cmFuc2xhdGVzIGEgdHMuT2JqZWN0VHlwZSwgd2hpY2ggaXMgdGhlIHR5cGUgb2YgYWxsXG4gIC8vIG9iamVjdC1saWtlIHRoaW5ncyBpbiBUUywgc3VjaCBhcyBjbGFzc2VzIGFuZCBpbnRlcmZhY2VzLlxuICBwcml2YXRlIHRyYW5zbGF0ZU9iamVjdCh0eXBlOiB0cy5PYmplY3RUeXBlKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZS5zeW1ib2wgJiYgdGhpcy5pc0JsYWNrTGlzdGVkKHR5cGUuc3ltYm9sKSkgcmV0dXJuICc/JztcblxuICAgIC8vIE5PVEU6IG9iamVjdEZsYWdzIGlzIGFuIGVudW0sIGJ1dCBhIGdpdmVuIHR5cGUgY2FuIGhhdmUgbXVsdGlwbGUgZmxhZ3MuXG4gICAgLy8gQXJyYXk8c3RyaW5nPiBpcyBib3RoIHRzLk9iamVjdEZsYWdzLlJlZmVyZW5jZSBhbmQgdHMuT2JqZWN0RmxhZ3MuSW50ZXJmYWNlLlxuXG4gICAgaWYgKHR5cGUub2JqZWN0RmxhZ3MgJiB0cy5PYmplY3RGbGFncy5DbGFzcykge1xuICAgICAgaWYgKCF0eXBlLnN5bWJvbCkge1xuICAgICAgICB0aGlzLndhcm4oJ2NsYXNzIGhhcyBubyBzeW1ib2wnKTtcbiAgICAgICAgcmV0dXJuICc/JztcbiAgICAgIH1cbiAgICAgIHJldHVybiAnIScgKyB0aGlzLnN5bWJvbFRvU3RyaW5nKHR5cGUuc3ltYm9sLCAvKiB1c2VGcW4gKi8gdHJ1ZSk7XG4gICAgfSBlbHNlIGlmICh0eXBlLm9iamVjdEZsYWdzICYgdHMuT2JqZWN0RmxhZ3MuSW50ZXJmYWNlKSB7XG4gICAgICAvLyBOb3RlOiB0cy5JbnRlcmZhY2VUeXBlIGhhcyBhIHR5cGVQYXJhbWV0ZXJzIGZpZWxkLCBidXQgdGhhdFxuICAgICAgLy8gc3BlY2lmaWVzIHRoZSBwYXJhbWV0ZXJzIHRoYXQgdGhlIGludGVyZmFjZSB0eXBlICpleHBlY3RzKlxuICAgICAgLy8gd2hlbiBpdCdzIHVzZWQsIGFuZCBzaG91bGQgbm90IGJlIHRyYW5zZm9ybWVkIHRvIHRoZSBvdXRwdXQuXG4gICAgICAvLyBFLmcuIGEgdHlwZSBsaWtlIEFycmF5PG51bWJlcj4gaXMgYSBUeXBlUmVmZXJlbmNlIHRvIHRoZVxuICAgICAgLy8gSW50ZXJmYWNlVHlwZSBcIkFycmF5XCIsIGJ1dCB0aGUgXCJudW1iZXJcIiB0eXBlIHBhcmFtZXRlciBpc1xuICAgICAgLy8gcGFydCBvZiB0aGUgb3V0ZXIgVHlwZVJlZmVyZW5jZSwgbm90IGEgdHlwZVBhcmFtZXRlciBvblxuICAgICAgLy8gdGhlIEludGVyZmFjZVR5cGUuXG4gICAgICBpZiAoIXR5cGUuc3ltYm9sKSB7XG4gICAgICAgIHRoaXMud2FybignaW50ZXJmYWNlIGhhcyBubyBzeW1ib2wnKTtcbiAgICAgICAgcmV0dXJuICc/JztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlLnN5bWJvbC5mbGFncyAmIHRzLlN5bWJvbEZsYWdzLlZhbHVlKSB7XG4gICAgICAgIC8vIFRoZSBzeW1ib2wgaXMgYm90aCBhIHR5cGUgYW5kIGEgdmFsdWUuXG4gICAgICAgIC8vIEZvciB1c2VyLWRlZmluZWQgdHlwZXMgaW4gdGhpcyBzdGF0ZSwgd2UgZG9uJ3QgaGF2ZSBhIENsb3N1cmUgbmFtZVxuICAgICAgICAvLyBmb3IgdGhlIHR5cGUuICBTZWUgdGhlIHR5cGVfYW5kX3ZhbHVlIHRlc3QuXG4gICAgICAgIGlmICghaXNDbG9zdXJlUHJvdmlkZWRUeXBlKHR5cGUuc3ltYm9sKSkge1xuICAgICAgICAgIHRoaXMud2FybihgdHlwZS9zeW1ib2wgY29uZmxpY3QgZm9yICR7dHlwZS5zeW1ib2wubmFtZX0sIHVzaW5nIHs/fSBmb3Igbm93YCk7XG4gICAgICAgICAgcmV0dXJuICc/JztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICchJyArIHRoaXMuc3ltYm9sVG9TdHJpbmcodHlwZS5zeW1ib2wsIC8qIHVzZUZxbiAqLyB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUub2JqZWN0RmxhZ3MgJiB0cy5PYmplY3RGbGFncy5SZWZlcmVuY2UpIHtcbiAgICAgIC8vIEEgcmVmZXJlbmNlIHRvIGFub3RoZXIgdHlwZSwgZS5nLiBBcnJheTxudW1iZXI+IHJlZmVycyB0byBBcnJheS5cbiAgICAgIC8vIEVtaXQgdGhlIHJlZmVyZW5jZWQgdHlwZSBhbmQgYW55IHR5cGUgYXJndW1lbnRzLlxuICAgICAgY29uc3QgcmVmZXJlbmNlVHlwZSA9IHR5cGUgYXMgdHMuVHlwZVJlZmVyZW5jZTtcblxuICAgICAgLy8gQSB0dXBsZSBpcyBhIFJlZmVyZW5jZVR5cGUgd2hlcmUgdGhlIHRhcmdldCBpcyBmbGFnZ2VkIFR1cGxlIGFuZCB0aGVcbiAgICAgIC8vIHR5cGVBcmd1bWVudHMgYXJlIHRoZSB0dXBsZSBhcmd1bWVudHMuICBKdXN0IHRyZWF0IGl0IGFzIGEgbXlzdGVyeVxuICAgICAgLy8gYXJyYXksIGJlY2F1c2UgQ2xvc3VyZSBkb2Vzbid0IHVuZGVyc3RhbmQgdHVwbGVzLlxuICAgICAgaWYgKHJlZmVyZW5jZVR5cGUudGFyZ2V0Lm9iamVjdEZsYWdzICYgdHMuT2JqZWN0RmxhZ3MuVHVwbGUpIHtcbiAgICAgICAgcmV0dXJuICchQXJyYXk8Pz4nO1xuICAgICAgfVxuXG4gICAgICBsZXQgdHlwZVN0ciA9ICcnO1xuICAgICAgaWYgKHJlZmVyZW5jZVR5cGUudGFyZ2V0ID09PSByZWZlcmVuY2VUeXBlKSB7XG4gICAgICAgIC8vIFdlIGdldCBpbnRvIGFuIGluZmluaXRlIGxvb3AgaGVyZSBpZiB0aGUgaW5uZXIgcmVmZXJlbmNlIGlzXG4gICAgICAgIC8vIHRoZSBzYW1lIGFzIHRoZSBvdXRlcjsgdGhpcyBjYW4gb2NjdXIgd2hlbiB0aGlzIGZ1bmN0aW9uXG4gICAgICAgIC8vIGZhaWxzIHRvIHRyYW5zbGF0ZSBhIG1vcmUgc3BlY2lmaWMgdHlwZSBiZWZvcmUgZ2V0dGluZyB0b1xuICAgICAgICAvLyB0aGlzIHBvaW50LlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgcmVmZXJlbmNlIGxvb3AgaW4gJHt0eXBlVG9EZWJ1Z1N0cmluZyhyZWZlcmVuY2VUeXBlKX0gJHtyZWZlcmVuY2VUeXBlLmZsYWdzfWApO1xuICAgICAgfVxuICAgICAgdHlwZVN0ciArPSB0aGlzLnRyYW5zbGF0ZShyZWZlcmVuY2VUeXBlLnRhcmdldCk7XG4gICAgICAvLyBUcmFuc2xhdGUgY2FuIHJldHVybiAnPycgZm9yIGEgbnVtYmVyIG9mIHNpdHVhdGlvbnMsIGUuZy4gdHlwZS92YWx1ZSBjb25mbGljdHMuXG4gICAgICAvLyBgPzw/PmAgaXMgaWxsZWdhbCBzeW50YXggaW4gQ2xvc3VyZSBDb21waWxlciwgc28ganVzdCByZXR1cm4gYD9gIGhlcmUuXG4gICAgICBpZiAodHlwZVN0ciA9PT0gJz8nKSByZXR1cm4gJz8nO1xuICAgICAgaWYgKHJlZmVyZW5jZVR5cGUudHlwZUFyZ3VtZW50cykge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSByZWZlcmVuY2VUeXBlLnR5cGVBcmd1bWVudHMubWFwKHQgPT4gdGhpcy50cmFuc2xhdGUodCkpO1xuICAgICAgICB0eXBlU3RyICs9IGA8JHtwYXJhbXMuam9pbignLCAnKX0+YDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0eXBlU3RyO1xuICAgIH0gZWxzZSBpZiAodHlwZS5vYmplY3RGbGFncyAmIHRzLk9iamVjdEZsYWdzLkFub255bW91cykge1xuICAgICAgaWYgKCF0eXBlLnN5bWJvbCkge1xuICAgICAgICAvLyBUaGlzIGNvbWVzIHVwIHdoZW4gZ2VuZXJhdGluZyBjb2RlIGZvciBhbiBhcnJvdyBmdW5jdGlvbiBhcyBwYXNzZWRcbiAgICAgICAgLy8gdG8gYSBnZW5lcmljIGZ1bmN0aW9uLiAgVGhlIHBhc3NlZC1pbiB0eXBlIGlzIHRhZ2dlZCBhcyBhbm9ueW1vdXNcbiAgICAgICAgLy8gYW5kIGhhcyBubyBwcm9wZXJ0aWVzIHNvIGl0J3MgaGFyZCB0byBmaWd1cmUgb3V0IHdoYXQgdG8gZ2VuZXJhdGUuXG4gICAgICAgIC8vIEp1c3QgYXZvaWQgaXQgZm9yIG5vdyBzbyB3ZSBkb24ndCBjcmFzaC5cbiAgICAgICAgdGhpcy53YXJuKCdhbm9ueW1vdXMgdHlwZSBoYXMgbm8gc3ltYm9sJyk7XG4gICAgICAgIHJldHVybiAnPyc7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlLnN5bWJvbC5mbGFncyAmIHRzLlN5bWJvbEZsYWdzLlR5cGVMaXRlcmFsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVR5cGVMaXRlcmFsKHR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0eXBlLnN5bWJvbC5mbGFncyAmIHRzLlN5bWJvbEZsYWdzLkZ1bmN0aW9uIHx8XG4gICAgICAgICAgdHlwZS5zeW1ib2wuZmxhZ3MgJiB0cy5TeW1ib2xGbGFncy5NZXRob2QpIHtcbiAgICAgICAgY29uc3Qgc2lncyA9IHRoaXMudHlwZUNoZWNrZXIuZ2V0U2lnbmF0dXJlc09mVHlwZSh0eXBlLCB0cy5TaWduYXR1cmVLaW5kLkNhbGwpO1xuICAgICAgICBpZiAoc2lncy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVUb0Nsb3N1cmUoc2lnc1swXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMud2FybigndW5oYW5kbGVkIGFub255bW91cyB0eXBlJyk7XG4gICAgICByZXR1cm4gJz8nO1xuICAgIH1cblxuICAgIC8qXG4gICAgVE9ETyh0czIuMSk6IG1vcmUgdW5oYW5kbGVkIG9iamVjdCB0eXBlIGZsYWdzOlxuICAgICAgVHVwbGVcbiAgICAgIE1hcHBlZFxuICAgICAgSW5zdGFudGlhdGVkXG4gICAgICBPYmplY3RMaXRlcmFsXG4gICAgICBFdm9sdmluZ0FycmF5XG4gICAgICBPYmplY3RMaXRlcmFsUGF0dGVybldpdGhDb21wdXRlZFByb3BlcnRpZXNcbiAgICAqL1xuICAgIHRoaXMud2FybihgdW5oYW5kbGVkIHR5cGUgJHt0eXBlVG9EZWJ1Z1N0cmluZyh0eXBlKX1gKTtcbiAgICByZXR1cm4gJz8nO1xuICB9XG5cbiAgLyoqXG4gICAqIHRyYW5zbGF0ZVR5cGVMaXRlcmFsIHRyYW5zbGF0ZXMgYSB0cy5TeW1ib2xGbGFncy5UeXBlTGl0ZXJhbCB0eXBlLCB3aGljaFxuICAgKiBpcyB0aGUgYW5vbnltb3VzIHR5cGUgZW5jb3VudGVyZWQgaW4gZS5nLlxuICAgKiAgIGxldCB4OiB7YTogbnVtYmVyfTtcbiAgICovXG4gIHByaXZhdGUgdHJhbnNsYXRlVHlwZUxpdGVyYWwodHlwZTogdHMuVHlwZSk6IHN0cmluZyB7XG4gICAgdGhpcy5zZWVuVHlwZUxpdGVyYWxzLmFkZCh0eXBlKTtcbiAgICAvLyBHYXRoZXIgdXAgYWxsIHRoZSBuYW1lZCBmaWVsZHMgYW5kIHdoZXRoZXIgdGhlIG9iamVjdCBpcyBhbHNvIGNhbGxhYmxlLlxuICAgIGxldCBjYWxsYWJsZSA9IGZhbHNlO1xuICAgIGxldCBpbmRleGFibGUgPSBmYWxzZTtcbiAgICBjb25zdCBmaWVsZHM6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKCF0eXBlLnN5bWJvbCB8fCAhdHlwZS5zeW1ib2wubWVtYmVycykge1xuICAgICAgdGhpcy53YXJuKCd0eXBlIGxpdGVyYWwgaGFzIG5vIHN5bWJvbCcpO1xuICAgICAgcmV0dXJuICc/JztcbiAgICB9XG5cbiAgICAvLyBzcGVjaWFsLWNhc2UgY29uc3RydWN0IHNpZ25hdHVyZXMuXG4gICAgY29uc3QgY3RvcnMgPSB0eXBlLmdldENvbnN0cnVjdFNpZ25hdHVyZXMoKTtcbiAgICBpZiAoY3RvcnMubGVuZ3RoKSB7XG4gICAgICAvLyBUT0RPKG1hcnRpbnByb2JzdCk6IHRoaXMgZG9lcyBub3Qgc3VwcG9ydCBhZGRpdGlvbmFsIHByb3BlcnRpZXMgZGVmaW5lZCBvbiBjb25zdHJ1Y3RvcnNcbiAgICAgIC8vIChub3QgZXhwcmVzc2libGUgaW4gQ2xvc3VyZSksIG5vciBtdWx0aXBsZSBjb25zdHJ1Y3RvcnMgKHNhbWUpLlxuICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5jb252ZXJ0UGFyYW1zKGN0b3JzWzBdKTtcbiAgICAgIGNvbnN0IHBhcmFtc1N0ciA9IHBhcmFtcy5sZW5ndGggPyAoJywgJyArIHBhcmFtcy5qb2luKCcsICcpKSA6ICcnO1xuICAgICAgY29uc3QgY29uc3RydWN0ZWRUeXBlID0gdGhpcy50cmFuc2xhdGUoY3RvcnNbMF0uZ2V0UmV0dXJuVHlwZSgpKTtcbiAgICAgIC8vIEluIHRoZSBzcGVjaWZpYyBjYXNlIG9mIHRoZSBcIm5ld1wiIGluIGEgZnVuY3Rpb24sIGl0IGFwcGVhcnMgdGhhdFxuICAgICAgLy8gICBmdW5jdGlvbihuZXc6ICFCYXIpXG4gICAgICAvLyBmYWlscyB0byBwYXJzZSwgd2hpbGVcbiAgICAgIC8vICAgZnVuY3Rpb24obmV3OiAoIUJhcikpXG4gICAgICAvLyBwYXJzZXMgaW4gdGhlIHdheSB5b3UnZCBleHBlY3QuXG4gICAgICAvLyBJdCBhcHBlYXJzIGZyb20gdGVzdGluZyB0aGF0IENsb3N1cmUgaWdub3JlcyB0aGUgISBhbnl3YXkgYW5kIGp1c3RcbiAgICAgIC8vIGFzc3VtZXMgdGhlIHJlc3VsdCB3aWxsIGJlIG5vbi1udWxsIGluIGVpdGhlciBjYXNlLiAgKFRvIGJlIHBlZGFudGljLFxuICAgICAgLy8gaXQncyBwb3NzaWJsZSB0byByZXR1cm4gbnVsbCBmcm9tIGEgY3RvciBpdCBzZWVtcyBsaWtlIGEgYmFkIGlkZWEuKVxuICAgICAgcmV0dXJuIGBmdW5jdGlvbihuZXc6ICgke2NvbnN0cnVjdGVkVHlwZX0pJHtwYXJhbXNTdHJ9KTogP2A7XG4gICAgfVxuXG4gICAgLy8gbWVtYmVycyBpcyBhbiBFUzYgbWFwLCBidXQgdGhlIC5kLnRzIGRlZmluaW5nIGl0IGRlZmluZWQgdGhlaXIgb3duIG1hcFxuICAgIC8vIHR5cGUsIHNvIHR5cGVzY3JpcHQgZG9lc24ndCBiZWxpZXZlIHRoYXQgLmtleXMoKSBpcyBpdGVyYWJsZVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICBmb3IgKGNvbnN0IGZpZWxkIG9mICh0eXBlLnN5bWJvbC5tZW1iZXJzLmtleXMoKSBhcyBhbnkpKSB7XG4gICAgICBzd2l0Y2ggKGZpZWxkKSB7XG4gICAgICAgIGNhc2UgJ19fY2FsbCc6XG4gICAgICAgICAgY2FsbGFibGUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdfX2luZGV4JzpcbiAgICAgICAgICBpbmRleGFibGUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnN0IG1lbWJlciA9IHR5cGUuc3ltYm9sLm1lbWJlcnMuZ2V0KGZpZWxkKSE7XG4gICAgICAgICAgLy8gb3B0aW9uYWwgbWVtYmVycyBhcmUgaGFuZGxlZCBieSB0aGUgdHlwZSBpbmNsdWRpbmcgfHVuZGVmaW5lZCBpbiBhIHVuaW9uIHR5cGUuXG4gICAgICAgICAgY29uc3QgbWVtYmVyVHlwZSA9XG4gICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlKHRoaXMudHlwZUNoZWNrZXIuZ2V0VHlwZU9mU3ltYm9sQXRMb2NhdGlvbihtZW1iZXIsIHRoaXMubm9kZSkpO1xuICAgICAgICAgIGZpZWxkcy5wdXNoKGAke2ZpZWxkfTogJHttZW1iZXJUeXBlfWApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRyeSB0byBzcGVjaWFsLWNhc2UgcGxhaW4ga2V5LXZhbHVlIG9iamVjdHMgYW5kIGZ1bmN0aW9ucy5cbiAgICBpZiAoZmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKGNhbGxhYmxlICYmICFpbmRleGFibGUpIHtcbiAgICAgICAgLy8gQSBmdW5jdGlvbiB0eXBlLlxuICAgICAgICBjb25zdCBzaWdzID0gdGhpcy50eXBlQ2hlY2tlci5nZXRTaWduYXR1cmVzT2ZUeXBlKHR5cGUsIHRzLlNpZ25hdHVyZUtpbmQuQ2FsbCk7XG4gICAgICAgIGlmIChzaWdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZVRvQ2xvc3VyZShzaWdzWzBdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpbmRleGFibGUgJiYgIWNhbGxhYmxlKSB7XG4gICAgICAgIC8vIEEgcGxhaW4ga2V5LXZhbHVlIG1hcCB0eXBlLlxuICAgICAgICBsZXQga2V5VHlwZSA9ICdzdHJpbmcnO1xuICAgICAgICBsZXQgdmFsVHlwZSA9IHRoaXMudHlwZUNoZWNrZXIuZ2V0SW5kZXhUeXBlT2ZUeXBlKHR5cGUsIHRzLkluZGV4S2luZC5TdHJpbmcpO1xuICAgICAgICBpZiAoIXZhbFR5cGUpIHtcbiAgICAgICAgICBrZXlUeXBlID0gJ251bWJlcic7XG4gICAgICAgICAgdmFsVHlwZSA9IHRoaXMudHlwZUNoZWNrZXIuZ2V0SW5kZXhUeXBlT2ZUeXBlKHR5cGUsIHRzLkluZGV4S2luZC5OdW1iZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsVHlwZSkge1xuICAgICAgICAgIHRoaXMud2FybigndW5rbm93biBpbmRleCBrZXkgdHlwZScpO1xuICAgICAgICAgIHJldHVybiBgIU9iamVjdDw/LD8+YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCFPYmplY3Q8JHtrZXlUeXBlfSwke3RoaXMudHJhbnNsYXRlKHZhbFR5cGUpfT5gO1xuICAgICAgfSBlbHNlIGlmICghY2FsbGFibGUgJiYgIWluZGV4YWJsZSkge1xuICAgICAgICAvLyBTcGVjaWFsLWNhc2UgdGhlIGVtcHR5IG9iamVjdCB7fSBiZWNhdXNlIENsb3N1cmUgZG9lc24ndCBsaWtlIGl0LlxuICAgICAgICAvLyBUT0RPKGV2YW5tKTogcmV2aXNpdCB0aGlzIGlmIGl0IGlzIGEgcHJvYmxlbS5cbiAgICAgICAgcmV0dXJuICchT2JqZWN0JztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWNhbGxhYmxlICYmICFpbmRleGFibGUpIHtcbiAgICAgIC8vIE5vdCBjYWxsYWJsZSwgbm90IGluZGV4YWJsZTsgaW1wbGllcyBhIHBsYWluIG9iamVjdCB3aXRoIGZpZWxkcyBpbiBpdC5cbiAgICAgIHJldHVybiBgeyR7ZmllbGRzLmpvaW4oJywgJyl9fWA7XG4gICAgfVxuXG4gICAgdGhpcy53YXJuKCd1bmhhbmRsZWQgdHlwZSBsaXRlcmFsJyk7XG4gICAgcmV0dXJuICc/JztcbiAgfVxuXG4gIC8qKiBDb252ZXJ0cyBhIHRzLlNpZ25hdHVyZSAoZnVuY3Rpb24gc2lnbmF0dXJlKSB0byBhIENsb3N1cmUgZnVuY3Rpb24gdHlwZS4gKi9cbiAgcHJpdmF0ZSBzaWduYXR1cmVUb0Nsb3N1cmUoc2lnOiB0cy5TaWduYXR1cmUpOiBzdHJpbmcge1xuICAgIC8vIFRPRE8obWFydGlucHJvYnN0KTogQ29uc2lkZXIgaGFybW9uaXppbmcgc29tZSBvdmVybGFwIHdpdGggZW1pdEZ1bmN0aW9uVHlwZSBpbiB0c2lja2xlLnRzLlxuXG4gICAgdGhpcy5ibGFja2xpc3RUeXBlUGFyYW1ldGVycyh0aGlzLnN5bWJvbHNUb0FsaWFzZWROYW1lcywgc2lnLmRlY2xhcmF0aW9uLnR5cGVQYXJhbWV0ZXJzKTtcblxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuY29udmVydFBhcmFtcyhzaWcpO1xuICAgIGxldCB0eXBlU3RyID0gYGZ1bmN0aW9uKCR7cGFyYW1zLmpvaW4oJywgJyl9KWA7XG5cbiAgICBjb25zdCByZXRUeXBlID0gdGhpcy50cmFuc2xhdGUodGhpcy50eXBlQ2hlY2tlci5nZXRSZXR1cm5UeXBlT2ZTaWduYXR1cmUoc2lnKSk7XG4gICAgaWYgKHJldFR5cGUpIHtcbiAgICAgIHR5cGVTdHIgKz0gYDogJHtyZXRUeXBlfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGVTdHI7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRQYXJhbXMoc2lnOiB0cy5TaWduYXR1cmUpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgcGFyYW1UeXBlczogc3RyaW5nW10gPSBbXTtcbiAgICAvLyBUaGUgU2lnbmF0dXJlIGl0c2VsZiBkb2VzIG5vdCBpbmNsdWRlIGluZm9ybWF0aW9uIG9uIG9wdGlvbmFsIGFuZCB2YXIgYXJnIHBhcmFtZXRlcnMuXG4gICAgLy8gVXNlIGl0cyBkZWNsYXJhdGlvbiB0byByZWNvdmVyIHRoYXQgaW5mb3JtYXRpb24uXG4gICAgY29uc3QgZGVjbCA9IHNpZy5kZWNsYXJhdGlvbjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpZy5wYXJhbWV0ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwYXJhbSA9IHNpZy5wYXJhbWV0ZXJzW2ldO1xuXG4gICAgICBjb25zdCBwYXJhbURlY2wgPSBkZWNsLnBhcmFtZXRlcnNbaV07XG4gICAgICBjb25zdCBvcHRpb25hbCA9ICEhcGFyYW1EZWNsLnF1ZXN0aW9uVG9rZW47XG4gICAgICBjb25zdCB2YXJBcmdzID0gISFwYXJhbURlY2wuZG90RG90RG90VG9rZW47XG4gICAgICBsZXQgcGFyYW1UeXBlID0gdGhpcy50eXBlQ2hlY2tlci5nZXRUeXBlT2ZTeW1ib2xBdExvY2F0aW9uKHBhcmFtLCB0aGlzLm5vZGUpO1xuICAgICAgaWYgKHZhckFyZ3MpIHtcbiAgICAgICAgY29uc3QgdHlwZVJlZiA9IHBhcmFtVHlwZSBhcyB0cy5UeXBlUmVmZXJlbmNlO1xuICAgICAgICBwYXJhbVR5cGUgPSB0eXBlUmVmLnR5cGVBcmd1bWVudHMhWzBdO1xuICAgICAgfVxuICAgICAgbGV0IHR5cGVTdHIgPSB0aGlzLnRyYW5zbGF0ZShwYXJhbVR5cGUpO1xuICAgICAgaWYgKHZhckFyZ3MpIHR5cGVTdHIgPSAnLi4uJyArIHR5cGVTdHI7XG4gICAgICBpZiAob3B0aW9uYWwpIHR5cGVTdHIgPSB0eXBlU3RyICsgJz0nO1xuICAgICAgcGFyYW1UeXBlcy5wdXNoKHR5cGVTdHIpO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYW1UeXBlcztcbiAgfVxuXG4gIHdhcm4obXNnOiBzdHJpbmcpIHtcbiAgICAvLyBCeSBkZWZhdWx0LCB3YXJuKCkgZG9lcyBub3RoaW5nLiAgVGhlIGNhbGxlciB3aWxsIG92ZXJ3cml0ZSB0aGlzXG4gICAgLy8gaWYgaXQgd2FudHMgZGlmZmVyZW50IGJlaGF2aW9yLlxuICB9XG5cbiAgLyoqIEByZXR1cm4gdHJ1ZSBpZiBzeW0gc2hvdWxkIGFsd2F5cyBoYXZlIHR5cGUgez99LiAqL1xuICBpc0JsYWNrTGlzdGVkKHN5bWJvbDogdHMuU3ltYm9sKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucGF0aEJsYWNrTGlzdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgcGF0aEJsYWNrTGlzdCA9IHRoaXMucGF0aEJsYWNrTGlzdDtcbiAgICAvLyBTb21lIGJ1aWx0aW4gdHlwZXMsIHN1Y2ggYXMge30sIGdldCByZXByZXNlbnRlZCBieSBhIHN5bWJvbCB0aGF0IGhhcyBubyBkZWNsYXJhdGlvbnMuXG4gICAgaWYgKHN5bWJvbC5kZWNsYXJhdGlvbnMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBzeW1ib2wuZGVjbGFyYXRpb25zLmV2ZXJ5KG4gPT4ge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBwYXRoLm5vcm1hbGl6ZShuLmdldFNvdXJjZUZpbGUoKS5maWxlTmFtZSk7XG4gICAgICByZXR1cm4gcGF0aEJsYWNrTGlzdC5oYXMoZmlsZU5hbWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3N1cmUgZG9lc24gbm90IHN1cHBvcnQgdHlwZSBwYXJhbWV0ZXJzIGZvciBmdW5jdGlvbiB0eXBlcywgaS5lLiBnZW5lcmljIGZ1bmN0aW9uIHR5cGVzLlxuICAgKiBCbGFja2xpc3QgdGhlIHN5bWJvbHMgZGVjbGFyZWQgYnkgdGhlbSBhbmQgZW1pdCBhID8gZm9yIHRoZSB0eXBlcy5cbiAgICpcbiAgICogVGhpcyBtdXRhdGVzIHRoZSBnaXZlbiBibGFja2xpc3QgbWFwLiBUaGUgbWFwJ3Mgc2NvcGUgaXMgb25lIGZpbGUsIGFuZCBzeW1ib2xzIGFyZVxuICAgKiB1bmlxdWUgb2JqZWN0cywgc28gdGhpcyBzaG91bGQgbmVpdGhlciBsZWFkIHRvIGV4Y2Vzc2l2ZSBtZW1vcnkgY29uc3VtcHRpb24gbm9yIGludHJvZHVjZVxuICAgKiBlcnJvcnMuXG4gICAqXG4gICAqIEBwYXJhbSBibGFja2xpc3QgYSBtYXAgdG8gc3RvcmUgdGhlIGJsYWNrbGlzdGVkIHN5bWJvbHMgaW4sIHdpdGggYSB2YWx1ZSBvZiAnPycuIEluIHByYWN0aWNlLFxuICAgKiAgICAgdGhpcyBpcyBhbHdheXMgPT09IHRoaXMuc3ltYm9sc1RvQWxpYXNlZE5hbWVzLCBidXQgd2UncmUgcGFzc2luZyBpdCBleHBsaWNpdGx5IHRvIG1ha2UgaXRcbiAgICogICAgY2xlYXIgdGhhdCB0aGUgbWFwIGlzIG11dGF0ZWQgKGluIHBhcnRpY3VsYXIgd2hlbiB1c2VkIGZyb20gb3V0c2lkZSB0aGUgY2xhc3MpLlxuICAgKiBAcGFyYW0gZGVjbHMgdGhlIGRlY2xhcmF0aW9ucyB3aG9zZSBzeW1ib2xzIHNob3VsZCBiZSBibGFja2xpc3RlZC5cbiAgICovXG4gIGJsYWNrbGlzdFR5cGVQYXJhbWV0ZXJzKFxuICAgICAgYmxhY2tsaXN0OiBNYXA8dHMuU3ltYm9sLCBzdHJpbmc+LFxuICAgICAgZGVjbHM6IHRzLk5vZGVBcnJheTx0cy5UeXBlUGFyYW1ldGVyRGVjbGFyYXRpb24+fHVuZGVmaW5lZCkge1xuICAgIGlmICghZGVjbHMgfHwgIWRlY2xzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGZvciAoY29uc3QgdHBkIG9mIGRlY2xzKSB7XG4gICAgICBjb25zdCBzeW0gPSB0aGlzLnR5cGVDaGVja2VyLmdldFN5bWJvbEF0TG9jYXRpb24odHBkLm5hbWUpO1xuICAgICAgaWYgKCFzeW0pIHtcbiAgICAgICAgdGhpcy53YXJuKGB0eXBlIHBhcmFtZXRlciB3aXRoIG5vIHN5bWJvbGApO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3ltYm9sc1RvQWxpYXNlZE5hbWVzLnNldChzeW0sICc/Jyk7XG4gICAgfVxuICB9XG59XG4iXX0=