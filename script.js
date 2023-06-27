const monthly = {
    "arcade": { "value": "$9/mo", "discount": null },
    "advanced": { "value": "$12/mo", "discount": null },
    "pro": { "value": "$15/mo", "discount": null },
    "onlineService": { "value": "+$1/mo" },
    "largerStorage": { "value": "+$2/mo" },
    "customizableProfile": { "value": "+$2/mo" },
}

const yearly = {
    "arcade": { "value": "$90/yr", "discount": "2 months free" },
    "advanced": { "value": "$120/yr", "discount": "2 months free" },
    "pro": { "value": "$150/yr", "discount": "2 months free" },
    "onlineService": { "value": "+$10/yr" },
    "largerStorage": { "value": "+$20/yr" },
    "customizableProfile": { "value": "+$20/yr" },
}




/*----Finish Board---*/

const finishBoardInfo = {
    "plan": { "description": "", "value": "" },
    "addOns": [],
}

function addPlan(elem) {
    const namePlan = elem.querySelector(".namePlan");
    const pricePlan = elem.querySelector(".pricePlan");
    finishBoardInfo.plan.description = namePlan.textContent;
    finishBoardInfo.plan.value = pricePlan.textContent;
}

function addRemoveAddOns() {
    finishBoardInfo["addOns"].length = 0;
    validateAddOnsChecked();
}

function validateAddOnsChecked() {
    finishBoardInfo["addOns"].length = 0;
    document.querySelectorAll(".pick__addons .card.checked").forEach((elem) => {
        const nameAddon = elem.querySelector(".nameAddon");
        const priceAddon = elem.querySelector(".priceAddon p");

        finishBoardInfo["addOns"].push({ "description": nameAddon.textContent, "value": priceAddon.textContent })
    })
}

function updateData() {
    document.querySelectorAll(".select__plan .card.checked").forEach((el) => {
        addPlan(el);
    });
    validateAddOnsChecked();
}

function displayFinishBoard() {
    const summaryPlan = document.querySelector(".summaryPlan");
    const summaryPlanValue = document.querySelector(".summaryPlanValue");
    const addonsList = document.querySelector(".add_ons");

    summaryPlan.textContent = finishBoardInfo.plan.description;
    summaryPlanValue.textContent = finishBoardInfo.plan.value;
    addonsList.innerHTML = "";
    finishBoardInfo.addOns.map((elem) => {

        const summaryAddon = `<div><p class='summaryAddon clr-secondary-text fs-200 ff__regular'>${elem.description}</p><p class='summaryAddonValue fs-200 ff__regular'>${elem.value}</p></div>`;
        addonsList.insertAdjacentHTML("beforeend", summaryAddon);
    })

    function calculateTotal() {
        const planValue = parseFloat(finishBoardInfo.plan.value.slice(1));
        var addOnsTotal = finishBoardInfo.addOns.reduce((acc, elem) => {
            return acc + parseFloat(elem.value.slice(2));
        }, 0)
        const total = addOnsTotal + planValue;
        document.querySelector(".totalpay").textContent = `$${total}/yr`
    }
    calculateTotal();
}

/*----/Finish Board---*/

function handleErrors(el) {
    el.classList?.remove("inputs", "clr__error");
    el.previousElementSibling.querySelector("span").style.display = "none";
}

