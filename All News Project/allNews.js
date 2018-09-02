var apikey = "bfee90f3072f4738844fccfeedfb5b3e";
const main = document.querySelector("#div");
const selector = document.querySelector("#selector");
const defineDefault = "the-washington-post";

window.addEventListener("load", async e => {
  updatenews();
  await updateSources();
  selector.value = defineDefault;

  selector.addEventListener("change", e => {
    updatenews(e.target.value);
  });
});

async function updatenews(source = defineDefault) {
  let imagesArray = [];
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`
  );
  const json = await res.json();
  console.log(json);
  for (let key in json.articles) {
    imagesArray.push(json.articles[key].urlToImage);
  }
  // console.log(imagesArray, "Images")

  var flag = 0;
  var timer;

  document.getElementById("img").style.backgroundImage =
    "url(" + imagesArray[0] + " )";
  function images() {
    if (flag === imagesArray.length) {
      flag = 0;
      // console.log(flag)
      document.getElementById("img").style.backgroundImage =
        "url( " + imagesArray[flag] + ")";
    } else {
      document.getElementById("img").style.backgroundImage =
        "url( " + imagesArray[flag] + ")";
      // console.log(flag)
    }
  }
  // }
  timer = setInterval(() => {
    flag++;
    images();
  }, 3000);

  main.innerHTML = json.articles.map(createArticles).join("\n");
}

function createArticles(article) {
  return `
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
}

async function updateSources() {
  const res = await fetch(`https://newsapi.org/v1/sources`);
  const json = await res.json();
  console.log(json);

  selector.innerHTML = json.sources
    .map(src => `<option value="${src.id}">${src.name}</option>`)
    .join("\n");
}
