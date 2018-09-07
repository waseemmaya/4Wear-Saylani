var database = firebase.database();

function signout() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      localStorage.clear();
      console.log("Sign Out Successfully...!");
      alert("Sign out successfully...!");
      window.location.replace("index.html");
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
    });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // var nameRef = database.ref(`users`);

    // alert(data.fullname);
    console.log("Signed in...!");
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "none";
  } else {
    // No user is signed in.
    console.log("Not Signed in...!");
    document.getElementById("logout").style.display = "none";
  }
});

function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(x => {
      let userID = x.user.uid;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var userlist = database.ref(`users/${userID}`);
          userlist.on("value", function(user) {
            // localStorage.setItem("mobile", JSON.stringify(user.val().mobile));
            localStorage.setItem("userID", JSON.stringify(userID));
            console.log(userID);
            window.location.href = "index.html";
          });
        } else alert("Wrong Username or Password");
      });
    })
    .catch(function(error) {});
}

// function login() {
//   alert("Hello");

//   var email = document.getElementById('email').value;
//   var password = document.getElementById('password').value;
//   let userid = x.user.uid;
//   console.log(userid);
//   localStorage.setItem("userId", JSON.stringify(userid));

//   firebase.auth().signInWithEmailAndPassword(email, password)
//     .then(function (success) {
//       console.log("Logged in Successfully...!");
//       alert("Login Successfully..!")
//       window.location.replace("index.html")
//     }
//     )
//     .catch(function (error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // ...
//     });

// }

function signup() {
  var name = document.getElementById("uuserName").value;
  var password = document.getElementById("upassword").value;
  var email = document.getElementById("uemail").value;
  var number = document.getElementById("uphone").value;
  // var form = new FormData(document.querySelector('#form1'));
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(x => {
      let userlist = database.ref("users/" + x.user.uid);
      userlist.set({
        fullname: name,
        password: password,
        email: email,
        mobile: number,
        userID: x.user.uid
      });
      // document.querySelector('#form1').reset();
      console.log("Clicked", x.user.uid);
      console.log(x);
      alert("Success");
      window.location.href = "login.html";
      // name = "";
      // email = "";
      // password = "";
      // number = "";
    })
    .catch(x => {
      alert("Error");
      console.log(x.code);
      console.log(x.message);
    });
  return false;
}
