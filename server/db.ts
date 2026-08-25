import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertService, InsertUser, services, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  textFields.forEach((field) => {
    if (user[field] !== undefined) { values[field] = user[field] ?? null; updateSet[field] = user[field] ?? null; }
  });
  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
  else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
  values.lastSignedIn ??= new Date();
  if (!Object.keys(updateSet).length) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function listPublishedServices() {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  return db.select().from(services).where(eq(services.published, 1)).orderBy(desc(services.createdAt));
}

export async function listServicesForAdmin() {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  return db.select().from(services).orderBy(desc(services.createdAt));
}

export async function createService(input: InsertService) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.insert(services).values(input);
  const id = Number(result[0].insertId);
  const rows = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return rows[0];
}

export async function updateService(id: number, input: Partial<InsertService>) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(services).set(input).where(eq(services.id, id));
  const rows = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return rows[0];
}

export async function deleteService(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(services).where(eq(services.id, id));
  return { success: true } as const;
}
