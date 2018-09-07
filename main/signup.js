function signup() {
  var form = document.querySelector("form");
  var formData = new FormData(form);

  var email = formData.get("email");
  var password = formData.get("password");

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(data) {
      console.log("signup");
      let userRef = _db.ref(`Users/${data.user.uid}`);
      userRef.set({
        displayName: formData.get("displayName"),
        email: email,
        phone: formData.get("phone"),
        userID: data.user.uid
      });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(error);
      // ...
    });

  form.reset();
  return false;
}

// var user = firebase.auth().currentUser;

// if (user) {
//   // User is signed in.
//   console.log(user);
//   console.log("signed in")
// } else {
//   // No user is signed in.
//   console.log("Not signed in")
// }
