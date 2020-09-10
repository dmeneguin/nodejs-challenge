"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var task_controller_1 = __importDefault(require("../controllers/task-controller"));
var router = express_1.default.Router();
router.get('/task/:id?', task_controller_1.default.get);
router.post('/task', task_controller_1.default.create);
router.put('/task/:id', task_controller_1.default.update);
router.delete('/task/:id', task_controller_1.default.delete);
exports.default = router;
