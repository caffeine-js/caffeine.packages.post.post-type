import { t } from "@caffeine/models";

export const RepositoryProviderDTO = t.Union([
    t.Literal("PRISMA"),
    t.Literal("TEST"),
    t.Literal("CACHED_PRISMA"),
    t.Literal("CACHED_TEST"),
]);

export type RepositoryProviderDTO = t.Static<typeof RepositoryProviderDTO>;
