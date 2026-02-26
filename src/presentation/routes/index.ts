import Elysia from "elysia";
import { PostType } from "@/domain";
import { EntitySource } from "@caffeine/entity/symbols";
import type { IPostTypeRepository } from "@/domain/types";

import {
	CreatePostTypeController,
	DeletePostTypeController,
	FindHighlightedPostTypesController,
	FindManyPostTypesController,
	FindPostTypeController,
	UpdatePostTypeController,
} from "../controllers";

export function PostTypeRoutes(
	repository: IPostTypeRepository,
	jwtSecret: string,
) {
	return new Elysia({
		prefix: "/post-types",
		detail: { tags: ["Post Types"] },
		name: PostType[EntitySource],
	})
		.use(CreatePostTypeController(repository, jwtSecret))
		.use(DeletePostTypeController(repository, jwtSecret))
		.use(UpdatePostTypeController(repository, jwtSecret))
		.use(FindPostTypeController(repository))
		.use(FindManyPostTypesController(repository))
		.use(FindHighlightedPostTypesController(repository));
}
