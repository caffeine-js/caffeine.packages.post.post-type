import { GetPostTypeNumberOfPagesUseCase } from "@/application/use-cases/get-post-type-number-of-pages.use-case";
import { makePostTypeRepository } from "../repositories/post-type.repository.factory";

export function makeGetPostTypeNumberOfPagesUseCase() {
	return new GetPostTypeNumberOfPagesUseCase(makePostTypeRepository());
}
