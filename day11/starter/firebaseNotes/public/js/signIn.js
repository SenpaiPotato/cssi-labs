const signIn = () => {
    console.log("Calling sign in");
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(result => {
            //Do something with the result
            console.log(`result is ${result}`);
            const credential = result.credential;
            const token = credential.accessToken;

            const user = result.user;

            console.log(user.uid);
            userId = user.uid;
            window.location = 'welcomepage.html'; 
        })
        .catch(error => {
            //Something bad happened :(
            console.log(error);
        });

};

