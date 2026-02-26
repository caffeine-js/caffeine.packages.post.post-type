import { describe, it, expect, beforeEach, vi } from "vitest";
import { Elysia } from "elysia";
import { faker } from "@faker-js/faker";
import { GetAccessController } from "@caffeine/auth/plugins/controllers";
import { PostTypeRoutes } from "../routes";
import { PostTypeRepository } from "@/infra/repositories/test/post-type.repository";
import { CaffeineErrorHandler } from "@caffeine/api-error-handler";
import { CaffeineResponseMapper } from "@caffeine/api-response-mapper";

import { PostType } from "@/domain";
import { Schema } from "@caffeine/schema";
import { t } from "@caffeine/models";

const makePostType = (props: Partial<Parameters<typeof PostType.make>[0]>) =>
	PostType.make({
		name: "Default Post",
		schema: Schema.make(t.Object({ content: t.String() })).toString(),
		...props,
	});

const AUTH_EMAIL = faker.internet.email();
const AUTH_PASSWORD =
	faker.internet.password({ length: 12, pattern: /[A-Za-z0-9!@#$%^&*]/ }) +
	"A1!";
const JWT_SECRET = faker.string.uuid();

describe("FindManyPostTypesController", () => {
	let app: any;
	let repository: PostTypeRepository;
	let accessTokenCookie: string;

	beforeEach(async () => {
		vi.resetModules();
		vi.clearAllMocks();

		repository = new PostTypeRepository();

		app = new Elysia()
			.use(CaffeineResponseMapper)
			.use(CaffeineErrorHandler)
			.use(GetAccessController({ AUTH_EMAIL, AUTH_PASSWORD, JWT_SECRET }))
			.use(PostTypeRoutes(repository, JWT_SECRET));

		const loginResponse = await app.handle(
			new Request("http://localhost/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: AUTH_EMAIL, password: AUTH_PASSWORD }),
			}),
		);

		expect(loginResponse.status).toBe(200);
		const cookieHeader = loginResponse.headers.get("Set-Cookie");
		if (cookieHeader) {
			const tokenMatch = cookieHeader.match(/ACCESS_TOKEN=([^;]+)/);
			accessTokenCookie = tokenMatch ? `ACCESS_TOKEN=${tokenMatch[1]}` : "";
		}
	});

	it("should find many post types via GET /post-types/", async () => {
		for (let i = 0; i < 3; i++) {
			repository.items.push(makePostType({ name: `Post ${i}` }));
		}

		const response = await app.handle(
			new Request("http://localhost/post-types/", {
				method: "GET",
			}),
		);

		expect(response.status).toBe(200);
		const body = await response.json();
		expect(body).toHaveLength(3);
	});
});
