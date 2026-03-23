import type { CreatePostTypeDTO } from "../dtos/create-post-type.dto";
import { PostType } from "@/domain/post-type";
import type { IPostTypeWriter } from "@/domain/types";
import type { IPostTypeUniquenessCheckerService } from "@/domain/types/services";
import { EntitySource } from "@roastery/beans/entity/symbols";
import { ResourceAlreadyExistsException } from "@roastery/terroir/exceptions/application";

export class CreatePostTypeUseCase {
    public constructor(
        private readonly writer: IPostTypeWriter,
        private readonly uniquenessChecker: IPostTypeUniquenessCheckerService,
    ) { }

    public async run({ name, schema }: CreatePostTypeDTO) {
        const postType = PostType.make({ name, schema });

        if (!(await this.uniquenessChecker.run(postType.slug)))
            throw new ResourceAlreadyExistsException(PostType[EntitySource]);

        await this.writer.create(postType);

        return postType;
    }
}
