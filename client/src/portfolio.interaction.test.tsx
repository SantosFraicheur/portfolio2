// @vitest-environment happy-dom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "./pages/Home";
import { ThemeProvider } from "./contexts/ThemeContext";

const renderHome = () => render(<ThemeProvider defaultTheme="light" switchable><Home /></ThemeProvider>);

class TestIntersectionObserver {
  observe() {}
  disconnect() {}
}

vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});

describe("interactions responsive du portfolio", () => {
  it("ouvre et referme le menu mobile avec une interaction clavier/souris", async () => {
    const user = userEvent.setup();
    renderHome();

    const menuButton = screen.getByRole("button", { name: "Ouvrir le menu" });
    expect(menuButton).toBeTruthy();

    await user.click(menuButton);
    expect(screen.getByRole("navigation", { name: "Navigation principale" }).classList.contains("open")).toBe(true);
    expect(screen.getByRole("button", { name: "Fermer le menu" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Fermer le menu" }));
    expect(screen.getByRole("navigation", { name: "Navigation principale" }).classList.contains("open")).toBe(false);
  });

  it("permet au clavier d’atteindre les actions principales", async () => {
    const user = userEvent.setup();
    renderHome();

    const focusableActions = [
      screen.getByRole("button", { name: "Ouvrir le menu" }),
      screen.getByRole("link", { name: "Télécharger mon CV" }),
      screen.getAllByRole("link", { name: /WhatsApp/ })[0],
      screen.getByRole("link", { name: /Écrire un message/ }),
    ].filter((element): element is HTMLElement => Boolean(element));

    for (const action of focusableActions) {
      action.focus();
      expect(document.activeElement).toBe(action);
    }

    await user.tab();
    expect(document.activeElement).not.toBe(document.body);
  });

  it("conserve les états accessibles du menu après activation au clavier", () => {
    renderHome();
    const menuButton = screen.getByRole("button", { name: "Ouvrir le menu" });

    menuButton.focus();
    fireEvent.keyDown(menuButton, { key: "Enter", code: "Enter" });
    expect(document.activeElement).toBe(menuButton);
  });

  it("bascule entre les thèmes clair et sombre avec un libellé accessible", async () => {
    const user = userEvent.setup();
    renderHome();

    const themeButton = screen.getByRole("button", { name: "Activer le mode sombre" });
    await user.click(themeButton);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(screen.getByRole("button", { name: "Activer le mode clair" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Activer le mode clair" }));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("filtre les projets par technologie et signale un résultat vide", () => {
    renderHome();
    const technologySelect = screen.getByRole("combobox", { name: "Filtrer par technologie" });

    fireEvent.change(technologySelect, { target: { value: "Node.js" } });
    expect(screen.getByText("Lumière Parfums")).toBeTruthy();

    fireEvent.change(technologySelect, { target: { value: "Python" } });
    expect(screen.getByText("0 projet affiché")).toBeTruthy();
  });

  it("valide les champs du formulaire avant de préparer un e-mail", () => {
    renderHome();
    fireEvent.click(screen.getByRole("button", { name: "Envoyer le message" }));

    expect(screen.getByText("Indiquez votre nom.")).toBeTruthy();
    expect(screen.getByText("Indiquez une adresse e-mail valide.")).toBeTruthy();
    expect(screen.getByText("Ajoutez un objet à votre message.")).toBeTruthy();
    expect(screen.getByText("Votre message doit contenir au moins 20 caractères.")).toBeTruthy();
  });

  it("soumet un message valide au backend et affiche la confirmation", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } }));
    const user = userEvent.setup();
    renderHome();

    await user.type(screen.getByRole("textbox", { name: "Nom" }), "Awa Sossa");
    await user.type(screen.getByRole("textbox", { name: "E-mail" }), "awa@example.com");
    await user.type(screen.getByRole("textbox", { name: "Objet" }), "Projet web");
    await user.type(screen.getByRole("textbox", { name: "Message" }), "Bonjour, je souhaite échanger sur un projet web.");
    await user.click(screen.getByRole("button", { name: "Envoyer le message" }));

    await waitFor(() => expect(screen.getByText("Votre message a bien été transmis.")).toBeTruthy());
    expect(fetchSpy).toHaveBeenCalledWith("/api/contact", expect.objectContaining({ method: "POST" }));
  });

  it("affiche le retour en haut après défilement et le rend activable", () => {
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    renderHome();

    const backToTop = document.querySelector<HTMLButtonElement>(".back-to-top");
    expect(backToTop).not.toBeNull();
    if (!backToTop) return;
    expect(backToTop.tabIndex).toBe(-1);

    Object.defineProperty(window, "scrollY", { configurable: true, value: 800, writable: true });
    fireEvent.scroll(window);
    expect(backToTop.tabIndex).toBe(0);
    expect(backToTop.classList.contains("visible")).toBe(true);

    fireEvent.click(backToTop);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    scrollToSpy.mockRestore();
  });
});
