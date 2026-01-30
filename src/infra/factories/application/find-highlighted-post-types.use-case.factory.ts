import { FindHighlightedPostTypesUseCase } from "@/application/use-cases/find-highlighted-post-types.use-case";
import { makePostTypeRepository } from "../repositories/post-type.repository.factory";

export function makeFindHighlightedPostTypesUseCase() {
	return new FindHighlightedPostTypesUseCase(makePostTypeRepository());
}
