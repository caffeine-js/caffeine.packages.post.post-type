import { t } from "@caffeine/models";

export const UpdatePostTypeDTO = t.Object(
	{
		name: t.Optional(
			t.String({
				description: "The new name for the post type.",
				examples: ["review"],
				minLength: 1,
			}),
		),
		isHighlighted: t.Optional(
			t.Boolean({
				description:
					"Indicates if the post type should be highlighted in the UI.",
			}),
		),
	},
	{
		description: "Data transfer object for updating an existing post type.",
	},
);

export type UpdatePostTypeDTO = t.Static<typeof UpdatePostTypeDTO>;
