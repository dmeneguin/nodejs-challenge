"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_safe_1 = __importDefault(require("dotenv-safe"));
var requireProcessEnv = function (name) {
    if (!process.env[name]) {
        throw new Error("the " + name + " environment variable must be set");
    }
    return process.env[name];
};
dotenv_safe_1.default.config();
var config = {
    port: requireProcessEnv('APPLICATION_PORT'),
    mongo: {
        uri: requireProcessEnv('MONGOOSE_URI'),
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    }
};
exports.default = config;
