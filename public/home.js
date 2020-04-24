//Socket Work
let socket = io();
socket.on('socketPreCheck', () => {
    let userID = sessionStorage.getItem('userID') || null;
    socket.emit('socketPreResponse', { userID: userID })
    console.log('socketPreCheck')
})
socket.on('userInfo', (data) => {
    sessionStorage.setItem('userID', data.id)
    console.log('called')
})


//Render Work
const goButton = document.querySelector('#goButton'),
    selectUser = document.querySelector('#selectUser'),
    gameMode = document.querySelector('#gameMode'),
    nameField = document.querySelector('#nameField');

let sortSelect = null;

const sortModes = ["Insertion", "Bubble", "MaxHeap", "Selection"];

const sortModeCases = {
    click: sortModes.slice(0, 4),
    drop: sortModes.slice(1, 4),
    drop2: sortModes.slice(0, 1)
}

function start() {
    sortSelect = document.createElement('select');
    document.body.insertBefore(sortSelect, document.body.lastChild)
}
start();


function createSortMode(gm) {

    let noneOption = document.createElement('option');
    noneOption.value = "none";
    noneOption.selected = true;
    noneOption.disabled = true;
    noneOption.hidden = true;
    noneOption.text = 'Select an Option'
    sortSelect.add(noneOption);
    for (let i = 0; i < sortModeCases[gameMode.value].length; i++) {
        let optionElem = document.createElement('option');
        optionElem.value = sortModeCases[gm.value][i];
        optionElem.text = `${sortModeCases[gm.value][i]} Sort`
        sortSelect.add(optionElem);
    }
}

gameMode.addEventListener('change', () => {
    createSortMode(gameMode)
});

goButton.addEventListener('click', () => {
    console.log(selectUser.value !== 'none', gameMode.value !== 'none', sortSelect != null, sortSelect.value !== 'none')
    nameField.value != null && selectUser.value !== 'none' && gameMode.value !== 'none' && sortSelect != null && sortSelect.value !== 'none' ? socket.emit('userChange', {
        userID: sessionStorage.getItem('userID'),
        replacement: {
            curSelectedUser: selectUser.value,
            curGameMode: gameMode.value,
            curSortMode: sortSelect.value,
            name: nameField.value
        }
    }) : console.log('not all filled');
    window.location.href = `/${gameMode.value}`
})