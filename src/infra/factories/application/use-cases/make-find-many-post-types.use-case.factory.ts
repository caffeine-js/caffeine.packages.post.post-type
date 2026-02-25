import { CountPostTypesUseCase } from "@/application/use-cases/count-post-types.use-case";
import { FindManyPostTypesUseCase } from "@/application/use-cases/find-many-post-types.use-case";
import type { IPostTypeReader } from "@/domain/types";

export function makeFindManyPostTypesUseCase(
	repository: IPostTypeReader,
): FindManyPostTypesUseCase {
	return new FindManyPostTypesUseCase(
		repository,
		new CountPostTypesUseCase(repository),
	);
}
