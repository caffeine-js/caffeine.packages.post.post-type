import { Schema, SchemaManager } from "@caffeine/models";
import { InvalidDomainDataException } from "@caffeine/errors/domain";
import { unpackEntity } from "@caffeine/models/helpers";
import type { IUnmountedPostType } from "../types/unmounted-post-type.interface";
import { PostType } from "../post-type";
import { UnmountedPostTypeDTO } from "../dtos/unmounted-post-type.dto";
import type { RawPostTypeDTO } from "../dtos/raw-post-type.dto";

export class BuildPostTypeService {
	public static run(unmountedPostType: IUnmountedPostType): PostType {
		if (!Schema.make(UnmountedPostTypeDTO).match(unmountedPostType))
			throw new InvalidDomainDataException("post@post-type::unmount");

		const unmountedPostTypeWithDate = {
			...unmountedPostType,
			createdAt: unmountedPostType.createdAt,
			updatedAt: unmountedPostType.updatedAt,
		};

		const {
			about,
			data: { name, schema: rawSchema, isHighlighted, slug },
		} = unpackEntity<RawPostTypeDTO>(unmountedPostTypeWithDate);

		const schema = SchemaManager.build(rawSchema);

		return PostType.make({ name, isHighlighted, slug }, schema, about);
	}
}
