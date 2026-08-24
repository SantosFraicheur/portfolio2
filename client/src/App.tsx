// MKS Service — routeur public et espaces privés de démonstration par hash. Les permissions réelles doivent être validées côté serveur.
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { AccessRequired, InternalArea, LoginPage, internalAreas } from "./pages/Access";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";

function ClientGate() {
  const [session, setSession] = useState(() => sessionStorage.getItem("mks-client-session") === "demo");
  useEffect(() => { const update = () => setSession(sessionStorage.getItem("mks-client-session") === "demo"); window.addEventListener("storage", update); window.addEventListener("hashchange", update); return () => { window.removeEventListener("storage", update); window.removeEventListener("hashchange", update); }; }, []);
  if (!session) return <section className="client-login-required"><div><div className="public-kicker">ESPACE CLIENT · ACCÈS RÉSERVÉ</div><h1>Connectez-vous<br /><em>pour continuer.</em></h1><p>Votre espace client est disponible après authentification.</p><a className="primary-action" href="/login">Se connecter <ArrowRight size={16} /></a><a className="back-public-link" href="/#top">Retour au site public</a></div></section>;
  return <div data-client-gate="demo"><ClientPanel onLogout={() => { sessionStorage.removeItem("mks-client-session"); window.location.href = "/"; }} /></div>;
}

function ClientPanel({ onLogout }: { onLogout: () => void }) {
  // Lazy import is intentionally avoided here so the static build stays simple.
  return <section className="client-gate-panel"><div className="client-gate-header"><a href="/#top" className="mks-brand"><span className="mks-mark">MKS</span><span><strong>MKS</strong><small>SERVICE</small></span></a><button onClick={onLogout}>Se déconnecter</button></div><div className="client-gate-content"><div className="public-kicker">ESPACE CLIENT · SESSION ACTIVE</div><h1>Votre projet<br /><em>en un regard.</em></h1><p>Vous êtes connecté à l’espace client de démonstration. Les demandes, devis, messages et documents seront branchés à l’API MKS Service.</p><div className="client-gate-cards"><a href="#client-demandes"><strong>Mes demandes</strong><span>Suivre les dossiers en cours</span></a><a href="#client-devis"><strong>Devis & factures</strong><span>Consulter les documents</span></a><a href="#client-messages"><strong>Messages</strong><span>Échanger avec MKS Service</span></a></div></div></section>;
}

function HashRouter() {
  const [hash, setHash] = useState(window.location.hash.toLowerCase());
  useEffect(() => { const update = () => setHash(window.location.hash.toLowerCase()); window.addEventListener("hashchange", update); return () => window.removeEventListener("hashchange", update); }, []);
  const area = internalAreas.find((item) => item.hash === hash);
  if (hash === "#client" || hash.startsWith("#client-")) return <ClientGate />;
  if (area) return sessionStorage.getItem("mks-client-session") === "demo" ? <InternalArea area={area} /> : <AccessRequired area={area.name} />;
  return <Home />;
}

function Router() { return <Switch><Route path="/login" component={LoginPage} /><Route component={HashRouter} /></Switch>; }

export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>; }
