let fetchBtn = document.getElementById('fetchBtn')
// document.getElementById('bakupBtn')
fetchBtn.addEventListener('click', clickBtnHandler)

function clickBtnHandler() {

  // OBJECT CREATION 
  const xhr = new XMLHttpRequest();

  // OPENING OBJECT 
  xhr.open('GET', 'https://api.instantwebtools.net/v1/passenger?page=0&size=1000', true)

  // post request 
  //  xhr.open('POST' , 'https://dummy.restapiexample.com/api/v1/create' , true)
  //  xhr.getResponseHeader('Content-type' , 'application/json')

  // on progress
  xhr.onprogress = function () {
    console.log('on progress');

  }

  xhr.onreadystatechange = function () {

    console.log('ready state change ', xhr.readyState);
  }

  xhr.onload = function () {
    if (this.status === 200) {
      let str = '';
      let previousTravelerName='';
      let previousTravelerTrips=0;
      let responseObject = JSON.parse(this.responseText)
      responseObject.data.forEach(element => {
        // console.log(previousTravelerName , element.name );
        if(previousTravelerName!=element.name && previousTravelerTrips!=element.trips )
        {
        previousTravelerName=element.name;
        previousTravelerTrips=element.trips;
        str +=`<p>id:${element._id} || name:${element.name} || flight:${element.airline[0].name} </p>`
        // console.log(element.airline[0].name);
        }
        else{
          console.log("else");
        }
      });
       document.getElementById('productData').innerHTML=str;
    }
    else {
      console.log('data not found');
    }
  }

  // params=`{"name":"testxdvds","salary":"123","age":"23"}`
  //  xhr.send(params);

  xhr.send();

}
///////////////////////////////////////////////////////////////////

let populateBtn = document.getElementById('populateBtn');
populateBtn.addEventListener('click', populate);

function populate() {
  // OBJECT CREATION 
  console.log('you clicked pop handler');
  const xhr = new XMLHttpRequest();

  //OPENING OBJECT 
  xhr.open('GET', 'https://datausa.io/api/data?drilldowns=Nation&measures=Population', true)

  xhr.onload = function () {
    if (this.status === 200) {
      let obj = JSON.parse(this.responseText);
      document.getElementById('showTable').style.display = 'block'
      let list = document.getElementById('empList')
      str = ''
      for (element in obj.data) {
        // console.log(obj.data[element]["ID Nation"]);
        str += `<tr>
        <th scope="row">${obj.data[element]["ID Nation"]}</th>
        <td>${obj.data[element].Nation}</td>
        <td>${obj.data[element].Year}</td>
        <td>${obj.data[element].Population}</td>
      </tr>`
        //   // str+=`<li>${obj.data[element].Population} </li>`
        list.innerHTML = str;
        // list.innerHTML="DSfsdfsdfs"
      }
    }
    else {
      console.log('data not found');
    }
  }
  xhr.send();

}
