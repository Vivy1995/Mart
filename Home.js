/* ============================================================
   CAMPUS-MART — script.js
   Full interactivity: Role Switching, Cart, Dark Mode,
   Hamburger, Confetti, Dashboards, Product Grid
   ============================================================ */

/* ── State ─────────────────────────────────────────────────── */
let currentRole = 'student';
let cart = [];

/* ── Product Data ───────────────────────────────────────────── */
const PRODUCTS = [
  { id: 1,  name: 'Indomie Instant Noodles (10 pack)', emoji: '🍜', price: 2000, original: 2400, vendor: 'Chukwu Stores', cat: 'food',    badge: 'hot' },
  { id: 2,  name: 'Golden Morn Cereal (900g)',          emoji: '🥣', price: 2500, original: null, vendor: 'Mama Tope',    cat: 'food',    badge: null  },
  { id: 3,  name: 'Eggs (Full Crate)',                  emoji: '🥚', price: 1800, original: 2000, vendor: 'Emeka Farms',  cat: 'food',    badge: 'hot' },
  { id: 4,  name: 'Semovita (2kg)',                     emoji: '🍚', price: 1200, original: null, vendor: 'Chukwu Stores',cat: 'food',    badge: null  },
  { id: 5,  name: 'Sliced Bread (Agege)',               emoji: '🍞', price: 450,  original: null, vendor: 'Mama Tope',   cat: 'food',    badge: null  },
  { id: 6,  name: 'Dettol Soap (3 pack)',               emoji: '🧴', price: 900,  original: 1100, vendor: 'Eze Pharmacy',cat: 'hygiene', badge: 'new' },
  { id: 7,  name: 'Toothpaste (Close-Up 150ml)',        emoji: '🪥', price: 600,  original: null, vendor: 'Eze Pharmacy',cat: 'hygiene', badge: null  },
  { id: 8,  name: 'Toilet Rolls (12 pack)',             emoji: '🧻', price: 1500, original: null, vendor: 'Eze Pharmacy',cat: 'hygiene', badge: null  },
  { id: 9,  name: 'Cabin Biscuits (tin)',               emoji: '🍪', price: 700,  original: null, vendor: 'Snacks Hub',  cat: 'snacks',  badge: null  },
  { id: 10, name: 'Pringles Original (40g)',            emoji: '🥫', price: 800,  original: null, vendor: 'Snacks Hub',  cat: 'snacks',  badge: 'new' },
  { id: 11, name: 'Ribena Carton (27cl × 10)',          emoji: '🧃', price: 1600, original: 1800, vendor: 'Cold Room',   cat: 'drinks',  badge: 'hot' },
  { id: 12, name: 'Zobo Drink (500ml)',                 emoji: '🍹', price: 300,  original: null, vendor: 'Mama Tope',   cat: 'drinks',  badge: null  },
  { id: 13, name: 'Malta Guinness (pack of 6)',         emoji: '🥤', price: 1200, original: null, vendor: 'Cold Room',   cat: 'drinks',  badge: null  },
  { id: 14, name: 'Peak Milk (12 sachets)',             emoji: '🥛', price: 1400, original: 1600, vendor: 'Chukwu Stores',cat: 'food',   badge: null  },
  { id: 15, name: 'Digestive Biscuits',                 emoji: '🍫', price: 550,  original: null, vendor: 'Snacks Hub',  cat: 'snacks',  badge: null  },
  { id: 16, name: 'Hand Sanitizer (500ml)',             emoji: '🧼', price: 800,  original: null, vendor: 'Eze Pharmacy',cat: 'hygiene', badge: 'new' },
];

