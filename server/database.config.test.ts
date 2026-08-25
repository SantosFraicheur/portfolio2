import { describe, expect, it } from "vitest";
import { isMySqlConnectionString } from "./db";

describe("database configuration", () => {
  it("accepts MySQL connection strings", () => {
    expect(isMySqlConnectionString("mysql://user:password@host:3306/database")).toBe(true);
    expect(isMySqlConnectionString("mysql2://user:password@host/database")).toBe(true);
  });

  it("rejects non-MySQL connection strings", () => {
    expect(isMySqlConnectionString("postgresql://user:password@host:5432/database")).toBe(false);
    expect(isMySqlConnectionString(undefined)).toBe(false);
  });
});
