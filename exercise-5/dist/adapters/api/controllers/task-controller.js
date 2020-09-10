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
var log4js_1 = __importDefault(require("log4js"));
var task_service_1 = __importDefault(require("../../../application/services/task-service"));
var TaskController = /** @class */ (function () {
    function TaskController() {
        this.logger = log4js_1.default.getLogger('task-controller');
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    TaskController.prototype.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var match, sort, order, tasks, ex_1, status_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.info('GET /task/<id?>');
                        match = {
                            id: req.params.id ? req.params.id.toString() : undefined,
                            name: req.query.name ? req.query.name.toString() : undefined,
                            description: req.query.description ? req.query.description.toString() : undefined,
                        };
                        sort = req.query.sortBy ? req.query.sortBy.toString() : undefined;
                        order = req.query.orderBy ? req.query.orderBy.toString() : undefined;
                        return [4 /*yield*/, task_service_1.default.get(match, sort, order)];
                    case 1:
                        tasks = _a.sent();
                        res.json(tasks);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        status_1 = ex_1.status ? ex_1.status : 500;
                        this.logger.error(ex_1);
                        res.status(status_1).json({ message: ex_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var taskInfo, ex_2, status_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.info('POST /task');
                        taskInfo = req.body;
                        console.log(taskInfo);
                        return [4 /*yield*/, task_service_1.default.create(taskInfo)];
                    case 1:
                        _a.sent();
                        res.json({ message: 'Task successfully created' });
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        status_2 = ex_2.status ? ex_2.status : 500;
                        this.logger.error(ex_2);
                        res.status(status_2).json({ message: ex_2.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var taskId, taskInfo, ex_3, status_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.info('PUT /task/<id>');
                        taskId = req.params.id;
                        taskInfo = req.body;
                        return [4 /*yield*/, task_service_1.default.update(taskId, taskInfo)];
                    case 1:
                        _a.sent();
                        res.json({ message: 'Task successfully updated' });
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        status_3 = ex_3.status ? ex_3.status : 500;
                        this.logger.error(ex_3);
                        res.status(status_3).json({ message: ex_3.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var taskId, ex_4, status_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.info('DELETE /task/<id>');
                        taskId = req.params.id;
                        return [4 /*yield*/, task_service_1.default.delete(taskId)];
                    case 1:
                        _a.sent();
                        res.json({ message: 'Task successfully deleted' });
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        status_4 = ex_4.status ? ex_4.status : 500;
                        this.logger.error(ex_4);
                        res.status(status_4).json({ message: ex_4.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TaskController;
}());
exports.default = new TaskController();
