import type { Schema } from "@caffeine/models";

export interface IPostType {
	name: string;
	slug: string;
	readonly schema: Schema;
	isHighlighted: boolean;
}
