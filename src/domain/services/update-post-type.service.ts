import {
	// OperationFailedException,
	ResourceAlreadyExistsException,
	ResourceNotFoundException,
} from "@caffeine/errors/domain";
import type { UpdatePostTypeDTO } from "../dtos/update-post-type.dto";
import type { PostType } from "../post-type";
import type { IPostTypeRepository } from "../types/post-type-repository.interface";
import { BuildPostTypeService } from "./build-post-type.service";
import type { IUnmountedPostType } from "../types/unmounted-post-type.interface";
import { slugify } from "@caffeine/models/helpers";

export class UpdatePostTypeService {
	public constructor(private readonly repository: IPostTypeRepository) {}

	public async run(
		id: string,
		{ name, isHighlighted }: UpdatePostTypeDTO,
	): Promise<PostType> {
		const unmountedPostType = await this.repository.findById(id);

		if (!unmountedPostType) throw new ResourceNotFoundException("PostType");

		if (name) {
			const hasPostTypeWithSameName: IUnmountedPostType | false =
				(await this.repository.findBySlug(slugify(name))) ?? false;

			if (hasPostTypeWithSameName)
				throw new ResourceAlreadyExistsException("PostType");

			unmountedPostType.name = name;
			unmountedPostType.slug = slugify(name);
		}

		unmountedPostType.isHighlighted =
			isHighlighted ?? unmountedPostType.isHighlighted;

		const targetPostType = BuildPostTypeService.run(unmountedPostType);

		targetPostType.updatedAt = new Date().toISOString();

		await this.repository.update(targetPostType);

		return targetPostType;
	}
}
