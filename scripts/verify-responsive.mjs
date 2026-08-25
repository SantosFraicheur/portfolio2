import { spawn } from "node:child_process";

const browser = spawn("/usr/bin/chromium", [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--remote-debugging-port=9222",
  "--user-data-dir=/tmp/portfolio-responsive-chrome",
  "about:blank",
], { stdio: "ignore" });

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  let websocketUrl;
  for (let attempt = 0; attempt < 20 && !websocketUrl; attempt += 1) {
    try {
      const response = await fetch("http://127.0.0.1:9222/json/new?about:blank", { method: "PUT" });
      const page = await response.json();
      websocketUrl = page.webSocketDebuggerUrl;
    } catch {
      await wait(150);
    }
  }

  if (!websocketUrl) throw new Error("Impossible de joindre Chromium headless");

  const socket = new WebSocket(websocketUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let commandId = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    const resolver = pending.get(message.id);
    if (!resolver) return;
    pending.delete(message.id);
    if (message.error) resolver.reject(new Error(message.error.message));
    else resolver.resolve(message.result);
  });

  const command = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++commandId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

  const evaluate = async (expression) => {
    const result = await command("Runtime.evaluate", { returnByValue: true, expression });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "Erreur JavaScript dans le contrôle");
    return result.result?.value;
  };

  await command("Page.enable");
  await command("Runtime.enable");
  await command("Emulation.setDeviceMetricsOverride", {
    width: 375,
    height: 812,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await command("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await command("Page.navigate", { url: "http://127.0.0.1:3000/" });
  await wait(1500);

  const beforeMenu = await evaluate(`(() => {
    const focusables = [...document.querySelectorAll('a, button')].filter((element) => {
      const style = getComputedStyle(element);
      return style.display !== 'none' && style.visibility !== 'hidden' && element.getClientRects().length > 0;
    });
    const focusResults = focusables.map((element) => {
      element.focus();
      return document.activeElement === element;
    });
    const reveal = document.querySelector('[data-reveal]');
    const revealStyle = reveal ? getComputedStyle(reveal) : null;
    return {
      viewport: [innerWidth, innerHeight],
      noHorizontalOverflow: document.documentElement.scrollWidth <= innerWidth && document.body.scrollWidth <= innerWidth,
      focusableElementsFound: focusables.length,
      focusResults,
      reducedMotionOpacity: revealStyle?.opacity,
      reducedMotionTransform: revealStyle?.transform,
    };
  })()`);

  await evaluate("document.querySelector('.menu-toggle')?.click(); true");
  await wait(80);
  const menuOpened = await evaluate("document.querySelector('.main-nav')?.classList.contains('open') === true");
  const result = { ...beforeMenu, menuOpened };
  console.log(JSON.stringify(result, null, 2));

  if (!result.noHorizontalOverflow) throw new Error("Débordement horizontal détecté");
  if (!result.focusableElementsFound || result.focusResults.some((focused) => !focused)) throw new Error("Un élément focusable n’est pas accessible au clavier");
  if (!result.menuOpened) throw new Error("Le menu mobile ne s’ouvre pas");
  if (result.reducedMotionOpacity !== "1" || result.reducedMotionTransform !== "none") throw new Error(`La préférence mouvement réduit n’est pas appliquée: ${JSON.stringify(result)}`);

  socket.close();
} finally {
  browser.kill();
}
