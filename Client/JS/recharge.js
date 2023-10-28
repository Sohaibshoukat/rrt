document.addEventListener("DOMContentLoaded", function() {
    // Select the Recharge button
    const rechargeBtn = document.querySelector(".RechargeBtn");

    // Select all the recharge amount elements
    const rechargeAmounts = document.querySelectorAll(".Data ul li");

    // Select the elements for displaying selected balance and actual amount
    const selectedBalance = document.getElementById("SelectedBalance");
    // const actualAmount = document.getElementById("Actual");

    // Add a click event listener to each recharge amount element
    rechargeAmounts.forEach(function(amountElement) {
        amountElement.addEventListener("click", function() {
            // Remove the 'selected' class from all amounts
            rechargeAmounts.forEach(function(element) {
                element.classList.remove("selected");
            });

            // Add the 'selected' class to the clicked amount
            amountElement.classList.add("selected");

            // Get the selected amount
            const selectedAmount = parseInt(amountElement.textContent);

            // Calculate the actual amount
            // const exchangeRate = 295;
            // const actual = selectedAmount * exchangeRate;

            // Update the selected balance and actual amount elements
            selectedBalance.value = selectedAmount;
            // actualAmount.textContent = actual;

            // Enable the Recharge button
            rechargeBtn.disabled = false;
        });
    });

    // Add a click event listener to the Recharge button
    rechargeBtn.addEventListener("click", function() {
        // Get the selected amount
        const selectedAmount = parseInt(selectedBalance.value);

        // Store the selected amount in session storage
        sessionStorage.setItem("Amount", selectedAmount);
        window.open("/USDTRecharge.html","_self")
    });
});