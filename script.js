// =====================================================
// MODE ELEMENTS
// =====================================================

const cashbackModeBtn =
  document.getElementById("cashbackModeBtn");

const manualModeBtn =
  document.getElementById("manualModeBtn");

const cashbackCalculator =
  document.getElementById("cashbackCalculator");

const manualCalculator =
  document.getElementById("manualCalculator");

const otherPromotions =
  document.getElementById("otherPromotions");

const referralCommission =
  document.getElementById("referralCommission");

const mainModeToggle =
  document.querySelector(".mode-toggle");


// =====================================================
// MAIN CALCULATOR MODE
// =====================================================

function showCalculatorMode(mode) {

  cashbackCalculator.classList.add("hidden");
  manualCalculator.classList.add("hidden");
  otherPromotions.classList.add("hidden");
  referralCommission.classList.add("hidden");

  cashbackModeBtn.classList.remove("active");
  manualModeBtn.classList.remove("active");


  // =========================
  // MAIN CALCULATOR
  // =========================

  if (mode === "cashback") {

    cashbackCalculator.classList.remove("hidden");

    cashbackModeBtn.classList.add("active");

    // Show Cashback / Manual toggle
    mainModeToggle.classList.remove("hidden");

  }


  if (mode === "manual") {

    manualCalculator.classList.remove("hidden");

    manualModeBtn.classList.add("active");

    // Show Cashback / Manual toggle
    mainModeToggle.classList.remove("hidden");

  }


  // =========================
  // OTHER PROMOTIONS
  // =========================

  if (mode === "other") {

    otherPromotions.classList.remove("hidden");

    // Hide Cashback / Manual toggle
    mainModeToggle.classList.add("hidden");

  }


  // =========================
  // REFERRAL COMMISSION
  // =========================

  if (mode === "referral") {

    referralCommission.classList.remove("hidden");

    // Hide Cashback / Manual toggle
    mainModeToggle.classList.add("hidden");

  }

}

// =====================================================
// MAIN TOGGLE
// =====================================================

cashbackModeBtn.addEventListener("click", () => {

  showCalculatorMode("cashback");

});


manualModeBtn.addEventListener("click", () => {

  showCalculatorMode("manual");

});


// =====================================================
// SIDE BAR
// =====================================================

const sideButtons =
  document.querySelectorAll(".side-btn");


sideButtons.forEach(button => {

  button.addEventListener("click", () => {

    sideButtons.forEach(btn => {

      btn.classList.remove("active");

    });


    button.classList.add("active");


    const section =
      button.dataset.section;


    if (section === "main") {

      showCalculatorMode("cashback");

    }


    if (section === "other") {

      showCalculatorMode("other");

    }


    if (section === "referral") {

      showCalculatorMode("referral");

    }

  });

});


// =====================================================
// FORMAT MONEY
// =====================================================

function formatMoney(number) {

  return `৳${number.toLocaleString("en-US", {
    maximumFractionDigits: 2
  })}`;

}


// =====================================================
// CASHBACK CALCULATOR
// =====================================================

const cashbackDeposit =
  document.getElementById("cashbackDeposit");

const cashbackType =
  document.getElementById("cashbackType");


function calculateCashback() {

  const deposit =
    Number(cashbackDeposit.value);


  const type =
    cashbackType.value;


  const error =
    document.getElementById("cashbackError");


  let bonusRate = 0;

  let turnoverMultiplier = 0;


  if (type === "1") {

    bonusRate = 1;

    turnoverMultiplier = 20;

  }

  else if (type === "2") {

    bonusRate = 0.50;

    turnoverMultiplier = 15;

  }

  else if (type === "3") {

    bonusRate = 0.30;

    turnoverMultiplier = 15;

  }

  else if (type === "4") {

    bonusRate = 0.20;

    turnoverMultiplier = 15;

  }


  if (cashbackDeposit.value === "") {

    error.textContent = "";

    resetCashback();

    return;

  }


  if (
    !Number.isFinite(deposit) ||
    deposit < 300
  ) {

    error.textContent =
      "Minimum deposit is ৳300.";

    resetCashback();

    return;

  }


  error.textContent = "";


  const bonus =
    Math.min(
      deposit * bonusRate,
      1000
    );


  const totalAmount =
    deposit + bonus;


  const requiredTurnover =
    totalAmount * turnoverMultiplier;


  document.getElementById(
    "cashbackDepositResult"
  ).textContent =
    formatMoney(deposit);


  document.getElementById(
    "cashbackBonusResult"
  ).textContent =
    formatMoney(bonus);


  document.getElementById(
    "cashbackTotalResult"
  ).textContent =
    formatMoney(totalAmount);


  document.getElementById(
    "cashbackMultiplierResult"
  ).textContent =
    `${turnoverMultiplier}x`;


  document.getElementById(
    "cashbackTurnoverResult"
  ).textContent =
    formatMoney(requiredTurnover);

}


