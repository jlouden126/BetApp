document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/bets')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const betList = document.getElementById('bet-list');
            const bookmakers = {};

            // Group games by bookmaker
            data.forEach(game => {
                game.bookmakers.forEach(bookmaker => {
                    if (!bookmakers[bookmaker.title]) {
                        bookmakers[bookmaker.title] = [];
                    }
                    bookmakers[bookmaker.title].push({
                        home_team: game.home_team,
                        away_team: game.away_team,
                        markets: bookmaker.markets
                    });
                });
            });

            // Create table
            const table = document.createElement('table');
            table.className = 'bet-table';
            
            // Create table header row with bookmaker titles
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<th>Teams</th>';
            for (const bookmakerTitle of Object.keys(bookmakers)) {
                headerRow.innerHTML += `<th>${bookmakerTitle}</th>`;
            }
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create table body
            const tbody = document.createElement('tbody');
            
            // Extract unique pairs of home_team and away_team
            const games = [];
            data.forEach(game => {
                const gameKey = `${game.home_team} vs ${game.away_team}`;
                if (!games.some(g => g.key === gameKey)) {
                    games.push({
                        key: gameKey,
                        home_team: game.home_team,
                        away_team: game.away_team
                    });
                }
            });

            // Create rows for each game
            games.forEach(game => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${game.home_team} vs ${game.away_team}</td>`;
                
                // Add outcomes for each bookmaker
                for (const bookmakerTitle of Object.keys(bookmakers)) {
                    const bookmakerGames = bookmakers[bookmakerTitle];
                    const matchingGame = bookmakerGames.find(g => g.home_team === game.home_team && g.away_team === game.away_team);
                    if (matchingGame) {
                        const market = matchingGame.markets.find(m => m.key === 'h2h');
                        if (market) {
                            const outcomes = market.outcomes.map(outcome => 
                                `<div class="outcome-box">
                                    <div>${outcome.name}</div>
                                    <div class="price">${outcome.price}</div>
                                </div>`
                            ).join('');
                            row.innerHTML += `<td>${outcomes}</td>`;
                        } else {
                            row.innerHTML += '<td>N/A</td>';
                        }
                    } else {
                        row.innerHTML += '<td>N/A</td>';
                    }
                }

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            betList.appendChild(table);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});


// Calculates highest difference between each odds
// document.addEventListener('DOMContentLoaded', function () {
//     fetch('/api/bets')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             const betList = document.getElementById('bet-list');
//             const bookmakers = {};

//             // Group games by bookmaker
//             data.forEach(game => {
//                 game.bookmakers.forEach(bookmaker => {
//                     if (!bookmakers[bookmaker.title]) {
//                         bookmakers[bookmaker.title] = [];
//                     }
//                     bookmakers[bookmaker.title].push({
//                         home_team: game.home_team,
//                         away_team: game.away_team,
//                         markets: bookmaker.markets
//                     });
//                 });
//             });

//             // Create table
//             const table = document.createElement('table');
//             table.className = 'bet-table';
            
//             // Create table header row with bookmaker titles
//             const thead = document.createElement('thead');
//             const headerRow = document.createElement('tr');
//             headerRow.innerHTML = '<th>Teams</th>';
//             for (const bookmakerTitle of Object.keys(bookmakers)) {
//                 headerRow.innerHTML += `<th>${bookmakerTitle}</th>`;
//             }
//             thead.appendChild(headerRow);
//             table.appendChild(thead);

//             // Create table body
//             const tbody = document.createElement('tbody');

//             // Extract unique pairs of home_team and away_team
//             const games = [];
//             data.forEach(game => {
//                 const gameKey = `${game.home_team} vs ${game.away_team}`;
//                 if (!games.some(g => g.key === gameKey)) {
//                     games.push({
//                         key: gameKey,
//                         home_team: game.home_team,
//                         away_team: game.away_team
//                     });
//                 }
//             });

//             // Create rows for each game
//             const rows = games.map(game => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `<td>${game.home_team} vs ${game.away_team}</td>`;

//                 let priceDifferences = [];

//                 // Add outcomes for each bookmaker and calculate price differences
//                 for (const bookmakerTitle of Object.keys(bookmakers)) {
//                     const bookmakerGames = bookmakers[bookmakerTitle];
//                     const matchingGame = bookmakerGames.find(g => g.home_team === game.home_team && g.away_team === game.away_team);
//                     if (matchingGame) {
//                         const market = matchingGame.markets.find(m => m.key === 'h2h');
//                         if (market) {
//                             const outcomes = market.outcomes.map(outcome => 
//                                 `<div class="outcome-box">
//                                     <div>${outcome.name}</div>
//                                     <div class="price">${outcome.price}</div>
//                                 </div>`
//                             ).join('');

//                             // Collect prices for comparison
//                             market.outcomes.forEach(outcome => {
//                                 priceDifferences.push({ name: outcome.name, price: outcome.price, bookmaker: bookmakerTitle });
//                             });

//                             row.innerHTML += `<td>${outcomes}</td>`;
//                         } else {
//                             row.innerHTML += '<td>N/A</td>';
//                         }
//                     } else {
//                         row.innerHTML += '<td>N/A</td>';
//                     }
//                 }

//                 // Calculate the greatest price difference for this row
//                 let maxDifference = 0;
//                 for (let i = 0; i < priceDifferences.length; i++) {
//                     for (let j = i + 1; j < priceDifferences.length; j++) {
//                         if (priceDifferences[i].name === priceDifferences[j].name) {
//                             const difference = Math.abs(priceDifferences[i].price - priceDifferences[j].price);
//                             if (difference > maxDifference) {
//                                 maxDifference = difference;
//                             }
//                         }
//                     }
//                 }

//                 return { row, maxDifference };
//             });

//             // Sort rows by the greatest price difference
//             rows.sort((a, b) => b.maxDifference - a.maxDifference);

//             // Append sorted rows to the table body
//             rows.forEach(({ row }) => tbody.appendChild(row));

//             table.appendChild(tbody);
//             betList.appendChild(table);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// });
