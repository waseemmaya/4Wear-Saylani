$(document).ready(function($) {
  $(".container--grid ul").mixItUp({
    animation: {
      duration: 350,
      effects: "fade translateY(40px)",
      easing: "ease"
    }
  });
});

$("a").on("touchstart", function(e) {
  "use strict";
  var link = $(this);
  if (link.hasClass("hover")) {
    return true;
  } else {
    link.addClass("hover");
    $("a")
      .not(this)
      .removeClass("hover");
    e.preventDefault();
    return false;
  }
});

if (!("ontouchstart" in document.documentElement)) {
  document.documentElement.className += "no-touch";
}

function getDropDown() {
  let selector = document.getElementById("selector");

  fetch("https://newsapi.org/v1/sources")
    .then(data => data.json())
    .then(src => {
      selector.innerHTML = src.sources.map(
        newData => `<option value="${newData.id}">${newData.name}</option>`
      );
      // .join("\n");
    });
}

var source;

function huh() {
  document.getElementById("articles").innerHTML = "";
  let data = document.getElementById("selector").value;

  console.log("selected", data);
  // let source = e.target.value;
  source = data;
  console.log("source andar", source);
  var source;
  var apikey = "aad1919ff1fc4ce1bbc390acabd07b88";
  var url =
    "https://newsapi.org/v2/top-headlines?sources=" +
    source +
    "&apiKey=" +
    apikey;
  update(url);
}

// selector.addEventListener("change", e => {
//   updatenews(e.target.value);
// });

function update(url) {
  fetch(url)
    .then(data => data.json())
    .then(val => {
      let article = val.articles;
      // console.log(article);
      console.log("fetching");
      article.map(obj => {
        // console.log(obj);
        let result = "";
        result += `
        <li class="mix" style="display: inline-block;" data-bound="">
        <a href="${obj.url}" target="_blank">
            <div class="card card--article not-visible">
                <!--Article-->
                <div class="card-body">
                    <div class="card-circle card-circle--article" style="background-image: url(${
                      obj.urlToImage
                    })"></div>
                    <div class="card-title">${obj.title}</div>
                    <div class="card-description card-description--clamp-3">${
                      obj.description
                    }</div>
                </div>
                <div class="card-hero">
                    <div class="card-image" style="background-image: url(${
                      obj.urlToImage
                    });">
                    </div>
                </div>
                <div class="card-footer">
                    <div class="card-footer-wrapper" layout="row bottom-left">
                        <div class="card-type is-notShownIfHover">${
                          obj.source.name
                        }</div>
                        <div class="card-tag is-notShownIfHover">${
                          obj.publishedAt
                        }</div>
                        <div class="card-tag is-shownIfHover">Read Margaret Gould Stewart's article</div>
                        <div class="card-medium is-shownIfHover" self="right"></div>
                    </div>
                </div>
            </div>
        </a>
      </li>
        `;
        let a = document.getElementById("articles");
        a.innerHTML += result;
        // console.log(obj.title);
      });
    });
}
