import { DeletePostTypeBySlugUseCase } from "@/application/use-cases/delete-post-type-by-slug.use-case";
import { makePostTypeRepository } from "../repositories/post-type.repository.factory";

export function makeDeletePostTypeBySlugUseCase() {
	return new DeletePostTypeBySlugUseCase(makePostTypeRepository());
}
