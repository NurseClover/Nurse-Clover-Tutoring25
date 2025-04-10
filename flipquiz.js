let allData = {
  '서론': [...Array(30).keys()].map(i => ({ front: '용어' + i, back: 'Term' + i, desc: '설명' + i })),
  '세포와조직': [...Array(30).keys()].map(i => ({ front: '세포' + i, back: 'Cell' + i, desc: '세포 설명' + i })),
  '뼈대계통': [...Array(30).keys()].map(i => ({ front: '뼈' + i, back: 'Bone' + i, desc: '뼈 설명' + i })),
  '관절계통': [...Array(30).keys()].map(i => ({ front: '관절' + i, back: 'Joint' + i, desc: '관절 설명' + i })),
  '근육계통': [...Array(30).keys()].map(i => ({ front: '근육' + i, back: 'Muscle' + i, desc: '근육 설명' + i })),
  '신경계통': [...Array(30).keys()].map(i => ({ front: '신경' + i, back: 'Nerve' + i, desc: '신경 설명' + i })),
  '랜덤': []
};

let timer, score = 0, total = 0;

function startQuiz() {
  clearInterval(timer);
  document.getElementById('quiz-container').innerHTML = '';
  const chapter = document.getElementById('chapter').value;
  const data = allData[chapter];
  const shuffled = data.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 20).concat(
    shuffled.slice(0, 20).map(d => ({ ...d, front: d.back, back: d.front }))
  ).sort(() => 0.5 - Math.random());

  total = selected.length;
  score = 0;
  document.getElementById('score').textContent = `정답: 0/${total}`;

  selected.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = item.front;
    card.onclick = () => {
      const correct = item.front === selected[index].front;
      if (card.dataset.flipped) return;
      const answer = prompt(`${item.front}의 영어/한글은?`);
      if (answer === item.back) {
        card.classList.add('correct');
        score++;
        document.getElementById('score').textContent = `정답: ${score}/${total}`;
        const utter = new SpeechSynthesisUtterance(item.back);
        speechSynthesis.speak(utter);
      } else {
        card.classList.add('wrong');
        setTimeout(() => {
          card.classList.remove('wrong');
        }, 800);
      }
      card.dataset.flipped = true;
    };
    document.getElementById('quiz-container').appendChild(card);
  });

  let remaining = 300;
  timer = setInterval(() => {
    if (--remaining <= 0) {
      clearInterval(timer);
      alert("시간 종료!");
    }
    const m = String(Math.floor(remaining / 60)).padStart(2, '0');
    const s = String(remaining % 60).padStart(2, '0');
    document.getElementById('timer').textContent = `${m}:${s}`;
  }, 1000);
}


// 랜덤 챕터 선택 시 전체 데이터에서 섞어서 30개 카드로 구성
function gatherAllData() {
  let combined = [];
  Object.keys(allData).forEach(ch => {
    if (ch !== "랜덤") combined = combined.concat(allData[ch]);
  });
  return combined.sort(() => 0.5 - Math.random()).slice(0, 30);
}

function startQuiz() {
  clearInterval(timer);
  document.getElementById('quiz-container').innerHTML = '';
  let chapter = document.getElementById('chapter').value;
  let data = (chapter === '랜덤') ? gatherAllData() : allData[chapter];
  const shuffled = data.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 20).concat(
    shuffled.slice(0, 20).map(d => ({ ...d, front: d.back, back: d.front }))
  ).sort(() => 0.5 - Math.random());

  total = selected.length;
  score = 0;
  document.getElementById('score').textContent = `정답: 0/${total}`;

  selected.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = item.front;
    card.onclick = () => {
      if (card.dataset.flipped) return;
      const answer = prompt(`${item.front}의 영어/한글은?`);
      if (answer === item.back) {
        card.classList.add('correct');
        score++;
        document.getElementById('score').textContent = `정답: ${score}/${total}`;
        const utter = new SpeechSynthesisUtterance(item.back);
        speechSynthesis.speak(utter);
      } else {
        card.classList.add('wrong');
        setTimeout(() => {
          card.classList.remove('wrong');
        }, 800);
      }
      card.dataset.flipped = true;
    };
    document.getElementById('quiz-container').appendChild(card);
  });

  let remaining = 300;
  timer = setInterval(() => {
    if (--remaining <= 0) {
      clearInterval(timer);
      alert("시간 종료!");
    }
    const m = String(Math.floor(remaining / 60)).padStart(2, '0');
    const s = String(remaining % 60).padStart(2, '0');
    document.getElementById('timer').textContent = `${m}:${s}`;
  }, 1000);
}
