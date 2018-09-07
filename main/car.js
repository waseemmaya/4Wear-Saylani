function fetchCars() {
    var database = firebase.database();
    var carAds = document.getElementById('carAds');

    var fetchAds = database.ref('Ads').orderByChild('category').equalTo('Cars');
    fetchAds.on('child_added', function (data) {
        // console.log(data.val());
        var row = generateRow(data.val(), data.key);
        carAds.innerHTML += row;

    });

    function generateRow(data, key) {
        const rr = `<div class="card">
        
        <img class="card-img-top" width="270px" height="240px" src="${data.imageURL}" alt="Card image cap">
        <div class="card-body">
        <a href="#" onclick="addpage('${data.addID}')" class="card-text" id="desc"> <h5 class="card-title">${data.itemname}</h5></a>
          <p class="card-text" id="desc">${data.description}</p>
          <p class="card-text"><small class="text-muted">${data.date}</small></p>
        </div>
        </div>`;
        return rr;
    }
}



function addpage(addID) {
    localStorage.setItem("addID", addID);
    console.log(addID);
    // window.open("addpage.html");
    // location.href = 'addpage.html';
    setTimeout(function () {
        location.href = 'adPage.html';

    }, 1000);
}
fetchCars();
