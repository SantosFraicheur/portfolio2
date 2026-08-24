// MKS Service — interface de présentation et tableau d’architecture métier. Frontend de démonstration sans API persistante.
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  FileText,
  HardHat,
  Headphones,
  Landmark,
  LockKeyhole,
  Menu,
  MessageSquare,
  Network,
  ShieldCheck,
  Users,
  WalletCards,
  X,
} from "lucide-react";

type Domain = {
  id: string;
  label: string;
  kicker: string;
  title: string;
  description: string;
  color: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  items: string[];
};

const domains: Domain[] = [
  {
    id: "public",
    label: "01 · Site principal",
    kicker: "Espace public & commercial",
    title: "Présenter, qualifier, convertir.",
    description: "Le point d’entrée de MKS Service : une présence claire, des services lisibles et un parcours de demande sans friction.",
    color: "blue",
    icon: Building2,
    items: ["Découverte de l’entreprise", "Services proposés", "Demande de devis", "Actualités & informations", "Contact direct"],
  },
  {
    id: "client",
    label: "02 · Espace client",
    kicker: "Relation & suivi",
    title: "Chaque demande reste lisible.",
    description: "Un espace pour suivre les devis, les échanges, les commandes, les paiements et l’historique de chaque dossier.",
    color: "cyan",
    icon: Headphones,
    items: ["Compte & connexion", "Suivi des demandes", "Devis & factures", "Messages en ligne", "Commandes & paiements"],
  },
  {
    id: "rh",
    label: "03 · Plateforme RH",
    kicker: "Ressources humaines",
    title: "Les équipes avancent ensemble.",
    description: "Contrats, présences, congés, évaluations, formations et affectations réunis dans un même environnement.",
    color: "green",
    icon: Users,
    items: ["Gestion des employés", "Contrats & documents", "Paie & rémunérations", "Présences & congés", "Planning & affectations"],
  },
  {
    id: "finance",
    label: "04 · Gestion financière",
    kicker: "Entrées, sorties & trésorerie",
    title: "Décider avec les bons chiffres.",
    description: "Une vue consolidée des mouvements, des comptes, des prévisions et des rapports financiers de MKS Service.",
    color: "orange",
    icon: CircleDollarSign,
    items: ["Entrées de fonds", "Sorties de fonds", "Mouvements de caisse", "Rapprochements bancaires", "Prévisions de trésorerie"],
  },
  {
    id: "employee",
    label: "05 · Espace employé",
    kicker: "Travail individuel & missions",
    title: "Savoir ce qui vient ensuite.",
    description: "Profil, disponibilités, tâches, état d’avancement et rapports de travail, au même endroit.",
    color: "purple",
    icon: BriefcaseBusiness,
    items: ["Profil & informations", "Disponibilités", "Tâches & missions", "État du travail", "Rapports & documents"],
  },
  {
    id: "admin",
    label: "06 · Administration",
    kicker: "Vue globale & contrôle",
    title: "Un cockpit pour décider.",
    description: "L’admin principal supervise les domaines, les mouvements, les permissions, les alertes et la performance globale.",
    color: "navy",
    icon: ShieldCheck,
    items: ["Vue globale en temps réel", "Gestion des rôles", "Audit & traçabilité", "Paramètres système", "Rapports consolidés"],
  },
];

const flow = [
  ["01", "Demande", "Le client décrit son besoin."],
  ["02", "Devis", "Le service reçoit et prépare une proposition."],
  ["03", "Discussion", "Les équipes clarifient les attentes."],
  ["04", "Confirmation", "Le projet ou la commande est validé."],
  ["05", "Planification", "Les ressources et le calendrier sont affectés."],
  ["06", "Réalisation", "Les employés exécutent et documentent le travail."],
  ["07", "Validation", "Le responsable vérifie le résultat."],
  ["08", "Paiement", "La facturation et l’historique sont enregistrés."],
];

