import { CreatePostTypeUseCase } from "@/application/use-cases/create-post-type.use-case";
import { makeSlugUniquenessCheckerService } from "@/infra/factories/domain/services/make-slug-uniqueness-checker.service.factory";
import type { IPostTypeRepository } from "@/domain/types";

export function makeCreatePostTypeUseCase(
	repository: IPostTypeRepository,
): CreatePostTypeUseCase {
	const uniquenessChecker = makeSlugUniquenessCheckerService(repository);
	return new CreatePostTypeUseCase(repository, uniquenessChecker);
}
