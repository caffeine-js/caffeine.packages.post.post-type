import type { UpdatePostTypeDTO } from "../dtos/update-post-type.dto";
import {
	InvalidOperationException,
	ResourceAlreadyExistsException,
} from "@caffeine/errors/application";
import type { IPostType, IPostTypeWriter } from "@/domain/types";
import type { FindPostTypeUseCase } from "./find-post-type.use-case";
import { PostType } from "@/domain";
import { EntitySource } from "@caffeine/entity/symbols";
import { slugify } from "@caffeine/entity/helpers";
import type { IPostTypeUniquenessCheckerService } from "@/domain/types/services";

export class UpdatePostTypeBySlugUseCase {
	public constructor(
		private readonly writer: IPostTypeWriter,
		private readonly findPostType: FindPostTypeUseCase,
		private readonly uniquenessChecker: IPostTypeUniquenessCheckerService,
	) {}

	public async run(
		value: string,
		{ isHighlighted, name, slug }: UpdatePostTypeDTO,
		updateSlug: boolean = false,
	) {
		if (isHighlighted === undefined && !name && !slug)
			throw new InvalidOperationException(
				PostType[EntitySource],
				"No data provided for update. At least one field must be informed.",
			);

		if (name && updateSlug && slug)
			throw new InvalidOperationException(
				PostType[EntitySource],
				"You cannot allow slug updates by name slug when you have a slug set to be changed.",
			);

		const targetPostType = await this.findPostType.run(value);

		if (name) targetPostType.rename(name);
		if (typeof isHighlighted === "boolean")
			targetPostType.setHighlightTo(isHighlighted);

		if (name && updateSlug) {
			await this.validateSlugUniqueness(targetPostType, name);
			targetPostType.reslug(name);
		}

		if (slug) {
			await this.validateSlugUniqueness(targetPostType, slug);
			targetPostType.reslug(slug);
		}

		await this.writer.update(targetPostType);

		return targetPostType;
	}

	private async validateSlugUniqueness(postType: IPostType, value: string) {
		value = slugify(value);
		if (postType.slug === value) return;

		const isUnique = await this.uniquenessChecker.run(value);

		if (!isUnique)
			throw new ResourceAlreadyExistsException(postType[EntitySource]);
	}
}
