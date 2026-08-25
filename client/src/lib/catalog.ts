// Types frontend conservés pour les demandes de devis et les réponses du catalogue tRPC.
export type ServiceItem = { id: string; title: string; category: string; description: string; priceLabel: string; publisher: string; published: boolean; imageUrl?: string };

export type QuoteStatus = "En attente" | "Validé" | "Refusé";
export type QuoteRequest = { id: string; serviceId: string; serviceTitle: string; category: string; message: string; budget: string; status: QuoteStatus; createdAt: string };
const quoteKey = "mks-client-quotes";
export function getQuotes(): QuoteRequest[] { try { const raw = localStorage.getItem(quoteKey); return raw ? JSON.parse(raw) : []; } catch { return []; } }
export function saveQuote(quote: QuoteRequest) { const quotes = [quote, ...getQuotes().filter((item) => item.id !== quote.id)]; localStorage.setItem(quoteKey, JSON.stringify(quotes)); window.dispatchEvent(new Event("mks-quotes-updated")); }
export function updateQuoteStatus(id: string, status: QuoteStatus) { const quotes = getQuotes().map((item) => item.id === id ? { ...item, status } : item); localStorage.setItem(quoteKey, JSON.stringify(quotes)); window.dispatchEvent(new Event("mks-quotes-updated")); }
