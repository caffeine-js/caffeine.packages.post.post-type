import { beforeEach, describe, expect, it } from "vitest";
import { FindHighlightedPostTypesUseCase } from "./find-highlighted-post-types.use-case";
import { PostTypeRepository } from "@/infra/repositories/test/post-type-repository";
import { PostType } from "@/domain";
import { Schema } from "@caffeine/schema";
import { t } from "@caffeine/models";

describe("FindHighlightedPostTypesUseCase", () => {
	let repository: PostTypeRepository;
	let sut: FindHighlightedPostTypesUseCase;

	const validSchemaString = Schema.make(
		t.Object({ content: t.String() }),
	).toString();

	beforeEach(() => {
		repository = new PostTypeRepository();
		sut = new FindHighlightedPostTypesUseCase(repository);
	});

	it("should find highlighted post types", async () => {
		const h1 = PostType.make({
			name: "H1",
			schema: validSchemaString,
			isHighlighted: true,
		});
		const h2 = PostType.make({
			name: "H2",
			schema: validSchemaString,
			isHighlighted: false,
		});
		await repository.create(h1);
		await repository.create(h2);

		const result = await sut.run(1);

		expect(result).toHaveLength(1);
		expect(result[0]).toBe(h1);
	});
});
