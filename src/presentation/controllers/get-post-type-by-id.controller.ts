import { makeFindPostTypeByIdUseCase } from "@/infra/factories/application/find-post-type-by-id.use-case.factory";
import { IdObjectDTO } from "@caffeine/models/dtos";
import Elysia from "elysia";

export const GetPostTypeByIdController = new Elysia()
	.decorate("service", makeFindPostTypeByIdUseCase())
	.get(
		"/:id",
		({ params: { id }, service }) => {
			return service.run(id);
		},
		{
			params: IdObjectDTO,
			detail: {
				summary: "Find Post Type by ID",
				tags: ["Post Types"],
				description:
					"Retrieves the details of a specific post type identified by its unique ID.",
			},
		},
	);
