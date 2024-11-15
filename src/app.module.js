"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const prisma_module_1 = require("./prisma/prisma.module");
const config_1 = require("@nestjs/config");
const generator_module_1 = require("./generator/generator.module");
const bookings_module_1 = require("./bookings/bookings.module");
const gen_with_booking_module_1 = require("./gen-with-booking/gen-with-booking.module");
const platform_express_1 = require("@nestjs/platform-express");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            platform_express_1.MulterModule.register({
                dest: './uploads', // Optional directory to store the uploaded files
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            generator_module_1.GeneratorModule,
            bookings_module_1.BookingsModule,
            gen_with_booking_module_1.GenWithBookingModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