function resetCashback() {

  document.getElementById(
    "cashbackDepositResult"
  ).textContent = "৳0";


  document.getElementById(
    "cashbackBonusResult"
  ).textContent = "৳0";


  document.getElementById(
    "cashbackTotalResult"
  ).textContent = "৳0";


  document.getElementById(
    "cashbackMultiplierResult"
  ).textContent = "20x";


  document.getElementById(
    "cashbackTurnoverResult"
  ).textContent = "৳0";

}


cashbackDeposit.addEventListener(
  "input",
  calculateCashback
);


cashbackType.addEventListener(
  "change",
  calculateCashback
);


// =====================================================
// MANUAL CALCULATOR
// =====================================================

const manualDeposit =
  document.getElementById("manualDeposit");

const manualBonus =
  document.getElementById("manualBonus");

const manualTurnover =
  document.getElementById("manualTurnover");


function calculateManual() {

  const deposit =
    Number(manualDeposit.value);


  const bonusPercent =
    Number(manualBonus.value);


  const turnover =
    Number(manualTurnover.value);


  const error =
    document.getElementById("manualError");


  if (
    manualDeposit.value === "" ||
    manualBonus.value === "" ||
    manualTurnover.value === ""
  ) {

    error.textContent = "";

    resetManual();

    return;

  }


  if (
    !Number.isFinite(deposit) ||
    deposit <= 0
  ) {

    error.textContent =
      "Please enter a valid deposit amount.";

    resetManual();

    return;

  }


  if (
    !Number.isFinite(bonusPercent) ||
    bonusPercent < 0
  ) {

    error.textContent =
      "Please enter a valid bonus percentage.";

    resetManual();

    return;

  }


  if (
    !Number.isFinite(turnover) ||
    turnover <= 0
  ) {

    error.textContent =
      "Please enter a valid turnover multiplier.";

    resetManual();

    return;

  }


  error.textContent = "";


  const bonus =
    deposit * (bonusPercent / 100);


  const totalAmount =
    deposit + bonus;


  const requiredTurnover =
    totalAmount * turnover;


  document.getElementById(
    "manualDepositResult"
  ).textContent =
    formatMoney(deposit);


  document.getElementById(
    "manualBonusResult"
  ).textContent =
    formatMoney(bonus);


  document.getElementById(
    "manualTotalResult"
  ).textContent =
    formatMoney(totalAmount);


  document.getElementById(
    "manualMultiplierResult"
  ).textContent =
    `${turnover}x`;


  document.getElementById(
    "manualTurnoverResult"
  ).textContent =
    formatMoney(requiredTurnover);

}


function resetManual() {

  document.getElementById(
    "manualDepositResult"
  ).textContent = "৳0";


  document.getElementById(
    "manualBonusResult"
  ).textContent = "৳0";


  document.getElementById(
    "manualTotalResult"
  ).textContent = "৳0";


  document.getElementById(
    "manualMultiplierResult"
  ).textContent = "0x";


  document.getElementById(
    "manualTurnoverResult"
  ).textContent = "৳0";

}


manualDeposit.addEventListener(
  "input",
  calculateManual
);


manualBonus.addEventListener(
  "input",
  calculateManual
);


