let googleUser, userId;
let labels = [];
window.onload = () => {
    firebase.auth()
        .onAuthStateChanged(user => {
            if(user) {
                console.log(`Logged in as: ${user.displayName}`);
                googleUser = user;
                userId = googleUser.uid;
                //document.querySelector('#welcomeMessage').innerHTML = ` Welcome to 🔥Fire Notes📝, ${user.displayName} !`
            } else {
                window.location = 'index.html';
            }
        });
}
function addItem(label){
    console.log("adding Item "+ label)
    labels.push(label);
}
function toggleDropDown(){
    console.log("Toggle dropdown");
    document.querySelector('.dropdown').classList.toggle("is-active");
}
function getTimestamp(){
    var epochTime = Math.floor(new Date().getTime()/1000.0);
    var humanTime = new Date(epochTime*1000);
    return humanTime.toLocaleString();
}
const submitNote = () => {
    const note = document.querySelector("#noteText").value;
    const title = document.querySelector("#noteTitle").value;

    firebase.database().ref(`users/${userId}`).push(
        {
            title: title,
            note: note,
            timestamp: getTimestamp(),
            labels : labels

        }
    )
    .then(() => {
        document.querySelector("#noteText").value = "";
        document.querySelector("#noteTitle").value = "";
    })
    .catch(error => {
        console.log(`Something bad happened ... \n ${error}`)
    })

};