const kpis = [
  ["6", "domaines connectés", "Une organisation lisible"],
  ["1", "vue consolidée", "Des décisions plus rapides"],
  ["24/7", "traçabilité", "Chaque action a son contexte"],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDomain, setActiveDomain] = useState("admin");
  const [expanded, setExpanded] = useState<string | null>("admin");
  const selectedDomain = useMemo(() => domains.find((domain) => domain.id === activeDomain) ?? domains[0], [activeDomain]);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="mks-app">
      <header className="mks-header">
        <a className="mks-brand" href="#top" onClick={() => jump("top")}>
          <span className="mks-mark"><span>M</span><span>K</span><span>S</span></span>
          <span><strong>MKS</strong><small>SERVICE</small></span>
        </a>
        <button className="mks-mobile-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Menu">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={`mks-nav ${menuOpen ? "is-open" : ""}`}>
          <button onClick={() => jump("architecture")}>Architecture</button>
          <button onClick={() => jump("domains")}>Espaces métier</button>
          <button onClick={() => jump("flow")}>Processus</button>
          <button onClick={() => jump("security")}>Sécurité</button>
        </nav>
        <a className="mks-header-cta" href="mailto:mkservicegroupe23@gmail.com">Demander une présentation <ArrowRight size={16} /></a>
      </header>

      <section className="mks-hero" id="top">
        <div className="hero-grid-lines" />
        <div className="hero-copy">
          <div className="mks-eyebrow"><span /> Architecture digitale · MKS Service</div>
          <h1>Une seule<br /><em>vision.</em><br />Tous les métiers.</h1>
          <p>Un écosystème connecté pour piloter les demandes, les équipes, les finances et la réalisation des projets — avec une transparence totale.</p>
          <div className="hero-actions"><button className="primary-btn" onClick={() => jump("architecture")}>Explorer l’architecture <ArrowRight size={17} /></button><button className="text-btn" onClick={() => jump("domains")}>Voir les espaces <ChevronDown size={16} /></button></div>
          <div className="hero-proof"><ShieldCheck size={17} /><span>Contrôle par rôles</span><span className="proof-separator">·</span><LockKeyhole size={15} /><span>Échanges sécurisés</span></div>
        </div>
        <div className="hero-diagram" aria-label="Résumé visuel de l’architecture MKS Service">
          <div className="diagram-orbit orbit-a" /><div className="diagram-orbit orbit-b" />
          <div className="diagram-center"><span className="center-symbol">MKS</span><small>CORE</small><div className="center-status"><span /> Système connecté</div></div>
          <div className="diagram-node node-public"><Building2 size={18} /><span>Site principal</span></div>
          <div className="diagram-node node-rh"><Users size={18} /><span>RH</span></div>
          <div className="diagram-node node-finance"><CircleDollarSign size={18} /><span>Finance</span></div>
          <div className="diagram-node node-admin"><ShieldCheck size={18} /><span>Admin</span></div>
          <div className="diagram-tag">Architecture 01<br /><strong>Vue globale</strong></div>
        </div>
      </section>

      <section className="mks-intro" id="architecture">
        <div className="section-index">01 <span /></div>
        <div><div className="mks-eyebrow">Une architecture, plusieurs portes d’entrée</div><h2>Le même niveau<br />de clarté <em>partout.</em></h2></div>
        <div className="intro-side"><p>MKS Service relie le site commercial, les ressources humaines, la finance et les opérations autour d’un langage commun : la demande, la réalisation, la validation et la trace.</p><div className="mini-signature"><span>Conçu pour</span><strong>Grandir sans perdre le fil.</strong></div></div>
      </section>

      <section className="kpi-strip">{kpis.map(([value, label, note]) => <div className="kpi" key={label}><strong>{value}</strong><span>{label}</span><small>{note}</small></div>)}</section>

      <section className="domains-section" id="domains">
        <div className="section-heading-row"><div><div className="mks-eyebrow">02 · Les plateformes connectées</div><h2>Chaque domaine a<br /><em>sa propre vue.</em></h2></div><p>Choisissez un espace pour afficher ses responsabilités et ses fonctions dans l’architecture globale.</p></div>
        <div className="domain-layout">
          <div className="domain-list">{domains.map((domain) => <button key={domain.id} className={`domain-tab ${activeDomain === domain.id ? "active" : ""} ${domain.color}`} onClick={() => { setActiveDomain(domain.id); setExpanded(domain.id); }}><span className="domain-tab-icon"><domain.icon size={18} /></span><span><small>{domain.label}</small><strong>{domain.kicker}</strong></span><ChevronRight size={17} /></button>)}</div>
          <div className={`domain-detail ${selectedDomain.color}`}><div className="detail-top"><div className="detail-icon"><selectedDomain.icon size={25} /></div><span>{selectedDomain.label}</span></div><h3>{selectedDomain.title}</h3><p>{selectedDomain.description}</p><div className="detail-items">{selectedDomain.items.map((item) => <div key={item}><Check size={14} /><span>{item}</span></div>)}</div><button className="detail-expand" onClick={() => setExpanded(expanded === selectedDomain.id ? null : selectedDomain.id)}>{expanded === selectedDomain.id ? "Masquer les responsabilités" : "Voir les responsabilités"}<ChevronDown size={15} /></button>{expanded === selectedDomain.id && <div className="expanded-note"><span>Connecté à</span><strong>{domains.filter((domain) => domain.id !== selectedDomain.id).slice(0, 3).map((domain) => domain.kicker).join(" · ")}</strong></div>}</div>
        </div>
      </section>

      <section className="flow-section" id="flow"><div className="flow-heading"><div className="mks-eyebrow">03 · De la demande à la réalisation</div><h2>Un processus qui<br /><em>ne perd rien.</em></h2><p>Chaque étape devient visible, assignable et vérifiable. La coordination ne dépend plus d’une seule personne.</p></div><div className="flow-track">{flow.map(([number, title, description], index) => <div className="flow-step" key={number}><div className="flow-step-head"><span>{number}</span>{index < flow.length - 1 && <span className="flow-connector" />}</div><strong>{title}</strong><p>{description}</p></div>)}</div></section>

      <section className="communication-section"><div className="communication-card"><div className="card-icon"><MessageSquare /></div><div><div className="mks-eyebrow">04 · Discussion intégrée</div><h2>Les échanges font partie<br />du <em>dossier.</em></h2><p>Discussions par domaine, notifications, pièces jointes et historique : la conversation reste attachée au travail.</p></div><div className="communication-tools"><span><MessageSquare size={16} /> Discussions</span><span><Bell size={16} /> Notifications</span><span><FileText size={16} /> Pièces jointes</span></div></div></section>

      <section className="security-section" id="security"><div className="security-copy"><div className="mks-eyebrow">05 · Sécurité & contrôle</div><h2>La confiance se<br /><em>construit.</em></h2><p>La plateforme est pensée pour séparer les rôles, protéger les données et rendre chaque action vérifiable — du premier échange au rapport final.</p><a className="text-btn dark" href="mailto:mkservicegroupe23@gmail.com">Parler de la mise en œuvre <ArrowRight size={16} /></a></div><div className="security-grid"><div><LockKeyhole /><strong>Authentification forte</strong><span>Sessions sécurisées et contrôle d’accès.</span></div><div><Network /><strong>Données chiffrées</strong><span>Échanges protégés entre les domaines.</span></div><div><ClipboardCheck /><strong>Audit & traçabilité</strong><span>Journal des actions sensibles.</span></div><div><WalletCards /><strong>Sauvegardes</strong><span>Préparation à une stratégie de reprise.</span></div></div></section>

      <section className="admin-section"><div className="admin-visual"><div className="admin-window"><div className="window-bar"><span /><span /><span /><small>MKS / CONTROL CENTER</small></div><div className="window-body"><div className="window-sidebar"><b>MKS</b><span className="selected"><BarChart3 size={13} /> Vue globale</span><span><Users size={13} /> Employés</span><span><Landmark size={13} /> Finances</span><span><FileText size={13} /> Rapports</span></div><div className="window-main"><div className="window-main-title"><div><small>Bonjour, Admin principal</small><strong>Vue consolidée</strong></div><div className="live-pill"><span /> Temps réel</div></div><div className="chart-row"><div className="chart-card large"><small>Activité des domaines</small><div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /></div></div><div className="chart-card"><small>Répartition</small><div className="donut" /><span className="donut-label">6 domaines</span></div></div><div className="table-lines"><span /><span /><span /><span /></div></div></div></div></div><div className="admin-copy"><div className="mks-eyebrow">06 · Vue globale</div><h2>L’admin principal<br /><em>voit tout.</em></h2><p>Une vue de pilotage pour comprendre ce qui avance, ce qui attend et ce qui demande une décision — sans ouvrir six outils différents.</p><div className="admin-list"><span><Check size={15} /> Activité en temps réel</span><span><Check size={15} /> Finances & mouvements</span><span><Check size={15} /> Projets & chantiers</span><span><Check size={15} /> Employés & performances</span></div></div></section>

      <section className="contact-section"><div><div className="mks-eyebrow">07 · Prochaine étape</div><h2>Construisons une<br /><em>vue commune.</em></h2><p>Le schéma devient une expérience. La prochaine étape consiste à choisir les modules à connecter en premier et à définir les permissions réelles.</p></div><div className="contact-actions"><a className="primary-btn light" href="mailto:mkservicegroupe23@gmail.com">Écrire à MKS Service <ArrowRight size={17} /></a><a className="contact-meta" href="tel:+2290161751053">+229 01 61 75 10 53</a><a className="contact-meta" href="mailto:mkservicegroupe23@gmail.com">mkservicegroupe23@gmail.com</a></div></section>

      <footer className="mks-footer"><div className="mks-brand"><span className="mks-mark"><span>M</span><span>K</span><span>S</span></span><span><strong>MKS</strong><small>SERVICE</small></span></div><span>Ensemble, bâtissons l’avenir.</span><span>Bénin · Cotonou</span><span>© 2026 MKS Service</span></footer>
    </main>
  );
}
