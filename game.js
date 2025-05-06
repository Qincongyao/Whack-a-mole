let score = 0;
let currentHole = null;

function randomHole() {
  const index = Math.floor(Math.random() * 9);
  return document.getElementById(`hole${index}`);
}

function showMole() {
  if (currentHole) {
    currentHole.classList.remove('mole');
  }
  currentHole = randomHole();
  currentHole.classList.add('mole');
}

document.querySelectorAll('.hole').forEach(hole => {
  hole.addEventListener('click', () => {
    if (hole === currentHole) {
      score++;
      document.getElementById('score').textContent = `得分: ${score}`;
      currentHole.classList.remove('mole');
      currentHole = null;
    }
  });
});

setInterval(showMole, 1000); // 每秒随机出现一个地鼠
