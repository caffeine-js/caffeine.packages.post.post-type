import { t } from "@caffeine/models";

export const CreatePostTypeDTO = t.Object(
	{
		name: t.String({
			description:
				"The unique name of the post type (e.g., 'review', 'blog-post').",
			examples: ["review"],
			minLength: 1,
		}),
		schema: t.String({
			description:
				"The serialized TypeBox schema defining the structure of this post type. Must be generated via `SchemaManager`.",
		}),
	},
	{
		description: "Data transfer object for creating a new post type.",
	},
);

export type CreatePostTypeDTO = t.Static<typeof CreatePostTypeDTO>;
