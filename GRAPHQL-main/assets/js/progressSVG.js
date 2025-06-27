function updateProgress(level) {
  const levelNoElement = document.getElementById('level-number');
  const levelsLeftElement = document.getElementById('levels-left');

  console.log('levelNumber Element:', level); 

  levelNoElement.textContent = level;
  levelsLeftElement.textContent = (60 - level) + " levels left to be a Full Stack Developer!";
}


