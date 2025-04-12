const projects = [
  {
    title: 'Hand Recognition',
    description: 'Places dots and recognises thumbs up or down',
    image: 'projectImages/GravityArt.png',
    link: 'projects/Hands/index.html'
  },
  {
    title: 'Gravity Art',
    description: 'Using gravity and trails to create art',
    image: 'projectImages/GravityArt.png',
    link: 'projects/GravityArt/index.html'
  },
  {
    title: 'Jumpy Bird',
    description: 'Flappy Bird Clone',
    image: 'projectImages/JumpyBird.png',
    link: 'projects/flappyBird/index.html'
  },
  {
    title: 'Force Visual',
    description: 'Simulation of forces on generic objects',
    image: 'projectImages/ForceSimulator.png',
    link: 'projects/ForceVisual/index.html'
  },
  {
    title: 'Mine Sweeper',
    description: 'Bomb defusing game',
    image: 'projectImages/mineSweeper.png',
    link: 'projects/mineSweeper/mineSweeper.html'
  },
  {
    title: 'Mogi Data',
    description: 'Analysis and Visualisation of Mogi Mario Kart Races',
    image: 'projectImages/MogiData.png',
    link: 'projects/mogiData/mogiData.html'
  }
];

function displayProjects() {
  const projectsContainer = document.getElementById('projectsContainer');
  projects.forEach(project => {
    const projectElement = document.createElement('a');
    projectElement.classList.add('project');
    projectElement.href = project.link; // Make the whole div clickable
    projectElement.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project-image">
      <div class="project-details">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;
    projectsContainer.appendChild(projectElement);
  });
}

document.addEventListener('DOMContentLoaded', displayProjects);