const projects = [
    {
      title: 'MineSweeper',
      description: 'Bomb defusing game',
      image: 'projectImages/mineSweeper.png break',
      link: 'projects/mineSweeper/mineSweeper.html'
    },
    {
      title: 'MogiData',
      description: 'Analysis and Visualisation of Mogi Mario Kart Races',
      image: 'projectImages/addWhenMadeImage',
      link: 'projects/mogiData/mogiData.html'
    },
    {
      title: 'JumpyBird',
      description: 'Flappy Bird Clone',
      image: 'projectImages/addWhenMadeImage',
      link: 'projects/flappyBird/index.html'
    },
    {
      title: 'ForceVisual',
      description: 'Simulation of forces on generic objects',
      image: 'projectImages/addWhenMadeImage',
      link: 'projects/ForceVisual/index.html'
    }
  ];
  
  function displayProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    projects.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.innerHTML = `
        <h3>${project.title}</h3>
        <img src="${project.image}" alt="${project.title}">
        <p>${project.description}</p>
        <a href="${project.link}">View Project</a>
      `;
      projectsContainer.appendChild(projectElement);
    });
  }
  
  document.addEventListener('DOMContentLoaded', displayProjects);
  