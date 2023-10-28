const Signout=()=>{
    localStorage.removeItem("token");
    window.open("/","_self");
  }


async function getUserData() {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://ipocrypto.cc/api/user/UserGet/${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
      if (response.ok) {
        const data = await response.json();
  
        // Update ProfileName and Balance elements
        const profileNameElement = document.getElementById('ProfileName');
        const balanceElement = document.getElementById('Balance');
        // const pkrBalanceElement = document.getElementById('PKRbalance');
        const VipLevel = document.getElementById('VipLevel');
        const profimg = document.getElementById('profileImage');
  
        profileNameElement.textContent = data.result.username; // Assuming 'name' is the property in the API response for the user's name
        VipLevel.textContent = data.result.status; // Assuming 'name' is the property in the API response for the user's name
        if(data.result.balance==null){
            balanceElement.textContent = 0; // Assuming 'balance' is the property in the API response for the user's balance
        }
        else{
            balanceElement.textContent = data.result.balance; // Assuming 'balance' is the property in the API response for the user's balance
        }
        // pkrBalanceElement.textContent = data.result.balance*295;

        if(data.result.profileImg!=null){
          profimg.src=`data:image/png;base64,${data.result.profileImg}`
        }
        else{
        profimg.src=`./images/profile.png`
        }


        const betresponse = await fetch(`https://ipocrypto.cc/api/bet/getBet/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (betresponse.ok) {
          const betData = await betresponse.json();
          const betElement = document.getElementById('Bet');
          betElement.textContent = betData.length;
        } else {
          console.error('Failed to get total bet');
        }

      } else {
        console.error('API call failed');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  // Call the function on page load
  window.onload = getUserData;
  