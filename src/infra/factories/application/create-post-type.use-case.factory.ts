import { CreatePostTypeUseCase } from "@/application/use-cases/create-post-type.use-case";
import { makePostTypeRepository } from "../repositories/post-type.repository.factory";

export function makeCreatePostTypeUseCase() {
	return new CreatePostTypeUseCase(makePostTypeRepository());
}
