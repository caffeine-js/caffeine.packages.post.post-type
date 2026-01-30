import { makeGetPostTypeNumberOfPagesUseCase } from "@/infra/factories/application/get-post-type-number-of-pages.use-case.factory";
import Elysia from "elysia";

export const GetPostTypeNumberOfPagesController = new Elysia()
	.decorate("service", makeGetPostTypeNumberOfPagesUseCase())
	.get(
		"/number-of-pages",
		({ service }) => {
			return service.run();
		},
		{
			detail: {
				summary: "Get Number of Pages",
				tags: ["Post Types"],
				description:
					"Retrieves the total number of pages available for post types.",
			},
		},
	);
