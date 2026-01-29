import type { IPostTypeRepository } from "@/domain/types/post-type-repository.interface";
import { PostTypeRepository } from "@/infra/repositories/prisma";
import { PostTypeRepository as RedisPostTypeRepository } from "@/infra/repositories/cached";

export function makePostTypeRepository(): IPostTypeRepository {
	return new RedisPostTypeRepository(new PostTypeRepository());
}
