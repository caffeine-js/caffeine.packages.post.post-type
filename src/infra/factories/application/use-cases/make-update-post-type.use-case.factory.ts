import { UpdatePostTypeUseCase } from "@/application/use-cases/update-post-type.use-case";
import { makeFindPostTypeUseCase } from "./make-find-post-type.use-case.factory";
import { makeSlugUniquenessCheckerService } from "@/infra/factories/domain/services/make-slug-uniqueness-checker.service.factory";
import type { IPostTypeRepository } from "@/domain/types";

export function makeUpdatePostTypeUseCase(
	repository: IPostTypeRepository,
): UpdatePostTypeUseCase {
	const findPostType = makeFindPostTypeUseCase(repository);
	const uniquenessChecker = makeSlugUniquenessCheckerService(repository);
	return new UpdatePostTypeUseCase(repository, findPostType, uniquenessChecker);
}
