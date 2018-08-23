function search(searchText) {
    var searchText = document.getElementById("search").value;
    localStorage.setItem("searchText", searchText);
    console.log(searchText);
    // window.open("addpage.html");
    // location.href = 'addpage.html';
    setTimeout(function () {
      location.href = 'searchPage.html';

    }, 2000);
  }
