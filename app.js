/* =====================================================
   SCAMCHECK AI
   APPLICATION JAVASCRIPT
===================================================== */


/* =====================================================
   GLOBAL STATE
===================================================== */

const state = {
  currentPage: "home",
  currentType: "message",
  databaseFilter: "all",
  language: localStorage.getItem("scam_language") || "ar",
  theme: localStorage.getItem("scam_theme") || "light"
};


/* =====================================================
   ANALYZER TYPES
===================================================== */

const analyzerTypes = {

  message: {
    title: "فحص رسالة",
    description: "ألصق الرسالة التي تريد تحليلها.",
    icon: "💬",
    placeholder:
      "مثال: مبروك! ربحت جائزة بقيمة 5000$ اضغط على الرابط وأرسل رمز OTP..."
  },

  link: {
    title: "فحص رابط",
    description: "أدخل الرابط الذي تريد فحصه.",
    icon: "🔗",
    placeholder:
      "https://example.com"
  },

  phone: {
    title: "فحص رقم هاتف",
    description: "أدخل الرقم الذي تواصل معك.",
    icon: "☎",
    placeholder:
      "+213 555 123 456"
  },

  product: {
    title: "فحص منتج أو متجر",
    description: "ألصق وصف المنتج أو الإعلان.",
    icon: "🛍",
    placeholder:
      "منتج أصلي بسعر خيالي، الدفع مسبقًا..."
  },

  job: {
    title: "فحص وظيفة",
    description: "ألصق عرض العمل.",
    icon: "💼",
    placeholder:
      "نبحث عن موظفين للعمل من المنزل براتب 5000$..."
  },

  rental: {
    title: "فحص عقار",
    description: "ألصق إعلان الإيجار أو البيع.",
    icon: "🏠",
    placeholder:
      "شقة فاخرة بسعر منخفض جدًا، مطلوب تحويل العربون..."
  },

  payment: {
    title: "فحص طلب دفع",
    description: "ألصق طلب الدفع أو التحويل.",
    icon: "💳",
    placeholder:
      "أرسل المبلغ الآن حتى نؤكد طلبك..."
  },

  screenshot: {
    title: "فحص صورة",
    description:
      "في هذه النسخة التجريبية، اكتب النص الموجود في الصورة.",
    icon: "📸",
    placeholder:
      "اكتب هنا النص الموجود في Screenshot..."
  }

};


/* =====================================================
   TRANSLATIONS
===================================================== */

const translations = {

  ar: {
    home: "الرئيسية",
    check: "فحص جديد",
    reports: "تقاريري",
    database: "قاعدة البيانات",
    profile: "الملف الشخصي"
  },

  en: {
    home: "Home",
    check: "New Check",
    reports: "Reports",
    database: "Database",
    profile: "Profile"
  },

  fr: {
    home: "Accueil",
    check: "Nouvelle analyse",
    reports: "Rapports",
    database: "Base de données",
    profile: "Profil"
  }

};


/* =====================================================
   DEMO DATABASE
===================================================== */

const defaultDatabase = [

  {
    value: "+213 555 12 34 56",
    category: "phone",
    type: "رقم هاتف",
    reports: 4
  },

  {
    value: "example-shop-check.test",
    category: "link",
    type: "رابط",
    reports: 2
  },

  {
    value: "@demo_seller",
    category: "seller",
    type: "بائع / حساب",
    reports: 3
  },

  {
    value: "+212 600 00 00 00",
    category: "phone",
    type: "رقم هاتف",
    reports: 5
  },

  {
    value: "quick-money-job.example",
    category: "link",
    type: "وظيفة",
    reports: 7
  },

  {
    value: "@fake_store_demo",
    category: "seller",
    type: "بائع / حساب",
    reports: 6
  }

];


/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  applyTheme();

  applyLanguage();

  renderRecent();

  renderReports();

  renderDatabase();

  updateStats();

  updateNavigation();

});


