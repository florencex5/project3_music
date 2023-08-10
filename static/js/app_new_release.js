let albums;
const albumDropdown = d3.select("#select-album");

// Fetch the JSON data from "static/js/new_releases.json" only once
d3.json("static/js/new_releases.json").then(function(data) {
  // Extract relevant information from the JSON data
  albums = data.albums.items; // Assign the data to the albums variable

  // Populate the dropdown menu with album names
  albumDropdown
    .selectAll("option")
    .data(albums)
    .enter()
    .append("option")
    .text((d) => d.name)
    .attr("value", (d) => d.name);

  // Initial update to display the details of the first album
  updateAlbumDetails(albums[0]); // Pass the first album data to the function

  // Extract available markets (countries) from the JSON data
  const countries = data.albums.items.reduce((acc, album) => {
    album.available_markets.forEach(country => {
      if (!acc.includes(country)) {
        acc.push(country);
      }
    });
    return acc;
  }, []);

  // Count the number of new releases by country
  const releasesByCountry = countries.map(country => {
    return {
      country,
      count: data.albums.items.filter(album => album.available_markets.includes(country)).length
    };
  });

  // Sort the releasesByCountry array by count in ascending order
  releasesByCountry.sort((a, b) => a.count - b.count);

  // Set up the chart dimensions and margins
  const margin = { top: 20, right: 30, bottom: 40, left: 150 };
  const width = 800 - margin.left - margin.right;
  const height = 350 - margin.top - margin.bottom;

  
  // Create the SVG element and set its size
  const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Create the horizontal bar chart
  const bar = svg.selectAll("rect")
    .data(releasesByCountry.slice(0, 10)) // Only use the top 10 countries
    .enter()
    .append("rect")
    .attr("y", (d, i) => i * 30) // Adjust the spacing between bars
    .attr("width", d => d.count * 10) // Adjust the scaling as needed
    .attr("height", 20) // Fix the height of the bars
    .style("fill", "steelblue");

  // Add text labels for each bar
  svg.selectAll("text")
    .data(releasesByCountry.slice(0, 10)) // Only use the top 10 countries
    .enter()
    .append("text")
    .attr("x", d => (d.count * 10) + 5) // Adjust the horizontal position of the text
    .attr("y", (d, i) => i * 30 + 14) // Adjust the vertical position of the text
    .text(d => `${d.country} (${d.count})`)
    .style("fill", "black")
    .style("font-family", "sans-serif")
    .style("font-size", "12px");

}).catch(function(error) {
  console.log("Error loading data:", error);
});

// Function to update album details when a new option is selected
function updateAlbumDetails() {
  const selectedAlbum = albumDropdown.property("value");
  const selectedAlbumData = albums.find((d) => d.name === selectedAlbum); // Rename the variable

  // Update album details in the HTML
  d3.select("#album-name").text(selectedAlbumData.name);
  d3.select("#artist-name").text(selectedAlbumData.artists[0].name);
  d3.select("#release-date").text(selectedAlbumData.release_date);
  d3.select("#country-available").text(selectedAlbumData.available_markets.join(", "));

  // Update the album cover image
  const albumImage = d3.select("#album-image");
  albumImage.attr("src", selectedAlbumData.images[0].url); // Use the first image URL (largest image)
  albumImage.attr("alt", `${selectedAlbumData.name} Album Cover`); // Provide alt text for accessibility
}

// Add event listener to the dropdown to call the updateAlbumDetails function
albumDropdown.on("change", updateAlbumDetails);






