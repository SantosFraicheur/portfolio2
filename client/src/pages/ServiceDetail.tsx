import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { useRoute } from "wouter";
import { trpc } from "../lib/trpc";

export default function ServiceDetail() {
  const [, params] = useRoute("/prestation/:id");
  const serviceId = Number(params?.id);
  const { data: service, isLoading, error } = trpc.catalog.detail.useQuery({ id: serviceId }, { enabled: Number.isInteger(serviceId) && serviceId > 0 });

  if (isLoading) return <main className="service-detail-page"><div className="detail-state">Chargement de la prestation...</div></main>;
  if (error || !service) return <main className="service-detail-page"><div className="detail-state"><h1>Prestation introuvable</h1><p>Cette prestation n’est plus disponible ou son lien est incorrect.</p><a className="dark-action" href="/#catalog"><ArrowLeft size={16} /> Retour au catalogue</a></div></main>;

  return <main className="service-detail-page"><header className="detail-header"><a className="mks-brand" href="/#top"><span className="mks-mark">MKS</span><span><strong>MKS</strong><small>SERVICE</small></span></a><a className="back-public-link" href="/#catalog"><ArrowLeft size={15} /> Retour au catalogue</a></header><section className="service-detail-hero"><div className="detail-media">{service.imageUrl ? <img src={service.imageUrl} alt={`Illustration de ${service.title}`} /> : <div className="detail-media-placeholder"><MessageCircle size={38} /><span>Prestation MKS Service</span></div>}</div><div className="detail-copy"><span className="public-kicker">{service.category} · PRESTATION PUBLIÉE</span><h1>{service.title}</h1><div className="detail-price">{service.priceLabel}</div><p>{service.description}</p><div className="detail-meta"><span><CheckCircle2 size={16} /> Prestation disponible</span><span>Publié par {service.publisherName}</span></div><a className="primary-action" href="/#quote">Demander un devis <ArrowRight size={17} /></a></div></section><section className="detail-support"><div><span className="public-kicker">Besoin d’un échange ?</span><h2>Parlons de votre<br /><em>projet.</em></h2></div><p>Décrivez votre contexte à l’équipe MKS Service. Nous vous répondrons avec le bon interlocuteur et une proposition adaptée.</p><a className="dark-action" href="https://wa.me/2290161751053?text=Bonjour%20MKS%20Service%2C%20je%20souhaite%20un%20devis%20pour%20la%20prestation%20${encodeURIComponent(service.title)}" target="_blank" rel="noreferrer">Écrire sur WhatsApp <ArrowRight size={16} /></a></section><footer className="detail-footer"><span>© {new Date().getFullYear()} MKS SERVICE</span><a href="/#top">Accueil</a><a href="/mentions-legales">Mentions légales</a></footer></main>;
}
