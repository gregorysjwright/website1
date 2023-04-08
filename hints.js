import { database, setInFirebase, getDataFromFirebase, queryDatabase } from './firebase.js'
		
async function getHint(database, type, index) {
    
    if (index === "next"){
        await getDataFromFirebase(database, `hints/count/${type}`)
        .then((data) => {
            index = data;
                            console.log(data);
                            setInFirebase(database, `hints/count/${type}`, index+1);

                    })
                        .catch((error) => {
                            console.error(error);
                    });
    }
    console.log("Index: "+index);

    return getDataFromFirebase(database, `hints/data/${type}/${index}`)
    .then((data) => {
        console.log("data:"+ data)
        return data;
    })
    .catch((error) => {
                        console.error(error);
                        return {};
                });
}

function showOverlay() {
    const overlay = document.getElementById("hintsOverlay");
    overlay.style.display = 'inline-block';
  }
  
  function hideOverlay() {
    const overlay = document.getElementById("hintsOverlay");
    overlay.style.display = 'none';
  }



getDataFromFirebase(database, 'hints')
.then((snapshot) => {
    console.log(snapshot);
    
    const body = document.querySelector("body");
    const hints = snapshot;

    const overlay = document.createElement('div');
    overlay.id = "hintsOverlay";
    const overlayContent = document.createElement('div');
    overlayContent.id = "hintsOverlayContent"



    Object.keys(hints.data).forEach((value) => {
        const div = document.createElement("div");
        div.classList.add("hintBox");
        div.innerHTML = value;
        overlayContent.appendChild(div);
    });
    
    var boxes = overlayContent.querySelectorAll('.hintBox');
    const hintMessage = document.createElement("div");
    console.log("yo");
    boxes.forEach(function(box) {
        console.log("yo");
    box.addEventListener('click', function handleClick() {
                
            getHint(database, box.innerText, "next").then((hint) =>{
                console.log(hint);
                if (hint) {
                    hintMessage.innerText = hint;
                }			
                else {
                    box.removeEventListener('click', handleClick);
                    hintMessage.innerText = `None remaining of this type ${box.innerText}`;
                    box.innerText = "N/A";
                }	
            });
        });
        
    });
    overlayContent.appendChild(hintMessage);
    overlay.appendChild(overlayContent);
    body.appendChild(overlay);

});
