const maxChars = 10;
const submitMessage = () => {
    console.log("submitting");
    const passcodeInput = document.querySelector('#passcode');
    const messageInput = document.querySelector("#message");
    const passcodeValue = passcodeInput.value;
    const messageValue = messageInput.value;

    if(!(/[A-Z]/.test(passcodeValue)) && !(/[0-9]/.test(passcodeValue))){
        alert(`Passcode must contain at least 1 capital letter and 1 number`);
        return;
    }
    if(messageValue.length >= maxChars){
        alert(`Message must be less than ${maxChars} characters`);
        return;
    }
   
    //Send to Firebase
    firebase.database().ref().push({
        message: messageValue,
        passcode: passcodeValue
    });

    //clear values from input
    passcodeInput.value = "";
    messageInput.value = "";
};

const sendMessageButton = document.querySelector(".button");
sendMessageButton.addEventListener('click', submitMessage);

