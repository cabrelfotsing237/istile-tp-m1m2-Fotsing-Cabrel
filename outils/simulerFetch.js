// À utiliser UNIQUEMENT en cas d'absence de connexion Internet :
//   import { simulerFetch } from "../outils/simulerFetch.js";
//   globalThis.fetch = simulerFetch;
// Cette fonction imite quelques réponses de https://dummyjson.com (données de démonstration).
const PRENOMS = ["Emily", "Michael", "Sophia", "James", "Olivia", "Liam", "Ava", "Noah"];
const NOMS = ["Johnson", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];
const fabriquer = (id) => ({
  id, firstName: PRENOMS[(id - 1) % 8], lastName: NOMS[(id - 1) % 8],
  email: `${PRENOMS[(id - 1) % 8].toLowerCase()}.${NOMS[(id - 1) % 8].toLowerCase()}@x.dummyjson.com`,
});
const reponse = (status, corps) => ({ ok: status >= 200 && status < 300, status, json: async () => corps });

export function simulerFetch(url) {
  const u = new URL(url);
  return new Promise((resolve, reject) => setTimeout(() => {
    if (u.hostname.includes("invalide")) return reject(new TypeError("fetch failed"));
    const m = u.pathname.match(/^\/users\/(\d+)$/);
    if (m) {
      const id = Number(m[1]);
      return resolve(id > 208 ? reponse(404, { message: `User with id '${id}' not found` }) : reponse(200, fabriquer(id)));
    }
    if (u.pathname === "/users") {
      const limite = Number(u.searchParams.get("limit") ?? 30);
      const users = Array.from({ length: Math.min(limite, 208) }, (_, i) => fabriquer(i + 1));
      return resolve(reponse(200, { users, total: 208, skip: 0, limit: limite }));
    }
    resolve(reponse(404, { message: "Not found" }));
  }, 150));
}
