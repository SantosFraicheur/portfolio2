import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(role: "user" | "admin"): TrpcContext {
  return {
    user: { id: 7, openId: `test-${role}`, name: "Test", email: "test@example.com", loginMethod: "test", role, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("catalog permissions", () => {
  it("rejects a regular user from the admin catalogue", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.catalog.adminList()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("allows an admin through the catalogue guard", async () => {
    const caller = appRouter.createCaller(createContext("admin"));
    await expect(caller.catalog.detail({ id: 0 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("validates admin mutation inputs before any write", async () => {
    const caller = appRouter.createCaller(createContext("admin"));
    await expect(caller.catalog.publish({ title: "x", category: "BTP", description: "x", priceLabel: "x" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.catalog.edit({ id: 1, title: "x", category: "BTP", description: "x", priceLabel: "x" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.catalog.remove({ id: 0 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
