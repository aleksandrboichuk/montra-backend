import {Injectable} from "@nestjs/common";
import {GqlOptionsFactory} from "@nestjs/graphql";
import {GQL_ENDPOINT, NODE_ENV} from "@environments";
import {ApolloDriver} from "@nestjs/apollo";

@Injectable()
export class GraphQLConfig implements GqlOptionsFactory {
     async createGqlOptions() {
        return {
            driver: ApolloDriver,
            typePaths: ['./**/*.graphql'],
            path: `${GQL_ENDPOINT!}`,
            cors: true,
            bodyParserConfig: {limit: '50mb'},
            installSubscriptionHandlers: true,
            formatError: (error) => {
                return NODE_ENV === "production"
                    ? error.extensions.originalError
                    : error
            },
            playground: NODE_ENV !== 'production' && {
                tracing: NODE_ENV !== 'production',
                installSubscriptionHandlers: true,
                uploads: {
                    maxFieldSize: 2, // 1mb
                    maxFileSize: 20, // 20mb
                    maxFiles: 5
                }
            }
        }
    }
}