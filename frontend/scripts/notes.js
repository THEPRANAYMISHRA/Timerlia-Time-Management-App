let addNoteButton = document.getElementById('add-note-button');
let activityPopup = document.getElementById('activity-popup');
let activityButtons = document.querySelectorAll('.activity-button');
let addNotePopup = document.getElementById('add-note-popup');
let dropButton = document.getElementById('drop-btn');
let saveButton = document.getElementById('saveBtn');
let priority;
let dash_container = document.getElementById('dash-container')
let token = localStorage.getItem('token')


window.onload = () => {
    fetch('https://timerlia.onrender.com/note/mynotes', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.length > 0) {
                displaycards(data)
            } else {
                dash_container.innerHTML = 'No notes are found assosiated with this account'
            }
        })
        .catch((err) => alert(data.msg))
}

addNoteButton.addEventListener('click', () => {
    activityPopup.style.display = 'block';
});

activityButtons.forEach((button) => {
    button.addEventListener('click', () => {
        priority = button.textContent;
        activityPopup.style.display = 'none';
        addNotePopup.style.display = 'block';
    });
});

dropButton.addEventListener('click', () => {
    addNotePopup.style.display = "none";
});

saveButton.addEventListener('click', () => {
    let titleEl = document.getElementById('notetitle');
    let noteEl = document.getElementById('note')

    let payload = {
        title: titleEl.value,
        note: noteEl.value,
        priority: priority
    };

    fetch('https://timerlia.onrender.com/note/mynotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(payload)
    }).then((res) => res.json())
        .then((data) => {
            alert(data.msg);
            window.location.reload();
        })
        .catch((err) => alert('Failed to add!'))
});


function displaycards(arr) {
    dash_container.innerHTML = ''
    let cardsStr = arr.map((ele) => {
        return `<div id="${ele._id}">
        <h3>${ele.title}</h3>
        <p>${ele.note}</p>
        <span>
            <button onclick="deleteNote('${ele._id}')">Delete</button>
            <button>Edit</button>
        </span>
    </div>`
    }).join('')

    dash_container.innerHTML = cardsStr
}


function deleteNote(id) {
    fetch(`https://timerlia.onrender.com/note/mynotes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then((res) => res.json())
        .then((data) => {
            alert(data.msg)
            window.location.reload();
        })
        .catch((err) => alert('Failed to delete!'))
}