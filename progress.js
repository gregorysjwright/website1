fetch('progress-bar.json')
  .then(response => response.json())
  .then(data => {
    // TODO: Move progress-bar.json to database
    const progressBar = document.getElementById('progress-bar');
    let linksHtml = '';
    let week_index = 1;

    // Wrap linksHtml in a container div with a fixed width
    const container = document.createElement('div');

    let week = document.createElement("div");
    let weekLinks = document.createElement("div");
    weekLinks.classList.add("week-links");
  
    data.forEach((item, index) => {
      const link = document.createElement('a');
      link.href = item.href;
      link.classList.add(...item.classes);
      link.id = `link${index + 1}`;
      
      link.innerHTML = '<span class="icon"></span><span class="stage"></span>';

      weekLinks.appendChild(link);
      // start new week on prize
      if (item.classes.includes("prize")){
    let week = document.createElement("div");
        week = document.createElement("div");
        weekLinks = document.createElement("div");
        const textbox = document.createElement("span");
        textbox.classList.add("week-text")
        week.classList.add("week");
        week.id = `week-${week_index}`;
        textbox.innerHTML=`Week ${week_index}`;
        week.appendChild(textbox);"week-links"
        weekLinks.classList.add("week-links");
        week.appendChild(weekLinks);
        container.appendChild(week);
        week_index++;
        
      }

    });



    // Insert container into the progress bar element
    progressBar.appendChild(container);
  });

