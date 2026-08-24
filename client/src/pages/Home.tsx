// MKS Service — portail public uniquement. Les espaces internes sont accessibles via hash après une session de démonstration.
import { ArrowRight, Building2, CheckCircle2, ChevronRight, Clock3, FileText, HardHat, Mail, Menu, Phone, ShieldCheck, Users, WalletCards, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getServices, type ServiceItem } from "../lib/catalog";

const services = [
  { title: "Construction & BTP", text: "Des équipes coordonnées pour vos projets, de l’étude à la livraison.", icon: HardHat, color: "blue" },
  { title: "Immobilier & vente", text: "Un accompagnement clair pour gérer, vendre et suivre vos opérations.", icon: Building2, color: "orange" },
  { title: "Entretien & sécurité", text: "Des services réguliers, documentés et adaptés à vos exigences.", icon: ShieldCheck, color: "green" },
];

const publicLinks = ["Nos services", "Notre méthode", "Demander un devis", "Contact"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAccess, setShowAccess] = useState(false);
  const [catalog, setCatalog] = useState<ServiceItem[]>(getServices().filter((item) => item.published));
  useEffect(() => { const refresh = () => setCatalog(getServices().filter((item) => item.published)); window.addEventListener("mks-services-updated", refresh); return () => window.removeEventListener("mks-services-updated", refresh); }, []);
  const jump = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const requestQuote = (service: ServiceItem) => { sessionStorage.setItem("mks-pending-quote", service.id); if (sessionStorage.getItem("mks-client-session") !== "demo") { window.location.href = `/login?mode=register&service=${encodeURIComponent(service.id)}`; return; } window.location.href = `/#client-devis-${service.id}`; };

  return <main className="public-app">
    <header className="public-header">
      <a href="#top" className="mks-brand"><span className="mks-mark">MKS</span><span><strong>MKS</strong><small>SERVICE</small></span></a>
      <button className="public-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={`public-nav ${menuOpen ? "is-open" : ""}`}>{publicLinks.map((link, index) => <button key={link} onClick={() => jump(["services", "method", "quote", "contact"][index])}>{link}</button>)}</nav>
      <div className="header-actions"><a className="header-login" href="/login">Se connecter</a><a className="header-signup" href="/login?mode=register">S’inscrire <ArrowRight size={15} /></a></div>
    </header>

    <section className="public-hero" id="top"><div className="hero-rail"><span>MK</span><span>01 / 04</span><span>BENIN · COTONOU</span></div><div className="hero-main"><div className="public-kicker"><span /> MKS SERVICE · SITE OFFICIEL</div><h1>Des services<br /><em>qui avancent.</em></h1><p>Nous accompagnons les entreprises, les équipes et les particuliers avec une organisation claire, des interlocuteurs identifiés et un suivi de chaque étape.</p><div className="hero-buttons"><a className="primary-action" href="#quote">Demander un devis <ArrowRight size={17} /></a><button className="outline-action" onClick={() => setShowAccess(!showAccess)}>Accès espace client <ChevronRight size={16} /></button></div>{showAccess && <div className="access-note"><ShieldCheck size={16} /><span>Les espaces RH, Employé et Admin sont réservés aux comptes autorisés.</span><a href="/login">Se connecter</a></div>}<div className="hero-trust"><span><CheckCircle2 size={15} /> Suivi documenté</span><span><Clock3 size={15} /> Réponse organisée</span></div></div><div className="hero-poster"><div className="poster-grid" /><div className="poster-card"><small>FIG. 01 / MKS SERVICE</small><strong>Ensemble,<br /><em>bâtissons<br />l’avenir.</em></strong><span className="poster-line" /><small>Construction · Immobilier · Services</small></div><div className="poster-stamp">MKS<br /><small>23</small></div></div></section>

    <section className="public-intro"><div className="section-marker">01 <span /></div><div><div className="public-kicker">Une équipe, plusieurs expertises</div><h2>Le travail bien fait<br /><em>commence par l’écoute.</em></h2></div><p>De la première demande au compte rendu final, nous clarifions les responsabilités et nous gardons le fil. Vous savez qui agit, où en est le projet et quelle est la prochaine étape.</p></section>

    <section className="services-section" id="services"><div className="section-top"><div><div className="public-kicker">02 · Ce que nous faisons</div><h2>Des solutions<br /><em>sur le terrain.</em></h2></div><p>Choisissez le besoin qui vous ressemble. Notre équipe vous orientera vers le bon interlocuteur.</p></div><div className="services-grid">{services.map(({ title, text, icon: Icon, color }) => <article className={`service-card ${color}`} key={title}><div className="service-icon"><Icon size={24} /></div><span className="service-number">0{services.findIndex((service) => service.title === title) + 1}</span><h3>{title}</h3><p>{text}</p><button onClick={() => jump("quote")}>Parler de ce besoin <ArrowRight size={15} /></button></article>)}</div></section>

    <section className="catalog-section" id="catalog"><div className="section-top"><div><div className="public-kicker">02 bis · Prestations disponibles</div><h2>Des offres<br /><em>à demander.</em></h2></div><p>Les responsables de domaine publient ici leurs prestations. Choisissez une offre pour demander un devis personnalisé.</p></div><div className="catalog-grid">{catalog.map((service) => <article className="catalog-card" key={service.id}><div className="catalog-card-top"><span>{service.category}</span><span className="catalog-status">Publié</span></div><h3>{service.title}</h3><p>{service.description}</p><div className="catalog-card-bottom"><strong>{service.priceLabel}</strong><button onClick={() => requestQuote(service)}>Demander un devis <ArrowRight size={15} /></button></div><small>Publié par {service.publisher}</small></article>)}</div></section>

    <section className="method-section" id="method"><div className="method-copy"><div className="public-kicker">03 · Notre méthode</div><h2>Moins de flou.<br /><em>Plus d’avancement.</em></h2><p>Une méthode simple pour des projets qui restent lisibles : comprendre, proposer, organiser, réaliser, rendre compte.</p><a className="text-link" href="#quote">Commencer une discussion <ArrowRight size={15} /></a></div><div className="method-steps">{[["01", "Écouter", "Comprendre le besoin réel."], ["02", "Proposer", "Présenter un devis précis."], ["03", "Organiser", "Affecter les bonnes ressources."], ["04", "Rendre compte", "Documenter le résultat."]].map(([number, title, text]) => <div className="method-step" key={number}><span>{number}</span><div><strong>{title}</strong><p>{text}</p></div></div>)}</div></section>

    <section className="quote-section" id="quote"><div className="quote-panel"><div className="public-kicker">04 · Votre projet</div><h2>Parlons de ce<br /><em>qui doit avancer.</em></h2><p>Décrivez votre besoin en quelques lignes. MKS Service vous répondra avec le bon point de contact.</p><a className="primary-action light" href="mailto:mkservicegroupe23@gmail.com?subject=Demande de devis MKS Service">Envoyer une demande <ArrowRight size={17} /></a></div><div className="quote-aside"><div><Mail size={18} /><span>Courriel</span><a href="mailto:mkservicegroupe23@gmail.com">mkservicegroupe23@gmail.com</a></div><div><Phone size={18} /><span>Téléphone</span><a href="tel:+2290161751053">+229 01 61 75 10 53</a></div><div><FileText size={18} /><span>Espace client</span><a href="/login">Se connecter à son espace</a></div></div></section>

    <section className="internal-access"><div><div className="public-kicker">Accès professionnel</div><h2>Vous avez déjà<br /><em>un compte MKS ?</em></h2></div><div><p>Connectez-vous pour accéder à votre espace client. Les liens RH, Employé et Admin sont réservés aux comptes autorisés.</p><a className="dark-action" href="/login">Se connecter <ArrowRight size={16} /></a></div></section>

    <footer className="public-footer" id="contact"><div className="mks-brand"><span className="mks-mark">MKS</span><span><strong>MKS</strong><small>SERVICE</small></span></div><span>Ensemble, bâtissons l’avenir.</span><span>Bénin · Cotonou</span><a href="mailto:mkservicegroupe23@gmail.com">mkservicegroupe23@gmail.com</a></footer>
  </main>;
}
