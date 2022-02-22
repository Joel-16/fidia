"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.LoginResolver = exports.RegisterResolver = void 0;
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../entity/User");
const register_input_1 = require("../inputTypes/register.input");
const apollo_server_express_1 = require("apollo-server-express");
const loginReturn_1 = require("../returnTypes/loginReturn");
let RegisterResolver = class RegisterResolver {
    registration({ country, email, mobile, name, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            let salt = (0, bcryptjs_1.genSaltSync)(10);
            password = (0, bcryptjs_1.hashSync)(password, salt);
            if (yield User_1.User.findOne({ email: email })) {
                throw new apollo_server_express_1.UserInputError(`Account with ${email} already exist. Please try another email`);
            }
            else {
                let user = User_1.User.create({
                    country: country,
                    mobile: mobile,
                    email: email,
                    password: password,
                    name: name,
                    confirmed: false
                });
                return yield user.save();
            }
        });
    }
    allUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.find({});
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_input_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "registration", null);
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "allUsers", null);
RegisterResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], RegisterResolver);
exports.RegisterResolver = RegisterResolver;
let LoginResolver = class LoginResolver {
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield User_1.User.findOneOrFail({ email });
            }
            catch (e) {
                throw new Error("Account doesn't exist");
            }
            if (!(0, bcryptjs_1.compareSync)(password, user.password)) {
                throw new apollo_server_express_1.UserInputError("Password is incorrect");
            }
            let token = { id: user.id, email: user.email };
            return { token: (0, jsonwebtoken_1.sign)(token, `${process.env.JWT}`, { expiresIn: '1h' }), user: user };
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => loginReturn_1.loginReturn),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], LoginResolver.prototype, "login", null);
LoginResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], LoginResolver);
exports.LoginResolver = LoginResolver;
//# sourceMappingURL=Registration.resolver.js.map