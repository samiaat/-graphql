function updateProgress(level) {
  const circleElement = document.getElementById('progress');
  const levelNoElement = document.getElementById('level-number');
  const levelsLeftElement = document.getElementById('levels-left');

  //console.log("hello", progressNo);
  console.log('levelNumber Element:', circleElement); // Verify it's the correct element

  // Update the text inside the circle
  levelNoElement.textContent = level;
  levelsLeftElement.textContent = (60 - level) + " levels left to be a Full Stack Developer!";
}

updateProgress(progress);
