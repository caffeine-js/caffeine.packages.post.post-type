import Elysia from "elysia";
import { GetAccessController } from "@caffeine/auth/plugins/controllers";
import CaffeineAuthTags from "@caffeine/auth/plugins/tags";
import PostTypeTags from "../tags";
import { CaffeineErrorHandler } from "@caffeine/api-error-handler";
import { CaffeineResponseMapper } from "@caffeine/api-response-mapper";
import { CaffeineApiDocs } from "@caffeine/api-docs";
import { makePostTypeRepository } from "@/infra/factories/repositories";
import { PostTypeRoutes } from "../routes";
import { CaffeineEnv } from "@caffeine/env";
import { AuthEnvDependenciesDTO } from "@caffeine/auth/dtos";
import { PostTypeDependenciesDTO } from "@/infra/dependencies";
import { CaffeinePostAdapter } from "@caffeine-adapters/post/plugins";
import { PostTypeRepositoryPlugin } from "../plugins";
import type { IPostTypeRepository } from "@/domain/types";

async function bootstrap() {
    const app = new Elysia({ name: "@caffeine" })
        .use(CaffeineEnv(AuthEnvDependenciesDTO, PostTypeDependenciesDTO))
        .use(CaffeineErrorHandler)
        .use(CaffeineResponseMapper);

    const { env } = app.decorator;
    const {
        AUTH_EMAIL,
        AUTH_PASSWORD,
        JWT_SECRET,
        DATABASE_URL,
        DATABASE_PROVIDER,
        PORT,
        NODE_ENV,
    } = env;

    app.use(
        GetAccessController({
            AUTH_EMAIL,
            AUTH_PASSWORD,
            JWT_SECRET,
        }),
    );

    let postTypeRepository: IPostTypeRepository;

    if (DATABASE_URL && DATABASE_PROVIDER?.includes("PRISMA")) {
        const postAdapter = await CaffeinePostAdapter(DATABASE_URL);

        app.use(postAdapter).use((app) => {
            const { postPrismaClient } = app.decorator;

            postTypeRepository = makePostTypeRepository(
                DATABASE_PROVIDER,
                postPrismaClient,
            );

            return app.use(PostTypeRepositoryPlugin(postTypeRepository));
        });
    } else {
        app.use((app) => {
            const { env } = app.decorator;
            const { DATABASE_PROVIDER } = env;

            postTypeRepository = makePostTypeRepository(DATABASE_PROVIDER);

            return app.use(PostTypeRepositoryPlugin(postTypeRepository));
        });
    }

    app.use(PostTypeRoutes(postTypeRepository!, JWT_SECRET));

    app.use(
        CaffeineApiDocs(
            NODE_ENV === "DEVELOPMENT",
            `http://localhost:${PORT}`,
            {
                info: {
                    title: "Caffeine",
                    version: "1.0",
                    contact: {
                        email: "alanreisanjo@gmail.com",
                        name: "Alan Reis",
                        url: "https://hoyasumii.dev",
                    },
                    description:
                        "A RESTful API for managing Post Types within the Caffeine CMS platform. This microservice is responsible for creating, retrieving, updating, and deleting Post Types, handling global uniqueness through slugs, schema management for diverse content structures, and toggleable highlight states.",
                },
                tags: [CaffeineAuthTags, PostTypeTags],
            },
        ),
    );
    app.listen(PORT, () => {
        console.log(`🦊 Server is running at: http://localhost:${PORT}`);
    });

    return app;
}

await bootstrap();
