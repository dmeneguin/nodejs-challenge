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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var log4js_1 = __importDefault(require("log4js"));
var task_1 = __importDefault(require("../domain/task"));
var task_object_validation_1 = __importDefault(require("../util/task-object-validation"));
var exception_message_map_1 = __importDefault(require("../util/exception-message-map"));
var http_request_error_1 = __importDefault(require("../util/errors/http-request-error"));
var TaskService = /** @class */ (function () {
    function TaskService() {
        this.logger = log4js_1.default.getLogger('task-service');
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    TaskService.prototype.queryBuilder = function (match) {
        var query = {};
        if (match.id) {
            var taskId = match.id.toString();
            if (!mongoose_1.default.Types.ObjectId.isValid(taskId)) {
                throw new http_request_error_1.default(exception_message_map_1.default.TASK_ID_INVALID, 400);
            }
            else {
                query._id = mongoose_1.default.Types.ObjectId(taskId);
            }
        }
        if (match.name) {
            query.name = { $regex: new RegExp("" + match.name, "i") };
        }
        if (match.description) {
            query.description = { $regex: new RegExp("" + match.description, "i") };
        }
        return query;
    };
    TaskService.prototype.sortBuilder = function (sortParameter, order) {
        var builtSort = {};
        var builtOrder = order === 'desc' ? -1 : 1;
        if (sortParameter) {
            builtSort[sortParameter] = builtOrder;
        }
        return builtSort;
    };
    TaskService.prototype.get = function (match, sort, order) {
        return __awaiter(this, void 0, void 0, function () {
            var findExpression, sortExpression, foundTasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info('Getting list of tasks');
                        findExpression = this.queryBuilder(match);
                        sortExpression = this.sortBuilder(sort, order);
                        return [4 /*yield*/, task_1.default.find(findExpression).sort(sortExpression)];
                    case 1:
                        foundTasks = _a.sent();
                        return [2 /*return*/, foundTasks];
                }
            });
        });
    };
    TaskService.prototype.create = function (taskInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var validatedTaskInfo, newTask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info('Creating task');
                        validatedTaskInfo = task_object_validation_1.default.OnCreation(taskInfo);
                        newTask = new task_1.default(validatedTaskInfo);
                        return [4 /*yield*/, newTask.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskService.prototype.update = function (taskId, taskInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var validatedTaskInfo, updateResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info('Updating task');
                        validatedTaskInfo = task_object_validation_1.default.OnUpdate(taskId, taskInfo);
                        return [4 /*yield*/, task_1.default.findOneAndUpdate({ _id: validatedTaskInfo.id }, validatedTaskInfo, { useFindAndModify: false })];
                    case 1:
                        updateResult = _a.sent();
                        if (updateResult === null) {
                            throw new http_request_error_1.default(exception_message_map_1.default.TASK_UPDATE_NOT_FOUND, 404);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskService.prototype.delete = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info('Deleting task');
                        return [4 /*yield*/, task_1.default.findByIdAndDelete(mongoose_1.default.Types.ObjectId(taskId))];
                    case 1:
                        deleteResult = _a.sent();
                        if (deleteResult === null) {
                            throw new http_request_error_1.default(exception_message_map_1.default.TASK_DELETE_NOT_FOUND, 404);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return TaskService;
}());
exports.default = new TaskService();
