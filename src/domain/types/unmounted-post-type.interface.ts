import type { IEntity } from "@caffeine/models/types";

export interface IUnmountedPostType extends IEntity {
	name: string;
	slug: string;
	readonly schema: string;
	isHighlighted: boolean;
}
