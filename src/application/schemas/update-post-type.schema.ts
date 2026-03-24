import { Schema } from "@roastery/terroir/schema";
import { UpdatePostTypeDTO } from "../dtos/update-post-type.dto";

export const UpdatePostTypeSchema: Schema<typeof UpdatePostTypeDTO> =
	Schema.make(UpdatePostTypeDTO);
