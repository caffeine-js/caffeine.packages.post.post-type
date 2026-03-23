
import type { IRawPostType } from "./raw-post-type.interface";
import type { UnpackedPostTypeSchema } from "../schemas";
import type { IEntity } from "@roastery/beans/entity/types";

export interface IPostType
    extends IEntity<UnpackedPostTypeSchema>,
    IRawPostType {
    rename(value: string): void;
    reslug(value: string): void;
    setHighlightTo(value: boolean): void;
}
