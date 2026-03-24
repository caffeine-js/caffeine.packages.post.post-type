import { PostType } from "@/domain";
import {
	CreatePostTypeController,
	DeletePostTypeController,
	FindHighlightedPostTypesController,
	FindManyPostTypesController,
	FindPostTypeController,
	UpdatePostTypeController,
} from "../controllers";
import type { IControllersWithAuth } from "../controllers/types/controllers-with-auth.interface";
import type { IControllersWithoutAuth } from "../controllers/types/controllers-without-auth.interface";
import PostTypesTag from "../tags";
import { EntitySource } from "@roastery/beans/entity/symbols";
import { barista } from "@roastery/barista";

type PostTypeRoutesArgs = IControllersWithAuth;

export function PostTypeRoutes(data: PostTypeRoutesArgs) {
	const { repository } = data;
	const controllersWithoutAuth: IControllersWithoutAuth = { repository };

	return barista({
		prefix: "/post-types",
		detail: { tags: [PostTypesTag.name] },
		name: PostType[EntitySource],
	})
		.use(CreatePostTypeController(data))
		.use(DeletePostTypeController(data))
		.use(UpdatePostTypeController(data))
		.use(FindPostTypeController(controllersWithoutAuth))
		.use(FindManyPostTypesController(controllersWithoutAuth))
		.use(FindHighlightedPostTypesController(controllersWithoutAuth));
}

export type PostTypeRoutes = ReturnType<typeof PostTypeRoutes>;
