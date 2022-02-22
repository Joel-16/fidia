"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const apollo_server_core_1 = require("apollo-server-core");
const Registration_resolver_1 = require("./resolvers/Registration.resolver");
const verification_resolver_1 = require("./resolvers/verification.resolver");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const options = yield (0, typeorm_1.getConnectionOptions)(process.env.NODE_ENV || "development");
    yield (0, typeorm_1.createConnection)(Object.assign(Object.assign({}, options), { name: "default" }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [Registration_resolver_1.RegisterResolver, Registration_resolver_1.LoginResolver, verification_resolver_1.VerificationResolver],
            validate: true
        }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
        context: ({ req, res }) => ({ req, res })
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}/graphql`);
    });
}))();
//# sourceMappingURL=index.js.map