fetch("http://localhost:5000/api/user/getusers")
    .then((response) => response.json())
    .then((data) => {
        const tableBody = document.getElementById("Users");

        const data2 =data.result;
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
            `;
            tableBody.appendChild(newRow);
        });
    })
    .catch((error) => {
        alert({message: "Error Try Again Later" })
        // Handle any errors that occurred during the API call
    });