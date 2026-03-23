import type { UnpackedPostTypeSchema } from "@/domain/schemas";
import type { IPostType } from "../post-type.interface";
import type { SlugUniquenessCheckerService } from "@roastery/seedbed/domain/services";

export type IPostTypeUniquenessCheckerService = SlugUniquenessCheckerService<
    UnpackedPostTypeSchema,
    IPostType
>;
