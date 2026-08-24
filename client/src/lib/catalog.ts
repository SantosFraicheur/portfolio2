// MKS Service — modèle de prestations pour la démonstration frontend. En production, remplacer localStorage par une API avec autorisation serveur.
export type ServiceItem = { id: string; title: string; category: string; description: string; priceLabel: string; publisher: string; published: boolean };

export const initialServices: ServiceItem[] = [
  { id: "btp-001", title: "Étude et suivi de chantier", category: "BTP", description: "Une coordination claire pour garder le chantier lisible, de l’étude au compte rendu.", priceLabel: "Sur devis", publisher: "Responsable BTP", published: true },
  { id: "immo-001", title: "Gestion et vente immobilière", category: "Immobilier", description: "Un accompagnement structuré pour vos biens, vos visites et vos opérations.", priceLabel: "Sur devis", publisher: "Responsable Immobilier", published: true },
  { id: "ent-001", title: "Entretien et sécurité des sites", category: "Entretien & sécurité", description: "Des interventions planifiées, documentées et adaptées à vos espaces.", priceLabel: "Sur devis", publisher: "Responsable Entretien", published: true },
];

const key = "mks-public-services";
export function getServices(): ServiceItem[] { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : initialServices; } catch { return initialServices; } }
export function saveServices(items: ServiceItem[]) { localStorage.setItem(key, JSON.stringify(items)); window.dispatchEvent(new Event("mks-services-updated")); }
export function publishService(input: Omit<ServiceItem, "id">) { const item = { ...input, id: `${input.category.toLowerCase().replace(/[^a-z]+/g, "-")}-${Date.now()}` }; saveServices([item, ...getServices()]); return item; }
export function removeService(id: string) { saveServices(getServices().filter((item) => item.id !== id)); }

export type QuoteStatus = "En attente" | "Validé" | "Refusé";
export type QuoteRequest = { id: string; serviceId: string; serviceTitle: string; category: string; message: string; budget: string; status: QuoteStatus; createdAt: string };
const quoteKey = "mks-client-quotes";
export function getQuotes(): QuoteRequest[] { try { const raw = localStorage.getItem(quoteKey); return raw ? JSON.parse(raw) : []; } catch { return []; } }
export function saveQuote(quote: QuoteRequest) { const quotes = [quote, ...getQuotes().filter((item) => item.id !== quote.id)]; localStorage.setItem(quoteKey, JSON.stringify(quotes)); window.dispatchEvent(new Event("mks-quotes-updated")); }
export function updateQuoteStatus(id: string, status: QuoteStatus) { const quotes = getQuotes().map((item) => item.id === id ? { ...item, status } : item); localStorage.setItem(quoteKey, JSON.stringify(quotes)); window.dispatchEvent(new Event("mks-quotes-updated")); }
