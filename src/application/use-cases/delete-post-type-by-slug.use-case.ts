import type { IPostTypeWriter } from "@/domain/types";
import { ResourceNotFoundException } from "@caffeine/errors/application";
import type { FindPostTypeUseCase } from "./find-post-type.use-case";

export class DeletePostTypeBySlugUseCase {
	public constructor(
		private readonly writer: IPostTypeWriter,
		private readonly findPostType: FindPostTypeUseCase,
	) {}

	public async run(value: string) {
		const targetPostType = await this.findPostType.run(value);

		if (!targetPostType) throw new ResourceNotFoundException("post@post-type");

		await this.writer.delete(targetPostType);
	}
}
