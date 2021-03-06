goog.module('test_files.promiseconstructor.promiseconstructor');var module = module || {id: 'test_files/promiseconstructor/promiseconstructor.js'};/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {(undefined|!PromiseConstructor)=} promiseCtor
 * @return {!Promise<void>}
 */
function f(promiseCtor) {
    return promiseCtor ? new promiseCtor((res, rej) => res()) : Promise.resolve();
}
