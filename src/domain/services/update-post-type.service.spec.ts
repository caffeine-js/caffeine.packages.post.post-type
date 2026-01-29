import { describe, it, expect, vi, beforeEach } from "vitest";
import { UpdatePostTypeService } from "./update-post-type.service";
import { InMemoryPostTypeRepository } from "t/infra/repositories/in-memory-post-type-repository";
import { postTypeFactory } from "t/domain/post-type/factories/post-type.factory";
import {
	OperationFailedException,
	ResourceAlreadyExistsException,
	ResourceNotFoundException,
} from "@caffeine/errors/domain";

describe("UpdatePostTypeService", () => {
	let repository: InMemoryPostTypeRepository;
	let sut: UpdatePostTypeService;

	beforeEach(() => {
		repository = new InMemoryPostTypeRepository();
		sut = new UpdatePostTypeService(repository);
		vi.clearAllMocks();
	});

	it("should update name and isHighlighted successfully", async () => {
		const existingPostType = postTypeFactory();
		await repository.create(existingPostType);

		const dto = {
			name: "New Name",
			isHighlighted: !existingPostType.isHighlighted,
		};

		const result = await sut.run(existingPostType.id, dto);

		expect(result.name).toBe("New Name");
		expect(result.isHighlighted).toBe(dto.isHighlighted);

		const updatedInDb = await repository.findById(existingPostType.id);
		expect(updatedInDb?.name).toBe("New Name");
		expect(updatedInDb?.isHighlighted).toBe(dto.isHighlighted);
	});

	it("should throw ResourceNotFoundException if id does not exist", async () => {
		await expect(sut.run("non-existent-id", {})).rejects.toThrow(
			ResourceNotFoundException,
		);
	});

	it("should throw ResourceAlreadyExistsException if new name conflicts", async () => {
		const existingPostType1 = postTypeFactory();
		const existingPostType2 = postTypeFactory();
		await repository.create(existingPostType1);
		await repository.create(existingPostType2);

		const dto = { name: existingPostType2.name };

		await expect(sut.run(existingPostType1.id, dto)).rejects.toThrow(
			ResourceAlreadyExistsException,
		);
	});

	it("should throw OperationFailedException if update fails", async () => {
		const existingPostType = postTypeFactory();
		await repository.create(existingPostType);

		// Mocking the update method to return false to simulate failure
		vi.spyOn(repository, "update").mockRejectedValue(
			new OperationFailedException("PostType"),
		);

		await expect(
			sut.run(existingPostType.id, { name: "Valid Name" }),
		).rejects.toThrow(OperationFailedException);
	});
});