/* =====================================================
   NAVIGATION
===================================================== */

function navigate(page) {

  state.currentPage = page;

  document.querySelectorAll(".page").forEach(section => {
    section.classList.remove("active");
  });

  const target = document.getElementById(`page-${page}`);

  if (target) {
    target.classList.add("active");
  }

  updateNavigation();

  closeSidebar();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function updateNavigation() {

  document.querySelectorAll(".nav-item").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.page === state.currentPage
    );

  });


  document.querySelectorAll(".bottom-nav button").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.page === state.currentPage
    );

  });

}


/* =====================================================
   SIDEBAR
===================================================== */

function toggleSidebar() {

  document
    .getElementById("sidebar")
    .classList.toggle("open");

  document
    .getElementById("overlay")
    .classList.toggle("show");

}


function closeSidebar() {

  document
    .getElementById("sidebar")
    .classList.remove("open");

  document
    .getElementById("overlay")
    .classList.remove("show");

}


/* =====================================================
   THEME
===================================================== */

function toggleTheme() {

  state.theme =
    state.theme === "light"
      ? "dark"
      : "light";

  localStorage.setItem(
    "scam_theme",
    state.theme
  );

  applyTheme();

}


function applyTheme() {

  document.body.classList.toggle(
    "dark",
    state.theme === "dark"
  );

  const icon =
    document.getElementById("themeIcon");

  if (icon) {
    icon.textContent =
      state.theme === "dark"
        ? "☀"
        : "☾";
  }

  const themeText =
    document.getElementById("themeText");

  if (themeText) {
    themeText.textContent =
      state.theme === "dark"
        ? "الوضع النهاري"
        : "الوضع الليلي";
  }

}


/* =====================================================
   LANGUAGE
===================================================== */

function changeLanguage(language) {

  state.language = language;

  localStorage.setItem(
    "scam_language",
    language
  );

  applyLanguage();

}


function applyLanguage() {

  const data =
    translations[state.language] ||
    translations.ar;

  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      const key =
        element.dataset.i18n;

      if (data[key]) {
        element.textContent =
          data[key];
      }

    });


  const select =
    document.getElementById(
      "languageSelect"
    );

  if (select) {
    select.value =
      state.language;
  }

}


/* =====================================================
   OPEN ANALYZER
===================================================== */

function openAnalyzer(type) {

  const config =
    analyzerTypes[type];

  if (!config) return;

  state.currentType = type;

  document.getElementById(
    "analyzerIcon"
  ).textContent = config.icon;

  document.getElementById(
    "analyzerTitle"
  ).textContent = config.title;

  document.getElementById(
    "analyzerDescription"
  ).textContent = config.description;

  const input =
    document.getElementById(
      "analysisInput"
    );

  input.placeholder =
    config.placeholder;

  input.value = "";

  document.getElementById(
    "analysisResult"
  ).classList.remove("show");

  document.getElementById(
    "analysisResult"
  ).innerHTML = "";

  document
    .getElementById("analyzerModal")
    .classList.add("show");

  setTimeout(() => {
    input.focus();
  }, 100);

}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeModal(id) {

  const modal =
    document.getElementById(id);

  if (modal) {
    modal.classList.remove("show");
  }

}


/* =====================================================
   ANALYSIS ENGINE
===================================================== */

function runAnalysis() {

  const input =
    document
      .getElementById("analysisInput")
      .value
      .trim();

  if (!input) {

    showToast(
      "أدخل المحتوى أولًا لإجراء الفحص."
    );

    return;
  }


  if (input.length < 4) {

    showToast(
      "المحتوى قصير جدًا للتحليل."
    );

    return;
  }


  const result =
    analyzeContent(
      input,
      state.currentType
    );


  saveReport({
    type: state.currentType,
    content: input,
    score: result.score,
    level: result.level,
    indicators: result.indicators,
    time: Date.now()
  });


  renderAnalysisResult(result);

  renderRecent();

  renderReports();

  updateStats();

}