/* ── Dashboard Templates ────────────────────────────────────── */
const DASHBOARDS = {

  student: () => `
    <div class="dashboard-grid">

      <!-- Pantry Overview -->
      <div class="dash-card col-span-full md:col-span-1">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-display font-bold text-lg text-brand-navy dark:text-white">📦 Digital Pantry</h3>
          <span class="status-badge status-accepted">Updated now</span>
        </div>
        <div class="space-y-1">
          ${pantryItem('🍜 Indomie Noodles', 80, 'fill-green', '8 left')}
          ${pantryItem('🥚 Eggs', 20, 'fill-orange', '2 left')}
          ${pantryItem('🧴 Dettol Soap', 10, 'fill-red', 'Almost out!')}
          ${pantryItem('🍞 Bread', 60, 'fill-green', '3 loaves')}
          ${pantryItem('🥛 Peak Milk', 45, 'fill-orange', '5 sachets')}
        </div>
        <button class="btn-primary btn-sm btn-green mt-4 w-full" onclick="showToast('✅', 'Smart reminders set!')">
          Set Smart Reminders 🔔
        </button>
      </div>

      <!-- Quick Stats -->
      <div class="dash-card">
        <p class="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">This Month</p>
        <div class="space-y-4">
          <div>
            <p class="text-gray-500 text-sm">Total Spent</p>
            <p class="dash-stat text-brand-navy dark:text-white">₦18,400</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Orders Placed</p>
            <p class="dash-stat text-brand-green">14</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Money Saved</p>
            <p class="dash-stat text-brand-orange">₦2,300</p>
          </div>
        </div>
      </div>

      <!-- Auto Shopping List -->
      <div class="dash-card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-display font-bold text-lg text-brand-navy dark:text-white">🤖 AI Shopping List</h3>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Based on your usage patterns, you need:</p>
        <ul class="space-y-2 text-sm mb-4">
          ${['🥚 Eggs (crate)', '🧴 Dettol Soap', '🍜 Indomie (x5)', '🥛 Peak Milk (x12)'].map(i =>
            `<li class="flex items-center gap-2"><span class="w-4 h-4 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green text-xs">✓</span>${i}</li>`
          ).join('')}
        </ul>
        <button class="btn-primary btn-sm btn-orange mt-2 w-full" onclick="addListToCart()">
          Add All to Cart 🛒
        </button>
      </div>

      <!-- Recent Orders -->
      <div class="dash-card col-span-full">
        <h3 class="font-display font-bold text-lg text-brand-navy dark:text-white mb-4">📋 Recent Orders</h3>
        ${orderItem('#ORD-001', 'Indomie + Eggs + Milk', '₦4,200', 'Delivered', 'status-accepted')}
        ${orderItem('#ORD-002', 'Dettol Soap × 2',       '₦1,800', 'In Transit', 'status-pending')}
        ${orderItem('#ORD-003', 'Ribena Carton',          '₦1,600', 'Delivered', 'status-accepted')}
        <a href="#products" class="btn-secondary btn-sm btn-outline text-center block mt-4 w-full" style="text-align:center">
          Browse Vendors →
        </a>
      </div>

    </div>
  `,

  vendor: () => `
    <div class="dashboard-grid">

      <!-- Stats -->
      <div class="dash-card">
        <p class="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">Store Overview</p>
        <div class="space-y-4">
          <div>
            <p class="text-gray-500 text-sm">Today's Revenue</p>
            <p class="dash-stat text-brand-green">₦42,800</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Active Orders</p>
            <p class="dash-stat text-brand-orange">7</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Products Listed</p>
            <p class="dash-stat text-brand-navy dark:text-white">23</p>
          </div>
        </div>
      </div>

      <!-- Add Product Form -->
      <div class="dash-card vendor-form">
        <h3 class="font-display font-bold text-lg text-brand-navy dark:text-white mb-4">➕ Add New Product</h3>
        <div class="space-y-3">
          <input type="text" placeholder="Product name" id="v-name" />
          <div class="grid grid-cols-2 gap-3">
            <input type="number" placeholder="Price (₦)" id="v-price" />
            <input type="number" placeholder="Stock qty" id="v-stock" />
          </div>
          <select id="v-cat">
            <option value="">Select category</option>
            <option>Food & Provisions</option>
            <option>Hygiene & Personal Care</option>
            <option>Snacks & Confectionery</option>
            <option>Drinks & Beverages</option>
          </select>
          <div class="upload-zone" onclick="simulateUpload()">
            <p class="text-3xl mb-2" id="upload-icon">📸</p>
            <p class="text-sm text-gray-500 dark:text-gray-400" id="upload-text">Click to upload product photo</p>
          </div>
          <button class="btn-primary w-full" onclick="addVendorProduct()">
            List Product 🚀
          </button>
        </div>
      </div>

      <!-- Current Orders -->
      <div class="dash-card col-span-full">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-display font-bold text-lg text-brand-navy dark:text-white">📦 Incoming Orders</h3>
          <span class="status-badge status-pending">7 pending</span>
        </div>
        ${vendorOrder('#ORD-210', 'Chidi A.', 'Indomie × 3, Milk × 2', '₦5,800', 'Pending')}
        ${vendorOrder('#ORD-211', 'Ngozi E.', 'Eggs (crate)',           '₦1,800', 'Preparing')}
        ${vendorOrder('#ORD-212', 'Emeka F.', 'Soap × 2, Toothpaste',  '₦2,100', 'Ready')}
        ${vendorOrder('#ORD-213', 'Amina M.', 'Ribena Carton',          '₦1,600', 'Pending')}
      </div>

    </div>
  `,

  courier: () => `
    <div class="dashboard-grid">

      <!-- Earnings -->
      <div class="dash-card">
        <p class="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">Your Earnings</p>
        <div class="space-y-4">
          <div>
            <p class="text-gray-500 text-sm">Today</p>
            <p class="dash-stat text-brand-green">₦3,400</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">This Week</p>
            <p class="dash-stat text-brand-orange">₦18,200</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Deliveries Done</p>
            <p class="dash-stat text-brand-navy dark:text-white">34</p>
          </div>
        </div>
        <div class="mt-4 p-3 rounded-xl bg-brand-green/10 border border-brand-green/20">
          <p class="text-sm font-semibold text-brand-green">🏆 You're in the Top 10 couriers this week!</p>
        </div>
      </div>

      <!-- Available Jobs -->
      <div class="dash-card col-span-full md:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-display font-bold text-lg text-brand-navy dark:text-white">🛵 Available Jobs</h3>
          <button class="btn-sm btn-green text-xs px-3 py-1 rounded-full font-semibold text-white bg-brand-green" onclick="refreshJobs()">
            Refresh ↺
          </button>
        </div>
        <div id="jobs-list">
          ${courierJob('ORD-214', 'Chukwu Stores → Block C Hostel', '₦400', '0.4km', '~5 min', 1)}
          ${courierJob('ORD-215', 'Mama Tope → SUB Junction',       '₦600', '1.2km', '~12 min', 2)}
          ${courierJob('ORD-216', 'Cold Room → Block A Hostel',     '₦350', '0.2km', '~3 min', 3)}
          ${courierJob('ORD-217', 'Eze Pharmacy → Main Gate',       '₦750', '2.1km', '~20 min', 4)}
        </div>
      </div>

      <!-- Navigation -->
      <div class="dash-card col-span-full">
        <h3 class="font-display font-bold text-lg text-brand-navy dark:text-white mb-4">🗺️ Current Route</h3>
        <div class="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700" style="height: 160px; background: linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #22C55E 100%); position: relative; display: flex; align-items: center; justify-content: center;">
          <div class="text-center text-white">
            <p class="text-4xl mb-2">🗺️</p>
            <p class="font-bold font-display">Navigation Active</p>
            <p class="text-sm opacity-75">Heading to Block C Hostel</p>
          </div>
          <div style="position:absolute; bottom: 12px; right: 12px; background:rgba(255,255,255,.15); backdrop-filter:blur(8px); border-radius: 10px; padding: 6px 12px; font-size: 12px; color: #fff; font-weight: 600;">
            ETA: 5 min ⚡
          </div>
        </div>
      </div>

    </div>
  `
};

