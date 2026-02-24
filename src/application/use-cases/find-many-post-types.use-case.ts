import type { IPostTypeReader } from "@/domain/types";

export class FindManyPostTypesUseCase {
	public constructor(private readonly reader: IPostTypeReader) {}

	public run(page: number) {
		return this.reader.findMany(page);
	}
}
