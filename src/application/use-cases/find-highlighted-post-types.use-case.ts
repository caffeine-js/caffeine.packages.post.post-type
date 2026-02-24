import type { IPostTypeReader } from "@/domain/types";

export class FindHighlightedPostTypesUseCase {
	public constructor(private readonly reader: IPostTypeReader) {}

	public run(page: number) {
		return this.reader.findHighlights(page);
	}
}
