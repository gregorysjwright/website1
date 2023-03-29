const make_wheel = (prizes, winning_prize) => {
  const wheel_div = document.createElement("div");
  wheel_div.style.width = "50%";
  wheel_div.style.height = "50%";
  wheel_div.style.position = "absolute";
  wheel_div.style.transform = "translate(-50%, -50%)";  
  wheel_div.style.top = "50%";
  wheel_div.style.left = "50%";


  const angle_step = (2 * Math.PI) / prizes.length;
  const start_angle = 0;
  const spin_time = 5000 + Math.random() * 2000;
  let current_angle = start_angle;
  prizes.forEach((prize, index) => {
    const prize_div = document.createElement("div");
    prize_div.style.position = "absolute";
    prize_div.style.width = "50%";
    prize_div.style.height = prize_div.style.width;
    prize_div.style.left = "25%";
    prize_div.style.top = "25%";
    prize_div.style.transform = `rotate(${index * angle_step}rad) translateX(50%)`;
    //prize_div.style.transform-origin = "100% 100%";
    //prize_div.style.transform = `rotate(75deg) skew(60deg)`;
    prize_div.style.backgroundColor = index % 2 === 0 ? "pink" : "red";
    const prize_text = document.createElement("span");
    prize_text.textContent = prize;
    prize_text.style.display = "block";
    prize_text.style.transform = `rotate(${index * angle_step}rad)`;
    prize_div.appendChild(prize_text);
    wheel_div.appendChild(prize_div);
  });
  const play_button = document.createElement("button");
  play_button.textContent = "\u25B6";
  play_button.style.position = "absolute";
  play_button.style.top = "50%";
  play_button.style.left = "50%";
  play_button.style.transform = "translate(-50%, -50%)";
  play_button.style.backgroundColor = "orange";
  //wheel_div.appendChild(play_button);
  const animate_wheel = () => {
    const start_time = Date.now();
    const target_angle = 2 * Math.PI - (winning_prize ? prizes.indexOf(winning_prize) : Math.floor(Math.random() * prizes.length)) * angle_step;
    const animate_step = () => {
      const elapsed_time = Date.now() - start_time;
      const progress = elapsed_time / spin_time;
      if (progress >= 1) {
        current_angle = target_angle;
        if (winning_prize) {
          alert(`Congratulations! You won ${winning_prize}!`);
        }
      } else {
        current_angle = start_angle + (target_angle - start_angle) * ease_out_cubic(progress);
        requestAnimationFrame(animate_step);
      }
      wheel_div.style.transform = `translate(-50%, -50%) rotate(${current_angle}rad)`;
    };
    animate_step();
  };
  play_button.addEventListener("click", animate_wheel);
  return [wheel_div, play_button];
};

const ease_out_cubic = (t) => 1 - Math.pow(1 - t, 3);


const [my_wheel, my_button] = make_wheel(["Prize 1", "Prize 2", "Prize 3", "Prize 4", "Prize 5", "Prize 6"], "Prize 2");
//document.body.appendChild(my_wheel);
//document.body.appendChild(my_button);


function createSector(radius, startAngle, endAngle, color, text) {
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.classList.add('canvas-text');
	const ctx = canvas.getContext('2d');

        // Set canvas size to match the specified radius
	const scale = window.devicePixelRatio*20;
  	canvas.width = radius * 2 * scale;
  	canvas.height = radius * 2 * scale;
  	canvas.style.width = radius * 2 + 'px';
 	canvas.style.height = radius * 2 + 'px';
  	ctx.scale(scale, scale);
        // Draw sector
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
	ctx.fillStyle = "black";
        ctx.textAlign = "center";
	ctx.font = "bold 14px Arial";
	ctx.fillText(text, 1.5*radius, 1.5*radius);
        // Create div element to hold the canvas and return it
        const div = document.createElement('div');
        div.appendChild(canvas);
        return div;
      }


//mySector.style.position="absolute";
//mySector.style.left = "50%";
//mySector.style.top = "50%";
