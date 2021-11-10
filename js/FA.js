const keyword = document.querySelector('.keyword')
const category = document.getElementById('category')
const city = document.getElementById('city')
const send = document.querySelector('.send')

// Delicaey
const hotDelicaey = document.querySelector('.hotDelicaey')
const hotDelicaeyImg = document.querySelectorAll('.hotDelicaey-contain li img')
const hotDelicaeyName = document.querySelectorAll('.hotDelicaey-contain p')
const hotDelicaeyAddress = document.querySelectorAll('.hotDelicaey-block span')

const hotDelicaeyContain = document.querySelector('.hotDelicaey-contain')

// Hotel

const hotHotel = document.querySelector('.hotHotel')
const hotHotelImg = document.querySelectorAll('.hotHotel-contain li img')
const hotHotelName = document.querySelectorAll('.hotHotel-contain p')
const hotHotelAddress = document.querySelectorAll('.hotHotel-block span')
const hotHotelContain = document.querySelector('.hotHotel-contain')

axios
  .get(
    `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=100&$format=JSON
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

      str += `<li class="Delicaey-list-item">
      <img src=${img} alt="noImg" />
      <p>${item.Name}</p>
      <div class="hotDelicaey-block">
        <i class="fas fa-map-marker-alt"></i><span>${item.Address}</span>
      </div>
    </li>`
    })
    hotDelicaeyContain.innerHTML = str
    Delicaeypage()
  })
  .catch(function (error) {
    console.log(error)
  })

axios
  .get(
    `https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?$top=100&$format=JSON
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

      str += `<li class="Hotel-list-item">
        <img src=${img} alt="noImg" />
        <p>${item.Name}</p>
        <div class="hotHotel-block">
          <i class="fas fa-map-marker-alt"></i><span>${item.Address}</span>
        </div>
      </li>`
    })
    hotHotelContain.innerHTML = str
    Hotelpage()
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

  // 隱藏區塊結束
  if (category.value == '美食') {
    hotHotel.setAttribute('class', 'hotHotel displayNone')
    hotHotel.setAttribute('class', 'hotDelicaey')
  } else if (category.value == '住宿') {
    hotDelicaey.setAttribute('class', 'hotDelicaey displayNone')
    hotHotel.setAttribute('class', 'hotHotel')
  } else if (category.value == 'all') {
    hotDelicaey.setAttribute('class', 'hotDelicaey')
    hotHotel.setAttribute('class', 'hotHotel')
  }

  axios
    .get(
      `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant${slashCity}?${selectKeyword}$top=100&$format=JSON
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

        str += `<li class="Delicaey-list-item">
        <img src=${img} alt="noImg" />
        <p>${item.Name}</p>
        <div class="hotDelicaey-block">
          <i class="fas fa-map-marker-alt"></i><span>${item.Address}</span>
        </div>
      </li>`
      })
      hotDelicaeyContain.innerHTML = str
      Delicaeypage()
    })
    .catch(function (error) {
      console.log(error)
    })

  axios
    .get(
      `https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel${slashCity}?${selectKeyword}$top=100&$format=JSON
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

        str += `<li class="Hotel-list-item">
        <img src=${img} alt="noImg" />
        <p>${item.Name}</p>
        <div class="hotDelicaey-block">
          <i class="fas fa-map-marker-alt"></i><span>${item.Address}</span>
        </div>
      </li>`
      })
      hotHotelContain.innerHTML = str
      Hotelpage()
    })
    .catch(function (error) {
      console.log(error)
    })
})

function Hotelpage() {
  // 每個頁面要顯示幾個項目
  var perPage = 10
  // 總共有多少個項目
  var numItems = $('.Hotel-list-item').length

  $('.Hotel-list-item').slice(perPage).hide()

  $('#pagination-container2').pagination({
    items: numItems,
    itemsOnPage: perPage,
    prevText: '&laquo;',
    nextText: '&raquo;',
    onPageClick: function (pageNumber) {
      // 計算出 起始 以及結束
      var from = perPage * (pageNumber - 1)
      var to = from + perPage
      $('.Hotel-list-item').hide().slice(from, to).show()
    },
  })
}

function Delicaeypage() {
  // 每個頁面要顯示幾個項目
  var perPage = 10
  // 總共有多少個項目
  var numItems = $('.Delicaey-list-item').length

  $('.Delicaey-list-item').slice(perPage).hide()

  $('#pagination-container').pagination({
    items: numItems,
    itemsOnPage: perPage,
    prevText: '&laquo;',
    nextText: '&raquo;',
    onPageClick: function (pageNumber) {
      // 計算出 起始 以及結束
      var from = perPage * (pageNumber - 1)
      var to = from + perPage
      $('.Delicaey-list-item').hide().slice(from, to).show()
    },
  })
}

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
