import type { IPostType, IPostTypeReader } from "@/domain/types";
import { PostType } from "@/domain";
import type { UnpackedPostTypeDTO } from "@/domain/dtos";
import type { FindEntityByTypeUseCase } from "@roastery/seedbed/application/use-cases";
import { EntitySource } from "@roastery/beans/entity/symbols";

export class FindPostTypeUseCase {
    public constructor(
        private readonly findPostTypeByType: FindEntityByTypeUseCase<
            typeof UnpackedPostTypeDTO,
            IPostType,
            IPostTypeReader
        >,
    ) { }

    public run(value: string) {
        return this.findPostTypeByType.run(value, PostType[EntitySource]);
    }
}
