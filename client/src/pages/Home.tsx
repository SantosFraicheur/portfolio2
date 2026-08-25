// Atelier éditorial — page portfolio : asymétrie calme, preuves de travail, vert laurier #587A68.
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Github,
  Mail,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";

const ASSETS = {
  hero: "/manus-storage/portfolio-hero-editorial_b042cab1.jpg",
  lumiere: "/manus-storage/project-lumiere-parfums_4df234e3.jpg",
  commerce: "/manus-storage/project-commerce-interface_0798988f.jpg",
  automation: "/manus-storage/project-automation-studio_ef985700.jpg",
  mark: "/manus-storage/laurel-mark_229594d0.png",
};

type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
  status: "réalisé" | "à compléter";
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: "lumiere-parfums",
    number: "01",
    title: "Lumière Parfums",
    category: "E-commerce / direction technique",
    year: "2026",
    description:
      "Une expérience de parfumerie premium pensée de la vitrine jusqu’au socle applicatif : narration produit, panier, espace client, administration et déploiement.",
    image: ASSETS.lumiere,
    tags: ["Node.js", "Express", "PostgreSQL", "Cloudinary"],
    status: "réalisé",
    featured: true,
  },
  // Ajoutez ici les prochaines études de cas en conservant le même format.
];

const expertise = [
  ["01", "Interfaces utiles", "Des parcours lisibles, sensibles et suffisamment robustes pour sortir du prototype."],
  ["02", "Systèmes fiables", "Une attention égale au frontend, aux données, aux secrets et au déploiement."],
  ["03", "Présence de marque", "Des détails visuels qui donnent à un produit sa voix, sa mémoire et sa cohérence."],
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const filters = ["Tous", "Réalisé"];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Tous") return projects;
    return projects.filter((project) => project.status === "réalisé");
  }, [activeFilter]);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard?.writeText("sergemetchri@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell">
      <aside className="side-rail">
        <a href="#top" className="brand-lockup" aria-label="Retour en haut">
          <img src={ASSETS.mark} alt="" className="brand-mark" />
          <span className="brand-name">Metchri<br />/ Studio</span>
        </a>
        <span className="rail-index">Portfolio · 2026</span>
        <a className="rail-email" href="mailto:sergemetchri@gmail.com">sergemetchri@<br />gmail.com</a>
      </aside>

      <div className="page-content" id="top">
        <header className="topbar">
          <a href="#top" className="mobile-brand"><img src={ASSETS.mark} alt="" /> <span>Metchri / Studio</span></a>
          <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Navigation principale">
            <a href="#work" onClick={closeMenu}>Projets <span>01</span></a>
            <a href="#approach" onClick={closeMenu}>Approche <span>02</span></a>
            <a href="#contact" onClick={closeMenu}>Contact <span>03</span></a>
          </nav>
          <a className="top-availability" href="#contact">Disponible pour un projet <span className="availability-dot" /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow"><span className="eyebrow-line" /> METCHRI Jérôme Serge · étudiant MIA 2</p>
            <h1 id="hero-title">Des interfaces qui<br /><em>savent</em> pourquoi<br />elles existent.</h1>
            <p className="hero-intro">Je suis METCHRI Jérôme Serge, étudiant en MIA 2 à l’UAC au Bénin. Je conçois et construis des expériences numériques où la direction artistique, la clarté produit et la fiabilité technique avancent ensemble.</p>
            <div className="profile-card" aria-label="Informations personnelles de METCHRI Jérôme Serge">
              <img className="profile-portrait" src="/manus-storage/metchri-jerome-serge_98c8ef04.webp" alt="Portrait de METCHRI Jérôme Serge" />
              <div><span className="profile-label">Profil</span><strong>METCHRI Jérôme Serge</strong><small>Étudiant en Licence MIA 2 · UAC Bénin</small></div>
              <div className="profile-socials" aria-label="Réseaux sociaux et contact">
                <a className="profile-social whatsapp" href="https://wa.me/2290195162664" target="_blank" rel="noreferrer" aria-label="Contacter METCHRI Jérôme Serge sur WhatsApp" title="WhatsApp"><MessageCircle size={16} /></a>
                <a className="profile-social github" href="https://github.com/" target="_blank" rel="noreferrer" aria-label="Ouvrir GitHub — profil à renseigner" title="GitHub — profil à renseigner"><Github size={16} /></a>
              </div>
            </div>
            <a className="cv-download" href="/manus-storage/cv-metchri-jerome-serge_3adfd226.pdf" target="_blank" rel="noreferrer" download="CV-METCHRI-Jerome-Serge.pdf"><Download size={15} /> Télécharger mon CV</a>
            <a href="#work" className="text-link">Voir les projets <ArrowDownRight size={17} /></a>
          </div>
          <div className="hero-visual" data-reveal>
            <div className="hero-image-wrap">
              <img src={ASSETS.hero} alt="Bureau de création avec ordinateur, papier et branche de laurier" />
              <span className="image-note note-top">Fig. 01 / atelier en cours</span>
              <span className="image-note note-bottom">Concevoir avec intention</span>
            </div>
            <div className="hero-stamp"><img src={ASSETS.mark} alt="" /><span>↘</span></div>
          </div>
          <div className="hero-footer"><span>Scroll pour explorer</span><span className="scroll-line" /><span>01—04</span></div>
        </section>

        <section className="manifesto-section" id="approach" data-reveal>
          <div className="section-marker"><span>02</span><span className="marker-rule" /></div>
          <div className="manifesto-content">
            <p className="eyebrow">Une pratique située entre le code et l’intention</p>
            <h2>Le bon détail n’est<br /><em>jamais</em> un hasard.</h2>
          </div>
          <p className="manifesto-aside">Chaque projet commence par une question simple : quelle expérience doit rester en mémoire lorsque l’écran s’éteint ? La réponse devient une structure, puis une interface.</p>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading" data-reveal>
            <div><p className="eyebrow"><span className="eyebrow-line" /> Sélection de travaux</p><h2 id="work-title">Projets<br /><em>réalisés</em></h2></div>
            <div className="section-heading-meta"><span>Une archive en mouvement</span><span>01 entrée publiée</span></div>
          </div>
          <div className="filter-row" role="tablist" aria-label="Filtrer les projets">
            {filters.map((filter) => <button key={filter} className={activeFilter === filter ? "filter active" : "filter"} onClick={() => setActiveFilter(filter)} role="tab" aria-selected={activeFilter === filter}>{filter}</button>)}
          </div>
          <div className="project-list">
            {filteredProjects.map((project, index) => (
              <article className={`project-row ${project.featured ? "featured" : ""}`} key={project.id} data-reveal style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}>
                <div className="project-number">{project.number}</div>
                <div className="project-image-wrap"><img src={project.image} alt={`Aperçu éditorial du projet ${project.title}`} /><span className={`project-status ${project.status === "réalisé" ? "status-done" : "status-pending"}`}>{project.status}</span></div>
                <div className="project-info">
                  <div className="project-title-line"><h3>{project.title}</h3><span className="project-year">{project.year}</span></div>
                  <p className="project-category">{project.category}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <a className="project-arrow" href={project.featured ? "#lumiere-detail" : "#contact"} aria-label={project.featured ? `Voir les détails de ${project.title}` : "Proposer un projet"}><ArrowUpRight size={22} /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="detail-section" id="lumiere-detail" data-reveal>
          <div className="detail-kicker"><span>01</span><span className="marker-rule" /><span>Étude de cas sélectionnée</span></div>
          <div className="detail-grid">
            <div className="detail-heading"><p className="eyebrow">Lumière Parfums · 2026</p><h2>Donner une<br /><em>présence</em> au produit.</h2></div>
            <div className="detail-copy"><p>Un projet e-commerce premium où la direction visuelle ne s’arrête pas à la vitrine. J’ai travaillé l’expérience comme un ensemble cohérent : récit de marque, catalogue, parcours d’achat, administration et infrastructure.</p><a href="#contact" className="text-link">Parler du projet <ArrowUpRight size={17} /></a></div>
          </div>
          <div className="detail-facts"><div><span>Rôle</span><strong>Conception · développement · sécurité</strong></div><div><span>Socle</span><strong>Node.js · PostgreSQL · Cloudinary</strong></div><div><span>État</span><strong className="fact-green"><Check size={15} /> Fonctionnel en local</strong></div></div>
          <div className="proof-strip" aria-label="Preuves de réalisation"><div><span>01 · Parcours</span><strong>Catalogue → panier → commande</strong></div><div><span>02 · Système</span><strong>API Express et schéma PostgreSQL</strong></div><div><span>03 · Exploitation</span><strong>Admin, sécurité et déploiement</strong></div></div>
        </section>

        <section className="expertise-section" aria-labelledby="expertise-title" data-reveal>
          <div className="section-marker"><span>03</span><span className="marker-rule" /></div>
          <div className="expertise-heading"><p className="eyebrow">Ce que j’apporte</p><h2 id="expertise-title">Construire avec<br /><em>justesse.</em></h2></div>
          <div className="expertise-list">{expertise.map(([number, title, body]) => <div className="expertise-item" key={number}><span className="expertise-number">{number}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowUpRight size={18} /></div>)}</div>
        </section>

        <section className="contact-section" id="contact" data-reveal>
          <div className="contact-top"><p className="eyebrow"><span className="eyebrow-line" /> Parlons de la suite</p><span className="contact-counter">04—04</span></div>
          <h2>Un projet à<br /><em>mettre au monde ?</em></h2>
          <p className="contact-intro">Un produit, une refonte ou une idée encore en notes. Écrivez-moi ce que vous cherchez à rendre plus clair, plus beau ou plus fiable. Je suis joignable par e-mail ou sur WhatsApp.</p>
          <div className="contact-actions"><a className="contact-button" href="mailto:sergemetchri@gmail.com">Écrire un message <Mail size={17} /></a><a className="whatsapp-button" href="https://wa.me/2290195162664" target="_blank" rel="noreferrer">WhatsApp · 0195162664 <ExternalLink size={16} /></a><button className="copy-button" onClick={copyEmail}>{copied ? <><Check size={16} /> Adresse copiée</> : <><Copy size={16} /> Copier l’adresse</>}</button></div>
        </section>

        <footer className="site-footer"><span>© 2026 — METCHRI Jérôme Serge</span><span>Conçu et construit avec attention</span><a href="#top">Retour en haut <ArrowUpRight size={14} /></a></footer>
      </div>
    </main>
  );
}
