// @vitest-environment happy-dom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "./pages/Home";

class TestIntersectionObserver {
  observe() {}
  disconnect() {}
}

vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);

afterEach(() => {
  cleanup();
});

describe("interactions responsive du portfolio", () => {
  it("ouvre et referme le menu mobile avec une interaction clavier/souris", async () => {
    const user = userEvent.setup();
    render(<Home />);

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
    render(<Home />);

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
    render(<Home />);
    const menuButton = screen.getByRole("button", { name: "Ouvrir le menu" });

    menuButton.focus();
    fireEvent.keyDown(menuButton, { key: "Enter", code: "Enter" });
    expect(document.activeElement).toBe(menuButton);
  });

  it("affiche le retour en haut après défilement et le rend activable", () => {
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    render(<Home />);

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
