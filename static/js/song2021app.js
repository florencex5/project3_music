// Fetch the JSON data and console log it
d3.json("static/resources/songTwentyOne.json").then(function(data) {
  
  // Extract the items array from the JSON data
    let items = data.tracks.items;

// Sort items by popularity in descending order
    items.sort(function(a, b) {
        return b.popularity - a.popularity;
    });

    // Select the table body
    let tableBody = d3.select('#songTable tbody');

    // Loop through the items and add data into table
    items.forEach(function(item) {
        let row = tableBody.append('tr');

        // Populate the cells with specific data fields
        row.append('td').text(item.artists[0].name);
        row.append('td').text(item.popularity);
        row.append('td').text(item.name);
        row.append('td').text(item.album.release_date);
        row.append('td').text(item.album.total_tracks);
        row.append('td').text(item.album.album_type);
        row.append('td').text(item.external_urls.spotify);

    });
});

// Set up the "Back to Main Page" button
let backButton = document.getElementById('backButton');
backButton.addEventListener('click', function() {
    // Replace the localhose address if necessary
    window.location.href = 'http://127.0.0.1:5000';
});
