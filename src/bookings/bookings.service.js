"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const XLSX = require("xlsx");
let BookingsService = class BookingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create_booking(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const generator = yield this.prisma.generators.findFirst({
                    where: {
                        genSrNumber: dto.genSr,
                    },
                });
                if (!generator) {
                    throw new common_1.BadRequestException("Generator with this id doesn't exists");
                }
                const existingBookings = yield this.prisma.bookings.findMany({
                    where: {
                        genSr: dto.genSr,
                    },
                });
                // Check for overlapping bookings
                const isOverlap = existingBookings.some((booking) => {
                    const bookingStart = new Date(dto.startDate); // New booking's start date
                    const bookingEnd = new Date(dto.endDate); // New booking's end date
                    const existingBookingStart = new Date(booking.startDate); // Existing booking's start date
                    const existingBookingEnd = new Date(booking.endDate); // Existing booking's end date
                    // Check if the new booking overlaps with any of the existing bookings
                    return (bookingStart < existingBookingEnd && bookingEnd > existingBookingStart // There is an overlap
                    );
                });
                // If there is an overlap, throw an error
                if (isOverlap) {
                    throw new common_1.BadRequestException('The selected time range is unavailable due to overlapping bookings.');
                }
                // If no overlap, create the new booking
                const newBooking = yield this.prisma.bookings.create({
                    data: {
                        genSr: dto.genSr,
                        startDate: dto.startDate,
                        endDate: dto.endDate,
                        eventName: dto.eventName,
                        instalationType: dto.instalationType,
                        jobNumber: dto.jobNumber,
                        location: dto.location,
                        mainClient: dto.mainClient,
                        numberOfDaysToHire: dto.numberOfDaysToHire,
                        projectNumber: dto.projectNumber,
                        siteInfo: dto.siteInfo,
                        subClient: dto.subClient,
                    },
                });
                return newBooking;
            }
            catch (e) {
                return {
                    msg: e.message,
                };
            }
        });
    }
    getBookingsByGenId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield this.prisma.bookings.findMany({
                    where: {
                        genSr: id,
                    },
                });
                return bookings;
            }
            catch (e) {
                return {
                    msg: e.message,
                };
            }
        });
    }
    checkGeneratorsAvailability(startDate, endDate, capacity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Checking availability from:', startDate, 'to:', endDate);
                const generators = yield this.prisma.generators.findMany({
                    where: {
                        genCapacity: capacity
                    },
                });
                console.log('Total generators:', generators.length);
                const availableGenerators = [];
                for (const generator of generators) {
                    const existingBookings = yield this.prisma.bookings.findMany({
                        where: {
                            genSr: generator.genSrNumber,
                        },
                    });
                    console.log(`Checking generator ${generator.id} with ${existingBookings.length} bookings`);
                    const isAvailable = !existingBookings.some((booking) => {
                        const bookingStart = new Date(booking.startDate);
                        const bookingEnd = new Date(booking.endDate);
                        // Log each booking range to see why generators are being marked as unavailable
                        console.log(`Generator ${generator.id} booking:`, bookingStart, 'to', bookingEnd);
                        // Check if the new booking range overlaps with existing booking range
                        const overlap = startDate <= bookingEnd && endDate >= bookingStart;
                        if (overlap) {
                            console.log(`Overlap found for generator ${generator.id} with booking from ${bookingStart} to ${bookingEnd}`);
                        }
                        return overlap;
                    });
                    if (isAvailable) {
                        availableGenerators.push(generators);
                    }
                }
                console.log('Available generators:', availableGenerators);
                return availableGenerators;
            }
            catch (e) {
                console.error('Error checking availability:', e.message);
                throw new common_1.InternalServerErrorException('Failed to check availability');
            }
        });
    }
    processExcelFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const workbook = XLSX.read(file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0]; // Use the first sheet in the Excel file
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet); // Convert Excel sheet to JSON
            // Iterate over the rows and insert each one into the database
            const insertPromises = data.map((row) => __awaiter(this, void 0, void 0, function* () {
                return this.prisma.bookings.create({
                    data: {
                        eventName: row.eventName || '', // Default value handling
                        genSr: row.genSr || '',
                        instalationType: row.instalationType || '',
                        jobNumber: row.jobNumber || '',
                        location: row.location || '',
                        mainClient: row.mainClient || '',
                        numberOfDaysToHire: row.numberOfDaysToHire || 0,
                        projectNumber: row.projectNumber || '',
                        siteInfo: row.siteInfo || '',
                        subClient: row.subClient || '',
                        startDate: new Date(row.startDate), // Assuming startDate and endDate are in a valid date format
                        endDate: new Date(row.endDate), // Adjust date format if needed
                    },
                });
            }));
            // Wait for all data to be inserted
            yield Promise.all(insertPromises);
        });
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)()
], BookingsService);
