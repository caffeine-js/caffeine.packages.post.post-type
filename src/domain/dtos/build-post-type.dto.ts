import { t } from "@caffeine/models";

export const BuildPostTypeDTO = t.Object(
	{
		name: t.String({
			description: "The name of the post type.",
			examples: ["Review"],
			minLength: 1,
		}),
		slug: t.String({
			description:
				"The unique slug identifier derived from the name (e.g., 'my-adventures').",
			examples: ["my-adventures"],
		}),
		isHighlighted: t.Optional(
			t.Boolean({
				description:
					"Indicates whether the post type is highlighted in the user interface.",
			}),
		),
	},
	{
		description: "Data transfer object used for building a post type entity.",
	},
);

export type BuildPostTypeDTO = t.Static<typeof BuildPostTypeDTO>;
