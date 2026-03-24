import PostTypeTags from "../tags";
import { makePostTypeRepository } from "@/infra/factories/repositories";
import { PostTypeRoutes } from "../routes";
import { PostTypeRepositoryPlugin } from "../plugins";
import type { IPostTypeRepository } from "@/domain/types";
import { baristaEnv } from "@roastery-capsules/env";
import { CacheEnvDependenciesDTO } from "@roastery-adapters/cache/dtos";
import { AuthEnvDependenciesDTO } from "@roastery-capsules/auth/dtos";
import { PostTypeDependenciesDTO } from "@/infra/dependencies";
import { baristaErrorHandler } from "@roastery-capsules/api-error-handler";
import { baristaResponseMapper } from "@roastery-capsules/api-response-mapper";
import { cache } from "@roastery-adapters/cache";
import { barista } from "@roastery/barista";
import { postAdapter as baristaPostAdapter } from "@roastery-adapters/post/plugins";
import { UnknownException } from "@roastery/terroir/exceptions";
import { GetAccessController } from "@roastery-capsules/auth/plugins/controllers";
import BaristaAuthTags from "@roastery-capsules/auth/plugins/tags";
import { baristaApiDocs } from "@roastery-capsules/api-docs";

export async function bootstrap(open: boolean = false) {
	const app = barista({ name: "@roastery" })
		.use(
			baristaEnv(
				CacheEnvDependenciesDTO,
				AuthEnvDependenciesDTO,
				PostTypeDependenciesDTO,
			),
		)
		.use(baristaErrorHandler)
		.use(baristaResponseMapper)
		.use((app) => {
			const { CACHE_PROVIDER, REDIS_URL } = app.decorator.env;

			return app.use(cache({ CACHE_PROVIDER, REDIS_URL }));
		});

	const { env } = app.decorator;
	const {
		AUTH_EMAIL,
		AUTH_PASSWORD,
		JWT_SECRET,
		DATABASE_URL,
		DATABASE_PROVIDER,
		PORT,
		NODE_ENV,
		CACHE_PROVIDER,
		REDIS_URL,
	} = env;

	let postTypeRepository: IPostTypeRepository;

	if (DATABASE_URL && DATABASE_PROVIDER === "PRISMA") {
		const postAdapter = await baristaPostAdapter(DATABASE_URL);

		app.use(postAdapter).use((app) => {
			const { postPrismaClient: prismaClient, cache } = app.decorator;

			postTypeRepository = makePostTypeRepository({
				cache,
				prismaClient,
				target: DATABASE_PROVIDER,
			});

			return app.use(PostTypeRepositoryPlugin(postTypeRepository));
		});
	} else {
		app.use((app) => {
			const { cache } = app.decorator;

			postTypeRepository = makePostTypeRepository({
				cache,
				target: "MEMORY",
			});

			return app.use(PostTypeRepositoryPlugin(postTypeRepository));
		});
	}

	if (!postTypeRepository!) throw new UnknownException();

	return app
		.use(
			GetAccessController({
				AUTH_EMAIL,
				AUTH_PASSWORD,
				JWT_SECRET,
				CACHE_PROVIDER,
				REDIS_URL,
			}),
		)
		.use((app) => {
			const { env } = app.decorator;
			const { CACHE_PROVIDER, JWT_SECRET, REDIS_URL } = env;
			return app.use(
				PostTypeRoutes({
					cacheProvider: CACHE_PROVIDER,
					jwtSecret: JWT_SECRET,
					repository: postTypeRepository,
					redisUrl: REDIS_URL,
				}),
			);
		})
		.use(
			baristaApiDocs(NODE_ENV === "DEVELOPMENT", `http://localhost:${PORT}`, {
				info: {
					title: "Roastery",
					version: "1.0",
					contact: {
						email: "alanreisanjo@gmail.com",
						name: "Alan Reis",
						url: "https://hoyasumii.dev",
					},
					description:
						"A RESTful API for managing Post Types within the Roastery CMS platform. This microservice is responsible for creating, retrieving, updating, and deleting Post Types, handling global uniqueness through slugs, schema management for diverse content structures, and toggleable highlight states.",
				},
				tags: [BaristaAuthTags, PostTypeTags],
			}),
		)
		.use((app) => {
			if (open) {
				app.listen(app.decorator.env.PORT, () => {
					console.log(
						`☕️ Server is running at: http://localhost:${app.decorator.env.PORT}`,
					);
				});
			}

			return app;
		});
}
