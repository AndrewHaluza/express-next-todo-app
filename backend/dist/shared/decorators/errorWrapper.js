"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorWrapperDecorator = errorWrapperDecorator;
function errorWrapperDecorator(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value; // Store the original method
    descriptor.value = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield originalMethod.call(this, req, res, next);
                return result;
            }
            catch (error) {
                next(error);
            }
        });
    };
    return descriptor;
}