/* ── Helper: Pantry item row ──────────────────────────────────── */
function pantryItem(name, pct, fillClass, label) {
  return `
    <div class="pantry-item">
      <span class="text-sm font-medium">${name}</span>
      <div class="flex items-center gap-2">
        <div class="pantry-bar">
          <div class="pantry-fill ${fillClass}" style="width:${pct}%"></div>
        </div>
        <span class="text-xs text-gray-400 w-16 text-right">${label}</span>
      </div>
    </div>
  `;
}

/* ── Helper: Order row ───────────────────────────────────────── */
function orderItem(id, items, amount, status, statusClass) {
  return `
    <div class="order-item">
      <div>
        <p class="font-semibold text-sm">${id}</p>
        <p class="text-xs text-gray-500">${items}</p>
      </div>
      <div class="text-right">
        <p class="font-bold text-sm text-brand-navy dark:text-white">${amount}</p>
        <span class="status-badge ${statusClass}">${status}</span>
      </div>
    </div>
  `;
}

/* ── Helper: Vendor order row ─────────────────────────────────── */
function vendorOrder(id, customer, items, amount, status) {
  const statusMap = {
    Pending:   'status-pending',
    Preparing: 'status-pending',
    Ready:     'status-accepted',
  };
  return `
    <div class="order-item">
      <div>
        <p class="font-semibold text-sm">${id} — <span class="text-brand-navy dark:text-blue-300">${customer}</span></p>
        <p class="text-xs text-gray-500 mt-0.5">${items}</p>
      </div>
      <div class="text-right flex flex-col items-end gap-1">
        <p class="font-bold text-sm">${amount}</p>
        <span class="status-badge ${statusMap[status] || 'status-pending'}">${status}</span>
        <button class="btn-sm btn-green text-xs px-2 py-0.5 rounded text-white bg-brand-green" onclick="showToast('✅', 'Order ${id} accepted!')">
          Accept
        </button>
      </div>
    </div>
  `;
}

