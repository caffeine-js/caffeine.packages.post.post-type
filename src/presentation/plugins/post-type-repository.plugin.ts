import type { IPostTypeRepository } from "@/domain/types";
import { barista } from "@roastery/barista";

export function PostTypeRepositoryPlugin(repository: IPostTypeRepository) {
	return barista({
		name: "postTypeRepository",
	}).decorate("postTypeRepository", repository);
}
