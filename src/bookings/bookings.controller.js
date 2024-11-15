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
exports.BookingsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
let BookingsController = class BookingsController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    create_booking(dto) {
        return this.bookingService.create_booking(dto);
    }
    getBookingsByGenId(id) {
        return this.bookingService.getBookingsByGenId(id);
    }
    getGeneratorsAvailability(startDate, endDate, capacity) {
        return __awaiter(this, void 0, void 0, function* () {
            // Convert the startDate and endDate to Date objects
            const start = new Date(startDate);
            const end = new Date(endDate);
            console.log(start);
            return this.bookingService.checkGeneratorsAvailability(start, end, capacity);
        });
    }
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.bookingService.processExcelFile(file); // Process the uploaded file
                return { message: 'Bookings data inserted successfully!' };
            }
            catch (error) {
                console.error(error);
                return { message: 'An error occurred while processing the file.' };
            }
        });
    }
};
exports.BookingsController = BookingsController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)())
], BookingsController.prototype, "create_booking", null);
__decorate([
    (0, common_1.Get)('byGenId/:id'),
    __param(0, (0, common_1.Param)('id'))
], BookingsController.prototype, "getBookingsByGenId", null);
__decorate([
    (0, common_1.Get)('availability'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __param(2, (0, common_1.Query)('capacity'))
], BookingsController.prototype, "getGeneratorsAvailability", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')) // 'file' is the key in the form-data request
    ,
    __param(0, (0, common_1.UploadedFile)())
], BookingsController.prototype, "uploadFile", null);
exports.BookingsController = BookingsController = __decorate([
    (0, common_1.Controller)('bookings')
], BookingsController);
