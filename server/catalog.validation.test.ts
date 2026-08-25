import { describe, expect, it } from "vitest";
import { serviceInputSchema } from "./routers";

const validPayload = {
  title: "Suivi de chantier",
  category: "BTP",
  description: "Coordination et compte rendu régulier de votre chantier.",
  priceLabel: "À partir de 150 000 FCFA",
};

describe("catalog service input", () => {
  it("accepts a valid service without an image", () => {
    expect(serviceInputSchema.safeParse(validPayload).success).toBe(true);
  });

  it("rejects an image larger than 5 MB", () => {
    const result = serviceInputSchema.safeParse({
      ...validPayload,
      image: {
        dataUrl: "data:image/png;base64,AAAA",
        fileName: "chantier.png",
        mimeType: "image/png",
        size: 5 * 1024 * 1024 + 1,
      },
    });
    expect(result.success).toBe(false);
  });

  it("rejects unsupported image types", () => {
    const result = serviceInputSchema.safeParse({
      ...validPayload,
      image: {
        dataUrl: "data:image/gif;base64,AAAA",
        fileName: "chantier.gif",
        mimeType: "image/gif",
        size: 128,
      },
    });
    expect(result.success).toBe(false);
  });
});
