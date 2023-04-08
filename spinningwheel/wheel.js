import { database, getDataFromFirebase } from './firebase.js'



function pToC(r, theta) {
  return { x:r * Math.cos(theta), y:r * Math.sin(theta) };
}

function avgPoints(p1, p2, p3) {
  return {x : (Number(p1.x) + Number(p2.x) + Number(p3.x))/3, y : (Number(p1.y) + Number(p2.y) + Number(p3.y))/3 };
}



function createPolygonDiv(colour,...points) {
    const div = document.createElement('div');
    const polygonPoints = points
      .map(({ x, y }) => `${x}px ${y}px`)
      .join(', ');
    div.style.clipPath = `polygon(${polygonPoints})`;
    div.style.backgroundColor = colour;
    div.style.height = "100%";
    div.style.width = "100%";
    return div;
  }

function createSector(r, theta_1, theta_2, pw, ph, colour, text) {
  var p1 = pToC(r, theta_1);
  var p2 = pToC(r, theta_2);
  const points = [{ x:`${p1.x + pw/2}`, y:`${-p1.y + ph/2}` },{ x:`${p2.x + pw/2}`, y:`${-p2.y + ph/2}` }, {x:pw/2, y:ph/2}]; 
  const sector = createPolygonDiv(colour, ...points);
  sector.classList.add("sector");
  const text_span = document.createElement("span");

  const move = avgPoints(points[0], points[1], points[2]);
  text_span.style.transform =  `translateX(-50%) translateY(-50%) translate(${move.x}px, ${move.y}px) rotate(-${(theta_1+theta_2)/2}rad)`;
  text_span.classList.add("text");
  text_span.innerHTML = text;
  return [sector, text_span];
}

function createSpinner(winning_prize, prizes) {
  const sectors = document.getElementById("spinner");
  sectors.style.width = Math.min(document.body.offsetHeight, document.body.offsetHeight)*0.7;
  sectors.style.height = Math.min(document.body.offsetHeight, document.body.offsetHeight)*0.7;
  

  const array = prizes
  const circle_radius = 0.5*parseFloat(sectors.style.width);
  const interior_angle = 2*Math.PI/array.length;
  
  // segments
  array.forEach((element, i) => {
    const [sector, text_span] = createSector(parseFloat(circle_radius), i*interior_angle, interior_angle*(i+1), parseFloat(sectors.style.width), parseFloat(sectors.style.width), i % 2 === 0 ? "red" : "white", element);
    sector.style.zIndex = i;

    sectors.appendChild(text_span);
    sectors.appendChild(sector);
  });
  const background = document.getElementById("container");
  background.appendChild(sectors);

  // circle cropping to make segments looks like sectors


}

const ease_out_cubic = (t) => 1 - Math.pow(1 - t, 3);

var winning_prize;
var prizes;



const animate_wheel = async (button) => {

  if (!prizes) {
    alert("Prizes not available. Are you online?");
    return;
  }
  button.disabled = true;
  const wheel_div = document.getElementById("spinner");
  wheel_div.classList.remove('animate');
  const interior_angle = 2*Math.PI/prizes.length;
  const start_time = Date.now();
  const target_angle = 2 * Math.PI - (winning_prize ? prizes.indexOf(winning_prize) : Math.floor(Math.random() * prizes.length)) * interior_angle;
  const spin_time = 5000 + Math.random() * 2000;
  const start_angle = 0;
  let current_angle = interior_angle;
  const animate_step = async () => {
    const elapsed_time = Date.now() - start_time;
    const progress = elapsed_time / spin_time;
    if (progress >= 1) {
      current_angle = target_angle;
      if (winning_prize) {
        showOverlay();
      }
    } else {
      current_angle = start_angle + (target_angle - start_angle) * ease_out_cubic(progress);
      requestAnimationFrame(animate_step);
    }
    wheel_div.style.transform = `translate(-50%, -50%) rotate(${current_angle}rad)`;
  };
  await animate_step();

};



// Function to show the overlay
function showOverlay() {
  document.getElementById("overlay").style.display = "flex";
}

// Function to hide the overlay
function hideOverlay() {
  document.getElementById("overlay").style.display = "none";
}

// Function to redirect to the reward link
function goToReward() {
  window.location.href = "../prize1.html";
  //TODO: modify this to go to the google docs url stored in database. Note this should be findable under /prizes/docforms/${index}  
}

// Set the reward link to redirect to the appropriate URL
document.getElementById("reward-link").addEventListener("click", goToReward);
























async function main(){

  await getDataFromFirebase(database, `prizes/shortnames`)
  .then((data) => {
    prizes = data;})
  .catch((error) => {
    console.error(error);
    });
         
    
  
  
    await getDataFromFirebase(database, `prizes/order/0`)
    .then((data) => {
      
      winning_prize = data;
      const button = document.getElementById("spinButton");
      button.addEventListener('click', () => {
        animate_wheel(button);
      });
      createSpinner(winning_prize, prizes);})
    .catch((error) => {
      console.error(error);
      });
             
}

main();






    