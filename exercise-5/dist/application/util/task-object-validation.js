"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var exception_message_map_1 = __importDefault(require("./exception-message-map"));
var http_request_error_1 = __importDefault(require("./errors/http-request-error"));
var TaskValidation = /** @class */ (function () {
    function TaskValidation() {
        this.isObjectIdValid = mongoose_1.default.Types.ObjectId.isValid;
    }
    TaskValidation.prototype.OnCreation = function (object) {
        console.log(object);
        if (!object.name) {
            throw new http_request_error_1.default(exception_message_map_1.default.TASK_NAME_VIOLATION, 400);
        }
        if (!object.description) {
            throw new http_request_error_1.default(exception_message_map_1.default.TASK_DESCRIPTION_VIOLATION, 400);
        }
        var validatedTaskInfo = {
            name: object.name,
            description: object.description,
        };
        return validatedTaskInfo;
    };
    TaskValidation.prototype.OnUpdate = function (taskId, object) {
        var validatedTaskInfo = {};
        if (!taskId) {
            throw new http_request_error_1.default(exception_message_map_1.default.TASK_ID_VIOLATION, 400);
        }
        else {
            if (!this.isObjectIdValid(taskId)) {
                throw new http_request_error_1.default(exception_message_map_1.default.TASK_ID_INVALID, 400);
            }
            validatedTaskInfo.id = mongoose_1.default.Types.ObjectId(taskId);
        }
        if (object.name) {
            validatedTaskInfo.name = object.name;
        }
        if (object.description) {
            validatedTaskInfo.description = object.description;
        }
        return validatedTaskInfo;
    };
    return TaskValidation;
}());
exports.default = new TaskValidation();
