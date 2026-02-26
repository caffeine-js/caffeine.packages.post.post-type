import type { IPostTypeRepository } from "@/domain/types/post-type-repository.interface";
import { PostTypeRepository as PrismaPostTypeRepository } from "@/infra/repositories/prisma";
import { PostTypeRepository as RedisPostTypeRepository } from "@/infra/repositories/cached";
import type { RepositoryProviderDTO } from "./dtos";
import { PostTypeRepository as TestPostTypeRepository } from "@/infra/repositories/test";
import type { PrismaClient } from "@caffeine-adapters/post";
import { ResourceNotFoundException } from "@caffeine/errors/infra";
import { PostType } from "@/domain";
import { EntitySource } from "@caffeine/entity/symbols";

export function makePostTypeRepository(
    target?: RepositoryProviderDTO,
    prisma?: PrismaClient,
): IPostTypeRepository {
    if (target?.includes("PRISMA") && !prisma)
        throw new ResourceNotFoundException(PostType[EntitySource]);

    if (target === "TEST") return new TestPostTypeRepository();
    else if (target === "PRISMA") return new PrismaPostTypeRepository(prisma!);
    else if (target === "CACHED_PRISMA")
        return new RedisPostTypeRepository(
            new PrismaPostTypeRepository(prisma!),
        );
    else if (target === "CACHED_TEST")
        return new RedisPostTypeRepository(new TestPostTypeRepository());

    return new TestPostTypeRepository();
}
