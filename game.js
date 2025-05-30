document.addEventListener('DOMContentLoaded', () => {
  let score = 0;
  let currentHole = null;
  let gameInterval = null;
  let isAnimating = false;

  const scoreEl = document.getElementById('score');
  const hitSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16a.mp3");
  const bgm = new Audio("https://raw.githubusercontent.com/Qincongyao/Whack-a-mole/60741ec2c5cf553b6fb8c16c93afd6c7f7086c06/exploration-chiptune-rpg-adventure-theme-336428.mp3");
  bgm.loop = true;
  bgm.volume = 0.5;

  function randomHole() {
    const index = Math.floor(Math.random() * 9);
    return document.getElementById(`hole${index}`);
  }

  function showMole() {
    if (isAnimating) return;

    if (currentHole) {
      currentHole.classList.remove('mole');
      currentHole.classList.remove('hit');
    }

    currentHole = randomHole();
    currentHole.classList.add('mole');
  }

  document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', () => {
      if (hole === currentHole && !isAnimating) {
        hitSound.currentTime = 0;
        hitSound.play();

        hole.classList.add('hit');
        isAnimating = true;

        score++;
        scoreEl.textContent = `Score: ${score}`;
        scoreEl.classList.add('bump');
        setTimeout(() => scoreEl.classList.remove('bump'), 200);

        setTimeout(() => {
          hole.classList.remove('hit');
          hole.classList.remove('mole');
          currentHole = null;
          isAnimating = false;
        }, 600);
      }
    });
  });

  document.getElementById('startBtn').addEventListener('click', () => {
    score = 0;
    scoreEl.textContent = `Score: ${score}`;
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(showMole, 1000);
    bgm.play();
  });

  document.getElementById('stopBtn').addEventListener('click', () => {
    clearInterval(gameInterval);
    gameInterval = null;

    if (currentHole) {
      currentHole.classList.remove('mole');
      currentHole.classList.remove('hit');
      currentHole = null;
    }

    isAnimating = false;
    bgm.pause();
    bgm.currentTime = 0;
  });
});
