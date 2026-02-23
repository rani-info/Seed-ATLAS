const seeds = [
  // RICE (indigenous/heterogeneous)
  {
    localName: "Kalanamak",
    crop: "Rice",
    region: "Uttar Pradesh, India",
    status: "Actively cultivated",
    sharing: "Research-only",
    traits: ["Aromatic", "Cultural heritage", "Niche market"],
    note: "Indigenous aromatic rice; often replaced by uniform high-yield varieties."
  },
  {
    localName: "Jeeraphool",
    crop: "Rice",
    region: "Chhattisgarh, India",
    status: "Actively cultivated",
    sharing: "Research-only",
    traits: ["Aromatic", "Local adaptation", "Premium potential"],
    note: "Chhattisgarh indigenous rice; valued for fragrance and taste."
  },
  {
    localName: "Nagri Dubraj",
    crop: "Rice",
    region: "Chhattisgarh, India",
    status: "At risk",
    sharing: "Restricted",
    traits: ["Aromatic", "Traditional", "Community identity"],
    note: "Indigenous variety; cultivation declining due to market pressure and seed replacement."
  },

  // MILLETS
  {
    localName: "Kodo Millet",
    crop: "Millet",
    region: "Central India",
    status: "Home garden",
    sharing: "Public",
    traits: ["Hardy", "Low input", "Nutrition"],
    note: "Resilient millet; important for diversification and climate resilience."
  },
  {
    localName: "Kutki (Little Millet)",
    crop: "Millet",
    region: "Central & Eastern India",
    status: "At risk",
    sharing: "Research-only",
    traits: ["Drought-tolerant", "Low input", "Nutrition"],
    note: "Traditional millet; threatened by reduced cultivation and weak markets."
  },
  {
    localName: "Kangi (Foxtail Millet)",
    crop: "Millet",
    region: "India",
    status: "Home garden",
    sharing: "Public",
    traits: ["Short duration", "Hardy", "Nutrition"],
    note: "Traditional foxtail millet; suitable for low-input systems."
  },
  {
    localName: "Jowar (Sorghum)",
    crop: "Millet",
    region: "India",
    status: "Actively cultivated",
    sharing: "Public",
    traits: ["Heat-tolerant", "Drought-tolerant", "Staple"],
    note: "Sorghum supports resilience under heat stress and low rainfall."
  },

  // MAIZE
  {
    localName: "Desi Maize (Local landrace)",
    crop: "Maize",
    region: "Jharkhand, India",
    status: "Actively cultivated",
    sharing: "Research-only",
    traits: ["Local adaptation", "Mixed farming", "Stable yield"],
    note: "Local maize landrace maintained through farmer seed saving."
  },
  {
    localName: "Purple/Black Maize (local type)",
    crop: "Maize",
    region: "Himalayan Region, India",
    status: "At risk",
    sharing: "Restricted",
    traits: ["High anthocyanin (claimed)", "Cultural use", "Niche market"],
    note: "Colored maize types are often maintained by small communities; share knowledge carefully."
  },

  // WHEAT
  {
    localName: "Khapli (Emmer wheat)",
    crop: "Wheat",
    region: "Maharashtra/Karnataka, India",
    status: "At risk",
    sharing: "Research-only",
    traits: ["Traditional", "Low input (claimed)", "Diet niche"],
    note: "Traditional wheat type; niche demand but limited cultivation."
  },
  {
    localName: "Local Desi Wheat (landrace mix)",
    crop: "Wheat",
    region: "North India",
    status: "Actively cultivated",
    sharing: "Research-only",
    traits: ["Heterogeneous", "Local adaptation", "Seed saving"],
    note: "Farmer-maintained heterogeneous wheat mixtures in small pockets."
  }
];

const $ = (id) => document.getElementById(id);

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;");
}

function render(list){
  const cards = $("cards");
  if (!cards) return;

  cards.innerHTML = "";

  // If nothing matches, show a friendly message
  if (!list || list.length === 0) {
    cards.innerHTML = `
      <div class="seed" style="grid-column:1/-1">
        <h4>No matching entries</h4>
        <div class="meta">Try changing the filters or clearing the search text.</div>
      </div>
    `;
    return;
  }

  list.forEach(s => {
    const el = document.createElement("div");
    el.className = "seed";
    el.innerHTML = `
      <h4>${escapeHtml(s.localName)} <span class="tag">${escapeHtml(s.crop)}</span></h4>
      <div class="meta"><b>Region:</b> ${escapeHtml(s.region)}</div>
      <div class="meta"><b>In-situ:</b> ${escapeHtml(s.status)} • <b>Sharing:</b> ${escapeHtml(s.sharing)}</div>
      <div class="tags">
        ${(s.traits || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
      </div>
      <div class="meta" style="margin-top:10px">${escapeHtml(s.note || "")}</div>
    `;
    cards.appendChild(el);
  });
}

function applyFilters(){
  const searchEl = $("search");
  const cropEl = $("cropFilter");
  const statusEl = $("statusFilter");
  const sharingEl = $("sharingFilter");
  const cards = $("cards");

  if (!cropEl || !statusEl || !sharingEl || !cards) return;

  const q = (searchEl?.value || "").toLowerCase().trim();
  const crop = cropEl.value;
  const status = statusEl.value;
  const sharing = sharingEl.value;

  // If crop is "all", show NOTHING and a message
  if (crop === "all") {
    cards.innerHTML = `
      <div class="seed" style="grid-column:1/-1">
        <h4>Select a crop to view entries</h4>
        <div class="meta">Choose Rice, Millet, Wheat, or Maize from the Crop dropdown.</div>
      </div>
    `;
    return;
  }

  const filtered = seeds.filter(s => {
    if (s.crop !== crop) return false;
    if (status !== "all" && s.status !== status) return false;
    if (sharing !== "all" && s.sharing !== sharing) return false;

    if (!q) return true;
    const blob = (s.localName + " " + s.region + " " + (s.traits || []).join(" ") + " " + (s.note || "")).toLowerCase();
    return blob.includes(q);
  });

  render(filtered);
}

["search","cropFilter","statusFilter","sharingFilter"].forEach(id => {
  const el = $(id);
  if (!el) return;
  el.addEventListener("input", applyFilters);
  el.addEventListener("change", applyFilters);
});

const yearEl = $("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

applyFilters();