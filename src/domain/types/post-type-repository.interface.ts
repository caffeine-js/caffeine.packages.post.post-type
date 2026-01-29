import type { PostType } from "../post-type";
import type { IUnmountedPostType } from "./unmounted-post-type.interface";

export interface IPostTypeRepository {
	// TODO: Se der erro na camada de infra, será gerado um erro
	create(postType: PostType): Promise<void>;
	findById(id: string): Promise<IUnmountedPostType | null>;
	findBySlug(slug: string): Promise<IUnmountedPostType | null>;
	findMany(page: number): Promise<IUnmountedPostType[]>;
	update(postType: PostType): Promise<void>;
	getHighlights(): Promise<IUnmountedPostType[]>;
	// remove(postType: PostType): Promise<boolean>;
	length(): Promise<number>;
}
