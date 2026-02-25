import { PostType } from "@/domain";
import { UnpackedPostTypeDTO } from "@/domain/dtos";
import type { IPostTypeRepository } from "@/domain/types";
import { makeDeletePostTypeUseCase } from "@/infra/factories/application/use-cases";
import { CaffeineAuth } from "@caffeine/auth/plugins/guards";
import { EntitySource } from "@caffeine/entity/symbols";
import { IdOrSlugDTO } from "@caffeine/presentation/dtos";
import { Elysia } from "elysia";
import { PostTypeRepositoryPlugin } from "../plugins";

export function DeletePostTypeController(repository: IPostTypeRepository) {
	return new Elysia()
		.use(CaffeineAuth({ layerName: PostType[EntitySource] }))
		.use(PostTypeRepositoryPlugin(repository))
		.derive({ as: "local" }, ({ postTypeRepository }) => ({
			deletePostType: makeDeletePostTypeUseCase(postTypeRepository),
		}))
		.delete(
			"/:id-or-slug",
			({ params, deletePostType, status }) =>
				status(200, deletePostType.run(params["id-or-slug"]) as never),
			{
				params: IdOrSlugDTO,
				detail: {
					summary: "Delete Post Type",
					description: "Deletes a post type identified by its slug or id.",
				},
				response: { 200: UnpackedPostTypeDTO },
			},
		);
}
