/* Ferzan Hekimoğlu — site etkileşimleri */

const WORKS = [
  { t:"Rüya Gibi", y:2025, type:"dizi", g:"Televizyon dizisi",
    d:"Güncel televizyon projesiyle kariyerine devam ediyor." },
  { t:"Kod Adı Kırlangıç", y:2023, type:"dizi", g:"Aile, çocuk",
    d:"Teknoloji meraklısı çocukların drone tasarlayıp onları engellemeye çalışan kötü adamlara karşı mücadelesini anlatan aile dizisi." },
  { t:"Avcı: İlk Kehanet", y:2021, type:"sinema", g:"Aksiyon, fantastik",
    d:"Kadim bir kehanetle bir araya gelen efsanevi avcı Phaldor ve arkeoloji öğrencisi Melis'in dünyanın kaderini değiştirecek fantastik yolculuğu." },
  { t:"Hercai", y:2019, type:"dizi", g:"Dram",
    d:"ATV'nin sevilen dram dizisinin kadrosunda; geniş kitlelere ulaşan projesi." },
  { t:"Seven Ne Yapmaz", y:2017, type:"dizi", g:"Komedi, dram",
    d:"Büyük bir holdingin şımarık veliahtı Ozan'ın Karadeniz'deki memleketine gönderilmesiyle başlayan, Nazlı ile tanışmasıyla dönüşen hikâye." },
  { t:"Bir Şey Değilim", y:2016, type:"sinema", g:"Dram",
    d:"Parasız kaldığı için B filminde kötü adam oynamayı kabul eden bir tiyatrocunun, yanlışlıkla seri katil öldüren bir kahramana dönüşmesini anlatan drama." },
  { t:"En Güzeli", y:2015, type:"sinema", g:"Komedi",
    d:"Antalya'ya çalışmaya giden üç arkadaşın başlarından geçen birbirinden ilginç ve komik olaylar." },
  { t:"Kalbim Ege'de Kaldı", y:2015, type:"dizi", g:"Dram, romantik",
    d:"Ege'nin sıcak atmosferinde geçen romantik dizi." },
  { t:"Delisin! Delisin!", y:2014, type:"sinema", g:"Komedi",
    d:"Aynı akıl hastanesinde tedavi gören üç yakın arkadaşın, aralarına katılan özgür ruhlu Burcu ile birlikte hastaneden kaçarak yaşadığı macera dolu yolculuk." },
  { t:"Her Şey Yolunda Merkez", y:2013, type:"dizi", g:"Komedi, gençlik",
    d:"Tanındığı ilk dizi; gençlik ve aile odaklı eğlenceli bir yapım." },
  { t:"Galip Derviş", y:2013, type:"dizi", g:"Komedi, suç",
    d:"Sayısız fobisi ve takıntıları olan ama dahi zekâlı eski bir polisin, çözümsüz vakalara danışmanlık yaparken karısının katilini aramasını anlatan dizi." },
];

/* ---------- Filmografi listesi + filtre ---------- */
const worksEl = document.getElementById("works");
const typeLabel = (t) => (t === "dizi" ? "Dizi" : "Sinema");

function renderWorks(filter = "all") {
  worksEl.innerHTML = "";
  WORKS.filter(w => filter === "all" || w.type === filter).forEach(w => {
    const card = document.createElement("article");
    card.className = "work-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <span class="work-year">${w.y}</span>
      <h3 class="work-title">${w.t}</h3>
      <p class="work-genre">${w.g}</p>
      <span class="tag ${w.type}">${typeLabel(w.type)}</span>`;
    card.addEventListener("click", () => openModal(w));
    card.addEventListener("keydown", e => { if (e.key === "Enter") openModal(w); });
    worksEl.appendChild(card);
  });
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderWorks(btn.dataset.filter);
  });
});
renderWorks();

/* ---------- Proje detay modalı ---------- */
const modal = document.getElementById("modal");
function openModal(w) {
  document.getElementById("modalTitle").textContent = w.t;
  document.getElementById("modalMeta").textContent = `${w.y} · ${w.g}`;
  document.getElementById("modalDesc").textContent = w.d;
  const tag = document.getElementById("modalTag");
  tag.textContent = typeLabel(w.type);
  tag.className = "tag " + w.type;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}
modal.addEventListener("click", e => { if (e.target.hasAttribute("data-close")) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

/* ---------- Mobil menü ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

/* ---------- İstatistik sayaçları ---------- */
const counters = document.querySelectorAll(".stat-num");
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    counterObserver.unobserve(el);
    const target = +el.dataset.count;
    const plain = el.dataset.plain === "1";
    const dur = 900, start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ---------- Scroll'da beliren öğeler ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
