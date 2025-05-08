let score = 0;
let currentHole = null;
let gameInterval = null;
const hitSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16a.mp3");

const bgm = new Audio("https://raw.githubusercontent.com/Qincongyao/Whack-a-mole/60741ec2c5cf553b6fb8c16c93afd6c7f7086c06/exploration-chiptune-rpg-adventure-theme-336428.mp3");
bgm.loop = true;
bgm.volume = 0.5;


function randomHole() {
  const index = Math.floor(Math.random() * 9);
  return document.getElementById(`hole${index}`);
}

function showMole() {
  if (currentHole) {
    currentHole.classList.remove('mole');
    currentHole.classList.remove('hit'); // 防止漏清除
  }
  currentHole = randomHole();
  currentHole.classList.add('mole');
}


document.querySelectorAll('.hole').forEach(hole => {
  hole.addEventListener('click', () => {
    if (hole === currentHole) {
      hitSound.currentTime = 0;
      hitSound.play();

      hole.classList.add('hit');

      score++;
      document.getElementById('score').textContent = `得分: ${score}`;

      // ✅ 立即移除 mole，避免新地鼠叠加问题
      hole.classList.remove('mole');
      currentHole = null;

      // ✅ 只保留 hit 效果一会儿
      setTimeout(() => {
        hole.classList.remove('hit');
      }, 600);
    }
  });
});


document.getElementById('startBtn').addEventListener('click', () => {
  score = 0;
  document.getElementById('score').textContent = `得分: ${score}`;
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(showMole, 1000);

  // 播放背景音乐
  bgm.play();
});

document.getElementById('stopBtn').addEventListener('click', () => {
  clearInterval(gameInterval); // 停止出现地鼠
  gameInterval = null;

  // 移除当前地鼠
  if (currentHole) {
    currentHole.classList.remove('mole');
    currentHole.classList.remove('hit');
    currentHole = null;
  }

  // 停止背景音乐
  bgm.pause();
  bgm.currentTime = 0;
});
