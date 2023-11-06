document.querySelector(".control-buttons span").onclick = function(){
    let yourname = prompt("your name");
    if(yourname === null || yourname == ""){
        document.querySelector(".name span").innerHTML = "unknown";
    }else{
        document.querySelector(".name span").innerHTML = yourname;
    }
    document.querySelector(".control-buttons").remove();
}
let duration = 1000;
function stopCLicking(){
    blocksContainer.classList.add('no-clicking');
    setTimeout(()=>{
        blocksContainer.classList.remove('no-clicking');
    },duration)
}
function checkMachedBLocks(firstblock,secondblock){
   let triesELement = document.querySelector('.tries span');
    if (firstblock.dataset.technology === secondblock.dataset.technology) {
        firstblock.classList.remove('is-flipped');
        secondblock.classList.remove('is-flipped');
        firstblock.classList.add('has-match');
        secondblock.classList.add('has-match');
    }else{
        triesELement.innerHTML = parseInt(triesELement.innerHTML) + 1 ;
        setTimeout(()=>{
            firstblock.classList.remove('is-flipped');
        secondblock.classList.remove('is-flipped');
        },duration)
    }
}
function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while(current > 0){
        random = Math.floor(Math.random()* current)
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}
function click(e){
    e.forEach((block,index) =>{
        block.style.order = orderRange[index]; // there he give the order
        block.addEventListener('click',function(){
            flipBLock(block)
        });
        
    });
}
let blocksContainer = document.createElement('div');
blocksContainer.classList.add('memory-game-blocks');
function create(e){
    let div = document.createElement('div');
    div.classList.add('game-block');
    let front = document.createElement('div');
    front.classList.add('front');
    front.classList.add('face');
    let back = document.createElement('div');
    back.classList.add('back');
    back.classList.add('face');
    let img = document.createElement('img');
    img.src = `imgs/${e}.png`;
    div.setAttribute('data-technology',e)
    back.appendChild(img);
    div.appendChild(front);
    div.appendChild(back);
    blocksContainer.appendChild(div);
}
fetch('main.json').then(
    (result)=>{
        let mydat = result.json();
        return mydat;
    }
    ).then((the)=>{
        let keys = Object.keys(the);
        keys.forEach((e)=>{
            create(e);
        })
        keys.forEach((e)=>{
            create(e);
        })
        document.body.appendChild(blocksContainer);
        let blocks = Array.from(blocksContainer.children);
        let orderRange = [...Array(blocks.length).keys()];
        blocks.forEach((block,index) =>{
            block.style.order = orderRange[index]; // there he give the order
            block.addEventListener('click',function(){
                flipBLock(block)
            });
            
        });
        shuffle(orderRange);
        function flipBLock(selectedBLock) {
            selectedBLock.classList.add('is-flipped');
            let allFlippedBLocks = blocks.filter(flipBLock => flipBLock.classList.contains('is-flipped'))
            if (allFlippedBLocks.length === 2) {
                stopCLicking();
                checkMachedBLocks(allFlippedBLocks[0],allFlippedBLocks[1]);
            }
        }
    })
///////////////////////////////////////////////
// Create overlay
const overlay = document.createElement("div");
overlay.classList.add("overlay");

// Create modal dialog box
const modal = document.createElement("div");
modal.classList.add("modal");

// Create input field
const input = document.createElement("input");
input.setAttribute("type", "text");
input.placeholder = 'WHAT IS YOUR NAME ?'
// Create buttons
const okButton = document.createElement("button");
okButton.textContent = "OK";
const cancelButton = document.createElement("button");
cancelButton.textContent = "Cancel";
cancelButton.classList.add("cancel");

// Add elements to modal dialog box
modal.appendChild(input);
modal.appendChild(okButton);
modal.appendChild(cancelButton);

// Add modal dialog box to overlay
overlay.appendChild(modal);

// Add overlay to body
document.body.appendChild(overlay);

// Handle OK button click
okButton.addEventListener("click", function() {
    const userInput = input.value;
    console.log("User input:", userInput);
    closeDialog();
  });
  
  // Handle Cancel button click
  cancelButton.addEventListener("click", function() {
    console.log("User cancelled input.");
    closeDialog();
  });
  
  // Function to close the dialog box
  function closeDialog() {
    document.body.removeChild(overlay);
  }