function analyzeContent(text, type) {

  const normalized =
    text.toLowerCase();

  let score = 8;

  const indicators = [];


  /* ------------------------------
     URGENCY
  ------------------------------ */

  const urgencyWords = [
    "urgent",
    "immediately",
    "now",
    "today",
    "عاجل",
    "فورا",
    "فوراً",
    "الآن",
    "اليوم",
    "مستعجل",
    "ضروري"
  ];

  if (
    containsAny(
      normalized,
      urgencyWords
    )
  ) {

    score += 15;

    indicators.push(
      "لغة استعجال أو ضغط على المستخدم"
    );

  }


  /* ------------------------------
     OTP / PASSWORD
  ------------------------------ */

  const sensitiveWords = [
    "otp",
    "verification code",
    "password",
    "mot de passe",
    "رمز التحقق",
    "رمز otp",
    "كلمة السر",
    "كلمة المرور",
    "code"
  ];

  if (
    containsAny(
      normalized,
      sensitiveWords
    )
  ) {

    score += 28;

    indicators.push(
      "طلب أو ذكر معلومات تحقق حساسة"
    );

  }


  /* ------------------------------
     BANK
  ------------------------------ */

  const bankWords = [
    "bank",
    "iban",
    "card",
    "credit card",
    "bank account",
    "حساب بنكي",
    "بطاقة",
    "البطاقة",
    "حساب مصرفي",
    "iban"
  ];

  if (
    containsAny(
      normalized,
      bankWords
    )
  ) {

    score += 20;

    indicators.push(
      "ارتباط المحتوى ببيانات مالية"
    );

  }


  /* ------------------------------
     GUARANTEED MONEY
  ------------------------------ */

  const moneyWords = [
    "guaranteed",
    "guarantee",
    "free money",
    "you won",
    "winner",
    "prize",
    "ربحت",
    "جائزة",
    "مجاني",
    "مال مضمون",
    "ربح مضمون",
    "راتب مضمون",
    "مبروك"
  ];

  if (
    containsAny(
      normalized,
      moneyWords
    )
  ) {

    score += 20;

    indicators.push(
      "وعود مالية أو جوائز مضمونة"
    );

  }


  /* ------------------------------
     PAYMENT
  ------------------------------ */

  const paymentWords = [
    "send money",
    "send payment",
    "pay now",
    "deposit",
    "fee",
    "transfer",
    "تحويل",
    "ادفع",
    "الدفع",
    "أرسل المال",
    "العربون",
    "رسوم"
  ];

  if (
    containsAny(
      normalized,
      paymentWords
    )
  ) {

    score += 18;

    indicators.push(
      "وجود طلب مالي أو تحويل أموال"
    );

  }


  /* ------------------------------
     SUSPICIOUS URL
  ------------------------------ */

  if (
    normalized.includes("http://")
  ) {

    score += 20;

    indicators.push(
      "الرابط يستخدم HTTP بدل HTTPS"
    );

  }


  /* ------------------------------
     URL SHORTENERS
  ------------------------------ */

  const shorteners = [
    "bit.ly",
    "tinyurl.com",
    "t.co/",
    "is.gd",
    "cutt.ly",
    "shorturl"
  ];

  if (
    containsAny(
      normalized,
      shorteners
    )
  ) {

    score += 18;

    indicators.push(
      "استخدام خدمة اختصار روابط"
    );

  }


  /* ------------------------------
     FAKE LOGIN
  ------------------------------ */

  const loginWords = [
    "login",
    "sign in",
    "verify your account",
    "تسجيل الدخول",
    "تحقق من حسابك",
    "حسابك سيتم إيقافه"
  ];

  if (
    containsAny(
      normalized,
      loginWords
    )
  ) {

    score += 17;

    indicators.push(
      "محاولة محتملة لدفع المستخدم إلى تسجيل الدخول"
    );

  }


  /* ------------------------------
     JOB
  ------------------------------ */

  if (type === "job") {

    const jobIndicators = [
      "work from home",
      "easy money",
      "no experience",
      "high salary",
      "من المنزل",
      "بدون خبرة",
      "راتب مرتفع",
      "وظيفة سهلة"
    ];

    if (
      containsAny(
        normalized,
        jobIndicators
      )
    ) {

      score += 15;

      indicators.push(
        "وصف وظيفة مع وعود مالية أو شروط غير معتادة"
      );

    }

  }


  /* ------------------------------
     RENTAL
  ------------------------------ */

  if (type === "rental") {

    const rentalIndicators = [
      "deposit",
      "advance",
      "send money",
      "عربون",
      "دفعة مسبقة",
      "حول المال"
    ];

    if (
      containsAny(
        normalized,
        rentalIndicators
      )
    ) {

      score += 16;

      indicators.push(
        "طلب دفع مسبق مرتبط بعرض عقاري"
      );

    }

  }


  /* ------------------------------
     PHONE
  ------------------------------ */

  if (type === "phone") {

    if (
      /\+?\d[\d\s-]{7,}/.test(text)
    ) {

      indicators.push(
        "تم التعرف على صيغة رقم هاتف"
      );

    }

  }


  /* ------------------------------
     SCREENSHOT
  ------------------------------ */

  if (type === "screenshot") {

    score += 3;

    indicators.push(
      "تحليل النص فقط؛ لم يتم تحليل الصورة نفسها في هذه النسخة"
    );

  }


  /* ------------------------------
     LENGTH
  ------------------------------ */

  if (text.length > 500) {

    score += 3;

    indicators.push(
      "المحتوى طويل ويحتوي على تفاصيل متعددة"
    );

  }


  /* ------------------------------
     TYPE BASED
  ------------------------------ */

  if (type === "payment") {

    score += 8;

    indicators.push(
      "هذا النوع يتطلب حذرًا خاصًا قبل تحويل الأموال"
    );

  }


  score =
    Math.max(
      0,
      Math.min(
        100,
        score
      )
    );


  if (
    indicators.length === 0
  ) {

    indicators.push(
      "لم يتم العثور على مؤشرات قوية في النص التجريبي"
    );

  }


  let level;

  if (score >= 70) {

    level = "مرتفع";

  } else if (score >= 40) {

    level = "متوسط";

  } else {

    level = "منخفض";

  }


  return {
    score,
    level,
    indicators
  };

}


