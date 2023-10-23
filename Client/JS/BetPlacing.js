const FullBet=[
    {
        Score:"0-0",
        Odds:2.72,
    },
    {
        Score:"0-1",
        Odds:2.75,
    },
    {
        Score:"0-2",
        Odds:2.92,
    },
    {
        Score:"0-3",
        Odds:2.76,
    },
    {
        Score:"1-0",
        Odds:2.65,
    },
    {
        Score:"1-1",
        Odds:2.95,
    },
    {
        Score:"1-2",
        Odds:2.83,
    },
    {
        Score:"1-3",
        Odds:2.38,
    },
    {
        Score:"2-0",
        Odds:1.74,
    },
    {
        Score:"2-1",
        Odds:2.50,
    },
    {
        Score:"2-2",
        Odds:2.56,
    },
    {
        Score:"2-3",
        Odds:1.74,
    },
    {
        Score:"3-0",
        Odds:0.78,
    },    
    {
        Score:"3-1",
        Odds:1.18,
    },    
    {
        Score:"3-2",
        Odds:1.11,
    },    
    {
        Score:"3-3",
        Odds:0.87,
    },    
    {
        Score:"*-4",
        Odds:0.3,
    },
    {
        Score:"4-*",
        Odds:0.3,
    },


]

const HalfBet=[
    {
        Score:"0-0",
        Odds:2.05,
    },
    {
        Score:"0-1",
        Odds:2.79,
    },
    {
        Score:"0-2",
        Odds:2.64,
    },
    {
        Score:"1-0",
        Odds:2.79,
    },
    {
        Score:"1-1",
        Odds:2.87,
    },
    {
        Score:"1-2",
        Odds:2.11,
    },
    {
        Score:"2-0",
        Odds:1.74,
    },
    {
        Score:"2-1",
        Odds:1.38,
    },
    {
        Score:"2-2",
        Odds:0.78,
    },
    {
        Score:"*-3",
        Odds:0.5,
    },
    {
        Score:"3-*",
        Odds:0.4,
    },


]

const Project=[
    {
        id:"1000713",
        time:"21:00:00",
        title:"Erovnuli Liga",
        Team:[
            {
                name:"Dinamo Batumi",
                img:"Dinamo"
            },
            {
                name:"Dila",
                img:"Dila"
            }
        ]
    },
    {
        id:"1029185",
        time:"21:00:00",
        title:"1 Lyga",
        Team:[
            {
                name:"Garliava",
                img:"Garliava"
            },
            {
                name:"Panevezys II",
                img:"Panevezys"
            }
        ]
    },
    {
        id:"988339",
        time:"21:00:00",
        title:"Danallsvenskan",
        Team:[
            {
                name:"Norrkoping W",
                img:"NoImage"
            },
            {
                name:"Pitea",
                img:"NoImage"
            }
        ]
    },
    {
        id:"1137747",
        time:"21:00:00",
        title:"League Cup",
        Team:[
            {
                name:"Al-Jazira",
                img:"AlJazira"
            },
            {
                name:"Al Wahda FC",
                img:"AlWahda"
            }
        ]
    },
    {
        id:"1127307",
        time:"21:00:00",
        title:"Persian Gulf Pro League",
        Team:[
            {
                name:"Foolad FC",
                img:"Foolad"
            },
            {
                name:"Esteghlal Khuzestan",
                img:"Esteghal"
            }
        ]
    },
    {
        id:"1138858",
        time:"21:00:00",
        title:"Sultan Cup",
        Team:[
            {
                name:"Sohar",
                img:"Sohar"
            },
            {
                name:"Al Seeb",
                img:"AlSeeb"
            }
        ]
    },
    {
        id:"1136319",
        time:"21:00:00",
        title:"Taca de Portugal",
        Team:[
            {
                name:"Lusitania",
                img:"LogoSoon"
            },
            {
                name:"Benfica",
                img:"Benfica"
            }
        ]
    },
    {
        id:"1107156",
        time:"21:00:00",
        title:"3. liga - MSFL",
        Team:[
            {
                name:"Hranice",
                img:"LogoSoon"
            },
            {
                name:"Frydek- Mistek",
                img:"Frydek"
            }
        ]
    },
    {
        id:"1043188",
        time:"21:00:00",
        title:"Super Liga",
        Team:[
            {
                name:"Zlate Moravce",
                img:"Zlate"
            },
            {
                name:"Zemplin Michalovce",
                img:"Zemplin"
            }
        ]
    }
]