/* ── Helper: Courier job row ──────────────────────────────────── */
function courierJob(id, route, pay, dist, eta, idx) {
  return `
    <div class="job-item" id="job-${idx}">
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-sm">${id}</p>
        <p class="text-xs text-gray-500 mt-0.5 truncate">${route}</p>
        <div class="flex gap-3 mt-1 text-xs text-gray-400">
          <span>📍 ${dist}</span>
          <span>⏱ ${eta}</span>
        </div>
      </div>
      <div class="text-right flex flex-col items-end gap-2 ml-3">
        <p class="font-display font-bold text-brand-green">${pay}</p>
        <button class="btn-sm btn-green text-xs px-3 py-1 rounded-lg text-white bg-brand-green" onclick="acceptJob(${idx}, '${id}')">
          Accept
        </button>
      </div>
    </div>
  `;
}

/* ============================================================
   DARK MODE
   ============================================================ */
function initDarkMode() {
  const saved = localStorage.getItem('cm-dark');
  if (saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    updateDarkIcon(true);
  }
}

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('cm-dark', isDark);
  updateDarkIcon(isDark);
}

function updateDarkIcon(isDark) {
  document.getElementById('sun-icon').classList.toggle('hidden', !isDark);
  document.getElementById('moon-icon').classList.toggle('hidden', isDark);
}

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
function toggleMenu() {
  const menu    = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  const burger  = document.querySelector('.hamburger-lines');
  const btn     = document.getElementById('hamburger');

  const isOpen = menu.classList.toggle('open');
  overlay.classList.toggle('open', isOpen);
  burger.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', isOpen);
  menu.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  const menu    = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  const burger  = document.querySelector('.hamburger-lines');
  const btn     = document.getElementById('hamburger');

  menu.classList.remove('open');
  overlay.classList.remove('open');
  burger.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ============================================================
   ROLE SWITCHING
   ============================================================ */
function switchRole(role) {
  currentRole = role;

  // Update all role buttons (navbar + dashboard + mobile)
  document.querySelectorAll('.role-btn, .mobile-role-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === role);
  });

  // Update dashboard title
  const titles = { student: 'Student Dashboard 🎓', vendor: 'Vendor Dashboard 🏪', courier: 'Courier Dashboard 🛵' };
  document.getElementById('dashboard-title').textContent = titles[role];

  // Render dashboard content with smooth transition
  const content = document.getElementById('dashboard-content');
  content.style.opacity = '0';
  content.style.transform = 'translateY(12px)';
  content.style.transition = 'opacity 0.25s, transform 0.25s';

  setTimeout(() => {
    content.innerHTML = DASHBOARDS[role]();
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
  }, 200);
}