/* =====================================================
   HELPERS
===================================================== */

function containsAny(text, words) {

  return words.some(
    word =>
      text.includes(
        word.toLowerCase()
      )
  );

}


/* =====================================================
   RESULT
===================================================== */

function renderAnalysisResult(result) {

  const box =
    document.getElementById(
      "analysisResult"
    );

  let className = "risk-low";

  if (result.score >= 70) {
    className = "risk-high";
  } else if (result.score >= 40) {
    className = "risk-medium";
  }


  let advice = "";

  if (result.score >= 70) {

    advice =
      "توقف قبل التفاعل أو الدفع. تحقق من الجهة عبر مصدر رسمي مستقل ولا تشارك معلومات حساسة.";

  } else if (result.score >= 40) {

    advice =
      "تعامل بحذر. ابحث عن الجهة من مصادر مستقلة ولا تدفع أو تشارك معلومات حساسة قبل التحقق.";

  } else {

    advice =
      "لم تظهر مؤشرات قوية في التحليل التجريبي، لكن ذلك لا يثبت أن المحتوى آمن.";

  }


  const indicatorsHTML =
    result.indicators
      .map(
        item =>
          `<li>• ${escapeHTML(item)}</li>`
      )
      .join("");


  box.innerHTML = `

    <div class="result-score">

      <div
        class="score-circle ${className}"
        style="border-color:${getRiskColor(result.score)}"
      >

        <strong>${result.score}</strong>

        <small>/ 100</small>

      </div>

      <div class="result-label">
        Risk Indicator Score
      </div>

      <div
        class="risk-badge ${className}"
        style="display:inline-block;margin-top:8px"
      >
        مستوى المؤشرات: ${result.level}
      </div>

    </div>


    <div class="result-section">

      <h4>⚠ المؤشرات المكتشفة</h4>

      <ul>
        ${indicatorsHTML}
      </ul>

    </div>


    <div class="result-section">

      <h4>🛡 ماذا تفعل؟</h4>

      <p
        style="
          color:var(--muted);
          font-size:12px;
          line-height:1.8;
        "
      >
        ${escapeHTML(advice)}
      </p>

    </div>


    <div class="result-disclaimer">

      ⚠ هذا التحليل تجريبي وإرشادي.
      النتيجة ليست إثباتًا بأن المحتوى احتيالي أو آمن.
      تحقق دائمًا من المعلومات عبر مصادر مستقلة.

    </div>

  `;

  box.classList.add("show");

}


