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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const library_1 = require("@prisma/client/runtime/library");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    signup(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            // generate password hash
            const hash = yield argon.hash(dto.password);
            try {
                // add user to the database
                if (!dto.role) {
                    throw new common_1.BadRequestException('Role field is Required');
                }
                const user = yield this.prisma.user.create({
                    data: {
                        email: dto.email,
                        hash,
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                        Role: dto.role
                    },
                });
                //return the saved user
                return this.signToken(user.id, user.email);
            }
            catch (e) {
                if (e instanceof common_1.BadRequestException) {
                    throw new common_1.BadRequestException('Role field is Required');
                }
                if (e instanceof library_1.PrismaClientKnownRequestError) {
                    console.log('Forbidden exception caught:', e.message);
                    throw new common_1.ForbiddenException('Email already taken');
                }
                // Handle case when 'e' is of unknown type
                if (e instanceof Error) {
                    return {
                        msg: "error occurred",
                        details: e.message, // Safe to access e.message now
                    };
                }
                // If e is not an instance of Error or known exceptions
                return {
                    msg: "error occurred",
                    details: 'Unknown error occurred', // Fallback for unknown types
                };
            }
        });
    }
    signin(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });
            if (!user) {
                throw new common_1.ForbiddenException('Credentials incorrect');
            }
            const pwMatcehs = yield argon.verify(user.hash, dto.password);
            if (!pwMatcehs) {
                throw new common_1.ForbiddenException('Credentials incorrect');
            }
            return this.signToken(user.id, user.email);
        });
    }
    signToken(userId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                sub: userId,
                email,
            };
            const token = yield this.jwt.signAsync(payload, {
                expiresIn: '15m',
                secret: this.config.get('JWT_SECRET'),
            });
            return {
                access_token: token
            };
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
