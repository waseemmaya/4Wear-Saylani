var _db = firebase.database();

function signin() {
  var form = document.querySelector("form");
  var formData = new FormData(form);

  var email = formData.get("email");
  var password = formData.get("password");

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(a) {
      let userID = a.user.uid;
      console.log(userID);
      var userRef = firebase.database().ref(`Users/${userID}`);

      userRef.on("value", function(x) {
        let data = x.val();
        let uffName = data.displayName;
        console.log(uffName);
        let currentUsername = localStorage.setItem(
          "myName",
          JSON.stringify(data.displayName)
        );
        document.getElementById("name").innerText = uffName;
      });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

  form.reset();
  return false;
}
