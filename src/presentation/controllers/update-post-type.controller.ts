import { UpdatePostTypeDTO } from "@/application/dtos/update-post-type.dto";
import { UpdatePostTypeQueryParamsDTO } from "../dtos/update-post-type-query-params.dto";
import { makeUpdatePostTypeUseCase } from "@/infra/factories/application/use-cases";
import { PostType } from "@/domain";
import { UnpackedPostTypeDTO } from "@/domain/dtos";
import { PostTypeRepositoryPlugin } from "../plugins";
import type { IControllersWithAuth } from "./types/controllers-with-auth.interface";
import { EntitySource } from "@roastery/beans/entity/symbols";
import { baristaAuth } from "@roastery-capsules/auth/plugins/guards";
import { IdOrSlugDTO } from "@roastery/seedbed/presentation/dtos";
import { barista } from "@roastery/barista";

export function UpdatePostTypeController({
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
			updatePostType: makeUpdatePostTypeUseCase(postTypeRepository),
		}))
		.patch(
			"/:id-or-slug",
			async ({ params, body, updatePostType, status, query }) =>
				status(
					200,
					(await updatePostType.run(
						params["id-or-slug"],
						body,
						query["update-slug"],
					)) as never,
				),
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
