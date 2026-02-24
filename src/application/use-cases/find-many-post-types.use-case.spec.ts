import { beforeEach, describe, expect, it } from "vitest";
import { FindManyPostTypesUseCase } from "./find-many-post-types.use-case";
import { PostTypeRepository } from "@/infra/repositories/test/post-type-repository";
import { PostType } from "@/domain";
import { Schema } from "@caffeine/schema";
import { t } from "@caffeine/models";

describe("FindManyPostTypesUseCase", () => {
	let repository: PostTypeRepository;
	let sut: FindManyPostTypesUseCase;

	const validSchemaString = Schema.make(
		t.Object({ content: t.String() }),
	).toString();

	beforeEach(() => {
		repository = new PostTypeRepository();
		sut = new FindManyPostTypesUseCase(repository);
	});

	it("should find many post types", async () => {
		const postType = PostType.make({ name: "Test", schema: validSchemaString });
		await repository.create(postType);

		const result = await sut.run(1);

		expect(result).toHaveLength(1);
		expect(result[0]).toBe(postType);
	});
});
