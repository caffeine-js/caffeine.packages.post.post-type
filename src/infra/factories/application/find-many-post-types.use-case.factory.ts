import { FindManyPostTypesUseCase } from "@/application/use-cases/find-many-post-types.use-case";
import { makePostTypeRepository } from "../repositories/post-type.repository.factory";

export function makeFindManyPostTypesUseCase() {
	return new FindManyPostTypesUseCase(makePostTypeRepository());
}
