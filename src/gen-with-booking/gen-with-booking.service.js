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
exports.GenWithBookingService = void 0;
const common_1 = require("@nestjs/common");
let GenWithBookingService = class GenWithBookingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    genWithBookingsGroupedByCapacity() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all generators
                const generators = yield this.prisma.generators.findMany();
                // Prepare a mapping of capacity to generators and their bookings
                const groupedByCapacity = {};
                for (const generator of generators) {
                    const { genCapacity, genSrNumber } = generator;
                    // Initialize capacity group if not present
                    if (!groupedByCapacity[genCapacity]) {
                        groupedByCapacity[genCapacity] = [];
                    }
                    // Fetch bookings for the current generator
                    const bookings = yield this.prisma.bookings.findMany({
                        where: { genSr: genSrNumber },
                    });
                    // Add generator and its bookings to the group
                    groupedByCapacity[genCapacity].push({
                        genSr: genSrNumber,
                        bookings,
                    });
                }
                // Transform the grouped data into the desired format
                const response = Object.entries(groupedByCapacity).map(([capacity, generators]) => ({
                    capacity,
                    generators,
                }));
                return response;
            }
            catch (e) {
                return {
                    msg: e.message,
                };
            }
        });
    }
};
exports.GenWithBookingService = GenWithBookingService;
exports.GenWithBookingService = GenWithBookingService = __decorate([
    (0, common_1.Injectable)()
], GenWithBookingService);
