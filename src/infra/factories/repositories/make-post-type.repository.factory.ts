import type { IPostTypeRepository } from "@/domain/types/post-type-repository.interface";
import { PostTypeRepository as PrismaPostTypeRepository } from "@/infra/repositories/prisma";
import { PostTypeRepository as CachedPostTypeRepository } from "@/infra/repositories/cached";
import type { RepositoryProviderDTO } from "./dtos";
import { PostTypeRepository as TestPostTypeRepository } from "@/infra/repositories/test";
import { ResourceNotFoundException } from "@roastery/terroir/exceptions/infra";
import { EntitySource } from "@roastery/beans/entity/symbols";
import { PostType } from "@/domain";
import type { BaristaCacheInstance } from "@roastery-adapters/cache";
import type { PrismaClient } from "@roastery-adapters/post";

type MakePostTypeRepositoryArgs = {
    target?: RepositoryProviderDTO;
    cache: BaristaCacheInstance;
    prismaClient?: PrismaClient;
};

export function makePostTypeRepository({
    cache,
    prismaClient,
    target,
}: MakePostTypeRepositoryArgs): IPostTypeRepository {
    if (target?.includes("PRISMA") && !prismaClient)
        throw new ResourceNotFoundException(PostType[EntitySource]);

    const repository: IPostTypeRepository =
        target === "PRISMA" && prismaClient
            ? new PrismaPostTypeRepository(prismaClient)
            : new TestPostTypeRepository();

    return new CachedPostTypeRepository(repository, cache);
}
