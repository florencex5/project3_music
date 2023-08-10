// Fetch the JSON data and console log it
// Please replace all of below with your localhost address if necessary
d3.json("http://127.0.0.1:5000/desi").then(function(data){
    desiData = data;  
    console.log(desiData);
});    

d3.json("http://127.0.0.1:5000/bangla").then(function(data){
    banglaData = data;     
    console.log(banglaData)       
});

d3.json("http://127.0.0.1:5000/minimal").then(function(data){
    minimalData = data;      
    console.log(minimalData)       
});

d3.json("http://127.0.0.1:5000/groove").then(function(data){
    grooveData = data;      
    console.log(grooveData)       
});

d3.json("http://127.0.0.1:5000/garage").then(function(data){
    garageData = data;      
    console.log(garageData)       
});

d3.json("http://127.0.0.1:5000/acoustic").then(function(data){
    acousticData = data;      
    console.log(acousticData)       
});


//Set up function for adding table into modal
function openTableModal(data) {

    //Create a variable to hold the body content of modal
    const modalBody = d3.select("#data-table");

    // Clear existing data before appending new data
    modalBody.selectAll("tr").html("");
    
    // Add the header row and update the name of header row
    const headerRow = modalBody.append("tr");
    for (const key in data[0]) {
        const tableHeader = headerRow.append("th").text(key);
    };

    // Add the table body rows and update track list
    data.forEach(rowData => {
      const tableRow = modalBody.append("tr");
      for (const key in rowData) {
        const tableData = tableRow.append("td").text(rowData[key]);
      };
    });
  
    // Show the modal
    const modal = document.getElementById("tableModal");
    modal.style.display = "block";

}
  

// Set up the function for hiding the modal  
function closeTableModal() {
    const modal = document.getElementById("tableModal");
    modal.style.display = "none";

}
  
  
  


