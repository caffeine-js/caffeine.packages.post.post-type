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

export function PostTypeRoutes(repository: IPostTypeRepository) {
	return new Elysia({
		prefix: "/post-type",
		detail: { tags: ["Post Type"] },
		name: PostType[EntitySource],
	})
		.use(CreatePostTypeController(repository))
		.use(DeletePostTypeController(repository))
		.use(UpdatePostTypeController(repository))
		.use(FindPostTypeController(repository))
		.use(FindManyPostTypesController(repository))
		.use(FindHighlightedPostTypesController(repository));
}
