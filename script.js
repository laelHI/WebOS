//console.log("content =", content);
//console.log("content[0] =", content[0]);

setInterval(
    function updateTime(){
    document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();}
    , 1000);
 
var content = [
  {
    title: "Hello",
    date: "m/d/yy",
    content: ` <p contenteditable="True">
                Welcome to the notes app 
                  </br>
                  </br>
                  </br>
                  </br>
                  </br>
                  </br>
                  </br>
                  </br>
                  </br>
              </p>`
  }
]

//from tutorial
// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "Header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "Header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
  }

function openWindow(element) {
  element.style.display = "block";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  bar.style.zIndex = biggestIndex + 1;

}
function closeWindow(element) {
  element.style.display = "none"
}

function openAndCloseScreen(element, elementClose, elementOpen) {
  elementClose.addEventListener("click", () =>
    closeWindow(element));
  elementOpen.addEventListener("click", () =>
    openWindow(element));
}

var selectedIcon = undefined
function selectIcon(element){
  element.classList.add("selected");
  selectedIcon = element
}
function deselectIcon(element){
  element.classList.remove("selected");
  selectedIcon = undefined
}

function handleIcon(iconElement, appWindow) {
  iconElement.addEventListener("mouseover", () => {selectIcon(iconElement);
  });
  iconElement.addEventListener("mouseout", () => {deselectIcon(iconElement);
  });
  iconElement.addEventListener("click", () => {openWindow(appWindow);
  })    
}
var biggestIndex = 1;

function addWindowTapHandling(element){
  element.addEventListener("mousedown", () => 
    handleWindowTap(element))
}

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  bar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
}
var bar = document.querySelector("#webOS") 

function newWindow(elementName){
  var app = document.querySelector("#" + elementName)
  var close = document.querySelector("#" + elementName + "Close")
  var open = document.querySelector("#" + elementName + "Open")

  addWindowTapHandling(app)
  dragElement(app)
  openAndCloseScreen(app, close, open)
  addIcon(elementName)
}
function addIcon(name){
  var icon = document.querySelector("#" + name + "Open")
  var screen = document.querySelector("#" + name)

  handleIcon(icon, screen);
}

function setNotesContent(index){
  var notesContent = document.querySelector("#notesContent")

  notesContent.innerHTML = content[index].content
}

function addToSideBar(index) {
  var bar = document.querySelector("#bar");
  var note = content[index];
  var newDiv = document.createElement("div");
  newDiv.innerHTML = `
    <div class="barItem">
      <p class="bartext" id ="title" style="margin: 0px;" contenteditable="true">
      ${note.title}
      </p>
      <p class="bartext" id ="date" style="font-size: 12px; margin: 0px;" contenteditable="true">
      ${note.date}
      </p>
    </div>
    `
  newDiv.addEventListener("click", () =>{
    setNotesContent(index);
  });

  bar.appendChild(newDiv);
}
function removeFromSideBar(index) {
  var bar = document.querySelector("#bar");
  var note = content[index];
  var div = document.querySelector("div");
  //newDiv.innerHTML = `
  //  <div class="barItem">
  //    <p class="bartext" id ="title" style="margin: 0px;" contenteditable="true">
  //    ${note.title}
  //    </p>
  //    <p class="bartext" id ="date" style="font-size: 12px; margin: 0px;" contenteditable="true">
  //    ${note.date}
  //    </p>
  //  </div>
  //  `
  div.addEventListener("click", () =>{
    setNotesContent(index);
  });

  bar.remove(newDiv);
}
function addNewNote(){
  var newNote = {
    title: "New Note",
    date: "m/d/yy",
    content: `
    <p contenteditable="true">
      Add new note here...
      </br>
      </br>
      </br>
    </p>`
  };

  content.push(newNote);
  addToSideBar(content.length - 1);
  setNotesContent(content.length - 1)
}
function removeNote(){
  content.pop();

  document.querySelector("#bar").innerHTML = "";

  for (let i = 0; i < content.length; i++) {
    addToSideBar(i);
  }

  if (content.length > 0) {
    setNotesContent(content.length - 1);
  }
}

var stopwatchValue = 0;
var stopwatchInterval = null;

function timer() {
  document.getElementById("startStopwatch").addEventListener("click", () => {
  if (stopwatchInterval)
    return;
    stopwatchInterval = setInterval(() => {
      stopwatchValue++;
      updateStopwatchDisplay();
    }, 1000);
  }); 

  document.getElementById("stopStopwatch").addEventListener("click", () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  });

  document.getElementById("resetStopwatch").addEventListener("click", () => {
    stopwatchValue = 0;
    updateStopwatchDisplay();
  });

  function updateStopwatchDisplay() {
    document.getElementById("stopwatch").textContent = formatTime(stopwatchValue);
  }

  function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var mins = Math.floor((seconds / 60) % 60);
    var secs = seconds % 60;

    if (hours < 10){ 
      hours = "0" + hours;
    }
    if (mins < 10){
      mins = "0" + mins;
    }
    if (secs < 10){ 
      secs = "0" + secs;
    }


    if (hours === "00"){ 
      return mins + ":" + secs;
    }

    return hours + ":" + mins + ":" + secs;
  }
}



newWindow("welcomeApp")
newWindow("notesApp")
timer()

for (let i = 0; i < content.length; i++){
  addToSideBar(i)
}
setNotesContent(0)
document.querySelector("#addNote").addEventListener("click", addNewNote)
document.querySelector("#removeNote").addEventListener("click", removeNote)

newWindow("internetApp")
newWindow("stopwatchApp")

