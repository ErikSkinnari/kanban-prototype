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
        <div class="border-0 rounded-top w-50 align-self-start p-0 m-1 main-column">
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
            <div id="col-${col.id}"></div>
        <div>`;
    }

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        printCard(card);
        
    }


    // Generic eventlistener
    document.getElementById('main-board').addEventListener('click', function(e) {

        let target = e.target.id;
        let targetData = target.split('_');
        let buttonType = targetData[0];
        let id = targetData[1];

        console.log(targetData);

        switch (buttonType) {
            case 'editCard':
                openEditor(id);
                break;
            case 'discardChangesButton':
                discardChanges(id);
                break;
            case 'removeCard':
                removeCard(id);
                break;
            case 'saveChangesButton':
                saveChangesToCard(id);
                break;
            case 'moveLeft':
                moveCard(id, 'left');
                break;
                case 'moveRight':
                moveCard(id, 'right');
                break;
            default:
                console.log('BUTTON PRESSED!! Action: ' + buttonType + ' | Id: ' + id);
        }
    });

    function openEditor(id){
        document.getElementById(`editCardTitle_${id}`).value = document.getElementById(`cardTitle_${id}`).innerText;
        document.getElementById(`editCardDescription_${id}`).value = document.getElementById(`cardDescription_${id}`).innerText;
        document.getElementById(`editCardInput_${id}`).classList.toggle('d-none');
    }

    function discardChanges(id) {
        document.getElementById(`editCardInput_${id}`).classList.add('d-none');
    }

    function removeCard(id) {
        hideCard(id);        
        var cardToDelete = cards.filter(card => card.id == id);
        cards.splice(cardToDelete, 1);
    }

    function saveChangesToCard(id) {

        
        // Get the card from the array
        var cardToEdit = cards.filter(card => card.id == id)[0];
        cards.splice(cardToEdit, 1);
        
        cardToEdit.title = document.getElementById(`editCardTitle_${id}`).value;
        cardToEdit.description = document.getElementById(`editCardDescription_${id}`).value;
        hideCard(id);
        
        cards.push(cardToEdit, 1);
        printCard(cardToEdit);

        document.getElementById(`editCardInput_${id}`).classList.add('d-none');
    }

    function hideCard(id) {
        var cardElement = document.getElementById(`card_${id}`);
        cardElement.parentNode.removeChild(cardElement);
    }


    function moveCard(id, direction) {

        var cardToMove = cards.filter(card => card.id == id)[0];

        if (cardToMove == null) {
            console.log('Did not find card');
            console.log(cards);
            return;
        }

        var moved = false;

        if( direction === 'left') {
            if(cardToMove.columnId <= 0){
                cardToMove.columnId = 0;
            }
            else {
                hideCard(cardToMove.id);
                cardToMove.columnId--;
                moved = true;
            }
        }
        if(direction === 'right') {
            if(cardToMove.columnId >= columns.length - 1) {
                cardToMove.columnId = columns.length - 1;
            }
            else {
                hideCard(cardToMove.id);
                cardToMove.columnId++;
                moved = true;
            }
        }

        if(moved == true) printCard(cardToMove);
    }

    function printCard(card) {

        var col = document.getElementById(`col-${card.columnId}`);

        col.innerHTML = `
        <!-- Card -->
        <div class="card mt-2 p-2 shadow-sm rounded-0 k-card" id="card_${card.id}">
            <h5 class="card-header bg-dark text-light rounded-0 k-card-header" id="cardTitle_${card.id}">${card.title}</h5>
            <p class="card-text p-3 mb-0" id="cardDescription_${card.id}">${card.description}</p>

            <!-- Card control panel -->
            <div class="arrows d-flex justify-content-between mb-1">
                <span class="ml-3" style="font-size: 20px;"><i id="moveLeft_${card.id}" class="fas fa-arrow-left text-dark k-card-control"></i></span>
                <span style="font-size: 20px;"><i id="editCard_${card.id}" class="fas fa-pen text-dark k-card-control"></i></span>
                <span style="font-size: 20px;"><i id="removeCard_${card.id}" class="fas fa-trash-alt text-dark k-card-control"></i></span>
                <span class="mr-3" style="font-size: 20px;"><i id="moveRight_${card.id}" class="fas fa-arrow-right text-dark k-card-control"></i></span>
            </div>

            <!-- Card footer -->
            <div class="card-footer bg-dark text-light rounded-0 mt-2"></div>

            <!-- Edit Card -->
            <div class="d-none p-2 bg-light text-dark" id="editCardInput_${card.id}">
                <label for="editCardTitle_${card.id}"> New Title</label><br>
                <input type="text" style="width: 100%;" id="editCardTitle_${card.id}"><br>
                <label class="mt-3" for="editCardDescription_${card.id}">Description</label><br>
                <textarea name="editCardDescription" id="editCardDescription_${card.id}" style="width: 100%;" rows="10"></textarea>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-dark" id="saveChangesButton_${card.id}">Save</button>
                    <button class="btn btn-dark" id="discardChangesButton_${card.id}">Cancel</button>
                </div>
            </div>
        </div>
        ` + col.innerHTML;
    }

    var addCardButton = document.getElementById('addCardButton');
    var newCardInput = document.getElementById('newCardInput');
    var saveNewCardButton = document.getElementById('saveNewCardButton');
    var discardNewCardButton = document.getElementById('discardNewCardButton');

    addCardButton.addEventListener('click', () => {
        newCardInput.classList.toggle('d-none');
    });
    
    saveNewCardButton.addEventListener('click', () => {

        var titleInput = document.getElementById('newCardTitle');
        var descriptionInput = document.getElementById('newCardDescription');

        var id = uuidv4();
        var title = titleInput.value;
        titleInput.value = '';
        var description = descriptionInput.value;
        descriptionInput.value = '';

        console.log(title);
        console.log(description);

        var newCard = {
            "id": id,
            "title": title,
            "description": description,
            "columnId": 0
        };

        cards.push(newCard);
        printCard(newCard);

        newCardInput.classList.add('d-none');
    });
    
    discardNewCardButton.addEventListener('click', () => {
        newCardInput.classList.add('d-none');
    });
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }


















