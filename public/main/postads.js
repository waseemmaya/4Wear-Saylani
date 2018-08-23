// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//       // User is signed in.
//       console.log('Signed in...!');
//       document.getElementById("login").style.display = "none";
//       document.getElementById("signup").style.display = "none";

//     } else {
//       // No user is signed in.
//       console.log("Not Signed in...!");

//       alert("Sign in First...!");
//       window.location.href = 'login.html';
//     }
//   });

var database = firebase.database();
var imageURL;
var itemname = document.getElementById("itemname").value;
var category = document.getElementById("category").value;
var description = document.getElementById("description").value;
// var phone = document.getElementById("phone").value;

function postad() {
  var userID = localStorage.getItem("userID");
  var addID = Math.floor(100444000 + Math.random() * 90012000);
  var itemname = document.getElementById("itemname").value;
  var category = document.getElementById("category").value;
  var description = document.getElementById("description").value;
  // var phone = document.getElementById("phone").value;
  var price = document.getElementById("price").value;
  // var form = new FormData(document.querySelector('form'));
  var newTodoRef = database.ref(`Ads/${addID}`);
  newTodoRef.set({
    userID: userID,
    itemname: itemname,
    category: category,
    addID: addID,
    description: description,
    date: new Date().toDateString(),
    imageURL: imageURL,
    price: price
  });
  console.log("Task Posted");
  document.querySelector("form").reset();
  alert("Ad Submitted Successfully...!");
  return false;
}

// File or Blob named mountains.jpg

function uploadPic() {
  var file = document.getElementById("uploadImg").files[0];

  console.log(file.name);
  var filename = file.name;

  var metadata = {
    contentType: file.type
  };

  var storageRef = firebase.storage().ref();

  var uploadTask = storageRef.child("Pics/" + filename).put(file, metadata);

  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    function(error) {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;
        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log("File available at", downloadURL);
        imageURL = downloadURL;
        postad();
      });
    }
  );
}
