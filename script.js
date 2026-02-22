const seeds = [
  {
    localName: "Kalanamak",
    crop: "Rice",
    region: "Uttar Pradesh, India",
    status: "Actively cultivated",
    sharing: "Research-only",
    traits: ["Aromatic", "Cultural heritage", "Niche market"],
    note: "Maintained by local farmers, at risk of replacement by HYVs."
  },
  {
    localName: "Navara",
    crop: "Rice",
    region: "Kerala, India",
    status: "Community seed bank",
    sharing: "Restricted",
    traits: ["Medicinal narratives", "Traditional use", "Low input"],
    note: "Sensitive knowledge in some contexts, share carefully."
  },
  {
    localName: "Finger Millet Mix",
    crop: "Millet",
    region: "Jharkhand, India",
    status: "Home garden",
    sharing: "Public",
    traits: ["Hardy", "Climate-resilient", "Nutrition"],
    note: "Promising for diversification and resilience."
  },
  {
    localName: "Red Lentil Local",
    crop: "Pulses",
    region: "Bihar, India",
    status: "At risk",
    sharing: "Research-only",
    traits: ["Taste", "Local adaptation", "Short duration"],
    note: "Declining cultivation due to market and labor pressure."
  }
];

const $ = (id) => document.getElementById(id);

function render(list){
  const cards = $("cards");
  cards.innerHTML = "";
  list.forEach(s => {
    const el = document.createElement("div");
    el.className = "seed";
    el.innerHTML = `
      <h4>${escapeHtml(s.localName)} <span class="tag">${escapeHtml(s.crop)}</span></h4>
      <div class="meta"><b>Region:</b> ${escapeHtml(s.region)}</div>
      <div class="meta"><b>In-situ:</b> ${escapeHtml(s.status)} • <b>Sharing:</b> ${escapeHtml(s.sharing)}</div>
      <div class="tags">
        ${s.traits.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
      </div>
      <div class="meta" style="margin-top:10px">${escapeHtml(s.note)}</div>
    `;
    cards.appendChild(el);
  });
}

function escapeHtml(str){
  return String(str).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

function applyFilters(){
  const q = ($("search").value || "").toLowerCase().trim();
  const crop = $("cropFilter").value;
  const status = $("statusFilter").value;
  const sharing = $("sharingFilter").value;

  const filtered = seeds.filter(s => {
    if (crop !== "all" && s.crop !== crop) return false;
    if (status !== "all" && s.status !== status) return false;
    if (sharing !== "all" && s.sharing !== sharing) return false;

    if (!q) return true;
    const blob = (s.localName + " " + s.crop + " " + s.region + " " + s.traits.join(" ") + " " + s.note).toLowerCase();
    return blob.includes(q);
  });

  render(filtered);
}

["search","cropFilter","statusFilter","sharingFilter"].forEach(id => {
  $(id).addEventListener("input", applyFilters);
  $(id).addEventListener("change", applyFilters);
});

$("year").textContent = new Date().getFullYear();
render(seeds);