/* =====================================================
   RISK COLOR
===================================================== */

function getRiskColor(score) {

  if (score >= 70) {
    return "#eb4d4b";
  }

  if (score >= 40) {
    return "#f5a623";
  }

  return "#20bf6b";

}


/* =====================================================
   STORAGE
===================================================== */

function getReports() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "scam_reports"
      )
    ) || [];

  } catch (error) {

    return [];

  }

}


function saveReport(report) {

  const reports =
    getReports();

  reports.unshift(report);

  if (reports.length > 100) {
    reports.length = 100;
  }

  localStorage.setItem(
    "scam_reports",
    JSON.stringify(reports)
  );

}


/* =====================================================
   RENDER RECENT
===================================================== */

function renderRecent() {

  const container =
    document.getElementById(
      "recentChecks"
    );

  if (!container) return;

  const reports =
    getReports().slice(0, 5);


  if (!reports.length) {

    container.innerHTML = `
      <div class="empty-state">
        لا توجد عمليات فحص حتى الآن.<br>
        ابدأ بفحص أول رسالة أو رابط.
      </div>
    `;

    return;

  }


  container.innerHTML =
    reports
      .map(
        report =>
          createReportItem(report)
      )
      .join("");

}


/* =====================================================
   REPORT ITEM
===================================================== */

function createReportItem(report) {

  const config =
    analyzerTypes[report.type] ||
    analyzerTypes.message;

  const riskClass =
    report.score >= 70
      ? "risk-high"
      : report.score >= 40
        ? "risk-medium"
        : "risk-low";


  return `

    <div class="recent-item">

      <div class="recent-left">

        <div class="recent-icon">
          ${config.icon}
        </div>

        <div class="recent-text">

          <strong>
            ${escapeHTML(config.title)}
          </strong>

          <p>
            ${escapeHTML(
              report.content
            )}
          </p>

        </div>

      </div>

      <span class="risk-badge ${riskClass}">
        ${report.score}/100
      </span>

    </div>

  `;

}


/* =====================================================
   RENDER REPORTS
===================================================== */

function renderReports() {

  const container =
    document.getElementById(
      "reportsList"
    );

  if (!container) return;

  const reports =
    getReports();


  if (!reports.length) {

    container.innerHTML = `
      <div class="empty-state">

        <div style="font-size:35px;margin-bottom:10px">
          🔍
        </div>

        لا توجد تقارير محفوظة.<br>

        عندما تقوم بفحص شيء سيظهر هنا.

      </div>
    `;

    return;

  }


  container.innerHTML =
    reports
      .map(
        (report, index) =>
          createFullReport(
            report,
            index
          )
      )
      .join("");

}


/* =====================================================
   FULL REPORT
===================================================== */

