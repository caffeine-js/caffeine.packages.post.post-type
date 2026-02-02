import { makeDeletePostTypeBySlugUseCase } from "@/infra/factories/application/delete-post-type-by-slug.use-case.factory";
import { AuthGuard } from "@caffeine/auth/plugins/guards";
import { SlugObjectDTO } from "@caffeine/models/dtos";
import { Elysia } from "elysia";

export const DeletePostTypeController = new Elysia()
	.use(AuthGuard({ layerName: "post@post-type" }))
	.decorate("service", makeDeletePostTypeBySlugUseCase())
	.delete(
		"/by-slug/:slug",
		({ params: { slug }, service }) => {
			return service.run(slug);
		},
		{
			params: SlugObjectDTO,
			detail: {
				summary: "Delete Post Type",
				tags: ["Post Types"],
				description: "Deletes a post type identified by its slug.",
			},
		},
	);
