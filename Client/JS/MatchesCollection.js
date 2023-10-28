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

const matchesCollection = document.querySelector(".MatchesCollection");
const searchInput = document.querySelector(".SearchTerm input");
const searchButton = document.querySelector(".SearchTerm .btn");

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

// Function to render matches based on the search input
function renderMatches(query) {
    matchesCollection.innerHTML = '';

    const filteredMatches = Project.filter(matchData =>
        matchData.Team[0].name.toLowerCase().includes(query) ||
        matchData.Team[1].name.toLowerCase().includes(query)
    );

    if (filteredMatches.length === 0) {
        // No results found, display a message
        matchesCollection.innerHTML = "<p>No Results Found</p>";
    } else {
        filteredMatches.forEach(matchData => {
            const matchElement = document.createElement("div");
            matchElement.classList.add("Match");
            const matchId = matchData.id;

            matchElement.innerHTML = `
                <div class="IDsec">
                    ID: ${matchId}
                </div>
                <div class="Title">
                    ${matchData.title}
                </div>
                <div class="Times">
                    <p>${getCurrentDate()}</p>
                    <p>${getCurrentTime()}</p>
                </div>
                <div class="Teams">
                    <div class="Team">
                        <img src="./images/${matchData.Team[0].img}.jpg" alt="${matchData.Team[0].name}">
                        <h5>${matchData.Team[0].name}</h5>
                    </div>
                    <h4>VS</h4>
                    <div class="Team">
                        <h5>${matchData.Team[1].name}</h5>
                        <img src="./images/${matchData.Team[1].img}.png" alt="${matchData.Team[1].name}">
                    </div>
                </div>
            `;

            // Add an event listener to open the match detail page with the selected match's ID
            matchElement.addEventListener("click", function() {
                window.location.href = `match_content.html?id=${matchId}`;
            });

            matchesCollection.appendChild(matchElement);
        });
    }
}

// Initial rendering of matches
renderMatches('');

// Add an event listener to the search button
searchButton.addEventListener("click", function() {
    const searchTerm = searchInput.value.toLowerCase();
    renderMatches(searchTerm);
});

// Add an event listener to the input field for live search
searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.toLowerCase();
    renderMatches(searchTerm);
});
