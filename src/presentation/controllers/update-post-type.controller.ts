import { UpdatePostTypeDTO } from "@/application/dtos/update-post-type.dto";
import { makeUpdatePostTypeBySlugUseCase } from "@/infra/factories/application/update-post-type-by-slug.use-case.factory";
import { SlugObjectDTO } from "@caffeine/models/dtos";
import Elysia from "elysia";

export const UpdatePostTypeController = new Elysia()
	.decorate("service", makeUpdatePostTypeBySlugUseCase())
	.patch(
		"/:slug",
		({ params: { slug }, body, service }) => {
			return service.run(slug, body);
		},
		{
			params: SlugObjectDTO,
			body: UpdatePostTypeDTO,
			detail: {
				summary: "Update Post Type",
				tags: ["Post Types"],
				description: "Updates an existing post type identified by its slug.",
			},
		},
	);
