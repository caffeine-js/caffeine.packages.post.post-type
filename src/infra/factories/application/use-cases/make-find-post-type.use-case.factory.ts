import type { IPostType, IPostTypeReader } from "@/domain/types";
import type { UnpackedPostTypeDTO } from "@/domain/dtos";
import { FindPostTypeUseCase } from "@/application/use-cases/find-post-type.use-case";
import { FindEntityByTypeUseCase } from "@caffeine/application/use-cases";

export function makeFindPostTypeUseCase(
	repository: IPostTypeReader,
): FindPostTypeUseCase {
	const findEntityByType = new FindEntityByTypeUseCase<
		typeof UnpackedPostTypeDTO,
		IPostType,
		IPostTypeReader
	>(repository);
	return new FindPostTypeUseCase(findEntityByType);
}
