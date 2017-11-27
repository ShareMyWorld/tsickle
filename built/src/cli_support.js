/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("tsickle/src/cli_support", ["require", "exports", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var path = require("path");
    // Postprocess generated JS.
    function pathToModuleName(context, fileName) {
        fileName = fileName.replace(/\.js$/, '');
        if (fileName[0] === '.') {
            // './foo' or '../foo'.
            // Resolve the path against the dirname of the current module.
            fileName = path.join(path.dirname(context), fileName);
        }
        // Make paths relative to CWD
        if (fileName.indexOf(process.cwd()) === 0) {
            fileName = fileName.slice(process.cwd().length + 1);
        }
        // Replace characters not supported by goog.module.
        var moduleName = fileName.replace(/\/|\\/g, '.').replace(/^[^a-zA-Z_$]/, '_').replace(/[^a-zA-Z0-9._$]/g, '_');
        return moduleName;
    }
    exports.pathToModuleName = pathToModuleName;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpX3N1cHBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2xpX3N1cHBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCwyQkFBNkI7SUFFN0IsNEJBQTRCO0lBQzVCLDBCQUFpQyxPQUFlLEVBQUUsUUFBZ0I7UUFDaEUsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXpDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLHVCQUF1QjtZQUN2Qiw4REFBOEQ7WUFDOUQsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRUQsNkJBQTZCO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFFRCxtREFBbUQ7UUFDbkQsSUFBTSxVQUFVLEdBQ1osUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbEcsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBbkJELDRDQW1CQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuLy8gUG9zdHByb2Nlc3MgZ2VuZXJhdGVkIEpTLlxuZXhwb3J0IGZ1bmN0aW9uIHBhdGhUb01vZHVsZU5hbWUoY29udGV4dDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgZmlsZU5hbWUgPSBmaWxlTmFtZS5yZXBsYWNlKC9cXC5qcyQvLCAnJyk7XG5cbiAgaWYgKGZpbGVOYW1lWzBdID09PSAnLicpIHtcbiAgICAvLyAnLi9mb28nIG9yICcuLi9mb28nLlxuICAgIC8vIFJlc29sdmUgdGhlIHBhdGggYWdhaW5zdCB0aGUgZGlybmFtZSBvZiB0aGUgY3VycmVudCBtb2R1bGUuXG4gICAgZmlsZU5hbWUgPSBwYXRoLmpvaW4ocGF0aC5kaXJuYW1lKGNvbnRleHQpLCBmaWxlTmFtZSk7XG4gIH1cblxuICAvLyBNYWtlIHBhdGhzIHJlbGF0aXZlIHRvIENXRFxuICBpZiAoZmlsZU5hbWUuaW5kZXhPZihwcm9jZXNzLmN3ZCgpKSA9PT0gMCkge1xuICAgIGZpbGVOYW1lID0gZmlsZU5hbWUuc2xpY2UocHJvY2Vzcy5jd2QoKS5sZW5ndGggKyAxKTtcbiAgfVxuXG4gIC8vIFJlcGxhY2UgY2hhcmFjdGVycyBub3Qgc3VwcG9ydGVkIGJ5IGdvb2cubW9kdWxlLlxuICBjb25zdCBtb2R1bGVOYW1lID1cbiAgICAgIGZpbGVOYW1lLnJlcGxhY2UoL1xcL3xcXFxcL2csICcuJykucmVwbGFjZSgvXlteYS16QS1aXyRdLywgJ18nKS5yZXBsYWNlKC9bXmEtekEtWjAtOS5fJF0vZywgJ18nKTtcblxuICByZXR1cm4gbW9kdWxlTmFtZTtcbn1cbiJdfQ==