manualTurnover.addEventListener(
  "input",
  calculateManual
);


// =====================================================
// OTHER PROMOTIONS
// =====================================================

const promotionAmount =
  document.getElementById("promotionAmount");

const promotionType =
  document.getElementById("promotionType");

const promotionTurnover =
  document.getElementById("promotionTurnover");


function getPromotionDetails() {

  const type =
    promotionType.value;


  if (type === "lakshmi3") {

    return {
      rate: 0.03,
      turnover: 1,
      minimum: 500,
      label: "Deposit"
    };

  }


  if (type === "lakshmi5") {

    return {
      rate: 0.05,
      turnover: 1,
      minimum: 8000,
      label: "Deposit"
    };

  }


  if (type === "lakshmi8") {

    return {
      rate: 0.08,
      turnover: 1,
      minimum: 18000,
      label: "Deposit"
    };

  }


  if (type === "unlimited4") {

    return {
      rate: 0.04,
      turnover: 1,
      minimum: 0,
      label: "Deposit"
    };

  }


  if (type === "rescue3") {

    return {
      rate: 0.03,
      turnover: 5,
      minimum: 0,
      label: "Profit & Loss"
    };

  }

}


function updatePromotionFields() {

  const details =
    getPromotionDetails();


  promotionTurnover.value =
    details.turnover;


  const label =
    document.getElementById(
      "promotionBaseLabel"
    );


  label.textContent =
    details.label;


  const notice =
    document.getElementById(
      "promotionNotice"
    );


  if (details.minimum > 0) {

    notice.textContent =
      `Minimum deposit: ${formatMoney(details.minimum)}`;

  }

  else if (
    promotionType.value === "unlimited4"
  ) {

    notice.textContent =
      "VIP 2–VIP 5 • Automatic turnover: 1x";

  }

  else {

    notice.textContent =
      "Profit & Loss based • Automatic turnover: 5x";

  }


  calculatePromotion();

}


function calculatePromotion() {

  const details =
    getPromotionDetails();


  const amount =
    Number(promotionAmount.value);


  const error =
    document.getElementById(
      "promotionError"
    );


  if (promotionAmount.value === "") {

    error.textContent = "";

    resetPromotion();

    return;

  }


  if (
    !Number.isFinite(amount) ||
    amount <= 0
  ) {

    error.textContent =
      details.label === "Profit & Loss"
        ? "Please enter a valid profit and loss amount."
        : "Please enter a valid deposit amount.";

    resetPromotion();

    return;

  }


  if (
    details.minimum > 0 &&
    amount < details.minimum
  ) {

    error.textContent =
      `Minimum required amount is ${formatMoney(details.minimum)}.`;

    resetPromotion();

    return;

  }


  error.textContent = "";


  const bonus =
    amount * details.rate;


  const totalAmount =
    amount + bonus;


  const requiredTurnover =
    totalAmount * details.turnover;


  document.getElementById(
    "promotionBaseResult"
  ).textContent =
    formatMoney(amount);


  document.getElementById(
    "promotionBonusResult"
  ).textContent =
    formatMoney(bonus);


  document.getElementById(
    "promotionTotalResult"
  ).textContent =
    formatMoney(totalAmount);


  document.getElementById(
    "promotionMultiplierResult"
  ).textContent =
    `${details.turnover}x`;


  document.getElementById(
    "promotionTurnoverResult"
  ).textContent =
    formatMoney(requiredTurnover);

}


function resetPromotion() {

  document.getElementById(
    "promotionBaseResult"
  ).textContent = "৳0";


  document.getElementById(
    "promotionBonusResult"
  ).textContent = "৳0";


  document.getElementById(
    "promotionTotalResult"
  ).textContent = "৳0";


  document.getElementById(
    "promotionMultiplierResult"
  ).textContent =
    `${getPromotionDetails().turnover}x`;


  document.getElementById(
    "promotionTurnoverResult"
  ).textContent = "৳0";

}


promotionAmount.addEventListener(
  "input",
  calculatePromotion
);


promotionType.addEventListener(
  "change",
  updatePromotionFields
);