const confirmButton = document.querySelector('.but3');
confirmButton.addEventListener('click', makeBetRequest);
const urlParams = new URLSearchParams(window.location.search);
const Percentage = urlParams.get('Bet');
const Title = urlParams.get('Title');
let match;

function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function displayMatchDetails() {
    let id = sessionStorage.getItem("Matchid");
    match = Project.find((item) => item.id === id);
    let Score
    if(Title=="Full"){
       const Find = FullBet.find((item) => item.Odds == Percentage);
       Score=Find.Score;
    }
    else{
        const Find = HalfBet.find((item) => item.Odds == Percentage);
       Score=Find.Score;

    }


    if (match) {
        const dateTimeElement = document.querySelector('.time p');
        dateTimeElement.textContent = getCurrentDateTime();

        const Percen = document.getElementById('Percentage');
        Percen.textContent = Percentage;

        const Odd = document.getElementById('Odds');
        Odd.textContent = Score;


        const Team1 = document.getElementById("Team1");
        const Name1 = document.getElementById("Name1");
        const Team2 = document.getElementById("Team2");
        const Name2 = document.getElementById("Name2");

        // Display match details
        Team1.src = `./images/${match.Team[0].img}.png`;
        Team1.alt = match.Team[0].name;
        Name1.textContent = match.Team[0].name;

        Team2.src = `./images/${match.Team[1].img}.png`;
        Team2.alt = match.Team[1].name;
        Name2.textContent = match.Team[1].name;
    } else {
        // Handle the case where no match is found
        console.log('Match not found');
    }
}

displayMatchDetails()

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
  
        const balanceElement = document.getElementById('Balance');// Assuming 'name' is the property in the API response for the user's name
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

window.onload = getUserData;

const inputField = document.querySelector('.in');

const plus100Button = document.getElementById('plus100');
const addAllButton = document.getElementById('addAll');
const customizeButton = document.getElementById('customize');

plus100Button.addEventListener('click', () => {
  let currentValue = parseFloat(inputField.value) || 0;
  currentValue += 100;
  inputField.value = currentValue;
});

addAllButton.addEventListener('click', () => {
  let balance = parseFloat(document.getElementById('Balance').textContent) || 0;
  inputField.value = balance;
});

customizeButton.addEventListener('click', () => {
    inputField.value = "";
});


function makeBetRequest() {
    const inputField = document.querySelector('.in');
    const transactionAmount = parseFloat(inputField.value);
    const balance = parseFloat(document.getElementById('Balance').textContent);

    // Check if the transaction amount is empty or not a number
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
        alert('Please enter a valid transaction amount.');
        return;
    }

    // Check if the transaction amount is greater than the balance
    if (transactionAmount > balance) {
        alert('Transaction amount cannot exceed your account balance.');
        return;
    }

    // You can replace the URL with your actual API endpoint
    const apiURL = 'http://localhost:5000/api/bet/createbet';

    const token = localStorage.getItem('token');
    const requestData = {
        matchTitle:match.title,
        amount: transactionAmount,
        token:token,
        percentage:Percentage
        // Add other necessary data for the bet request
    };

    fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then(response => {
            if (response.ok) {
                alert('Bet request was successful!');
                window.open("/","_self");
            } else {
                // Handle the case where the API call failed
                console.error('Bet request failed');
            }
        })
        .catch(error => {
            console.error(error);
        });
}
