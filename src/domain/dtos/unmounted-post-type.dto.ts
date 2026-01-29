import { t } from "@caffeine/models";
import { RawPostTypeDTO } from "./raw-post-type.dto";
import { EntityDTO } from "@caffeine/models/dtos";

export const UnmountedPostTypeDTO = t.Composite(RawPostTypeDTO, EntityDTO);

export type UnmountedPostTypeDTO = t.Static<typeof UnmountedPostTypeDTO>;
