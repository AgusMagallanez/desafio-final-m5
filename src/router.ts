import { initHome } from "./pages/home";
import { initInstructions } from "./pages/instructions";
import { initGame } from "./pages/game";
import { initResults } from "./pages/results";

// const basePath = "/piedra-papel-tijera";

const routes = [
  {
    path: /\/home/,
    component: initHome,
  },
  {
    path: /\/instructions/,
    component: initInstructions,
  },
  {
    path: /\/game/,
    component: initGame,
  },
  {
    path: /\/results/,
    component: initResults,
  },
];

// console.log(routes);

export function initRouter(container: Element) {
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }
  function handleRoute(route) {
    for (const r of routes) {
      if (r.path.test(route)) {
        const el: any = r.component({ goTo: goTo });
        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el);
      }
    }
  }
  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
