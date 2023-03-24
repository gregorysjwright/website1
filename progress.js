fetch('progress-bar.json')
  .then(response => response.json())
  .then(data => {
    const progressBar = document.getElementById('progress-bar');
    let linksHtml = '';

    data.forEach((item, index) => {
      const link = document.createElement('a');
      link.href = item.href;
      link.classList.add(...item.classes);
      link.id = `link${index + 1}`;

      link.innerHTML = '<span class="icon"></span><span class="stage"></span>';
      if (item.classes.includes("prize") {
        linksHtml += '<br>'; // Start new line for prize links
      }

      linksHtml += link.outerHTML;
    });

    // Wrap linksHtml in a container div with a fixed width
    const container = document.createElement('div');
    container.style.width = '800px'; // Change to desired width
    container.innerHTML = linksHtml;

    // Insert container into the progress bar element
    progressBar.appendChild(container);
  });

