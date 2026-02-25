import type { IPostTypeReader } from "@/domain/types";
import type { CountPostTypesUseCase } from "./count-post-types.use-case";

export class FindHighlightedPostTypesUseCase {
	public constructor(
		private readonly reader: IPostTypeReader,
		private readonly countPostTypes: CountPostTypesUseCase,
	) {}

	public async run(page: number) {
		const { count, totalPages } = await this.countPostTypes.run("HIGHLIGHTS");
		const value = await this.reader.findHighlights(page);

		return { value, count, totalPages };
	}
}
