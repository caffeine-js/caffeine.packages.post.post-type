import { t } from "@caffeine/models";
import { EntityDTO } from "@caffeine/entity/dtos";

export const UnpackedPostTypeDTO = t.Composite([
	t.Object(
		{
			name: t.String({
				description: "The name of the post type.",
				examples: ["Review"],
				minLength: 1,
			}),
			isHighlighted: t.Boolean({
				description:
					"Indicates whether the post type is highlighted in the user interface.",
			}),
			slug: t.String({
				description:
					"The unique slug identifier for the post type (e.g., 'my-adventures').",
				examples: ["my-adventures"],
			}),
			schema: t.String({
				description:
					"The serialized TypeBox schema defining the structure of this post type. Must be generated via `SchemaManager`.",
			}),
		},
		{
			description: "Data transfer object representing the raw post type data.",
		},
	),
	EntityDTO,
]);

export type UnpackedPostTypeDTO = t.Static<typeof UnpackedPostTypeDTO>;
