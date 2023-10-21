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

const matchesCollection = document.querySelector(".MatchesCollection");
const searchInput = document.querySelector(".SearchTerm input");
const searchButton = document.querySelector(".SearchTerm .btn");

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
                    <p>${matchData.date}</p>
                    <p>${matchData.time}</p>
                </div>
                <div class="Teams">
                    <div class="Team">
                        <img src="./images/${matchData.Team[0].img}.png" alt="${matchData.Team[0].name}">
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
