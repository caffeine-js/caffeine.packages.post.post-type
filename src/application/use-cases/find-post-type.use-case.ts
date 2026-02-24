import type { IPostType, IPostTypeReader } from "@/domain/types";
import type { FindEntityByTypeUseCase } from "@caffeine/application/use-cases";
import { PostType } from "@/domain";
import { EntitySource } from "@caffeine/entity/symbols";
import type { UnpackedPostTypeDTO } from "@/domain/dtos";

export class FindPostTypeUseCase {
	public constructor(
		private readonly findPostTypeByType: FindEntityByTypeUseCase<
			typeof UnpackedPostTypeDTO,
			IPostType,
			IPostTypeReader
		>,
	) {}

	public run(value: string) {
		return this.findPostTypeByType.run(value, PostType[EntitySource]);
	}
}
