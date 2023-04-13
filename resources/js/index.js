// import {magazines} from "../data/magazines"
// let magazines = [
//   "https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss",
//   "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
//   "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss"
// ]

async function fetchNews(feeds) {
  try {
    let newsPromise = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=" + feeds
    );
    let newsData = await newsPromise.json();
    return newsData;
  } catch (err) {
    return null;
  }
}

async function getNewsData() {
  let magazineData = []
  for (let i = 0; i < magazines.length; i++) {
    magazineData.push(await fetchNews(magazines[i]))
  }
  return magazineData
}

async function createAccordion() {
  let magazineData = await getNewsData()
  console.log("magazineData", magazineData)
  // let magazineData = []
  // for (let i = 0; i < magazines.length; i++) {
  //   magazineData.push(await fetchNews(magazines[i]))
  // }
  // console.log(magazineData)
  let accordionContainer = document.getElementById("accordionId")
  magazineData.forEach((magObj, index) => {
    console.log("magObj", magObj)
    // if (index===0){
    accordionContainer.innerHTML += `<div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button ${index === 0 ? "" : "collapsed"}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index + 1}" aria-expanded=${index === 0 ? true : false} aria-controls="collapse${index + 1}">
            <b>${magObj.feed.title}</b>
          </button>
        </h2>
        <div id="collapse${index + 1}" class="accordion-collapse collapse ${index === 0 ? "show" : ""}" data-bs-parent="#accordionId">
          <div class="accordion-body" id="${index + 1}">
          </div>
        </div>`
    // }
    //   else{
    //     accordionItemDiv.innerHTML+=`<h2 class="accordion-header">
    //     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index+1}" aria-expanded="false" aria-controls="collapse${index+1}">
    //       ${magObj.feed.title}
    //     </button>
    //   </h2>
    //   <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionId">
    //     <div class="accordion-body">

    //     </div>
    //   </div>`
    //   }
  })
}

async function createCarousel() {
  let magazineData = await getNewsData()
  console.log("magazineData", magazineData)
  // let magazineData = []
  // for (let i = 0; i < magazines.length; i++) {
  //   magazineData.push(await fetchNews(magazines[i]))
  // }
  // console.log(magazineData)
  magazineData.forEach((magObj, index) => {
    console.log("magObj", magObj)
    console.log(`${index}${index + 1}`)
    console.log(typeof (`${index + 1}`))
    let accordionBody = document.getElementById(`${index + 1}`)
    accordionBody.innerHTML = `<div id="carouselExample${index + 1}" class="carousel slide">
      <div class="carousel-inner" id="car-inr-${index + 1}"> 
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample${index + 1}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample${index + 1}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>`

    // let carouselInner = document.getElementById(`car-inr-${index + 1}`)
    // magObj.items.forEach((itmObj, index) => {
    //   console.log("itmObj", itmObj)
    //   let divInner = document.createElement("div");
    //   index === 0
    //     ? divInner.setAttribute("class", "carousel-item active")
    //     : divInner.setAttribute("class", "carousel-item")
    //   divInner.innerHTML = `
    //       <a href=${itmObj.link}>
    //       <img src=${itmObj.enclosure.link} class="d-block w-100">
    //       <h3 class="content-para" id="main-heading">${itmObj.title}</h3>
    //       </a>
    //       <h6 class="author">${itmObj.author} <span class="dot"></span> ${new Date(itmObj.pubDate.slice(0, 11)).toLocaleDateString("en-IN")}</h6>
    //       <p class="content-para" id="para">${itmObj.content}</p>`
    //   carouselInner.append(divInner)
    // })
  })
}

async function createCards() {
  let magazineData = await getNewsData()
  console.log("magazineData", magazineData)
  // let magazineData = []
  // for (let i = 0; i < magazines.length; i++) {
  //   magazineData.push(await fetchNews(magazines[i]))
  // }
  magazineData.forEach((itmObj, index) => {
    let carouselInner = document.getElementById(`car-inr-${index + 1}`)
    itmObj.items.forEach((itms, index) => {
      let divInner = document.createElement("div");
      index === 0
        ? divInner.setAttribute("class", "carousel-item active")
        : divInner.setAttribute("class", "carousel-item")
      divInner.innerHTML = `
        <a href=${itms.link}>
        <img src=${itms.enclosure.link} class="d-block w-100">
        <h3 class="content-para" id="main-heading">${itms.title}</h3>
        </a>
        <h6 class="author">${itms.author} <div class="dot"></div> ${new Date(itms.pubDate.slice(0, 11)).toLocaleDateString("en-IN")}</h6>
        <p class="content-para" id="para">${itms.content}</p>`
      carouselInner.append(divInner)
    })
  })
}
createAccordion()
createCarousel()
createCards()
