import { DeletePostTypeUseCase } from "@/application/use-cases/delete-post-type-by-slug.use-case";
import { makeFindPostTypeUseCase } from "./make-find-post-type.use-case.factory";
import type { IPostTypeRepository } from "@/domain/types";

export function makeDeletePostTypeUseCase(
	repository: IPostTypeRepository,
): DeletePostTypeUseCase {
	const findPostType = makeFindPostTypeUseCase(repository);
	return new DeletePostTypeUseCase(repository, findPostType);
}
