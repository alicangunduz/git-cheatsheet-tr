let commandList = document.getElementById('commandList');
let command = [];
async function getJSONData() {
    try {
        const response = await fetch('gitcommands.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// We export the values inside the asynchronous functions.
async function getCommands() {
    const jsonData = await getJSONData();
    const dataArray = Object.values(jsonData);
    command = dataArray[0]
    return command
}


let currentPage = 1;
const itemsPerPage = 8; // Number of items to show per page

async function displayCommands(page) {
    await getCommands();
    console.log(command);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const commandsToDisplay = command.slice(startIndex, endIndex);

    commandList.innerHTML = "";

    for (let i = 0; i < commandsToDisplay.length; i++) {
        commandList.innerHTML += `
            <li class="py-4" id="line">
                <div class="ml-2 text-xl font-bold select-all">${commandsToDisplay[i].command}<p class="text-sm font-thin select-none">${commandsToDisplay[i].description}</p></div>
            </li>
        `;
    }

    // Update the status of the buttons
    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(command.length / itemsPerPage);
}

let previousButton = document.getElementById("previous");
previousButton.addEventListener("click", () => {
    currentPage--;
    displayCommands(currentPage);
});

let nextButton = document.getElementById("next");
nextButton.addEventListener("click", () => {
    currentPage++;
    displayCommands(currentPage);
});

// View first page
displayCommands(currentPage);



/*
List the letters entered in the search box field in
 the command.description field letter by letter on the page
*/
const searchBox = document.getElementById('searchBox');

searchBox.addEventListener('keyup', (e) => {
   if (searchBox.value === "") {
         displayCommands(currentPage); // Define the displayCommands function
         return;
    }
    let search = searchBox.value.toLowerCase();

    let filteredCommands = command.filter((command) => {
        return command.description.toLowerCase().includes(search);
    }
    );

    commandList.innerHTML = "";

    for (let i = 0; i < filteredCommands.length; i++) {
        commandList.innerHTML += `
            <li class="py-4" id="line">
                <div class="ml-2 text-xl font-bold select-all">${filteredCommands[i].command}<p class="text-sm font-thin select-none">${filteredCommands[i].description}</p></div>
            </li>
        `;
    }
});
