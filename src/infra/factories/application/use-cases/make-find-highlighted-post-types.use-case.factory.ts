import { CountPostTypesUseCase } from "@/application/use-cases/count-post-types.use-case";
import { FindHighlightedPostTypesUseCase } from "@/application/use-cases/find-highlighted-post-types.use-case";
import type { IPostTypeReader } from "@/domain/types";

export function makeFindHighlightedPostTypesUseCase(
	repository: IPostTypeReader,
): FindHighlightedPostTypesUseCase {
	return new FindHighlightedPostTypesUseCase(
		repository,
		new CountPostTypesUseCase(repository),
	);
}
