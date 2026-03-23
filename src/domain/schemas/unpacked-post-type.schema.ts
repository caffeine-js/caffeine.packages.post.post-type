
import { Schema } from "@roastery/terroir/schema";
import { UnpackedPostTypeDTO } from "../dtos";

export const UnpackedPostTypeSchema: Schema<typeof UnpackedPostTypeDTO> =
    Schema.make<typeof UnpackedPostTypeDTO>(UnpackedPostTypeDTO);

export type UnpackedPostTypeSchema = typeof UnpackedPostTypeDTO;
