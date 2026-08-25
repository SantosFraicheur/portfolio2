type NotificationPayload = {
  title: string;
  content: string;
};

const TITLE_MAX_LENGTH = 1200;
const CONTENT_MAX_LENGTH = 20000;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const buildEndpointUrl = (baseUrl: string): string => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL("webdevtoken.v1.WebDevService/SendNotification", normalizedBase).toString();
};

export async function notifyOwner({ title, content }: NotificationPayload): Promise<boolean> {
  const normalizedTitle = title.trim();
  const normalizedContent = content.trim();
  const forgeApiUrl = process.env.BUILT_IN_FORGE_API_URL;
  const forgeApiKey = process.env.BUILT_IN_FORGE_API_KEY;

  if (!isNonEmptyString(normalizedTitle) || !isNonEmptyString(normalizedContent)) {
    throw new Error("Notification title and content are required.");
  }
  if (normalizedTitle.length > TITLE_MAX_LENGTH || normalizedContent.length > CONTENT_MAX_LENGTH) {
    throw new Error("Notification payload is too long.");
  }
  if (!forgeApiUrl || !forgeApiKey) return false;

  try {
    const response = await fetch(buildEndpointUrl(forgeApiUrl), {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({ title: normalizedTitle, content: normalizedContent }),
    });
    if (!response.ok) {
      console.warn(`[Notification] Upstream rejected contact message (${response.status}).`);
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Upstream contact notification failed:", error);
    return false;
  }
}
