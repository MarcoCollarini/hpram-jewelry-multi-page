const S = SITE,
  P = PRODUCTS;
// const menu = document.querySelector(".menu");
// if (menu)
//   menu.onclick = () => document.querySelector("nav").classList.toggle("open");
// document
//   .querySelectorAll("nav a")
//   .forEach(
//     (a) =>
//       (a.onclick = () =>
//         document.querySelector("nav").classList.remove("open")),
//   );
document
  .querySelectorAll("#year")
  .forEach((e) => (e.textContent = new Date().getFullYear()));
document
  .querySelectorAll("[data-key]")
  .forEach((e) => (e.textContent = S[e.dataset.key] || ""));
document
  .querySelectorAll("[data-link]")
  .forEach((e) => (e.href = S[e.dataset.link]));
document.querySelectorAll(".cont").forEach((e) => {
    e.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "contatti.html";
    });
});

const cleanPhone = S.phone.replace(/[^\d+]/g, "");

document.querySelectorAll(".phoneNumber").forEach((el) => {
  el.textContent = S.phone;
  el.href = `tel:${cleanPhone}`;
});

document.querySelectorAll(".phoneLink").forEach((el) => {
  el.href = `tel:${cleanPhone}`;
});

const h = document.querySelector("#hours");
if (h) h.textContent = S.hours.join("\n");
const euro = (v) => "€ " + Number(v).toLocaleString("it-IT");
function card(p, interactive = true) {
  return `<article><div class="photo" ${interactive ? `data-id="${p.id}"` : ""}><img src="assets/images/${p.image}" alt="${p.name}"><span class="badge">${p.badge}</span></div><div class="metaCard"><small>${p.category} · ${p.collection}</small><h2>${p.name}</h2><strong>${euro(p.price)}</strong>${interactive ? `<button data-id="${p.id}">Dettagli</button>` : ""}</div></article>`;
}
document.querySelectorAll("[data-kind]").forEach((g) => {
  let a =
    g.dataset.kind === "watches"
      ? P.filter((p) => p.category === "Orologi")
      : P.filter((p) => p.category !== "Orologi");
  g.innerHTML = a.map((p) => card(p, false)).join("");
});
const grid = document.querySelector("#grid");
if (grid) {
  let cat = "Tutti",
    q = "",
    order = "featured";
  filters.innerHTML = ["Tutti", ...new Set(P.map((p) => p.category))]
    .map((x) => `<button data-cat="${x}">${x}</button>`)
    .join("");
  function draw() {
    let a = P.filter(
      (p) =>
        (cat === "Tutti" || p.category === cat) &&
        `${p.name} ${p.collection}`.toLowerCase().includes(q),
    );
    if (order === "low") a.sort((x, y) => x.price - y.price);
    if (order === "high") a.sort((x, y) => y.price - x.price);
    if (order === "az") a.sort((x, y) => x.name.localeCompare(y.name));
    grid.innerHTML = a.map((p) => card(p)).join("");
    count.textContent = `${a.length} prodotti`;
    empty.style.display = a.length ? "none" : "block";
    filters
      .querySelectorAll("button")
      .forEach((b) => b.classList.toggle("active", b.dataset.cat === cat));
  }
  filters.onclick = (e) => {
    if (e.target.dataset.cat) {
      cat = e.target.dataset.cat;
      draw();
    }
  };
  search.oninput = (e) => {
    q = e.target.value.toLowerCase();
    draw();
  };
  sort.onchange = (e) => {
    order = e.target.value;
    draw();
  };
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-id]");
    if (!b) return;
    const p = P.find((x) => x.id == b.dataset.id);
    modal.querySelector("img").src = "assets/images/" + p.image;
    modal.querySelector(".meta").textContent =
      p.category + " · " + p.collection;
    modal.querySelector("h2").textContent = p.name;
    modal.querySelector("strong").textContent = euro(p.price);
    modal.querySelector(".desc").textContent = p.description;
    modal.querySelector(".code").textContent =
      "HP-DEMO-" + String(p.id).padStart(3, "0");
    modal.showModal();
  });
  modal.querySelector(".close").onclick = () => modal.close();
  modal.onclick = (e) => e.target === modal && modal.close();
  draw();
}

const menuBtn = document.querySelector('.menu');
const mobileNav = document.querySelector('header nav');

menuBtn.addEventListener('click', () => {

  const isOpen = mobileNav.classList.toggle('open');

  document.body.classList.toggle('menu-open', isOpen);
  document.documentElement.classList.toggle('menu-open', isOpen);

  menuBtn.textContent = isOpen ? 'CHIUDI' : 'MENU';

  menuBtn.setAttribute('aria-expanded', isOpen);
});


/* Chiude il menu quando viene selezionata una pagina */

mobileNav.querySelectorAll('a').forEach(link => {

  link.addEventListener('click', () => {

    mobileNav.classList.remove('open');

    document.body.classList.remove('menu-open');
    document.documentElement.classList.remove('menu-open');

    menuBtn.textContent = 'MENU';
    menuBtn.setAttribute('aria-expanded', 'false');
  });

});

document.addEventListener('keydown', (e) => {

  if (e.key === 'Escape' && mobileNav.classList.contains('open')) {

    mobileNav.classList.remove('open');

    document.body.classList.remove('menu-open');
    document.documentElement.classList.remove('menu-open');

    menuBtn.textContent = 'MENU';
    menuBtn.setAttribute('aria-expanded', 'false');
  }

});

