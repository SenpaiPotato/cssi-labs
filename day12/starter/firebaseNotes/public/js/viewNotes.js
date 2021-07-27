var username = "";
window.onload = () => {
//When page loads, check user logged in state
firebase.auth().onAuthStateChanged(function (user) {
    if (user){
//If logged in, get user's notes from db

        const googleUserId = user.uid;
        username = user.displayName;
        getNotes(googleUserId);

    } else {
//If not logged in redirect to log in page
        window.location = 'index.html'
    }
});

};
//get user's notes from db, display notes on page
function getNotes(userId) {
    console.log(userId);
    const userRef = firebase.database().ref(`users/${userId}`);
    userRef.on('value', snapshot => {
        writeNotestoHTML(snapshot.val());
    });
}

function createHTMLForNote(note){
    var randColor = getRandomColor();
    //todo: create the elements and put in the note data
    // const newColumn = document.createElement('div');
    // newColumn.classList.add('column is-one-third');
    // const newCard = document.createElement('div');
    // newCard.classList.add('card');
    
    // newColumn.appendChild(newCard);
    return `<div class="column is-one-third">
                <div class="card" style = "background-color: ${randColor}">
                        <p class="card-header-title">
                        ${username}
                        </p>               
                    <header class="card-header">
                        <p class="card-header-title">
                        ${note.title}
                        </p>
                    </header>
                        <div class="card-content">
                            <div class="content">
                            ${note.note}
                            </div>
                         </div>
                </div>
            </div>`
};

function writeNotestoHTML(data){
    const noteRenderArea = document.querySelector('#app');
    for(let noteKey in data) {
        //Create html string for one note
        let noteHTML = createHTMLForNote(data[noteKey]);
        noteRenderArea.innerHTML += noteHTML;
    }

};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  console.log(color);
  return color;
}
