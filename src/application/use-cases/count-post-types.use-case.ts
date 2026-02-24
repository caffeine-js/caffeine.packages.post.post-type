import type { IPostTypeReader } from "@/domain/types";
import { GetNumberOfPagesService } from "@caffeine/application/services";
import type { ICountItems } from "@caffeine/application/types";

export class CountPostTypesUseCase {
	public constructor(private readonly reader: IPostTypeReader) {}

	public async run(
		target: "DEFAULT" | "HIGHLIGHTS" = "DEFAULT",
	): Promise<ICountItems> {
		const count =
			target === "DEFAULT"
				? await this.reader.count()
				: await this.reader.countHighlights();

		return {
			totalPages: GetNumberOfPagesService.run(count),
			count,
		};
	}
}
