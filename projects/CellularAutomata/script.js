const ruleInput = document.getElementById("ruleInput");
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
    let newRule = parseInt(ruleInput.value);
    if (!isNaN(newRule)) {
        ruleNumber = Math.max(0, Math.min(255, newRule));
        updateRuleNum(ruleNumber);
    }
});

function decimalToRuleSet(decimal) {
    return decimal.toString(2).padStart(8, "0").split("").map(Number).reverse();
}