/* ============================================================
   PRODUCT GRID
   ============================================================ */
let currentFilter = 'all';

function renderProducts(filter) {
  currentFilter = filter;
  const grid = document.getElementById('products-grid');
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card" style="animation-delay: ${i * 0.04}s">
      <div class="product-card-img">
        <span>${p.emoji}</span>
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge === 'hot' ? '🔥 Hot' : '✨ New'}</span>` : ''}
      </div>
      <div class="product-card-body">
        <p class="product-vendor">${p.vendor}</p>
        <p class="product-name">${p.name}</p>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="product-price">₦${p.price.toLocaleString()}</span>
          ${p.original ? `<span class="product-original">₦${p.original.toLocaleString()}</span>` : ''}
        </div>
        <button class="add-to-cart-btn" onclick='addToCart(${JSON.stringify(p)})'>
          Add to Cart 🛒
        </button>
      </div>
    </div>
  `).join('');
}

function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
}

/* ============================================================
   CART
   ============================================================ */
function loadCart() {
  try {
    const saved = localStorage.getItem('cm-cart');
    cart = saved ? JSON.parse(saved) : [];
  } catch (e) {
    cart = [];
  }
  updateCartBadge();
}

function saveCart() {
  localStorage.setItem('cm-cart', JSON.stringify(cart));
}

function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  showToast('🛒', `${product.name.slice(0, 28)}… added!`);
  fireConfetti();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartBadge();
  renderCartItems();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) return removeFromCart(id);
  saveCart();
  updateCartBadge();
  renderCartItems();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() {
  const total = cart.reduce((acc, i) => acc + i.qty, 0);
  const badge = document.getElementById('cart-count');
  badge.textContent = total;
  badge.classList.toggle('hidden', total === 0);
}

function openCart() {
  const modal   = document.getElementById('cart-modal');
  const overlay = document.getElementById('cart-overlay');
  modal.classList.add('open');
  overlay.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  renderCartItems();
}

