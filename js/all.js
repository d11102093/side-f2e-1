const keyword = document.querySelector('.keyword')
const category = document.getElementById('category')
const city = document.getElementById('city')
const send = document.querySelector('.send')
const hotCity = document.querySelector('.hotCity')
// activity
const hotActivity = document.querySelector('.hotActivity')
const hotActivityName = document.querySelectorAll('.hotActivity-blockText h2')
const hotActivityDescription = document.querySelectorAll(
  '.hotActivity-blockText p',
)
const hotActivityImg = document.querySelectorAll('.hotActivity-block img')
const hotActivityAddress = document.querySelectorAll(
  '.hotActivity-blockBTN span',
)
const hotActivityContain = document.querySelector('.hotActivity-contain')
// delicaey
const hotDelicaey = document.querySelector('.hotDelicaey')
const hotDelicaeyImg = document.querySelectorAll('.hotDelicaey-contain li img')
const hotDelicaeyName = document.querySelectorAll('.hotDelicaey-contain p')
const hotDelicaeyAddress = document.querySelectorAll('.hotDelicaey-block span')

const hotDelicaeyContain = document.querySelector('.hotDelicaey-contain')

// Attractions
const hotAttraction = document.querySelector('.hotAttraction')
const hotAttractionName = document.querySelectorAll(
  '.hotAttraction-blockText h2',
)
const hotAttractionDescription = document.querySelectorAll(
  '.hotAttraction-blockText p',
)
const hotAttractionImg = document.querySelectorAll('.hotAttraction-block img')
const hotAttractionAddress = document.querySelectorAll(
  '.hotAttraction-blockBTN span',
)
const hotAttractionContain = document.querySelector('.hotAttraction-contain')
hotAttraction.setAttribute('class', 'hotActivity displayNone')
axios
  .get(
    `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$filter=Picture%2FPictureUrl1%20ne%20null%20&$top=4&$format=JSON`,
    {
      headers: getAuthorizationHeader(),
    },
  )
  .then(function (response) {
    let str = ''
    let img = ''
    let address = ''
    response.data.forEach((item) => {
      // 檢查有無照片
      if (item.Picture.PictureUrl1 != undefined) {
        img = item.Picture.PictureUrl1
      } else {
        img = 'img/noImage.png'
      }
      if (item.Address != undefined) {
        address = item.Address.substr(0, 3)
      } else {
        address = '無提供'
      }

      str += `<li>
      <div class="hotActivity-block"><img src="${img}" alt="noImg">
          <div class="hotActivity-blockText">
              <h2>${item.Name}</h2>
              <p>${item.Description}</p>
              <div class="hotActivity-blockBTN"><i class="fas fa-map-marker-alt"></i><span>${address}</span>
                  <a href="#">活動詳情</a>
              </div>
          </div>
      </div>
      </li>`
    })
    hotActivityContain.innerHTML = str
  })
  .catch(function (error) {
    console.log(error)
  })
// 預先載入一次

axios
  .get(
    `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=10&$format=JSON
    `,
    {
      headers: getAuthorizationHeader(),
    },
  )
  .then(function (response) {
    let str = ''
    let img = ''
    response.data.forEach((item) => {
      // 檢查有無照片
      if (item.Picture.PictureUrl1 != undefined) {
        img = item.Picture.PictureUrl1
      } else {
        img = 'img/noImage.png'
      }

      str += `<li>
      <img src=${img} alt="noImg" />
      <p>${item.Name}</p>
      <div class="hotDelicaey-block">
        <i class="fas fa-map-marker-alt"></i><span>${item.Address}</span>
      </div>
    </li>`
    })
    hotDelicaeyContain.innerHTML = str
  })
  .catch(function (error) {
    console.log(error)
  })

axios
  .get(
    `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/?$top=10&$format=JSON
  `,
    {
      headers: getAuthorizationHeader(),
    },
  )
  .then(function (response) {
    let str = ''
    let img = ''
    response.data.forEach((item) => {
      // 檢查有無照片
      if (item.Picture.PictureUrl1 != undefined) {
        img = item.Picture.PictureUrl1
      } else {
        img = 'img/noImage.png'
      }

      str += `<li>
    <img src=${img} alt="noImg" />
    <p>${item.Name}</p>
    <div class="hotAttraction-block">
      <i class="fas fa-map-marker-alt"></i><span>${item.Address}</span>
    </div>
  </li>`
    })
    hotAttractionContain.innerHTML = str
  })
  .catch(function (error) {
    console.log(error)
  })

