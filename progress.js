fetch('progress-bar.json')
  .then(response => response.json())
  .then(data => {
  	const progressBar = document.getElementById('progress-bar');

	data.forEach((item, index) => {
  	const link = document.createElement('a');
  	link.href = item.href;
  	link.classList.add(...item.classes);
 	 link.id = `link${index + 1}`;

  	if (item.prize) {
    		link.innerHTML = '<span class="icon"></span><span class="stage">Prize</span>';
  	} else 	{
    		link.innerHTML = '<span class="icon"></span><span class="stage"></span>';
  	}	

  progressBar.appendChild(link);
});
  });
