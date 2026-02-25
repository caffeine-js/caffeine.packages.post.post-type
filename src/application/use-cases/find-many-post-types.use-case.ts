import type { IPostTypeReader } from "@/domain/types";
import type { CountPostTypesUseCase } from "./count-post-types.use-case";

export class FindManyPostTypesUseCase {
	public constructor(
		private readonly reader: IPostTypeReader,
		private readonly countPostTypes: CountPostTypesUseCase,
	) {}

	public async run(page: number) {
		const { count, totalPages } = await this.countPostTypes.run("DEFAULT");
		const value = await this.reader.findMany(page);

		return { value, count, totalPages };
	}
}