send.addEventListener('click', function (e) {
  e.preventDefault()
  console.log(category.value)
  console.log(city.value)
  console.log(keyword.value)
  let slashCity = `/${city.value}`
  let selectKeyword = `$filter=contains(Name,'${keyword.value}')&`
  // 隱藏區塊
  hotCity.setAttribute('class', 'displayNone')
  hotCity.innerHTML = ''
  // 隱藏區塊結束
  if (category.value == '景點') {
    hotActivity.setAttribute('class', 'hotActivity displayNone')
    hotDelicaey.setAttribute('class', 'hotDelicaey displayNone')
    hotAttraction.setAttribute('class', 'hotAttraction')
  } else if (category.value == '活動') {
    hotDelicaey.setAttribute('class', 'hotDelicaey displayNone')
    hotAttraction.setAttribute('class', 'hotAttraction displayNone')
    hotActivity.setAttribute('class', 'hotActivity')
  } else if (category.value == 'all') {
    hotDelicaey.setAttribute('class', 'hotDelicaey')
    hotAttraction.setAttribute('class', 'hotAttraction')
    hotActivity.setAttribute('class', 'hotActivity')
  }

  axios
    .get(
      `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity${slashCity}?${selectKeyword}$top=6&$format=JSON`,
      {
        headers: getAuthorizationHeader(),
      },
    )
    .then(function (response) {
      let str = ''
      let img = ''
      let address = ''
      response.data.forEach((item) => {
        // 檢查有無照片
        if (item.Picture.PictureUrl1 != undefined) {
          img = item.Picture.PictureUrl1
        } else {
          img = 'img/noImage.png'
        }
        if (item.Address != undefined) {
          address = item.Address.substr(0, 3)
        } else {
          address = '無提供'
        }

        str += `<li>
      <div class="hotActivity-block"><img src="${img}" alt="noImg">
          <div class="hotActivity-blockText">
              <h2>${item.Name}</h2>
              <p>${item.Description}</p>
              <div class="hotActivity-blockBTN"><i class="fas fa-map-marker-alt"></i><span>${address}</span>
                  <a href="#">活動詳情</a>
              </div>
          </div>
      </div>
      </li>`
      })
      hotActivityContain.innerHTML = str
    })
    .catch(function (error) {
      console.log(error)
    })

  axios
    .get(
      `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant${slashCity}?${selectKeyword}$top=10&$format=JSON
    `,
      {
        headers: getAuthorizationHeader(),
      },
    )
    .then(function (response) {
      let str = ''
      let img = ''
      response.data.forEach((item) => {
        // 檢查有無照片
        if (item.Picture.PictureUrl1 != undefined) {
          img = item.Picture.PictureUrl1
        } else {
          img = 'img/noImage.png'
        }

        str += `<li>
      <img src=${img} alt="noImg" />
      <p>${item.Name}</p>
      <div class="hotDelicaey-block">
        <i class="fas fa-map-marker-alt"></i><span>${item.Address}</span>
      </div>
    </li>`
      })
      hotDelicaeyContain.innerHTML = str
    })
    .catch(function (error) {
      console.log(error)
    })
  axios
    .get(
      `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${slashCity}?${selectKeyword}$top=20&$format=JSON
    `,
      {
        headers: getAuthorizationHeader(),
      },
    )
    .then(function (response) {
      let str = ''
      let img = ''
      let address = ''
      response.data.forEach((item) => {
        // 檢查有無照片
        if (item.Picture.PictureUrl1 != undefined) {
          img = item.Picture.PictureUrl1
        } else {
          img = 'img/noImage.png'
        }
        if (item.Address != undefined) {
          address = item.Address
        } else {
          address = `${item.City}-無詳細地址`
        }

        str += `<li>
      <img src=${img} alt="noImg" />
      <p>${item.Name}</p>
      <div class="hotAttraction-block">
        <i class="fas fa-map-marker-alt"></i><span>${address}</span>
      </div>
    </li>`
        console.log(item)
      })
      hotAttractionContain.innerHTML = str
    })
    .catch(function (error) {
      console.log(error)
    })
})

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  // let AppID = '9d5eccb4-ca4a-4f97-b829-7fa73264f550'
  // let AppKey = '0oBJLHiS-raca-0HT6-omY8-K6imx7Q'
  let AppID = '9d5eccb4ca4a4f97b8297fa73264f550'
  let AppKey = '0oBJLHiSraca0HT6omY8K6imx7Q'
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString()
  let ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  let HMAC = ShaObj.getHMAC('B64')
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"'
  return { Authorization: Authorization, 'X-Date': GMTString }
}
