fetch("https://ipocrypto.cc/api/recharge/newRecharge")
    .then((response) => response.json())
    .then((data) => {
        const tableBody = document.getElementById("Service");

        // Iterate through the data array and create table rows dynamically
        data.map((user, index) => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.t_id}</td>
            <td>${user.date}</td>
            <td>${user.amount}</td>
            <td>${user.status}</td>
            <td>
                <button class="accept" onclick="DenyService(${user.id})"> Deny</button>
                <button class="reject"  onclick="AcceptService(${user.id},${user.amount},${user.userid})"> Confirmed</button>
            </td>
            `;
            tableBody.appendChild(newRow);
        });
    })
    .catch((error) => {
        alert({ message: "Error Try Again Later" })
        // Handle any errors that occurred during the API call
    });


async function DenyService(DenyId) {
    const response = await fetch(`https://ipocrypto.cc/api/recharge/Deny`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id:DenyId}),
    })
    location.reload();
}

async function AcceptService(DenyId,amount,userid) {
    const response = await fetch(`https://ipocrypto.cc/api/recharge/approve`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id:DenyId,
            balance:amount, 
            userid:userid
        }),

    })
    location.reload();
}