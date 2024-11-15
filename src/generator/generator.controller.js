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
exports.GeneratorController = void 0;
const common_1 = require("@nestjs/common");
let GeneratorController = class GeneratorController {
    constructor(generatorService) {
        this.generatorService = generatorService;
    }
    add_generator(dto) {
        return this.generatorService.add_generator(dto);
    }
    getGeneratorById(genSrNumber) {
        console.log(genSrNumber);
        return this.generatorService.getGeneratorById(genSrNumber);
    }
};
exports.GeneratorController = GeneratorController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)())
], GeneratorController.prototype, "add_generator", null);
__decorate([
    (0, common_1.Get)('byId'),
    __param(0, (0, common_1.Query)('genSrNumber'))
], GeneratorController.prototype, "getGeneratorById", null);
exports.GeneratorController = GeneratorController = __decorate([
    (0, common_1.Controller)('generators')
], GeneratorController);
