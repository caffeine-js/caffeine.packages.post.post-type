import { makeFindManyPostTypesUseCase } from "@/infra/factories/application/find-many-post-types.use-case.factory";
import { PaginationDTO } from "@caffeine/models/dtos";
import Elysia from "elysia";

export const GetPostTypeByPageController = new Elysia()
	.decorate("service", makeFindManyPostTypesUseCase())
	.get(
		"/",
		({ query, service }) => {
			return service.run(query.page);
		},
		{
			query: PaginationDTO,
			detail: {
				summary: "List Post Types",
				tags: ["Post Types"],
				description: "Retrieves a paginated list of post types.",
			},
		},
	);
