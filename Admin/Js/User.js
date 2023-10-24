fetch("http://localhost:5000/api/user/getusers")
    .then((response) => response.json())
    .then((data) => {
        const tableBody = document.getElementById("Users");

        const data2 = data.result;
        // Iterate through the data array and create table rows dynamically
        data2.map((user, index) => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td><img src="data:image/png;base64,${user.CNIC_FRONT}" alt="" style="width: 60%;height: 50px;"></td>
                <td><img src="data:image/png;base64,${user.CNIC_BACK}" alt="" style="width: 60%;height: 50px;"></td>
                <td>
                    <button class="update" onclick="UpdateApprove(${user.id})">Approve</button>
                </td>
            `;
            tableBody.appendChild(newRow);
        });
    })
    .catch((error) => {
        alert({ message: "Error Try Again Later" })
        // Handle any errors that occurred during the API call
    });


async function UpdateApprove(itemid) {
    const response = await fetch(`http://localhost:5000/api/user/ApproveUser`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: itemid,
        }),
    })

    const data = await response.json();

    if (data.success) {
        alert("User Approved");
        location.reload();
    } else {
        console.error("Failed to change fund password");
    }
}