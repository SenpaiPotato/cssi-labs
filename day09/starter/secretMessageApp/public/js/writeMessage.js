const submitMessage = () => {
    console.log("submitting");
    const passcodeInput = document.querySelector('#passcode');
    const messageInput = document.querySelector("#message");
    const passcodeValue = passcodeInput.value;
    const messageValue = messageInput.value;

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

