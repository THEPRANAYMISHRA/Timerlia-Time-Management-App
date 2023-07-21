let add_note_button = document.getElementById('add-note-button')
let activity_popup = document.getElementById('activity-popup')
let activity_buttons = document.querySelectorAll('.activity-button')
let add_note_popup = document.getElementById('add-note-popup')


add_note_button.addEventListener('click', () => {
    activity_popup.style.display = 'block'
})


activity_buttons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log(button.textContent)
        activity_popup.style.display = 'none'
        add_note_popup.style.display = 'block'
    })
})



