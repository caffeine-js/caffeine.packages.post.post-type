import { UpdatePostTypeDTO } from "@/application/dtos/update-post-type.dto";
import { CaffeineAuth } from "@caffeine/auth/plugins/guards";
import Elysia from "elysia";
import { UpdatePostTypeQueryParamsDTO } from "../dtos/update-post-type-query-params.dto";
import { IdOrSlugDTO } from "@caffeine/presentation/dtos";
import { makeUpdatePostTypeUseCase } from "@/infra/factories/application/use-cases";
import { EntitySource } from "@caffeine/entity/symbols";
import { PostType } from "@/domain";
import { UnpackedPostTypeDTO } from "@/domain/dtos";
import type { IPostTypeRepository } from "@/domain/types";
import { PostTypeRepositoryPlugin } from "../plugins";

export function UpdatePostTypeController(repository: IPostTypeRepository) {
	return new Elysia()
		.use(CaffeineAuth({ layerName: PostType[EntitySource] }))
		.use(PostTypeRepositoryPlugin(repository))
		.derive({ as: "local" }, ({ postTypeRepository }) => ({
			updatePostType: makeUpdatePostTypeUseCase(postTypeRepository),
		}))
		.patch(
			"/:id-or-slug",
			({ params, body, updatePostType, status }) =>
				status(200, updatePostType.run(params["id-or-slug"], body) as never),
			{
				params: IdOrSlugDTO,
				query: UpdatePostTypeQueryParamsDTO,
				body: UpdatePostTypeDTO,
				detail: {
					summary: "Update Post Type",
					description:
						"Updates an existing post type identified by its slug or id.",
				},
				response: { 200: UnpackedPostTypeDTO },
			},
		);
}
