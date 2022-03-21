# **Eco-system**
## **E**lectric **C**ar **O**ptimization - **System**

Server Homepage: http://115.85.181.94:3000/  
( Server is currently not running )
( Using Node JS, express server )

Contributers: [seonghyun26](https://github.com/seonghyun26), [hyungus](https://github.com/hyungus), [YOUNGDON0903](https://github.com/YOUNGDON0903)

Competition Homepage: https://home.kepco.co.kr/kepco/NS/main/main.do  


---

## 1. Charge
- By Battery
: Charge enabled at the cheapest moment before going out
    - Check goal battery
    - Check left time & number of charge needed, Charge if (left time) <= (number of charge needed)
    - Get data from lowest price with time, pick hours before the exit time which has the lowest price
- By Price
: Charge enabled when current price is below the price user typed


## 2. User Status
- Show users currently charging
- Today's price of eletricity car charge by hours

## 3. Arduino
- Locked by password
- View & control charger

## 4. API
- Using [Open Portal Data API](https://www.data.go.kr/index.do)
- Chart made by using [Chart.js](https://www.chartjs.org/)
- Predicted Temperature of (3*n) hours later from now
- SMP (System Marginal Cost) data of that day in hours

## 5.Archive
- Data from DB about Weather, SMP, Load(Electicity load)
- Today's price of eletricity car charge by hours
