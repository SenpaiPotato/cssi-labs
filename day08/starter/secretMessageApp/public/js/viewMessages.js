var counter = 0;
const getMessages = () => {
    const messageRef = firebase.database().ref();
    messageRef.on('value', (snapshot) => {
        const data = snapshot.val();
        //console.log(data)

        const passcodeAttempt = document.querySelector("#passcode").value;
        var passcodeCorrect = false;
        for(const recordKey in data){
            //console.log(recordKey);
            //console.log(data[recordKey]);

            const record = data[recordKey];
            const storedPasscode = record.passcode;

            if(passcodeAttempt === storedPasscode){
                console.log(`Message is ${record.message}`);
                renderMessageAsHtml(record.message);
                passcodeCorrect = true;
            }
            
        }
        if(passcodeCorrect === false){
            alert("Your passcode is incorrect >:( ");
           counter++;
        }  
        //console.log(counter);
        if(counter > 3){
            alert("You have no more attempts! ");
            const passwordBox = document.querySelector("#passcode");
            passwordBox.setAttribute("disabled", "disabled"); 
            const passwordButton = document.querySelector("#viewMsg");
            passwordButton.setAttribute("disabled", "disabled");          
        }
    })
}

const renderMessageAsHtml = (message) => {
    //const passCodeInput = document.querySelector("#passcode");
    alert("renderHTML");
    const messageDisplay = document.querySelector(".card-container");
    const messageCard = document.createElement("div");
    messageCard.setAttribute("class", "card" );
    const messageText = document.createElement("div");
    messageText.setAttribute("class", "card-content");
    messageText.innerHTML = message;
    messageCard.appendChild(messageText);
    messageDisplay.appendChild(messageCard);
}