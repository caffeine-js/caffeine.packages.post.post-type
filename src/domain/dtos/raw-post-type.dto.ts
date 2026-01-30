import { t } from "@caffeine/models";

export const RawPostTypeDTO = t.Object(
	{
		name: t.String({
			description: "The name of the post type.",
			examples: ["Review"],
			minLength: 1,
		}),
		isHighlighted: t.Optional(
			t.Boolean({
				description:
					"Indicates whether the post type is highlighted in the user interface.",
			}),
		),
		slug: t.String({
			description:
				"The unique slug identifier for the post type (e.g., 'my-adventures').",
			examples: ["my-adventures"],
		}),
		schema: t.String({
			description:
				"The serialized TypeBox schema defining the structure of the post type.",
		}),
	},
	{
		description: "Data transfer object representing the raw post type data.",
	},
);

export type RawPostTypeDTO = t.Static<typeof RawPostTypeDTO>;
