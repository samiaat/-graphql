async function fetchAndDrawPassFailRatio() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Token not found. Please log in.');
    return;
  }

  const query = `
    query {
      user {
        progressesByPath {
          succeeded
          count
          object {
            type
            name
            attrs
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    const progresses = result.data.user[0].progressesByPath;
    const projects = progresses.filter(p => p.object.type === "project");

    let passCount = 0;
    let failCount = 0;
    let passedProjects = [];
    let failedProjects = [];
    let ongoingProjects = [];

    projects.forEach(p => {
      const completed = p.object.attrs?.completed === true;

      if (p.succeeded) {
        passCount++;
        passedProjects.push(p.object?.name || "Nom inconnu");
      } else {
        if (completed) {
          failCount++;
          failedProjects.push(p.object?.name || "Nom inconnu");
        } else {
          ongoingProjects.push(p.object?.name || "Nom inconnu");
        }
      }
    });

    console.log('Pass count:', passCount);
    console.log('Fail count:', failCount);
    console.log('Projets réussis:', passedProjects);
    console.log('Projets échoués:', failedProjects);
    console.log('Projets en cours (ignorés dans le comptage):', ongoingProjects);

    updateFailPassRatio(passCount, failCount);

  } catch (error) {
    console.error('Erreur de récupération des données :', error);
  }
}

function updateFailPassRatio(passCount, failCount) {
  const svg = document.getElementById('pass-fail-ratio-svg');
  svg.innerHTML = '';
  svg.setAttribute('viewBox', '0 0 300 300');

  const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  background.setAttribute('x', '0');
  background.setAttribute('y', '0');
  background.setAttribute('width', '300');
  background.setAttribute('height', '300');
  background.setAttribute('fill', '#2c3338');
  background.setAttribute('rx', '10');
  background.setAttribute('ry', '10');
  svg.appendChild(background);

  const total = passCount + failCount;
  const passPercentage = total > 0 ? passCount / total : 0;
 

  // Cercle gris de fond
  const baseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  baseCircle.setAttribute('cx', '150');
  baseCircle.setAttribute('cy', '150');
  baseCircle.setAttribute('r', '120');
  baseCircle.setAttribute('fill', '#808080');
  svg.appendChild(baseCircle);

  if (passPercentage === 1) {
    const fullCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    fullCircle.setAttribute('cx', '150');
    fullCircle.setAttribute('cy', '150');
    fullCircle.setAttribute('r', '120');
    fullCircle.setAttribute('fill', '#FFD700');
    svg.appendChild(fullCircle);
  } else if (passPercentage > 0) {
    const passAngle = passPercentage * 2 * Math.PI;
    const endX = 150 + 120 * Math.sin(passAngle);
    const endY = 150 - 120 * Math.cos(passAngle);
    const largeArcFlag = passAngle > Math.PI ? 1 : 0;
  
    const d = `
      M 150 150
      L 150 30
      A 120 120 0 ${largeArcFlag} 1 ${endX} ${endY}
      Z
    `;
  
    const passPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    passPath.setAttribute('d', d.trim());
    passPath.setAttribute('fill', '#FFD700');
    svg.appendChild(passPath);
  }
  

  // Légende Pass / Fail
  const legend = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  legend.setAttribute('transform', 'translate(90, 300)');

  const passRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  passRect.setAttribute('x', '0');
  passRect.setAttribute('y', '-12');
  passRect.setAttribute('width', '12');
  passRect.setAttribute('height', '12');
  passRect.setAttribute('fill', '#FFD700');
  legend.appendChild(passRect);

  const passText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  passText.setAttribute('x', '18');
  passText.setAttribute('y', '-2');
  passText.setAttribute('font-family', 'Arial');
  passText.setAttribute('font-size', '12');
  passText.setAttribute('fill', '#ffffff');
  passText.textContent = `Pass: ${passCount}`;
  legend.appendChild(passText);

  const failRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  failRect.setAttribute('x', '70');
  failRect.setAttribute('y', '-12');
  failRect.setAttribute('width', '12');
  failRect.setAttribute('height', '12');
  failRect.setAttribute('fill', '#808080');
  legend.appendChild(failRect);

  const failText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  failText.setAttribute('x', '88');
  failText.setAttribute('y', '-2');
  failText.setAttribute('font-family', 'Arial');
  failText.setAttribute('font-size', '12');
  failText.setAttribute('fill', '#ffffff');
  failText.textContent = `Fail: ${failCount}`;
  legend.appendChild(failText);

  svg.appendChild(legend);
}

fetchAndDrawPassFailRatio();