// =====================================================
// REFERRAL COMMISSION
// =====================================================

const commissionType =
  document.getElementById("commissionType");

const depositCommissionInput =
  document.getElementById(
    "depositCommissionInput"
  );

const bettingCommissionInputs =
  document.getElementById(
    "bettingCommissionInputs"
  );


const depositCommissionAmount =
  document.getElementById(
    "depositCommissionAmount"
  );


const betAmount =
  document.getElementById("betAmount");


const betTier =
  document.getElementById("betTier");


function updateCommissionFields() {

  if (
    commissionType.value === "deposit"
  ) {

    depositCommissionInput.classList.remove(
      "hidden"
    );

    bettingCommissionInputs.classList.add(
      "hidden"
    );

  }


  if (
    commissionType.value === "betting"
  ) {

    depositCommissionInput.classList.add(
      "hidden"
    );

    bettingCommissionInputs.classList.remove(
      "hidden"
    );

  }


  calculateCommission();

}


function calculateCommission() {

  const error =
    document.getElementById(
      "commissionError"
    );


  let commission = 0;


  if (
    commissionType.value === "deposit"
  ) {

    if (
      depositCommissionAmount.value === ""
    ) {

      error.textContent = "";

      resetCommission();

      return;

    }


    const deposit =
      Number(
        depositCommissionAmount.value
      );


    if (
      !Number.isFinite(deposit) ||
      deposit <= 0
    ) {

      error.textContent =
        "Please enter a valid deposit amount.";

      resetCommission();

      return;

    }


    error.textContent = "";


    // Deposit commission = 1.5%

    commission =
      deposit * 0.015;

  }


  if (
    commissionType.value === "betting"
  ) {

    if (
      betAmount.value === ""
    ) {

      error.textContent = "";

      resetCommission();

      return;

    }


    const bet =
      Number(betAmount.value);


    if (
      !Number.isFinite(bet) ||
      bet <= 0
    ) {

      error.textContent =
        "Please enter a valid bet amount.";

      resetCommission();

      return;

    }


    error.textContent = "";


    const tierRate =
      Number(betTier.value);


    commission =
      bet * tierRate;

  }


  document.getElementById(
    "commissionResult"
  ).textContent =
    formatMoney(commission);

}


function resetCommission() {

  document.getElementById(
    "commissionResult"
  ).textContent = "৳0";

}


commissionType.addEventListener(
  "change",
  updateCommissionFields
);


depositCommissionAmount.addEventListener(
  "input",
  calculateCommission
);


betAmount.addEventListener(
  "input",
  calculateCommission
);


betTier.addEventListener(
  "change",
  calculateCommission
);


// =====================================================
// CLEAR BUTTON
// =====================================================

document
  .getElementById("clearBtn")
  .addEventListener("click", () => {

    cashbackDeposit.value = "";

    cashbackType.value = "1";


    manualDeposit.value = "";

    manualBonus.value = "";

    manualTurnover.value = "";


    promotionAmount.value = "";

    promotionType.value = "lakshmi3";


    depositCommissionAmount.value = "";

    betAmount.value = "";

    betTier.value = "0.003";

    commissionType.value = "deposit";


    document.getElementById(
      "cashbackError"
    ).textContent = "";


    document.getElementById(
      "manualError"
    ).textContent = "";


    document.getElementById(
      "promotionError"
    ).textContent = "";


    document.getElementById(
      "commissionError"
    ).textContent = "";


    resetCashback();

    resetManual();

    resetPromotion();

    resetCommission();

    updatePromotionFields();

    updateCommissionFields();

  });


// =====================================================
// NIGHT MODE
// =====================================================

const nightModeToggle =
  document.getElementById(
    "nightModeToggle"
  );


nightModeToggle.addEventListener(
  "change",
  () => {

    document.body.classList.toggle(
      "dark-mode",
      nightModeToggle.checked
    );

  }
);


// =====================================================
// INITIALIZE
// =====================================================

updatePromotionFields();

updateCommissionFields();

resetCashback();

resetManual();

resetPromotion();

resetCommission();