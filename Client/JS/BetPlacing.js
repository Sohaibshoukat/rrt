const bet=[
    {
        Day:"1",
        Odds:"1-3",
    },
    {
        Day:"7",
        Odds:"7-8",
    },
    {
        Day:"30",
        Odds:"14-15",
    }
]

const Project=[
    {
        id:"1000713",
        time:"21:00:00",
        title:"ARKM/USDT",
        Team:[
            {
                name:"ARKM",
                img:"ARKM"
            },
            {
                name:"USDT",
                img:"USDT"
            }
        ]
    },
    {
        id:"1029185",
        time:"21:00:00",
        title:"BITA/USDT",
        Team:[
            {
                name:"BITA",
                img:"BITA"
            },
            {
                name:"USDT",
                img:"USDT"
            }
        ]
    },
    {
        id:"988339",
        time:"21:00:00",
        title:"C98/USDT",
        Team:[
            {
                name:"C98",
                img:"C98"
            },
            {
                name:"USDT",
                img:"USDT"
            }
        ]
    },
    {
        id:"1137747",
        time:"21:00:00",
        title:"FUSDT/USDT",
        Team:[
            {
                name:"FUSDT",
                img:"FUSDT"
            },
            {
                name:"USDT",
                img:"USDT"
            }
        ]
    },
    {
        id:"1127307",
        time:"21:00:00",
        title:"HOOK/USDT",
        Team:[
            {
                name:"HOOK",
                img:"HOOK"
            },
            {
                name:"USDT",
                img:"USDT"
            }
        ]
    },
    {
        id:"1138858",
        time:"21:00:00",
        title:"ID/USDT",
        Team:[
            {
                name:"ID",
                img:"ID"
            },
            {
                name:"USDT",
                img:"USDT"
            }
        ]
    },
    {
        id:"1136319",
        time:"21:00:00",
        title:"LOKA/USDT",
        Team:[
            {
                name:"LOKA",
                img:"LOKA"
            },
            {
                name:"USDT",
                img:"USDT"
            }
        ]
    },
    {
        id:"1107156",
        time:"21:00:00",
        title:"TKO/USDT",
        Team:[
            {
                name:"TKO",
                img:"TKO"
            },
            {
                name:"USDT",
                img:"USDT"
            }
        ]
    },
    {
        id:"1043188",
        time:"21:00:00",
        title:"EDU/USDT",
        Team:[
            {
                name:"EDU",
                img:"EDU"
            },
            {
                name:"USDT",
                img:"USDT"
            }
        ]
    },
    {
        id:"1042183",
        time:"21:00:00",
        title:"GMT/USDT",
        Team:[
            {
                name:"GMT",
                img:"GMT"
            },
            {
                name:"USDT",
                img:"USDT"
            }
        ]
    },
    {
        id:"1042372",
        time:"21:00:00",
        title:"VOXEL/USDT",
        Team:[
            {
                name:"VOXEL",
                img:"VOXEL"
            },
            {
                name:"USDT",
                img:"USDT"
            }
        ]
    }
]

const confirmButton = document.querySelector('.but3');
confirmButton.addEventListener('click', makeBetRequest);
const urlParams = new URLSearchParams(window.location.search);
const Percentage = urlParams.get('Bet');
const days = urlParams.get('days');
const inputField = document.querySelector('.in');
const plus100Button = document.getElementById('plus100');
const addAllButton = document.getElementById('addAll');
const customizeButton = document.getElementById('customize');
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
    console.log(Percentage)
    const Find = bet.find((item) => item.Odds == Percentage);
    console.log(Find)
    Score=Find.Day;


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
        Team1.src = `./images/${match.Team[0].img}.jpg`;
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
      const response = await fetch(`https://ipocrypto.cc/api/user/UserGet/${token}`, {
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
    const apiURL = 'https://ipocrypto.cc/api/bet/createbet';

    const token = localStorage.getItem('token');
    const requestData = {
        matchTitle:match.title,
        amount: transactionAmount,
        token:token,
        percentage:Percentage
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
                alert('Investment placed successful!');
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
