import { initHome } from "./pages/home";
import { initInstructions } from "./pages/instructions";
import { initGame } from "./pages/game";
import { initResults } from "./pages/results";

const routes = [
  {
    path: /\/home/,
    component: initHome,
  },
  {
    path: /\/instructions/,
    component: initInstructions,
  },
];

const BASE_PATH = "/desafio-final-m5";

function isGitHubPages() {
  return location.host.includes("github.io");
}

export function initRouter(container: Element) {
  function goTo(path) {
    const completePath = isGitHubPages() ? BASE_PATH + path : path;
    history.pushState({}, "", path);
    handleRoute(completePath);
  }

  function handleRoute(route) {
    const newRoute = isGitHubPages() ? route.replace(BASE_PATH, "") : route;

    for (const r of routes) {
      if (r.path.test(newRoute)) {
        const elemento = r.component({ goTo: goTo });

        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(elemento);
      }
    }
  }

  if (location.pathname == "/" || location.host.includes("github.io")) {
    goTo("/home");
  } else {
    handleRoute(location.pathname);
  }
  window.onpopstate = () => {
    handleRoute(location.pathname);
  };
}
