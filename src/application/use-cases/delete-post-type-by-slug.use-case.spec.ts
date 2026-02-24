import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeletePostTypeBySlugUseCase } from "./delete-post-type-by-slug.use-case";
import { PostTypeRepository } from "@/infra/repositories/test/post-type-repository";
import { FindPostTypeUseCase } from "./find-post-type.use-case";
import { PostType } from "@/domain";
import { ResourceNotFoundException } from "@caffeine/errors/application";
import { Schema } from "@caffeine/schema";
import { t } from "@caffeine/models";

describe("DeletePostTypeBySlugUseCase", () => {
	let repository: PostTypeRepository;
	let findPostTypeUseCase: FindPostTypeUseCase;
	let sut: DeletePostTypeBySlugUseCase;

	const validSchemaString = Schema.make(
		t.Object({ content: t.String() }),
	).toString();

	beforeEach(() => {
		repository = new PostTypeRepository();
		findPostTypeUseCase = {
			run: vi.fn(),
		} as unknown as FindPostTypeUseCase;

		sut = new DeletePostTypeBySlugUseCase(repository, findPostTypeUseCase);
	});

	it("should delete a post type", async () => {
		const postType = PostType.make({ name: "Test", schema: validSchemaString });
		await repository.create(postType);
		vi.mocked(findPostTypeUseCase.run).mockResolvedValue(postType);

		await sut.run("test");

		expect(repository.items).toHaveLength(0);
	});

	it("should throw ResourceNotFoundException if post type not found", async () => {
		vi.mocked(findPostTypeUseCase.run).mockResolvedValue(null as any);

		await expect(sut.run("non-existent")).rejects.toThrow(
			ResourceNotFoundException,
		);
	});
});
