const projects = [
    {
      title: 'MineSweeper',
      description: 'Description of Project 1',
      image: 'projectImages/mineSweeper.png break',
      link: 'projects/mineSweeper.html'
    },
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
  