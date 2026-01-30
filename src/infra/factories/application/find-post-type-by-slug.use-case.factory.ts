import { FindPostTypeBySlugUseCase } from "@/application/use-cases/find-post-type-by-slug.use-case";
import { makePostTypeRepository } from "../repositories/post-type.repository.factory";

export function makeFindPostTypeBySlugUseCase() {
	return new FindPostTypeBySlugUseCase(makePostTypeRepository());
}
