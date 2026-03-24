import { BooleanDTO } from "@roastery/beans/collections/dtos";
import { t } from "@roastery/terroir";

export const UpdatePostTypeQueryParamsDTO = t.Object({
	"update-slug": t.Optional(BooleanDTO),
});

export type UpdatePostTypeQueryParamsDTO = t.Static<
	typeof UpdatePostTypeQueryParamsDTO
>;
