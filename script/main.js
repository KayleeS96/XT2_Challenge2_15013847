// Function to create and run both the clockWork and date //
var time;

function startClock(offset) {
    var today = new Date(
      new Date().getTime()
    );

    today.setHours(today.getHours() + offset);

    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
    document.getElementById("clockWork").innerHTML = hr + " : " + min + " : " + sec;

    time = setTimeout(function(){ 
      startClock(activeButton.offset);
      changeRocket(activeButton.offset);  
    }, 1000)
  }
  
  function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
  
  }

  // Function to move rocket to day or night //

function changeRocket(offset){

  var d = new Date(
    new Date().getTime()
  );

  d.setHours(d.getHours() + offset);
    
  var hours = d.getHours();
  var mode = document.querySelector("#timeDay > img");

  if (hours < 6 || hours > 17) {
    mode.classList.remove('day');
    mode.classList.add('night');
  } else {
    mode.classList.remove('night');
    mode.classList.add('day');
  }

}

var activeButton = null; //the button that ISN'T shown
var inactiveButtons = [ //buttons that are shown on screen
  {
    name: "vegas",
    text: "Las Vegas (PST)",
    offset: -8,
  },
  {
    name: "dubai",
    text: "Dubai (GST)",
    offset: 3,
  },
  {
    name: "sydney",
    text: "Sydney (AEDT)",
    offset: 10,
  },
  {
    name: "hague",
    text: "The Hague (CET)",
    offset: 0
  }
];

function updateButtons(place) {
  
  if(activeButton !== null) {
    inactiveButtons.push(activeButton); // when the active button isn't null push it to the inactive buttons
  }

  activeButton = inactiveButtons.find(x => x.name === place);
  inactiveButtons = inactiveButtons.filter(p => p.name !== place);

  var buttonElements = document.querySelector("#buttons");
  buttonElements.innerHTML = ''; //clear buttons

  inactiveButtons.forEach((button, index) => { //loop over inactive buttons
    var element = document.createElement("button"); // <button>innerHTML</button>
    element.id = `city${index + 1}`; //city0, city1, city2 etc..
    element.innerHTML = button.text;
    element.onclick = () => updateButtons(button.name);

    buttonElements.appendChild(element);
  });


  time = setTimeout(function(){ 
    startClock(activeButton.offset);
    changeRocket(activeButton.offset);  
  }, 500);
}

document.addEventListener("DOMContentLoaded", function(event) {
    updateButtons('hague');
});
