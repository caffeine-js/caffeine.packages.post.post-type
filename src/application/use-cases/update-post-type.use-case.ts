import type { UpdatePostTypeDTO } from "../dtos/update-post-type.dto";
import type { IPostType, IPostTypeWriter } from "@/domain/types";
import type { FindPostTypeUseCase } from "./find-post-type.use-case";
import { PostType } from "@/domain";
import type { IPostTypeUniquenessCheckerService } from "@/domain/types/services";
import { UpdatePostTypeSchema } from "../schemas/update-post-type.schema";
import {
	InvalidOperationException,
	ResourceAlreadyExistsException,
} from "@roastery/terroir/exceptions/application";
import { EntitySource } from "@roastery/beans/entity/symbols";
import { slugify } from "@roastery/beans/entity/helpers";

export class UpdatePostTypeUseCase {
	public constructor(
		private readonly writer: IPostTypeWriter,
		private readonly findPostType: FindPostTypeUseCase,
		private readonly uniquenessChecker: IPostTypeUniquenessCheckerService,
	) {}

	public async run(
		value: string,
		dto: UpdatePostTypeDTO,
		updateSlug: boolean = false,
	) {
		const { isHighlighted, name, slug } = dto;

		if (!UpdatePostTypeSchema.match(dto))
			throw new InvalidOperationException(
				PostType[EntitySource],
				"At least one field must be provided for the update operation.",
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
