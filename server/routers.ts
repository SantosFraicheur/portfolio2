import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { createService, deleteService, getPublishedService, listPublishedServices, listServicesForAdmin, updateService } from "./db";
import { storagePut } from "./storage";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const acceptedImageTypes = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as const;

export const serviceInputSchema = z.object({
  title: z.string().trim().min(2).max(180),
  category: z.string().trim().min(2).max(80),
  description: z.string().trim().min(12).max(5000),
  priceLabel: z.string().trim().min(1).max(120),
  image: z.object({
    dataUrl: z.string().startsWith("data:image/"),
    fileName: z.string().trim().min(1).max(180),
    mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
    size: z.number().int().positive().max(MAX_IMAGE_BYTES),
  }).optional(),
});

function decodeImage(dataUrl: string, mimeType: keyof typeof acceptedImageTypes) {
  const match = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!match || match[1] !== mimeType) throw new Error("Format d’image invalide");
  const buffer = Buffer.from(match[2], "base64");
  if (!buffer.length || buffer.length > MAX_IMAGE_BYTES) throw new Error("Image trop volumineuse");
  return buffer;
}

const serviceFields = serviceInputSchema;

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  catalog: router({
    published: publicProcedure.query(() => listPublishedServices()),
    detail: publicProcedure.input(z.object({ id: z.number().int().positive() })).query(({ input }) => getPublishedService(input.id)),
    adminList: adminProcedure.query(() => listServicesForAdmin()),
    publish: adminProcedure.input(serviceFields).mutation(async ({ ctx, input }) => {
      let imageKey: string | undefined;
      let imageUrl: string | undefined;
      if (input.image) {
        const extension = acceptedImageTypes[input.image.mimeType];
        const buffer = decodeImage(input.image.dataUrl, input.image.mimeType);
        const stored = await storagePut(`services/${ctx.user.id}/${crypto.randomUUID()}.${extension}`, buffer, input.image.mimeType);
        imageKey = stored.key;
        imageUrl = stored.url;
      }
      const { image, ...fields } = input;
      return createService({ ...fields, imageKey, imageUrl, publisherId: ctx.user.id, publisherName: ctx.user.name ?? ctx.user.email ?? "Administrateur", published: 1 });
    }),
    edit: adminProcedure.input(serviceInputSchema.extend({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
      let imageKey: string | undefined;
      let imageUrl: string | undefined;
      if (input.image) {
        const extension = acceptedImageTypes[input.image.mimeType];
        const buffer = decodeImage(input.image.dataUrl, input.image.mimeType);
        const stored = await storagePut(`services/${ctx.user.id}/${crypto.randomUUID()}.${extension}`, buffer, input.image.mimeType);
        imageKey = stored.key;
        imageUrl = stored.url;
      }
      const { image, id, ...fields } = input;
      return updateService(id, { ...fields, ...(image ? { imageKey, imageUrl } : {}) });
    }),
    remove: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => deleteService(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
