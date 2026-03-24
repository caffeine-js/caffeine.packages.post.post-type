import type { IPostTypeUniquenessCheckerService } from "@/domain/types/services";
import type { IPostTypeReader } from "@/domain/types";
import { SlugUniquenessCheckerService } from "@roastery/seedbed/domain/services";

export function makeSlugUniquenessCheckerService(
	repository: IPostTypeReader,
): IPostTypeUniquenessCheckerService {
	return new SlugUniquenessCheckerService(repository);
}
