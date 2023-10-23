async function getUserData() {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/user/UserGet/${token}`, {
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
        profileNameElement.textContent = data.result.username; // Assuming 'name' is the property in the API response for the user's name
        if(data.result.balance==null){
            balanceElement.textContent = 0; // Assuming 'balance' is the property in the API response for the user's balance
        }
        else{
            balanceElement.textContent = data.result.balance; // Assuming 'balance' is the property in the API response for the user's balance

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