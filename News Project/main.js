var unique_key = "aad1919ff1fc4ce1bbc390acabd07b88";

var unique_api =
  "https://newsapi.org/v2/top-headlines?sources=the-next-web&apiKey=";

var key = unique_api + unique_key;

fetch(key)
  .then(data => data.json())
  .then(val => {
    let article = val.articles;
    // console.log(article);

    article.map(obj => {
      console.log(obj);
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
      console.log(obj.title);
    });
  });

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
