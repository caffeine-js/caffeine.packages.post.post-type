import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreatePostTypeService } from "./create-post-type.service";
import {
	InvalidDomainDataException,
	ResourceAlreadyExistsException,
} from "@caffeine/errors/domain";
import { InMemoryPostTypeRepository } from "t/infra/repositories/in-memory-post-type-repository";
import { t } from "@caffeine/models";

describe("CreatePostTypeService", () => {
	const repository = new InMemoryPostTypeRepository();
	let sut: CreatePostTypeService;

	beforeEach(() => {
		vi.clearAllMocks();
		sut = new CreatePostTypeService(repository);
	});

	const validSchema = JSON.stringify(t.Object({ content: t.String() }));

	it("should create a new PostType successfully", async () => {
		vi.spyOn(repository, "create");

		const dto = {
			name: "New t",
			schema: validSchema,
		};

		const result = await sut.run(dto);

		expect(result).toBeDefined();
		expect(result.name).toBe("New t");
		expect(repository.create).toHaveBeenCalledWith(result);
	});

	it("should throw ResourceAlreadyExistsException if name already exists", async () => {
		const dto = {
			name: "Existing t",
			schema: validSchema,
		};

		await sut.run(dto);

		await expect(sut.run(dto)).rejects.toThrow(ResourceAlreadyExistsException);
	});

	it("should throw InvalidDomainDataException if schema is invalid", async () => {
		const dto = {
			name: "Bad Schema",
			schema: "not a schema object",
		};

		await expect(sut.run(dto)).rejects.toThrow(InvalidDomainDataException);
	});
});
