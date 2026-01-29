import { t } from "@caffeine/models";

export const BuildPostTypeDTO = t.Object({
	name: t.String({ description: "PostType name. example: review" }),
	slug: t.String({
		description:
			'Post Type slug based on their name. example: Post Type with name "My Adventures" will be "my-adventures"',
	}),
	isHighlighted: t.Optional(
		t.Boolean({ description: "If the PostType is highlighted" }),
	),
});

export type BuildPostTypeDTO = t.Static<typeof BuildPostTypeDTO>;
