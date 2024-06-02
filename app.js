const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurants.json').results
// 設定 Handlebars 視圖引擎
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set ('views', './views')
// 設定靜態檔案資料夾
app.use(express.static('public'))
// 設定首頁
app.get('/', (req, res) => {
  res.redirect('/restaurants')
})
// 搜尋功能觸發時渲染符合條件的餐廳
app.get('/restaurants', (req, res)=>  {
  const keyword = req.query.search?.trim()
  const filteredRestaurants = keyword ? restaurants.filter((restaurant => 
    Object.values(restaurant).some((property) => {
      if (typeof property === 'string') { 
       return property.toLowerCase().includes(keyword.toLowerCase())
    }
    return false
  })
 )) : restaurants // 如果沒有關鍵字，顯示所有的餐廳
  res.render('index' , {restaurants : filteredRestaurants, keyword})
})
// 點擊該餐廳有更多資料
app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.find((res) => res.id.toString() === id)
  res.render('detail', { restaurant, cssFile: 'detail.css' })
})

app.get('/favorite' , (req, res) => {
 const favoriteRestaurants = restaurants.filter(res => res.contains('.fav'))
 res.render('favorite' , {restaurants: favoriteRestaurants })
})

app.listen(port, ()=>{
  console.log(`express server is running on http://localhost:${port}`)
})



