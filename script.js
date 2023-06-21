
/*-----Change style of cards on click-------*/
document.querySelectorAll(".select__plan .card").forEach((elem) => {
    elem.addEventListener("click", function () {
        document.querySelectorAll(".select__plan .card.checked").forEach((el) => el.classList.remove("checked"));
        elem.classList.add("checked");
    });
})

/*change style in pick add ons step*/
document.querySelectorAll(".pick__addons .card").forEach((elem) => {
    elem.addEventListener("click", () => {
        elem.classList.toggle("checked");
        validateInputCheck(elem)
    });
})

function validateInputCheck(elem) {
    /*checkbox checked when click on parent div*/
    const checboxInput = elem.querySelector(".addOn");
    elem.classList.contains("checked") ? checboxInput.checked = true : checboxInput.checked = false;
}

/*-----/Change style of cards on click-------*/


function changeStep(n) {
    const currentCard = document.querySelector("[data-currentCard]");
    const currentCardVal = currentCard.dataset["currentcard"];
    const currentCardElement = document.querySelector("[data-id=" + currentCardVal + "]");
    //const selectedCardElement = n == "nextCard" ? currentCardElement.nextElementSibling : (n == "prevCard" ? currentCardElement.previousElementSibling : currentCardElement);
    const selectedCardElement = selectedCardEl();
    const selectedCard_id = selectedCardElement.dataset.id;
    const btns = document.querySelector(".previous__next");

    btns.querySelectorAll(".nav__btn").forEach((elem) => elem.classList.add("hide"))

    currentCardElement.classList.add("hide"); /*hide the old card*/

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

    const obj = {
        "personal_info": function () {
            handleButtons(".next");
            handleSteps();
        },
        "select_plan": function () {
            handleButtons(".prev,.next");
            handleSteps();
        },
        "pick_addons": function () {
            handleButtons(".prev,.next");
            handleSteps();
        },
        "finish_board": function () {
            handleButtons(".prev,.confirm__btn");
            handleSteps();
        }
    }

    obj[selectedCard_id]();
}

changeStep("personal_info");