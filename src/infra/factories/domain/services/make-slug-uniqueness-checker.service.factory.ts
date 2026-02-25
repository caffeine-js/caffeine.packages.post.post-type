import type { IPostTypeUniquenessCheckerService } from "@/domain/types/services";
import { SlugUniquenessCheckerService } from "@caffeine/domain/services";
import type { IPostTypeReader } from "@/domain/types";

export function makeSlugUniquenessCheckerService(
	repository: IPostTypeReader,
): IPostTypeUniquenessCheckerService {
	return new SlugUniquenessCheckerService(repository);
}
