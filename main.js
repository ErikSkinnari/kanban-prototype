var mainBoard = document.getElementById('main-board');

var columns = [];
var cards = [];

async function GetColumnData() {
    columnData = await fetch('./columns.json');
    columns = await columnData.json();

    cardData = await fetch('./cards.json');
    cards = await cardData.json();

    console.log(columns);
    populateBoard();
}

GetColumnData();

function populateBoard() {
    console.log('Columns: ' + columns.length);
    for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        mainBoard.innerHTML += `
        <!-- ${col.name} Column -->
        <div class="border-0 rounded-top flex-fill align-self-start p-0 m-1" id="col${col.name}">
            <div class="card-header d-flex justify-content-between bg-dark text-light text-light">
                <h4>${col.name}</h4>
                ${col.id == 0 ? `<button class="btn bg-light text-dark rounded" id="addCardButton"><b><i class="fas fa-plus"></i>Add Card</b></button></div>

                <div class="d-none p-2 bg-dark text-light" id="newCardInput">
                <label for="newCardTitle">Title</label><br>
                <input type="text" style="width: 100%;" id="newCardTitle"><br>
                <label class="mt-3" for="newCardDescription">Description</label><br>
                <textarea name="newCardDescription" id="newCardDescription" style="width: 100%;" rows="5"></textarea>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-light" id="saveNewCardButton">Save</button>
                    <button class="btn btn-light" id="discardNewCardButton">Cancel</button>
                </div>` : ''}
            </div>
        <div>`;

    }

    var addCardButton = document.getElementById('addCardButton');
    var newCardInput = document.getElementById('newCardInput');
    var saveNewCardButton = document.getElementById('saveNewCardButton');
    var discardNewCardButton = document.getElementById('discardNewCardButton');

    addCardButton.addEventListener('click', () => {
        newCardInput.classList.toggle('d-none');
    });
    
    saveNewCardButton.addEventListener('click', () => {
        newCardInput.classList.add('d-none');
    });
    
    discardNewCardButton.addEventListener('click', () => {
        newCardInput.classList.add('d-none');
    });
}













var editCard = document.getElementById('editCard');
var editCardInput = document.getElementById('editCardInput');
var saveChangesButton = document.getElementById('saveChangesButton');
var discardChangesButton = document.getElementById('discardChangesButton');
var removeCard = document.getElementById('removeCard');
var modelCard = document.getElementById('modelCard');
var editCardTitle = document.getElementById('editCardTitle');
var editCardDescription = document.getElementById('editCardDescription');
var cardTitle = document.getElementById('cardTitle');
var cardDescription = document.getElementById('cardDescription');




editCard.addEventListener('click', () => {
    editCardTitle.value = cardTitle.innerText;
    editCardDescription.value = cardDescription.innerText;
    editCardInput.classList.toggle('d-none');
});

saveChangesButton.addEventListener('click', () => {
    cardTitle.innerText = editCardTitle.value; cardTitle
    cardDescription.innerText = editCardDescription.value;
    editCardInput.classList.add('d-none');
});

discardChangesButton.addEventListener('click', () => {
    editCardInput.classList.add('d-none');
});

removeCard.addEventListener('click', () => {
    modelCard.classList.add('d-none');
})