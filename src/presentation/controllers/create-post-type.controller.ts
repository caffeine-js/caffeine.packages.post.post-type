import { CreatePostTypeDTO } from "@/application/dtos/create-post-type.dto";
import { PostType } from "@/domain";
import { UnpackedPostTypeDTO } from "@/domain/dtos";
import { makeCreatePostTypeUseCase } from "@/infra/factories/application/use-cases";
import { PostTypeRepositoryPlugin } from "../plugins";
import type { IControllersWithAuth } from "./types/controllers-with-auth.interface";
import { baristaAuth } from "@roastery-capsules/auth/plugins/guards";
import { barista } from "@roastery/barista";
import { EntitySource } from "@roastery/beans/entity/symbols";

export function CreatePostTypeController({
	cacheProvider,
	jwtSecret,
	redisUrl,
	repository,
}: IControllersWithAuth) {
	return barista()
		.use(
			baristaAuth({
				layerName: PostType[EntitySource],
				jwtSecret,
				cacheProvider,
				redisUrl,
			}),
		)
		.use(PostTypeRepositoryPlugin(repository))
		.derive({ as: "local" }, ({ postTypeRepository }) => ({
			createPostType: makeCreatePostTypeUseCase(postTypeRepository),
		}))
		.post(
			"/",
			async ({ body, createPostType, status }) => {
				const response = await createPostType.run(body);

				return status(201, response as never);
			},
			{
				body: CreatePostTypeDTO,
				response: { 201: UnpackedPostTypeDTO },
				detail: {
					summary: "Create Post Type",
					description: "Creates a new post type with the provided details.",
				},
			},
		);
}