function createFullReport(
  report,
  index
) {

  const config =
    analyzerTypes[report.type] ||
    analyzerTypes.message;


  const riskClass =
    report.score >= 70
      ? "risk-high"
      : report.score >= 40
        ? "risk-medium"
        : "risk-low";


  const date =
    new Date(
      report.time
    ).toLocaleString(
      "ar-DZ",
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    );


  const indicators =
    report.indicators
      .slice(0, 6)
      .map(
        item =>
          `<span class="indicator">
             ${escapeHTML(item)}
           </span>`
      )
      .join("");


  return `

    <article class="report-card">

      <div class="report-top">

        <div>

          <div class="report-type">
            ${config.icon}
            ${escapeHTML(config.title)}
          </div>

          <div class="report-date">
            ${date}
          </div>

        </div>

        <span class="risk-badge ${riskClass}">
          ${report.score}/100
        </span>

      </div>


      <div class="report-content">

        ${escapeHTML(
          report.content
        )}

      </div>


      <div class="report-indicators">

        ${indicators}

      </div>

    </article>

  `;

}


/* =====================================================
   CLEAR HISTORY
===================================================== */

function clearHistory() {

  const reports =
    getReports();

  if (!reports.length) {

    showToast(
      "السجل فارغ بالفعل."
    );

    return;

  }


  const confirmed =
    confirm(
      "هل تريد حذف جميع تقارير الفحص المحفوظة على هذا الجهاز؟"
    );


  if (!confirmed) return;


  localStorage.removeItem(
    "scam_reports"
  );

  renderRecent();

  renderReports();

  updateStats();

  showToast(
    "تم حذف السجل."
  );

}


/* =====================================================
   STATS
===================================================== */

function updateStats() {

  const reports =
    getReports();


  const total =
    document.getElementById(
      "totalChecks"
    );

  const high =
    document.getElementById(
      "highRisks"
    );


  if (total) {
    total.textContent =
      reports.length;
  }


  if (high) {

    high.textContent =
      reports.filter(
        item =>
          item.score >= 70
      ).length;

  }

}


/* =====================================================
   DATABASE
===================================================== */

function getDatabase() {

  let community = [];

  try {

    community =
      JSON.parse(
        localStorage.getItem(
          "scam_database"
        )
      ) || [];

  } catch {
    community = [];
  }


  return [
    ...defaultDatabase,
    ...community
  ];

}


function setDatabaseFilter(
  filter,
  button
) {

  state.databaseFilter =
    filter;


  document
    .querySelectorAll(".filter")
    .forEach(
      item =>
        item.classList.remove(
          "active"
        )
    );


  if (button) {
    button.classList.add("active");
  }


  renderDatabase();

}


function renderDatabase() {

  const container =
    document.getElementById(
      "databaseList"
    );

  if (!container) return;


  const search =
    (
      document.getElementById(
        "databaseSearch"
      )?.value || ""
    )
      .trim()
      .toLowerCase();


  let data =
    getDatabase();


  if (
    state.databaseFilter !== "all"
  ) {

    data =
      data.filter(
        item =>
          item.category ===
          state.databaseFilter
      );

  }


  if (search) {

    data =
      data.filter(
        item =>
          item.value
            .toLowerCase()
            .includes(search) ||

          item.type
            .toLowerCase()
            .includes(search)
      );

  }


  if (!data.length) {

    container.innerHTML = `
      <div class="empty-state">
        لا توجد نتائج.
      </div>
    `;

    return;

  }


  container.innerHTML =
    data
      .map(
        item => `

          <div class="database-item">

            <div>

              <strong>
                ${escapeHTML(item.value)}
              </strong>

              <small>
                ${escapeHTML(item.type)}
              </small>

            </div>

            <div class="db-reports">
              ${item.reports} بلاغات
            </div>

          </div>

        `
      )
      .join("");

}


/* =====================================================
   COMMUNITY REPORT
===================================================== */

