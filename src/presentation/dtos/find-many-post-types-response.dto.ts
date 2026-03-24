import { UnpackedPostTypeDTO } from "@/domain/dtos";
import { t } from "@roastery/terroir";

export const FindManyPostTypesResponseDTO = t.Array(UnpackedPostTypeDTO, {
	description: "A paginated list of post types.",
});

export type FindManyPostTypesResponseDTO = t.Static<
	typeof FindManyPostTypesResponseDTO
>;
