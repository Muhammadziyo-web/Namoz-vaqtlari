let select = $('.form-select'),
    mintaqaRes = $('.min')

let regions = ['Andijon', 'Buxoro', "Farg'ona", 'Jizzax', 'Xorazm', 'Namangan', 'Navoiy', 'Qashqadaryo', "Qoraqalpog'iston", 'Samarqand', 'Sirdaryo', 'Surxondaryo', 'Toshkent']
regions.sort()
regions.forEach(e => {
    let opt = createEl('option')
    opt.innerHTML = e
    select.appendChild(opt)
})

//API data request

async function data(reg) {
    let API = await fetch(`https://islomapi.uz/api/present/day?region=${reg}`)
    let datas = await API.json()
    localStorage.setItem('data', JSON.stringify(datas))
    // location.reload()
    console.log(datas);
    times()
    dataWeek(reg)
    timesWeek()
}


if (!localStorage.getItem('data')) {
    mintaqaRes.innerHTML = 'Toshkent'
    localStorage.setItem('city', 'Toshkent')
    select.value = 'Toshkent'
    data('Toshkent')

}

select.value = localStorage.getItem('city')
mintaqaRes.innerHTML = localStorage.getItem('city')

switchF()


select.addEventListener('change', (e) => {
    localStorage.setItem("city", e.target.value);
    switchF()

    // localStorage.setItem('city', val)
    select.value = localStorage.getItem('city')
    mintaqaRes.innerHTML = ''
    mintaqaRes.innerHTML = select.value


})




function times() {
    // datas.value =null
    let datas = JSON.parse(localStorage.getItem('data')).times
    // console.log(localStorage.getItem('data'));
    let {
        asr,
        hufton,
        peshin,
        quyosh,
        shom_iftor,
        tong_saharlik
    } = datas
    $('.time1').innerHTML = tong_saharlik;
    $('.time2').innerHTML = quyosh;
    $('.time3').innerHTML = peshin;
    $('.time4').innerHTML = asr;
    $('.time5').innerHTML = shom_iftor;
    $('.time6').innerHTML = hufton;
}






//soat
function clock() {
    setInterval(() => {
        const date = new Date();
        $("#hour").innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        $('.day').innerHTML = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    }, 1000);
}

clock();

//switch function
function switchF() {
    let city = localStorage.getItem("city");
    switch (city) {
        case "Farg'ona":
            data("qo'qon");
            break;
        case 'Qashqadaryo':
            data('qarshi');
            break;
        case 'Surxondaryo':
            data('termiz');
            break;
        case 'Sirdaryo':
            data('guliston');
            break;
        case 'Xorazm':
            data('urganch');
            break;
        case "Qoraqalpog'iston":
            data("nukus");
            break;
        default:
            data(city);
    }
    mintaqaRes.innerHTML = ''
    mintaqaRes.innerHTML = city
}

async function dataWeek(reg) {
    let API = await fetch(`https://islomapi.uz/api/present/week?region=${reg}`)
    let datas = await API.json()
    localStorage.setItem('dataWeek', JSON.stringify(datas))
    // location.reload()
    console.log(datas);
    timesWeek()
}


function timesWeek() {

    let data = JSON.parse(localStorage.getItem('dataWeek'))
    $('.weekRes').innerHTML = ''
    data.forEach(e => {
        let { date, region, times: {
            asr,
            hufton,
            peshin,
            quyosh,
            shom_iftor,
            tong_saharlik
        }, weekday } = e

        let dayRow = document.createElement('tr')

        dayRow.innerHTML = `
        <tr>
        <td class="first">${weekday}</td>
        <td class="second">${date.substring(0,10)}</td>
        <td>${tong_saharlik}</td>
        <td>${quyosh} </td>
        <td>${peshin} </td>
        <td>${asr} </td>
        <td>${shom_iftor} </td>
        <td>${hufton}</td>
    </tr>`

   $('.weekRes').appendChild(dayRow)

   let dateToday = new Date().getDate()
  
      if(e.date.substring(0,2)==dateToday){
          dayRow.classList.add('today')
      }
    })
}
timesWeek()

$('.week-show').addEventListener('click',()=>{
    if($('.week-show').innerHTML == 'Haftalik vaqtni ko`rish'){
        $('.week-show').innerHTML = 'Kunlik vaqtni ko`rish'
        $('.week-wrapper').style.display = 'block'
    }else{
        $('.week-show').innerHTML = 'Haftalik vaqtni ko`rish'
        $('.week-wrapper').style.display = 'none'
    }
    
    
    
})




