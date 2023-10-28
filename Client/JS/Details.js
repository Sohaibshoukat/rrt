// const FullBet=[
//     {
//         Score:"0-0",
//         Odds:2.72,
//     },
//     {
//         Score:"0-1",
//         Odds:2.75,
//     },
//     {
//         Score:"0-2",
//         Odds:2.92,
//     },
//     {
//         Score:"0-3",
//         Odds:2.76,
//     },
//     {
//         Score:"1-0",
//         Odds:2.65,
//     },
//     {
//         Score:"1-1",
//         Odds:2.95,
//     },
//     {
//         Score:"1-2",
//         Odds:2.83,
//     },
//     {
//         Score:"1-3",
//         Odds:2.38,
//     },
//     {
//         Score:"2-0",
//         Odds:1.74,
//     },
//     {
//         Score:"2-1",
//         Odds:2.50,
//     },
//     {
//         Score:"2-2",
//         Odds:2.56,
//     },
//     {
//         Score:"2-3",
//         Odds:1.74,
//     },
//     {
//         Score:"3-0",
//         Odds:0.78,
//     },    
//     {
//         Score:"3-1",
//         Odds:1.18,
//     },    
//     {
//         Score:"3-2",
//         Odds:1.11,
//     },    
//     {
//         Score:"3-3",
//         Odds:0.87,
//     },    
//     {
//         Score:"*-4",
//         Odds:0.3,
//     },
//     {
//         Score:"4-*",
//         Odds:0.3,
//     },


// ]

// const HalfBet=[
//     {
//         Score:"0-0",
//         Odds:2.05,
//     },
//     {
//         Score:"0-1",
//         Odds:2.79,
//     },
//     {
//         Score:"0-2",
//         Odds:2.64,
//     },
//     {
//         Score:"1-0",
//         Odds:2.79,
//     },
//     {
//         Score:"1-1",
//         Odds:2.87,
//     },
//     {
//         Score:"1-2",
//         Odds:2.11,
//     },
//     {
//         Score:"2-0",
//         Odds:1.74,
//     },
//     {
//         Score:"2-1",
//         Odds:1.38,
//     },
//     {
//         Score:"2-2",
//         Odds:0.78,
//     },
//     {
//         Score:"*-3",
//         Odds:0.5,
//     },
//     {
//         Score:"3-*",
//         Odds:0.4,
//     },


// ]

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
            Odds:"14-15%",
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


const urlParams = new URLSearchParams(window.location.search);
const matchId = urlParams.get('id');
const detailContentList = document.querySelector(".detail_content_list"); // Update this selector


// Function to update the bet data based on the selected type (Full or Half)
function BetData(data,title) {
    detailContentList.innerHTML = '';

    data.forEach((item) => {
        const betElement = document.createElement("div");
        betElement.classList.add("detail_content_list-body");

        betElement.innerHTML = `
            <div class="score-left">
                <h2>${item.Day}</h2>
                <h3>Days</h3>
            </div>
            <div class="profit">
                <h2 class="red"><span id="amount">${item.Odds}</span>%</h2>
                <h3>Odds</h3>
            </div>
            <a href="PlaceBet.html?Bet=${item.Odds}&days=${item.Day}"><div class="Orderbtn">Invet now</div></a>
        `;

        detailContentList.appendChild(betElement);
    });
}

// Initially display the FullBet data
BetData(bet);


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
    sessionStorage.setItem("Matchid",id);

    if (match) {
        const dateTimeElement = document.querySelector('.mainHead p');
        const titleElement = document.querySelector('.mainHead h5');
        const teamElements = document.querySelectorAll('.Team');

        // Display current date and time
        dateTimeElement.textContent = getCurrentDateTime();

        // Display match details
        titleElement.textContent = match.title;

        // Update the team logos
        teamElements[0].querySelector('img').src = `./images/${match.Team[0].img}.jpg`;
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
