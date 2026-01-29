import { t } from "@caffeine/models";

export const RawPostTypeDTO = t.Object({
	name: t.String({ description: "PostType name. example: review" }),
	isHighlighted: t.Optional(
		t.Boolean({ description: "If the PostType is highlighted" }),
	),
	slug: t.String({
		description:
			'Post Type slug based on their name. example: Post Type with name "My Adventures" will be "my-adventures"',
	}),
	schema: t.String({
		description:
			"Post t typebox's schema. It must be builded in `SchemaManager`",
	}),
});

export type RawPostTypeDTO = t.Static<typeof RawPostTypeDTO>;
