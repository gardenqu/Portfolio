let data = [];
let timelineData = [];

fetch('./projects.json')
  .then(res => res.json())
  .then(json => {
    data = json.projects;
    createCards(data);
  });

fetch('./work.json')
  .then(res => res.json())
  .then(json => {
    timelineData = json.timelineData;
  });

// REMOVED window.onload — it was calling createCards(data) before the fetch

function createCards(data) {
  const projectsSection = document.getElementById('projects');
  projectsSection.innerHTML = "<h2>Projects</h2><div class='card-container'></div>";
  const container = projectsSection.querySelector('.card-container');

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    // ---------------------------
    // Side 1 (content/back face)
    // ---------------------------
    const face1 = document.createElement('div');
    face1.className = 'face face1';

    const content = document.createElement('div');
    content.className = 'content';

    const h2 = document.createElement('h2');
    h2.textContent = item.name;

    const p = document.createElement('p');
    p.textContent = item.description;

    content.appendChild(h2);
    content.appendChild(p);

 
    if (item.gitHub_link) {
      const gitLink = document.createElement('a');
      gitLink.href = item.gitHub_link;
      gitLink.target = "_blank";
      gitLink.textContent = "GitHub Repository";
      content.appendChild(gitLink);
    }

    if (item.live) {
      const link = document.createElement('a');
      link.href = item.link;
      link.target = "_blank";
      link.textContent = "View Project";
      content.appendChild(link);
    }

    face1.appendChild(content);

    // ---------------------------
    // Side 2 (front/image face)
    // ---------------------------
    const face2 = document.createElement('div');
    face2.className = 'face face2';

    const img = document.createElement('img');
    img.src = item.images || "https://placehold.co/600x800";
    img.alt = item.name;  
    face2.appendChild(img);

    card.appendChild(face1);
    card.appendChild(face2);
    container.appendChild(card);
  });
}

function renderCareerSection(data) {
  const projectsSection = document.getElementById('projects');
  projectsSection.innerHTML = "<h2>Career</h2><div class='career-container'></div>";
  const container = projectsSection.querySelector('.career-container');

  data.forEach(item => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    timelineItem.innerHTML = `
      <div class="timeline-content">
        <h3>${item.role}</h3>
        <span class="company">${item.company}</span>
        <span class="duration">${item.duration}</span>
        <p>${item.description}</p>
        <p><strong>Skills:</strong> ${item.skills.join(", ")}</p>
      </div>
    `;
    container.appendChild(timelineItem);
  });
}

document.getElementById('career-link').addEventListener('click', e => {
  e.preventDefault();
  renderCareerSection(timelineData);
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('project-link').addEventListener('click', e => {
  e.preventDefault();
  createCards(data);
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});
