import Elysia from "elysia";
import type { IPostTypeRepository } from "@/domain/types";

export function PostTypeRepositoryPlugin(repository: IPostTypeRepository) {
	return new Elysia({
		name: "postTypeRepository",
	}).decorate("postTypeRepository", repository);
}
