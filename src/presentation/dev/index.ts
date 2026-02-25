// import { logger } from "@bogeychan/elysia-logger";
import Elysia from "elysia";
import { GetAccessController } from "@caffeine/auth/plugins/controllers";
import CaffeineAuthTags from "@caffeine/auth/plugins/tags";
import PostTypeTags from "../tags";
import { CaffeineErrorHandler } from "@caffeine/api-error-handler";
import { CaffeineResponseMapper } from "@caffeine/api-response-mapper";
import { CaffeineApiDocs } from "@caffeine/api-docs";
import { makePostTypeRepository } from "@/infra/factories/repositories/post-type.repository.factory";
import { PostTypeRoutes } from "../routes";

new Elysia({ name: "@caffeine" })
	.use(CaffeineResponseMapper)
	.use(GetAccessController)
	.use(CaffeineErrorHandler)
	// .use(logger({ autoLogging: true }))
	.use(PostTypeRoutes(makePostTypeRepository()))
	.use(
		CaffeineApiDocs({
			servers: [{ url: "http://localhost:8080", description: "Base URL" }],
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
		}),
	)
	.listen(8080, () => {
		console.log(`🦊 server is running at: http://localhost:8080`);
	});
