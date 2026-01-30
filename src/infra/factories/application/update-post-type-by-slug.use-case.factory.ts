import { UpdatePostTypeBySlugUseCase } from "@/application/use-cases/update-post-type-by-slug.use-case";
import { makePostTypeRepository } from "../repositories/post-type.repository.factory";

export function makeUpdatePostTypeBySlugUseCase() {
	return new UpdatePostTypeBySlugUseCase(makePostTypeRepository());
}
