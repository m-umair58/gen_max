"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signup(dto) {
        console.log({
            dto
        });
        return this.authService.signin(dto);
    }
    signin(dto) {
        return this.authService.signup(dto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)())
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)())
], AuthController.prototype, "signin", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth')
], AuthController);
