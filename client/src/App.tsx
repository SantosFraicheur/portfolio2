// MKS Service — routeur public et espaces privés de démonstration par hash. Les permissions réelles doivent être validées côté serveur.
import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LegalPage from "./pages/Legal";
import { AccessRequired, ClientDashboard, InternalArea, LoginPage, internalAreas } from "./pages/Access";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";

function ClientGate() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <section className="client-login-required"><div><div className="public-kicker">ESPACE CLIENT · VÉRIFICATION</div><h1>Vérification<br /><em>de votre session.</em></h1></div></section>;
  if (!isAuthenticated) return <section className="client-login-required"><div><div className="public-kicker">ESPACE CLIENT · ACCÈS RÉSERVÉ</div><h1>Connectez-vous<br /><em>pour continuer.</em></h1><p>Votre espace client est disponible après authentification.</p><a className="primary-action" href="/login">Se connecter <ArrowRight size={16} /></a><a className="back-public-link" href="/#top">Retour au site public</a></div></section>;
  return <div data-client-gate="authenticated"><ClientDashboard onLogout={() => { sessionStorage.removeItem("mks-client-session"); sessionStorage.removeItem("mks-pending-quote"); window.location.href = "/"; }} /></div>;
}

function ClientPanel({ onLogout }: { onLogout: () => void }) {
  // Lazy import is intentionally avoided here so the static build stays simple.
  return <section className="client-gate-panel"><div className="client-gate-header"><a href="/#top" className="mks-brand"><span className="mks-mark">MKS</span><span><strong>MKS</strong><small>SERVICE</small></span></a><button onClick={onLogout}>Se déconnecter</button></div><div className="client-gate-content"><div className="public-kicker">ESPACE CLIENT · SESSION ACTIVE</div><h1>Votre projet<br /><em>en un regard.</em></h1><p>Vous êtes connecté à l’espace client de démonstration. Les demandes, devis, messages et documents seront branchés à l’API MKS Service.</p><div className="client-gate-cards"><a href="#client-demandes"><strong>Mes demandes</strong><span>Suivre les dossiers en cours</span></a><a href="#client-devis"><strong>Devis & factures</strong><span>Consulter les documents</span></a><a href="#client-messages"><strong>Messages</strong><span>Échanger avec MKS Service</span></a></div></div></section>;
}

function HashRouter() {
  const { user, isAuthenticated, loading } = useAuth();
  const [hash, setHash] = useState(window.location.hash.toLowerCase());
  useEffect(() => { const update = () => setHash(window.location.hash.toLowerCase()); window.addEventListener("hashchange", update); return () => window.removeEventListener("hashchange", update); }, []);
  const area = internalAreas.find((item) => item.hash === hash);
  if (loading) return <section className="client-login-required"><div><div className="public-kicker">MKS SERVICE · CHARGEMENT</div><h1>Préparation<br /><em>de votre espace.</em></h1></div></section>;
  if (hash === "#client" || hash.startsWith("#client-")) return <ClientGate />;
  if (area) { const needsAdmin = area.name.startsWith("Admin") || area.name.startsWith("Responsable"); const allowed = isAuthenticated && (!needsAdmin || user?.role === "admin"); return allowed ? <InternalArea area={area} /> : <AccessRequired area={needsAdmin ? `${area.name} · rôle admin requis` : area.name} />; }
  return <Home />;
}

function Router() { return <Switch><Route path="/login" component={LoginPage} /><Route path="/mentions-legales" component={LegalPage} /><Route component={HashRouter} /></Switch>; }

export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>; }
