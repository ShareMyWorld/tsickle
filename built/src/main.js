#!/usr/bin/env node
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
        define("tsickle/src/main", ["require", "exports", "fs", "minimist", "mkdirp", "path", "tsickle/src/typescript", "tsickle/src/cli_support", "tsickle/src/tsickle", "tsickle/src/tsickle"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs = require("fs");
    var minimist = require("minimist");
    var mkdirp = require("mkdirp");
    var path = require("path");
    var ts = require("tsickle/src/typescript");
    var cliSupport = require("tsickle/src/cli_support");
    var tsickle = require("tsickle/src/tsickle");
    var tsickle_1 = require("tsickle/src/tsickle");
    function usage() {
        console.error("usage: tsickle [tsickle options] -- [tsc options]\n\nexample:\n  tsickle --externs=foo/externs.js -- -p src --noImplicitAny\n\ntsickle flags are:\n  --externs=PATH     save generated Closure externs.js to PATH\n  --typed            [experimental] attempt to provide Closure types instead of {?}\n");
    }
    /**
     * Parses the command-line arguments, extracting the tsickle settings and
     * the arguments to pass on to tsc.
     */
    function loadSettingsFromArgs(args) {
        var settings = {};
        var parsedArgs = minimist(args);
        try {
            for (var _a = __values(Object.keys(parsedArgs)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var flag = _b.value;
                switch (flag) {
                    case 'h':
                    case 'help':
                        usage();
                        process.exit(0);
                        break;
                    case 'externs':
                        settings.externsPath = parsedArgs[flag];
                        break;
                    case 'typed':
                        settings.isTyped = true;
                        break;
                    case 'verbose':
                        settings.verbose = true;
                        break;
                    case '_':
                        // This is part of the minimist API, and holds args after the '--'.
                        break;
                    default:
                        console.error("unknown flag '--" + flag + "'");
                        usage();
                        process.exit(1);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Arguments after the '--' arg are arguments to tsc.
        var tscArgs = parsedArgs['_'];
        return { settings: settings, tscArgs: tscArgs };
        var e_1, _c;
    }
    /**
     * Loads the tsconfig.json from a directory.
     *
     * TODO(martinprobst): use ts.findConfigFile to match tsc behaviour.
     *
     * @param args tsc command-line arguments.
     */
    function loadTscConfig(args) {
        // Gather tsc options/input files from command line.
        var _a = ts.parseCommandLine(args), options = _a.options, fileNames = _a.fileNames, errors = _a.errors;
        if (errors.length > 0) {
            return { options: {}, fileNames: [], errors: errors };
        }
        // Store file arguments
        var tsFileArguments = fileNames;
        // Read further settings from tsconfig.json.
        var projectDir = options.project || '.';
        var configFileName = path.join(projectDir, 'tsconfig.json');
        var _b = ts.readConfigFile(configFileName, function (path) { return fs.readFileSync(path, 'utf-8'); }), json = _b.config, error = _b.error;
        if (error) {
            return { options: {}, fileNames: [], errors: [error] };
        }
        (_c = ts.parseJsonConfigFileContent(json, ts.sys, projectDir, options, configFileName), options = _c.options, fileNames = _c.fileNames, errors = _c.errors);
        if (errors.length > 0) {
            return { options: {}, fileNames: [], errors: errors };
        }
        // if file arguments were given to the typescript transpiler then transpile only those files
        fileNames = tsFileArguments.length > 0 ? tsFileArguments : fileNames;
        return { options: options, fileNames: fileNames, errors: [] };
        var _c;
    }
    /**
     * Compiles TypeScript code into Closure-compiler-ready JS.
     */
    function toClosureJS(options, fileNames, settings, writeFile) {
        var compilerHost = ts.createCompilerHost(options);
        var program = ts.createProgram(fileNames, options, compilerHost);
        var transformerHost = {
            shouldSkipTsickleProcessing: function (fileName) {
                if (fileName.indexOf(process.cwd()) === 0) {
                    fileName = fileName.slice(process.cwd().length + 1);
                }
                return fileNames.indexOf(fileName) === -1;
            },
            shouldIgnoreWarningsForPath: function (fileName) { return false; },
            pathToModuleName: cliSupport.pathToModuleName,
            fileNameToModuleId: function (fileName) { return fileName; },
            es5Mode: true,
            googmodule: true,
            prelude: '',
            transformDecorators: true,
            transformTypesToClosure: true,
            typeBlackListPaths: new Set(),
            untyped: false,
            logWarning: function (warning) { return console.error(tsickle.formatDiagnostics([warning])); },
        };
        var diagnostics = ts.getPreEmitDiagnostics(program);
        if (diagnostics.length > 0) {
            return {
                diagnostics: diagnostics,
                modulesManifest: new tsickle_1.ModulesManifest(),
                externs: {},
                emitSkipped: true,
                emittedFiles: [],
            };
        }
        return tsickle.emitWithTsickle(program, transformerHost, compilerHost, options, undefined, writeFile);
    }
    exports.toClosureJS = toClosureJS;
    function main(args) {
        var _a = loadSettingsFromArgs(args), settings = _a.settings, tscArgs = _a.tscArgs;
        var config = loadTscConfig(tscArgs);
        if (config.errors.length) {
            console.error(tsickle.formatDiagnostics(config.errors));
            return 1;
        }
        if (config.options.module !== ts.ModuleKind.CommonJS) {
            // This is not an upstream TypeScript diagnostic, therefore it does not go
            // through the diagnostics array mechanism.
            console.error('tsickle converts TypeScript modules to Closure modules via CommonJS internally. ' +
                'Set tsconfig.js "module": "commonjs"');
            return 1;
        }
        // Run tsickle+TSC to convert inputs to Closure JS files.
        var result = toClosureJS(config.options, config.fileNames, settings, function (filePath, contents) {
            mkdirp.sync(path.dirname(filePath));
            fs.writeFileSync(filePath, contents, { encoding: 'utf-8' });
        });
        if (result.diagnostics.length) {
            console.error(tsickle.formatDiagnostics(result.diagnostics));
            return 1;
        }
        if (settings.externsPath) {
            mkdirp.sync(path.dirname(settings.externsPath));
            fs.writeFileSync(settings.externsPath, tsickle.getGeneratedExterns(result.externs));
        }
        return 0;
    }
    // CLI entry point
    if (require.main === module) {
        process.exit(main(process.argv.splice(2)));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFVQSx1QkFBeUI7SUFDekIsbUNBQXFDO0lBQ3JDLCtCQUFpQztJQUNqQywyQkFBNkI7SUFDN0IsMkNBQW1DO0lBRW5DLG9EQUE0QztJQUM1Qyw2Q0FBcUM7SUFDckMsK0NBQTBDO0lBZTFDO1FBQ0UsT0FBTyxDQUFDLEtBQUssQ0FBQywwU0FRZixDQUFDLENBQUM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsOEJBQThCLElBQWM7UUFDMUMsSUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO1FBQzlCLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7WUFDbEMsR0FBRyxDQUFDLENBQWUsSUFBQSxLQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQSxnQkFBQTtnQkFBckMsSUFBTSxJQUFJLFdBQUE7Z0JBQ2IsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDYixLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLE1BQU07d0JBQ1QsS0FBSyxFQUFFLENBQUM7d0JBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEIsS0FBSyxDQUFDO29CQUNSLEtBQUssU0FBUzt3QkFDWixRQUFRLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDeEMsS0FBSyxDQUFDO29CQUNSLEtBQUssT0FBTzt3QkFDVixRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzt3QkFDeEIsS0FBSyxDQUFDO29CQUNSLEtBQUssU0FBUzt3QkFDWixRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzt3QkFDeEIsS0FBSyxDQUFDO29CQUNSLEtBQUssR0FBRzt3QkFDTixtRUFB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QztRQUVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoRCxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGtCQUFrQjtJQUNsQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgbWluaW1pc3QgZnJvbSAnbWluaW1pc3QnO1xuaW1wb3J0ICogYXMgbWtkaXJwIGZyb20gJ21rZGlycCc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAnLi90eXBlc2NyaXB0JztcblxuaW1wb3J0ICogYXMgY2xpU3VwcG9ydCBmcm9tICcuL2NsaV9zdXBwb3J0JztcbmltcG9ydCAqIGFzIHRzaWNrbGUgZnJvbSAnLi90c2lja2xlJztcbmltcG9ydCB7TW9kdWxlc01hbmlmZXN0fSBmcm9tICcuL3RzaWNrbGUnO1xuaW1wb3J0IHtjcmVhdGVTb3VyY2VSZXBsYWNpbmdDb21waWxlckhvc3R9IGZyb20gJy4vdXRpbCc7XG5cbi8qKiBUc2lja2xlIHNldHRpbmdzIHBhc3NlZCBvbiB0aGUgY29tbWFuZCBsaW5lLiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZXR0aW5ncyB7XG4gIC8qKiBJZiBwcm92aWRlZCwgcGF0aCB0byBzYXZlIGV4dGVybnMgdG8uICovXG4gIGV4dGVybnNQYXRoPzogc3RyaW5nO1xuXG4gIC8qKiBJZiBwcm92aWRlZCwgYXR0ZW1wdCB0byBwcm92aWRlIHR5cGVzIHJhdGhlciB0aGFuIHs/fS4gKi9cbiAgaXNUeXBlZD86IGJvb2xlYW47XG5cbiAgLyoqIElmIHRydWUsIGxvZyBpbnRlcm5hbCBkZWJ1ZyB3YXJuaW5ncyB0byB0aGUgY29uc29sZS4gKi9cbiAgdmVyYm9zZT86IGJvb2xlYW47XG59XG5cbmZ1bmN0aW9uIHVzYWdlKCkge1xuICBjb25zb2xlLmVycm9yKGB1c2FnZTogdHNpY2tsZSBbdHNpY2tsZSBvcHRpb25zXSAtLSBbdHNjIG9wdGlvbnNdXG5cbmV4YW1wbGU6XG4gIHRzaWNrbGUgLS1leHRlcm5zPWZvby9leHRlcm5zLmpzIC0tIC1wIHNyYyAtLW5vSW1wbGljaXRBbnlcblxudHNpY2tsZSBmbGFncyBhcmU6XG4gIC0tZXh0ZXJucz1QQVRIICAgICBzYXZlIGdlbmVyYXRlZCBDbG9zdXJlIGV4dGVybnMuanMgdG8gUEFUSFxuICAtLXR5cGVkICAgICAgICAgICAgW2V4cGVyaW1lbnRhbF0gYXR0ZW1wdCB0byBwcm92aWRlIENsb3N1cmUgdHlwZXMgaW5zdGVhZCBvZiB7P31cbmApO1xufVxuXG4vKipcbiAqIFBhcnNlcyB0aGUgY29tbWFuZC1saW5lIGFyZ3VtZW50cywgZXh0cmFjdGluZyB0aGUgdHNpY2tsZSBzZXR0aW5ncyBhbmRcbiAqIHRoZSBhcmd1bWVudHMgdG8gcGFzcyBvbiB0byB0c2MuXG4gKi9cbmZ1bmN0aW9uIGxvYWRTZXR0aW5nc0Zyb21BcmdzKGFyZ3M6IHN0cmluZ1tdKToge3NldHRpbmdzOiBTZXR0aW5ncywgdHNjQXJnczogc3RyaW5nW119IHtcbiAgY29uc3Qgc2V0dGluZ3M6IFNldHRpbmdzID0ge307XG4gIGNvbnN0IHBhcnNlZEFyZ3MgPSBtaW5pbWlzdChhcmdzKTtcbiAgZm9yIChjb25zdCBmbGFnIG9mIE9iamVjdC5rZXlzKHBhcnNlZEFyZ3MpKSB7XG4gICAgc3dpdGNoIChmbGFnKSB7XG4gICAgICBjYXNlICdoJzpcbiAgICAgIGNhc2UgJ2hlbHAnOlxuICAgICAgICB1c2FnZSgpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZXh0ZXJucyc6XG4gICAgICAgIHNldHRpbmdzLmV4dGVybnNQYXRoID0gcGFyc2VkQXJnc1tmbGFnXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0eXBlZCc6XG4gICAgICAgIHNldHRpbmdzLmlzVHlwZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZlcmJvc2UnOlxuICAgICAgICBzZXR0aW5ncy52ZXJib3NlID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdfJzpcbiAgICAgICAgLy8gVGhpcyBpcyBwYXJ0IG9mIHRoZSBtaW5pbWlzdCBBUEksIGFuZCBob2xkcyBhcmdzIGFmdGVyIHRoZSAnLS0nLlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYHVua25vd24gZmxhZyAnLS0ke2ZsYWd9J2ApO1xuICAgICAgICB1c2FnZSgpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfVxuICB9XG4gIC8vIEFyZ3VtZW50cyBhZnRlciB0aGUgJy0tJyBhcmcgYXJlIGFyZ3VtZW50cyB0byB0c2MuXG4gIGNvbnN0IHRzY0FyZ3MgPSBwYXJzZWRBcmdzWydfJ107XG4gIHJldHVybiB7c2V0dGluZ3MsIHRzY0FyZ3N9O1xufVxuXG4vKipcbiAqIExvYWRzIHRoZSB0c2NvbmZpZy5qc29uIGZyb20gYSBkaXJlY3RvcnkuXG4gKlxuICogVE9ETyhtYXJ0aW5wcm9ic3QpOiB1c2UgdHMuZmluZENvbmZpZ0ZpbGUgdG8gbWF0Y2ggdHNjIGJlaGF2aW91ci5cbiAqXG4gKiBAcGFyYW0gYXJncyB0c2MgY29tbWFuZC1saW5lIGFyZ3VtZW50cy5cbiAqL1xuZnVuY3Rpb24gbG9hZFRzY0NvbmZpZyhhcmdzOiBzdHJpbmdbXSk6XG4gICAge29wdGlvbnM6IHRzLkNvbXBpbGVyT3B0aW9ucywgZmlsZU5hbWVzOiBzdHJpbmdbXSwgZXJyb3JzOiB0cy5EaWFnbm9zdGljW119IHtcbiAgLy8gR2F0aGVyIHRzYyBvcHRpb25zL2lucHV0IGZpbGVzIGZyb20gY29tbWFuZCBsaW5lLlxuICBsZXQge29wdGlvbnMsIGZpbGVOYW1lcywgZXJyb3JzfSA9IHRzLnBhcnNlQ29tbWFuZExpbmUoYXJncyk7XG4gIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiB7b3B0aW9uczoge30sIGZpbGVOYW1lczogW10sIGVycm9yc307XG4gIH1cblxuICAvLyBTdG9yZSBmaWxlIGFyZ3VtZW50c1xuICBjb25zdCB0c0ZpbGVBcmd1bWVudHMgPSBmaWxlTmFtZXM7XG5cbiAgLy8gUmVhZCBmdXJ0aGVyIHNldHRpbmdzIGZyb20gdHNjb25maWcuanNvbi5cbiAgY29uc3QgcHJvamVjdERpciA9IG9wdGlvbnMucHJvamVjdCB8fCAnLic7XG4gIGNvbnN0IGNvbmZpZ0ZpbGVOYW1lID0gcGF0aC5qb2luKHByb2plY3REaXIsICd0c2NvbmZpZy5qc29uJyk7XG4gIGNvbnN0IHtjb25maWc6IGpzb24sIGVycm9yfSA9XG4gICAgICB0cy5yZWFkQ29uZmlnRmlsZShjb25maWdGaWxlTmFtZSwgcGF0aCA9PiBmcy5yZWFkRmlsZVN5bmMocGF0aCwgJ3V0Zi04JykpO1xuICBpZiAoZXJyb3IpIHtcbiAgICByZXR1cm4ge29wdGlvbnM6IHt9LCBmaWxlTmFtZXM6IFtdLCBlcnJvcnM6IFtlcnJvcl19O1xuICB9XG4gICh7b3B0aW9ucywgZmlsZU5hbWVzLCBlcnJvcnN9ID1cbiAgICAgICB0cy5wYXJzZUpzb25Db25maWdGaWxlQ29udGVudChqc29uLCB0cy5zeXMsIHByb2plY3REaXIsIG9wdGlvbnMsIGNvbmZpZ0ZpbGVOYW1lKSk7XG4gIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiB7b3B0aW9uczoge30sIGZpbGVOYW1lczogW10sIGVycm9yc307XG4gIH1cblxuICAvLyBpZiBmaWxlIGFyZ3VtZW50cyB3ZXJlIGdpdmVuIHRvIHRoZSB0eXBlc2NyaXB0IHRyYW5zcGlsZXIgdGhlbiB0cmFuc3BpbGUgb25seSB0aG9zZSBmaWxlc1xuICBmaWxlTmFtZXMgPSB0c0ZpbGVBcmd1bWVudHMubGVuZ3RoID4gMCA/IHRzRmlsZUFyZ3VtZW50cyA6IGZpbGVOYW1lcztcblxuICByZXR1cm4ge29wdGlvbnMsIGZpbGVOYW1lcywgZXJyb3JzOiBbXX07XG59XG5cbi8qKlxuICogQ29tcGlsZXMgVHlwZVNjcmlwdCBjb2RlIGludG8gQ2xvc3VyZS1jb21waWxlci1yZWFkeSBKUy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQ2xvc3VyZUpTKFxuICAgIG9wdGlvbnM6IHRzLkNvbXBpbGVyT3B0aW9ucywgZmlsZU5hbWVzOiBzdHJpbmdbXSwgc2V0dGluZ3M6IFNldHRpbmdzLFxuICAgIHdyaXRlRmlsZT86IHRzLldyaXRlRmlsZUNhbGxiYWNrKTogdHNpY2tsZS5FbWl0UmVzdWx0IHtcbiAgY29uc3QgY29tcGlsZXJIb3N0ID0gdHMuY3JlYXRlQ29tcGlsZXJIb3N0KG9wdGlvbnMpO1xuICBjb25zdCBwcm9ncmFtID0gdHMuY3JlYXRlUHJvZ3JhbShmaWxlTmFtZXMsIG9wdGlvbnMsIGNvbXBpbGVySG9zdCk7XG4gIGNvbnN0IHRyYW5zZm9ybWVySG9zdDogdHNpY2tsZS5Uc2lja2xlSG9zdCA9IHtcbiAgICBzaG91bGRTa2lwVHNpY2tsZVByb2Nlc3Npbmc6IChmaWxlTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoZmlsZU5hbWUuaW5kZXhPZihwcm9jZXNzLmN3ZCgpKSA9PT0gMCkge1xuICAgICAgICBmaWxlTmFtZSA9IGZpbGVOYW1lLnNsaWNlKHByb2Nlc3MuY3dkKCkubGVuZ3RoICsgMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmlsZU5hbWVzLmluZGV4T2YoZmlsZU5hbWUpID09PSAtMTtcbiAgICB9LFxuICAgIHNob3VsZElnbm9yZVdhcm5pbmdzRm9yUGF0aDogKGZpbGVOYW1lOiBzdHJpbmcpID0+IGZhbHNlLFxuICAgIHBhdGhUb01vZHVsZU5hbWU6IGNsaVN1cHBvcnQucGF0aFRvTW9kdWxlTmFtZSxcbiAgICBmaWxlTmFtZVRvTW9kdWxlSWQ6IChmaWxlTmFtZSkgPT4gZmlsZU5hbWUsXG4gICAgZXM1TW9kZTogdHJ1ZSxcbiAgICBnb29nbW9kdWxlOiB0cnVlLFxuICAgIHByZWx1ZGU6ICcnLFxuICAgIHRyYW5zZm9ybURlY29yYXRvcnM6IHRydWUsXG4gICAgdHJhbnNmb3JtVHlwZXNUb0Nsb3N1cmU6IHRydWUsXG4gICAgdHlwZUJsYWNrTGlzdFBhdGhzOiBuZXcgU2V0KCksXG4gICAgdW50eXBlZDogZmFsc2UsXG4gICAgbG9nV2FybmluZzogKHdhcm5pbmcpID0+IGNvbnNvbGUuZXJyb3IodHNpY2tsZS5mb3JtYXREaWFnbm9zdGljcyhbd2FybmluZ10pKSxcbiAgfTtcbiAgY29uc3QgZGlhZ25vc3RpY3MgPSB0cy5nZXRQcmVFbWl0RGlhZ25vc3RpY3MocHJvZ3JhbSk7XG4gIGlmIChkaWFnbm9zdGljcy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRpYWdub3N0aWNzLFxuICAgICAgbW9kdWxlc01hbmlmZXN0OiBuZXcgTW9kdWxlc01hbmlmZXN0KCksXG4gICAgICBleHRlcm5zOiB7fSxcbiAgICAgIGVtaXRTa2lwcGVkOiB0cnVlLFxuICAgICAgZW1pdHRlZEZpbGVzOiBbXSxcbiAgICB9O1xuICB9XG4gIHJldHVybiB0c2lja2xlLmVtaXRXaXRoVHNpY2tsZShcbiAgICAgIHByb2dyYW0sIHRyYW5zZm9ybWVySG9zdCwgY29tcGlsZXJIb3N0LCBvcHRpb25zLCB1bmRlZmluZWQsIHdyaXRlRmlsZSk7XG59XG5cbmZ1bmN0aW9uIG1haW4oYXJnczogc3RyaW5nW10pOiBudW1iZXIge1xuICBjb25zdCB7c2V0dGluZ3MsIHRzY0FyZ3N9ID0gbG9hZFNldHRpbmdzRnJvbUFyZ3MoYXJncyk7XG4gIGNvbnN0IGNvbmZpZyA9IGxvYWRUc2NDb25maWcodHNjQXJncyk7XG4gIGlmIChjb25maWcuZXJyb3JzLmxlbmd0aCkge1xuICAgIGNvbnNvbGUuZXJyb3IodHNpY2tsZS5mb3JtYXREaWFnbm9zdGljcyhjb25maWcuZXJyb3JzKSk7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBpZiAoY29uZmlnLm9wdGlvbnMubW9kdWxlICE9PSB0cy5Nb2R1bGVLaW5kLkNvbW1vbkpTKSB7XG4gICAgLy8gVGhpcyBpcyBub3QgYW4gdXBzdHJlYW0gVHlwZVNjcmlwdCBkaWFnbm9zdGljLCB0aGVyZWZvcmUgaXQgZG9lcyBub3QgZ29cbiAgICAvLyB0aHJvdWdoIHRoZSBkaWFnbm9zdGljcyBhcnJheSBtZWNoYW5pc20uXG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgJ3RzaWNrbGUgY29udmVydHMgVHlwZVNjcmlwdCBtb2R1bGVzIHRvIENsb3N1cmUgbW9kdWxlcyB2aWEgQ29tbW9uSlMgaW50ZXJuYWxseS4gJyArXG4gICAgICAgICdTZXQgdHNjb25maWcuanMgXCJtb2R1bGVcIjogXCJjb21tb25qc1wiJyk7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICAvLyBSdW4gdHNpY2tsZStUU0MgdG8gY29udmVydCBpbnB1dHMgdG8gQ2xvc3VyZSBKUyBmaWxlcy5cbiAgY29uc3QgcmVzdWx0ID0gdG9DbG9zdXJlSlMoXG4gICAgICBjb25maWcub3B0aW9ucywgY29uZmlnLmZpbGVOYW1lcywgc2V0dGluZ3MsIChmaWxlUGF0aDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKSA9PiB7XG4gICAgICAgIG1rZGlycC5zeW5jKHBhdGguZGlybmFtZShmaWxlUGF0aCkpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCBjb250ZW50cywge2VuY29kaW5nOiAndXRmLTgnfSk7XG4gICAgICB9KTtcbiAgaWYgKHJlc3VsdC5kaWFnbm9zdGljcy5sZW5ndGgpIHtcbiAgICBjb25zb2xlLmVycm9yKHRzaWNrbGUuZm9ybWF0RGlhZ25vc3RpY3MocmVzdWx0LmRpYWdub3N0aWNzKSk7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBpZiAoc2V0dGluZ3MuZXh0ZXJuc1BhdGgpIHtcbiAgICBta2RpcnAuc3luYyhwYXRoLmRpcm5hbWUoc2V0dGluZ3MuZXh0ZXJuc1BhdGgpKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKHNldHRpbmdzLmV4dGVybnNQYXRoLCB0c2lja2xlLmdldEdlbmVyYXRlZEV4dGVybnMocmVzdWx0LmV4dGVybnMpKTtcbiAgfVxuICByZXR1cm4gMDtcbn1cblxuLy8gQ0xJIGVudHJ5IHBvaW50XG5pZiAocmVxdWlyZS5tYWluID09PSBtb2R1bGUpIHtcbiAgcHJvY2Vzcy5leGl0KG1haW4ocHJvY2Vzcy5hcmd2LnNwbGljZSgyKSkpO1xufVxuIl19