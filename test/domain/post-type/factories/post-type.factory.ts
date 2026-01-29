import { faker } from "@faker-js/faker";
import { SchemaManager, t } from "@caffeine/models";
import { PostType } from "@/domain/post-type";
import { makeEntityFactory } from "@caffeine/models/factories";
import { slugify } from "@caffeine/models/helpers";

export function postTypeFactory(
	schema: string = JSON.stringify(t.Object({})),
): PostType {
	const entityData = makeEntityFactory();
	const name = faker.book.genre();

	return PostType.make(
		{
			name,
			slug: slugify(name),
			isHighlighted: false,
		},
		SchemaManager.build(schema),
		entityData,
	);
}
