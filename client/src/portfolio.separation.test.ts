import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const readProjectFile = (path: string) => readFile(new URL(path, import.meta.url), "utf8");

describe("séparation du portfolio personnel", () => {
  it("expose uniquement l’identité personnelle dans les métadonnées et la page d’accueil", async () => {
    const [html, home] = await Promise.all([
      readProjectFile("../index.html"),
      readProjectFile("./pages/Home.tsx"),
    ]);

    expect(html).toContain("METCHRI Jérôme Serge — Portfolio");
    expect(home).toContain("METCHRI / PORTFOLIO");
    expect(home).toContain("sergemetchri@gmail.com");
    expect(home).not.toMatch(/MKS Service|mkservicegroupe23|01 61 75 10 53/i);
  });

  it("ne conserve pas le dossier Drizzle dans l’application active", async () => {
    const projectFiles = await readProjectFile("./pages/Home.tsx");
    expect(projectFiles).not.toMatch(/services\s*=\s*mysqlTable|publisherId/);
  });
});
