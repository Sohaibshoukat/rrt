fetch("http://localhost:5000/api/bet/getBets")
    .then((response) => response.json())
    .then((data) => {
        const tableBody = document.getElementById("Service");
        data.map((user, index) => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
            <td>${index+1}</td>
            <td>${user.matchTitle}</td>
            <td>${user.date}</td>
            <td>${user.amount}</td>
            <td><input type="text" placeholder="Percentage Dummy" id="NewPer" class="inp" value="${user.percentage}"></td>
            <td>${user.status}</td>
            <td>
                <button class="accept" onclick="WinBet(${user.id},${user.userid},${user.amount},${user.percentage})">Win</button>
                <button class="reject" onclick="LoseBet(${user.id})">Lose</button>
            </td>
            <td>
               <button class="update" onclick="UpdatePer(${user.id})">update</button>
            </td>
            <td>
            <button class="reject"  onclick="AdminCancel(${user.id},${user.userid},${user.amount})"> Cancel</button>
            </td>
            `;
            tableBody.appendChild(newRow);
        });
    })
    .catch((error) => {
        alert({ message: "Error Try Again Later" })
        // Handle any errors that occurred during the API call
    });


async function AdminCancel(DenyId, id, amount) {
        const response = await fetch(`http://localhost:5000/api/bet/AdminCancel`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: DenyId,
            balance: amount,
            userid: id
          }),
        })
  
        const data = await response.json();
  
        if (data.success) {
          alert("Bet Cancel");
          location.reload();
        } else {
          console.error("Failed to change fund password");
        }
}
  

async function UpdatePer(itemid) {
    const newval=document.getElementById("NewPer").value;
    if(newval==""){
        return alert("Canot Be Empty");
    }
    const response = await fetch(`http://localhost:5000/api/bet/BetManipulate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id:itemid,
        newPer:newval
      }),
    })

    const data = await response.json();

    if (data.success) {
      alert("Bet Manipulated");
      location.reload();
    } else {
      console.error("Failed to change fund password");
    }
}

async function LoseBet(itemid) {
    const response = await fetch(`http://localhost:5000/api/bet/Betlose`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id:itemid,
      }),
    })

    const data = await response.json();

    if (data.success) {
      alert("Bet Updated");
      location.reload();
    } else {
      console.error("Failed to change fund password");
    }
}

async function WinBet(DenyId, id, amount,per) {
    const response = await fetch(`http://localhost:5000/api/bet/BetWin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: DenyId,
        balance: amount,
        userid: id,
        percentage:per
      }),
    })

    const data = await response.json();

    if (data.success) {
      alert("Bet Won");
      location.reload();
    } else {
      console.error("Failed to change fund password");
    }
}
