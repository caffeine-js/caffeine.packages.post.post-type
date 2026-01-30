import { CreatePostTypeDTO } from "@/application/dtos/create-post-type.dto";
import { makeCreatePostTypeUseCase } from "@/infra/factories/application/create-post-type.use-case.factory";
import { AuthGuard } from "@caffeine/auth/plugins/guards";
import { Elysia } from "elysia";

export const CreatePostTypeController = new Elysia()
	.use(AuthGuard({ layerName: "post@post-type" }))
	.decorate("service", makeCreatePostTypeUseCase())
	.post(
		"/",
		({ body, service }) => {
			return service.run(body);
		},
		{
			body: CreatePostTypeDTO,
			detail: {
				summary: "Create Post Type",
				tags: ["Post Types"],
				description: "Creates a new post type with the provided details.",
			},
		},
	);