function openCommunityReport() {

  document
    .getElementById(
      "reportValue"
    ).value = "";

  document
    .getElementById(
      "reportDescription"
    ).value = "";

  document
    .getElementById(
      "communityModal"
    )
    .classList.add("show");

}


function submitCommunityReport() {

  const value =
    document
      .getElementById(
        "reportValue"
      )
      .value
      .trim();


  const category =
    document.getElementById(
      "reportCategory"
    ).value;


  const description =
    document
      .getElementById(
        "reportDescription"
      )
      .value
      .trim();


  if (!value) {

    showToast(
      "أدخل الرقم أو الرابط أو الحساب."
    );

    return;

  }


  const reports =
    JSON.parse(
      localStorage.getItem(
        "scam_database"
      ) || "[]"
    );


  reports.unshift({

    value,
    category,

    type:
      category === "phone"
        ? "رقم هاتف"
        : category === "link"
          ? "رابط"
          : category === "seller"
            ? "بائع / حساب"
            : category,

    reports: 1,

    description,

    createdAt: Date.now()

  });


  localStorage.setItem(
    "scam_database",
    JSON.stringify(
      reports
    )
  );


  closeModal(
    "communityModal"
  );


  renderDatabase();


  showToast(
    "تم تسجيل البلاغ محليًا."
  );

}


/* =====================================================
   PREMIUM
===================================================== */

function showPremium() {

  document
    .getElementById(
      "premiumModal"
    )
    .classList.add("show");

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      3000
    );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


/* =====================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
  "click",
  event => {

    if (
      event.target.classList.contains(
        "modal"
      )
    ) {

      event.target.classList.remove(
        "show"
      );

    }

  }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      document
        .querySelectorAll(
          ".modal.show"
        )
        .forEach(
          modal =>
            modal.classList.remove(
              "show"
            )
        );

      closeSidebar();

    }

  }
);


/* =====================================================
   SHARE REPORT
===================================================== */

async function shareText(text) {

  try {

    if (
      navigator.share
    ) {

      await navigator.share({
        title:
          "SCAMCHECK AI",
        text
      });

      return;

    }

    await navigator.clipboard.writeText(
      text
    );

    showToast(
      "تم نسخ النص."
    );

  } catch {

    showToast(
      "تعذر المشاركة."
    );

  }

}


/* =====================================================
   DEMO SECURITY CHECK
===================================================== */

function securityCheckText(text) {

  const result =
    analyzeContent(
      text,
      "message"
    );

  return result;

}


/* =====================================================
   FUTURE API PLACEHOLDER
===================================================== */

/*
   IMPORTANT:

   لا تضع OpenAI API Key أو أي مفتاح سري
   داخل هذا الملف عند رفع المشروع إلى GitHub.

   عندما نضيف Backend لاحقًا سيكون الاتصال
   تقريبًا بهذا الشكل:

   fetch("/api/analyze", {
       method: "POST",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify({
           type: state.currentType,
           content: input
       })
   });

   الـ API Key يجب أن يبقى في السيرفر.
*/


/* =====================================================
   FUTURE PAYMENT PLACEHOLDER
===================================================== */

/*
   نظام الاشتراك يمكن إضافته لاحقًا بواسطة
   Stripe / Paddle / Lemon Squeezy أو مزود آخر.

   لا يتم وضع مفاتيح الدفع السرية في GitHub Pages.
*/


/* =====================================================
   FUTURE DATABASE PLACEHOLDER
===================================================== */

/*
   النسخة الحالية تستخدم localStorage.

   في النسخة الإنتاجية:
   Users
   Reports
   Scam Database
   Community Reports
   Subscriptions
   AI Analyses
   Moderation

   يجب نقلها إلى Backend / Database حقيقية.
*/


/* =====================================================
   END
===================================================== */

console.log(
  "SCAMCHECK AI v1.0 loaded successfully."
);
