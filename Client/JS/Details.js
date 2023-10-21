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

const fullButton = document.getElementById("full");
const halfButton = document.getElementById("Half");
const detailContentList = document.querySelector(".detail_content_list"); // Update this selector

// Add click event listeners to the Full and Half buttons
fullButton.addEventListener("click", () => {
    fullButton.classList.add("Selected");
    halfButton.classList.remove("Selected");
    halfButton.classList.add("UnSelected");
    updateBetData(FullBet);
});

halfButton.addEventListener("click", () => {
    halfButton.classList.add("Selected");
    fullButton.classList.remove("Selected");
    fullButton.classList.add("UnSelected");
    updateBetData(HalfBet);
});

// Function to update the bet data based on the selected type (Full or Half)
function updateBetData(data) {
    detailContentList.innerHTML = '';

    data.forEach((item) => {
        const betElement = document.createElement("div");
        betElement.classList.add("detail_content_list-body");

        betElement.innerHTML = `
            <div class="score-left">
                <h2>${item.Score}</h2>
                <h3>Score Betting</h3>
            </div>
            <div class="profit">
                <h2 class="red"><span id="amount">${item.Odds}</span>%</h2>
                <h3>Odds</h3>
            </div>
            <div class="Orderbtn">Orders can be made</div>
        `;

        detailContentList.appendChild(betElement);
    });
}

// Initially display the FullBet data
updateBetData(FullBet);

// Sample URL with an ID parameter, change this to your actual URL
const urlParams = new URLSearchParams(window.location.search);
const matchId = urlParams.get('id'); // Assuming your URL has a parameter named 'id'

// Function to get the current date and time in the desired format
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

// Function to find and display match details based on the provided ID
function displayMatchDetails(id) {
    const match = Project.find((item) => item.id === id);

    if (match) {
        const dateTimeElement = document.querySelector('.mainHead p');
        const titleElement = document.querySelector('.mainHead h5');
        const teamElements = document.querySelectorAll('.Team');

        // Display current date and time
        dateTimeElement.textContent = getCurrentDateTime();

        // Display match details
        titleElement.textContent = match.title;

        // Update the team logos
        teamElements[0].querySelector('img').src = `./images/${match.Team[0].img}.png`;
        teamElements[0].querySelector('img').alt = match.Team[0].name;
        teamElements[0].querySelector('p').textContent = match.Team[0].name;

        teamElements[1].querySelector('img').src = `./images/${match.Team[1].img}.png`;
        teamElements[1].querySelector('img').alt = match.Team[1].name;
        teamElements[1].querySelector('p').textContent = match.Team[1].name;


    } else {
        // Handle the case where no match is found
        console.log('Match not found');
    }
}



// Call the function with the matchId from the URL
displayMatchDetails(matchId);
