let myLeads = [];

// grabbing the save button from html
const inputButton = document.getElementById("input-btn");
// grabbing the Delete All button from html
const deleteButton = document.getElementById("delete-btn");
// grabbing the save tab button from html
const tabButton = document.getElementById("tab-btn");
// grabbing the input value
const inputEl = document.getElementById("input-el");

// Grabing the ul element
const ulel = document.getElementById("ul-el");

// checking for leads in local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("MyLeads"));

// Check leads from local storage is truthy
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

// Rendering links (Basically li tags )
function render(leads) {
  let listItems = "";
  for (let item of leads) {
    // Template strings
    listItems += `<li> <a href="https://${item}" target="blank"> ${item} </a> </li>`;
  }
  ulel.innerHTML = listItems;
}

// Adding event linstener
inputButton.addEventListener("click", () => {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  //Save the myLeads array to localStorage
  //PS: remember JSON.stringify

  localStorage.setItem("MyLeads", JSON.stringify(myLeads));
  render(myLeads);
  console.log(localStorage.getItem("MyLeads"));
});

// Listen for double click on deleteButton

deleteButton.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

tabButton.addEventListener("click", function () {
  // Chrome api
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("MyLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});
