import {
	InvalidDomainDataException,
	ResourceAlreadyExistsException,
} from "@caffeine/errors/domain";
import type { CreatePostTypeDTO } from "../dtos/create-post-type.dto";
import { PostType } from "../post-type";
import type { IPostTypeRepository } from "../types/post-type-repository.interface";
import type { IUnmountedPostType } from "../types/unmounted-post-type.interface";
import { SchemaManager } from "@caffeine/models";
import { slugify } from "@caffeine/models/helpers";

export class CreatePostTypeService {
	public constructor(private readonly repository: IPostTypeRepository) {}

	public async run({ name, schema }: CreatePostTypeDTO): Promise<PostType> {
		const hasPostTypeWithSameName: IUnmountedPostType | false =
			(await this.repository.findBySlug(slugify(name))) ?? false;

		if (hasPostTypeWithSameName)
			throw new ResourceAlreadyExistsException("PostType");

		if (!SchemaManager.isSchema(schema))
			throw new InvalidDomainDataException(
				"PostType",
				"The provided schema is invalid.",
			);

		const buildedSchema = SchemaManager.build(schema);

		const newPostType = PostType.make(
			{ name, slug: slugify(name) },
			buildedSchema,
		);

		await this.repository.create(newPostType);

		return newPostType;
	}
}
