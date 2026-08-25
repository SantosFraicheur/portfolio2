import { notifyOwner } from "./notification";

type ContactRequest = {
  body?: unknown;
  ip?: string;
};

type ContactResponse = {
  statusCode?: number;
  status?: (code: number) => ContactResponse;
  setHeader?: (name: string, value: string) => void;
  end?: (body?: string) => void;
  json?: (body: unknown) => void;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactCooldownMs = 10_000;

const textValue = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const sendJson = (res: ContactResponse, statusCode: number, payload: unknown) => {
  if (res.status && res.json) {
    const response = res.status(statusCode);
    response.json?.(payload);
    return;
  }
  res.statusCode = statusCode;
  res.setHeader?.("Content-Type", "application/json; charset=utf-8");
  res.end?.(JSON.stringify(payload));
};

export function createContactHandler() {
  const contactAttempts = new Map<string, number>();

  return async (req: ContactRequest, res: ContactResponse) => {
    const clientKey = req.ip || "unknown";
    const now = Date.now();
    const previousAttempt = contactAttempts.get(clientKey) || 0;
    if (now - previousAttempt < contactCooldownMs) {
      sendJson(res, 429, { ok: false, message: "Veuillez patienter avant de renvoyer un message." });
      return;
    }
    contactAttempts.set(clientKey, now);

    const body = (req.body && typeof req.body === "object") ? req.body as Record<string, unknown> : {};
    const name = textValue(body.name);
    const email = textValue(body.email);
    const subject = textValue(body.subject);
    const message = textValue(body.message);
    const errors: Record<string, string> = {};
    if (name.length < 2 || name.length > 120) errors.name = "Nom invalide.";
    if (!emailPattern.test(email) || email.length > 180) errors.email = "E-mail invalide.";
    if (subject.length < 3 || subject.length > 180) errors.subject = "Objet invalide.";
    if (message.length < 20 || message.length > 5000) errors.message = "Message invalide.";
    if (Object.keys(errors).length > 0) {
      sendJson(res, 400, { ok: false, errors });
      return;
    }

    const delivered = await notifyOwner({
      title: `Nouveau message portfolio — ${subject}`,
      content: `Nom : ${name}\nE-mail : ${email}\nObjet : ${subject}\n\n${message}`,
    });
    if (!delivered) {
      sendJson(res, 503, { ok: false, message: "Le service de réception est temporairement indisponible." });
      return;
    }
    sendJson(res, 200, { ok: true });
  };
}