function closeCart() {
  const modal   = document.getElementById('cart-modal');
  const overlay = document.getElementById('cart-overlay');
  modal.classList.remove('open');
  overlay.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function renderCartItems() {
  const list    = document.getElementById('cart-items-list');
  const empty   = document.getElementById('cart-empty');
  const footer  = document.getElementById('cart-footer');
  const subtotal = document.getElementById('cart-subtotal');

  if (cart.length === 0) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    footer.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  footer.classList.remove('hidden');

  list.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">₦${item.price.toLocaleString()} each</p>
      </div>
      <div class="flex items-center gap-1">
        <div class="qty-controls">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
        <button class="remove-btn ml-1" onclick="removeFromCart(${item.id})" aria-label="Remove item">✕</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  subtotal.textContent = `₦${total.toLocaleString()}`;
}

function checkout() {
  closeCart();
  const modal   = document.getElementById('checkout-modal');
  const overlay = document.getElementById('checkout-overlay');
  modal.classList.remove('hidden');
  overlay.classList.add('open');
  // Trigger animation
  requestAnimationFrame(() => {
    modal.classList.add('open');
  });
  fireConfetti();
  clearCart();
}

function closeCheckout() {
  const modal   = document.getElementById('checkout-modal');
  const overlay = document.getElementById('checkout-overlay');
  modal.classList.remove('open');
  overlay.classList.remove('open');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

/* ── Add AI shopping list to cart ─────────────────────────── */
function addListToCart() {
  const aiList = [
    PRODUCTS.find(p => p.id === 3), // Eggs
    PRODUCTS.find(p => p.id === 6), // Dettol
    PRODUCTS.find(p => p.id === 1), // Indomie
    PRODUCTS.find(p => p.id === 14), // Milk
  ].filter(Boolean);

  aiList.forEach(p => {
    const existing = cart.find(i => i.id === p.id);
    if (existing) existing.qty += 1;
    else cart.push({ ...p, qty: 1 });
  });

  saveCart();
  updateCartBadge();
  showToast('🤖', 'AI list added to cart!');
  fireConfetti();
  openCart();
}

/* ============================================================
   VENDOR DASHBOARD ACTIONS
   ============================================================ */
function simulateUpload() {
  const icon = document.getElementById('upload-icon');
  const text = document.getElementById('upload-text');
  if (!icon) return;
  icon.textContent = '✅';
  text.textContent = 'photo_product.jpg (simulated)';
  text.style.color = 'var(--green)';
}

function addVendorProduct() {
  const name  = document.getElementById('v-name')?.value;
  const price = document.getElementById('v-price')?.value;
  const stock = document.getElementById('v-stock')?.value;
  const cat   = document.getElementById('v-cat')?.value;

  if (!name || !price || !stock || !cat) {
    showToast('⚠️', 'Fill all fields first!');
    return;
  }

  showToast('🚀', `"${name}" listed for ₦${Number(price).toLocaleString()}!`);
  fireConfetti();

  // Reset form
  ['v-name','v-price','v-stock'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const cat_el = document.getElementById('v-cat');
  if (cat_el) cat_el.value = '';
  const icon = document.getElementById('upload-icon');
  const text = document.getElementById('upload-text');
  if (icon) icon.textContent = '📸';
  if (text) { text.textContent = 'Click to upload product photo'; text.style.color = ''; }
}

/* ============================================================
   COURIER ACTIONS
   ============================================================ */
function acceptJob(idx, id) {
  const job = document.getElementById(`job-${idx}`);
  if (!job) return;
  job.style.opacity = '0.5';
  job.style.pointerEvents = 'none';
  const btn = job.querySelector('button');
  if (btn) { btn.textContent = '✓ Accepted'; btn.style.background = '#16A34A'; }
  showToast('🛵', `Job ${id} accepted! Navigate to pickup.`);
}

function refreshJobs() {
  showToast('🔄', 'Jobs refreshed! 2 new jobs nearby.');
}

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
let toastTimer = null;

function showToast(icon, message) {
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toast-icon');
  const toastMsg  = document.getElementById('toast-message');

  toastIcon.textContent  = icon;
  toastMsg.textContent   = message;

  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ============================================================
   CONFETTI
   ============================================================ */
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx    = canvas.getContext('2d');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#22C55E', '#F97316', '#1E3A8A', '#FBBF24', '#EC4899', '#8B5CF6'];
  const pieces = [];
  const count  = 80;

  for (let i = 0; i < count; i++) {
    pieces.push({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height - canvas.height,
      w:   Math.random() * 10 + 5,
      h:   Math.random() * 6  + 3,
      rot: Math.random() * 360,
      vx:  (Math.random() - 0.5) * 3,
      vy:  Math.random() * 4 + 2,
      vr:  (Math.random() - 0.5) * 6,
      col: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  let frame;
  let tick = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.col;
      ctx.globalAlpha = Math.max(0, 1 - tick / 90);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();

      p.x  += p.vx;
      p.y  += p.vy;
      p.rot += p.vr;
      p.vy += 0.08; // gravity
    });

    tick++;
    if (tick < 90) {
      frame = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(frame);
    }
  }

  cancelAnimationFrame(frame);
  tick = 0;
  draw();
}

/* ============================================================
   SMOOTH SCROLL (for older Safari compat)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================================
   NAVBAR SCROLL EFFECT
   ============================================================ */
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const scroll = window.scrollY;

  // Slightly raise nav shadow on scroll
  if (scroll > 20) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  lastScroll = scroll;
}, { passive: true });

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  loadCart();
  renderProducts('all');
  switchRole('student');
});