function changeStep(n, e) {

    const currentCard = document.querySelector("[data-currentCard]");
    const currentCardVal = currentCard.dataset["currentcard"];
    const currentCardElement = document.querySelector("[data-id=" + currentCardVal + "]");
    const selectedCardElement = selectedCardEl();
    const selectedCard_id = selectedCardElement.dataset.id;
    const btns = document.querySelector(".previous__next");


    function hideStuff() {
        btns.querySelectorAll(".nav__btn").forEach((elem) => elem.classList.add("hide"))
        document.querySelector(".thankyouWindow").classList.add("hide");
        currentCardElement.classList.add("hide"); /*hide the old card*/
    }


    function selectedCardEl() {
        if (n == "nextCard")
            return currentCardElement.nextElementSibling
        else
            return n == "prevCard" ? currentCardElement.previousElementSibling : (n == 0 ? currentCardElement : document.querySelector("[data-id=" + n + "]"));
    }

    function handleButtons(selectors) {
        btns.querySelectorAll(selectors).forEach((elem) => elem.classList.remove("hide"))
    }

    function handleSteps() {
        selectedCardElement.classList.remove("hide"); /*show current card*/
        currentCard.dataset.currentcard = selectedCard_id; /*update the hidden value of dataset card*/
        changeNavButton(selectedCard_id)
    }

    function changeNavButton(idCard) {
        document.querySelectorAll(".menu__bullet[data-step]").forEach((el) => el.classList.remove("bulletOn"));
        document.querySelector(".menu__bullet[data-step=" + idCard + "]").classList.add("bulletOn")
    }

    function verifyInputs(e) {
        const emptyInputs = Array.from(document.querySelectorAll(".personal__info input")).filter((inputEl) => {
            if (inputEl.value == "") {
                inputEl.previousElementSibling.querySelector("span").style.display = "inline-block";
                inputEl.classList.add("inputs", "clr__error");
                return inputEl;
            }
        })

        if (emptyInputs.length)
            return false
        return true;
    }

    function verifyPlan() {
        const emptyPlan = document.querySelectorAll(".select__plan .card.checked");

        if (!emptyPlan.length)
            return false
        return true;
    }
    
    function verifyAddnonsChecked() {
        const emptyAdds = document.querySelectorAll(".pick__addons .card.checked");

        if (!emptyAdds.length)
            return false
        return true;
    }

    function confirmSubscription() {
        document.querySelector(".confirm__btn").addEventListener("click", function () {
            document.querySelector(".finish__board").classList.add("hide");
            document.querySelector(".thankyouWindow").classList.remove("hide");
            btns.querySelectorAll(".nav__btn").forEach((btn)=>btn.classList.add("hide"))
        })
    }
    
    const obj = {
        "personal_info": function () {
            hideStuff();
            handleButtons(".next");
            handleSteps();
        },
        "select_plan": function () {
            if (!verifyInputs())
                return false;
            hideStuff();
            handleButtons(".prev,.next");
            handleSteps();
        },
        "pick_addons": function () {
            if (!verifyInputs() || !verifyPlan())
                return false;
            hideStuff();
            handleButtons(".prev,.next");
            handleSteps();
        },
        "finish_board": function () {
            if (!verifyInputs() || !verifyPlan() || !verifyAddnonsChecked())
                return false;
            hideStuff();
            handleButtons(".prev,.confirm__btn");
            handleSteps();
            confirmSubscription();
        }
    }

    obj[selectedCard_id]();
}

/*----- Change values of Plan------- */

document.querySelector("#timemodel").addEventListener("change", (el) => {

    if (el.target.checked) {
        document.querySelectorAll("[data-value]").forEach((elem) => {
            const yearlyValues = yearly[elem.dataset.value]
            elem.textContent = yearlyValues["value"];
            yearlyValues["discount"] != null ? elem.insertAdjacentHTML("afterend", `<p class="discount fs-100 ff__regular">${yearlyValues["discount"]}</p>`) : "";
        })
    } else {
        document.querySelectorAll("[data-value]").forEach((elem) => {
            const monthlyValues = monthly[elem.dataset.value]
            elem.textContent = monthlyValues["value"];
            document.querySelectorAll(".discount")?.forEach((el) => el.remove())
        })
    }
    updateData();
    displayFinishBoard();
})

/*-----/Change values of Plan------- */

/*-----Change style of cards on click-------*/
document.querySelectorAll(".select__plan .card").forEach((elem) => {
    elem.addEventListener("click", function () {
        document.querySelectorAll(".select__plan .card.checked").forEach((el) => el.classList.remove("checked"));
        elem.classList.add("checked");
        addPlan(elem)
        displayFinishBoard()
    });
})

/*change style in pick add ons step*/
document.querySelectorAll(".pick__addons .card").forEach((elem) => {
    elem.addEventListener("click", () => {
        elem.classList.toggle("checked");
        addRemoveAddOns();
        elem.classList.contains("checked") ? elem.querySelector(".addOn").checked = true : elem.querySelector(".addOn").checked = false; /*checkbox checked when click on parent div*/
        displayFinishBoard()
    });
})

/*-----/Change style of cards on click-------*/


document.querySelector('.nav__btn.prev').addEventListener("click", (e) => {
    changeStep("prevCard", e)
});

document.querySelector('.next').addEventListener("click", (e) => {
    changeStep("nextCard");
});

document.querySelectorAll(".menu__bullet").forEach((elem) => {
    elem.addEventListener("click", () => changeStep(elem.dataset.step))
})

document.querySelectorAll(".personal__info input").forEach((elem) => elem.addEventListener("focus", () => handleErrors(elem)))
changeStep("personal_info");

