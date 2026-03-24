import { PostType } from "@/domain";
import { makeDeletePostTypeUseCase } from "@/infra/factories/application/use-cases";
import { PostTypeRepositoryPlugin } from "../plugins";
import type { IControllersWithAuth } from "./types/controllers-with-auth.interface";
import { EntitySource } from "@roastery/beans/entity/symbols";
import { baristaAuth } from "@roastery-capsules/auth/plugins/guards";
import { IdOrSlugDTO } from "@roastery/seedbed/presentation/dtos";
import { t } from "@roastery/terroir";
import { barista } from "@roastery/barista";

export function DeletePostTypeController({
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
			deletePostType: makeDeletePostTypeUseCase(postTypeRepository),
		}))
		.delete(
			"/:id-or-slug",
			async ({ params, deletePostType, set }) => {
				await deletePostType.run(params["id-or-slug"]);
				set.status = 204;
				return;
			},
			{
				params: IdOrSlugDTO,
				detail: {
					summary: "Delete Post Type",
					description: "Deletes a post type identified by its slug or id.",
				},
				response: { 204: t.Undefined() },
			},
		);
}
