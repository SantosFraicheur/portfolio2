import { afterEach, describe, expect, it, vi } from "vitest";
import { createContactHandler } from "../../server/contact";

type FakeResponse = {
  statusCode?: number;
  body?: unknown;
  status: (code: number) => FakeResponse;
  json: (payload: unknown) => void;
};

const makeResponse = (): FakeResponse => {
  const response: FakeResponse = {
    status: (code) => {
      response.statusCode = code;
      return response;
    },
    json: (payload) => {
      response.body = payload;
    },
  };
  return response;
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("POST /api/contact", () => {
  it("rejette un payload invalide sans appeler le service externe", async () => {
    const upstream = vi.spyOn(globalThis, "fetch");
    const response = makeResponse();
    await createContactHandler()({ body: { name: "A", email: "incorrect", subject: "x", message: "court" }, ip: "invalid-test" }, response);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      ok: false,
      errors: { name: "Nom invalide.", email: "E-mail invalide.", subject: "Objet invalide.", message: "Message invalide." },
    });
    expect(upstream).not.toHaveBeenCalled();
  });

  it("transmet un message valide et renvoie un succès", async () => {
    vi.stubEnv("BUILT_IN_FORGE_API_URL", "https://forge.example/");
    vi.stubEnv("BUILT_IN_FORGE_API_KEY", "test-key");
    const upstream = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));
    const response = makeResponse();
    await createContactHandler()({
      body: { name: "Awa Sossa", email: "awa@example.com", subject: "Projet web", message: "Bonjour, je souhaite échanger sur un projet web." },
      ip: "valid-test",
    }, response);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ ok: true });
    expect(upstream).toHaveBeenCalledOnce();
  });
});
