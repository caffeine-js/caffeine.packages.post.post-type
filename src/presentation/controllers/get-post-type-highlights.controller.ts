import { makeFindHighlightedPostTypesUseCase } from "@/infra/factories/application/find-highlighted-post-types.use-case.factory";
import Elysia from "elysia";

export const GetPostTypeHighlightsController = new Elysia()
	.decorate("service", makeFindHighlightedPostTypesUseCase())
	.get(
		"/highlights",
		({ service }) => {
			return service.run();
		},
		{
			detail: {
				summary: "Get Highlighted Post Types",
				tags: ["Post Types"],
				description: "Retrieves a list of highlighted post types.",
			},
		},
	);
