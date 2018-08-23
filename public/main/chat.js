

function fetchall() {
    var addID = localStorage.getItem('addID');
    console.log(addID)
    var database = firebase.database();
    var allads = document.getElementById('onead');

    var fetchAds = database.ref(`Ads/${addID}`);
    fetchAds.on('value', function (data) {
        // console.log(data,data.val())
        // console.log(data.val());
        var row = generateRow(data.val(), data.key);
        allads.innerHTML = row;
    });




    function generateRow(data, key) {
        const rr = `
      <section id="features" class="features sections">
            <div class="container">
                <div class="row">
                    <div class="main_features_content2">

                        <div class="col-sm-6">
                            <div class="single_features_left text-center">
                                <img src="${data.imageURL}" alt="" />
                            </div>
                        </div>

                        <div class="col-sm-6 margin-top-60">
                            <div class="single_features_right ">
                                <h2>${data.itemname}</h2>
                                <p>${data.description}</p>
                                <ul>
                                  <li>${data.category}</li>
                                    <li>${data.date}</li>
                               
                                </ul>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section><!--End of Features 2 Section -->
    `;
        return rr;
    }
}

fetchall();





// function send() {
//   var chat = document.getElementById("chat");
//   var msgtxt = document.getElementById("messages").value;
//   chat.innerHTML = msgtxt;
// }
// send.onclick = function () {
//   chat.innerHTML = msgtxt;
// }
var chatUserId, btnChat, chatBox;
// var adId = localStorage.getItem('addID');
var adId = JSON.parse(localStorage.getItem("addID"));
// var myId = localStorage.getItem('userID');
var myId = JSON.parse(localStorage.getItem("userID"));
// var fullName = localStorage.getItem('fullName');

function send() {
    var message = document.getElementById("messages").value;
    let chat = database.ref(`Ads/${adId}/Chats/${myId}`).push();


    chat.set({
        message: message,
        from: myId,
        time: (new Date()).toLocaleTimeString()

    });


    // let chatRefBuyer = database.ref(`Buyer/${myId}/${adId}`);
    // let notificationRef = database.ref(`notifications`);
    // database.ref(`users/${myId}`)
    //     .once('value', (mySnapshot) => {
    //         chatRefBuyer.set({
    //             adId: adId
    //         })
    //         chatRefSeller.push({
    //             message: message,
    //             timestamp: new Date().toLocaleTimeString(),
    //             userID: myId
    //         })
    //     })

    document.getElementById("messages").value = "";
}

function showMessages() {
    var messagesShow = document.getElementById("messages-show");
    var messagesRef = database.ref(`Ads/${adId}/Chats/${myId}`);
    messagesRef.off('child_added');
    messagesShow.innerHTML = '';
    messagesRef.on('child_added', function (snapshot) {
        if (snapshot.val().from == myId) {
          
            messagesShow.innerHTML += `<div class='text-right'><span>${snapshot.val().message}</span></div><br>`

        }
        else {
            messagesShow.innerHTML += `<div class='text-left'><span>${snapshot.val().message}</span></div><br>`
        }
    });
}

showMessages();

