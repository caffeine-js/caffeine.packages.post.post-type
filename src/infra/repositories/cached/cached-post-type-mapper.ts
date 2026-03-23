import { PostType } from "@/domain";
import type { IPostType, IUnpackedPostType } from "@/domain/types";
import { Mapper } from "@roastery/beans";
import { InvalidPropertyException } from "@roastery/terroir/exceptions/domain";
import { UnexpectedCacheValueException } from "@roastery/terroir/exceptions/infra";

export const CachedPostTypeMapper = {
    run(key: string, _data: string | IUnpackedPostType): IPostType {
        const data: IUnpackedPostType =
            typeof _data === "string" ? JSON.parse(_data) : _data;

        try {
            return Mapper.toDomain(data, PostType.make) as IPostType;
        } catch (err: unknown) {
            if (err instanceof InvalidPropertyException)
                throw new UnexpectedCacheValueException(
                    key,
                    `${err.source}::${err.property}`,
                    err.message,
                );

            throw err;
        }
    },
} as const;
