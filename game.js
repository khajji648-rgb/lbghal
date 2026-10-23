// Target Cheek Challenge - تحدي لوحة الرشق
// Full Interactive HTML5 Canvas Game Engine

const I18N = {
  ar: {
    gameTitle: "تحدي لوحة الرشق!",
    gameSubtitle: "أصِب لوحة الهدف المعلقة على بطلنا في الحديقة المشمسة واجمع أعلى النقاط!",
    score: "النقاط",
    combo: "المضاعف",
    darts: "الأسهم",
    dartClassic: "كلاسيكي",
    dartGold: "ذهبي (x2)",
    dartPlunger: "شفاطة",
    dartFire: "لهب",
    aimClick: "🎯 صوب وانقر",
    aimDrag: "🏹 شد وأفلت",
    modeCareer: "مغامرة المراحل",
    modeCareerDesc: "5 مراحل تزداد حركة وسرعة ورياحاً",
    modeBlitz: "تحدي الـ 60 ثانية",
    modeBlitzDesc: "ارمِ بأسرع ما يمكن لتحطيم الرقم القياسي",
    modeFree: "تدريب مفتوح",
    modeFreeDesc: "أسهم غير محدودة لاختبار التصويب",
    playNow: "🚀 ابدأ اللعب الآن",
    highScore: "أعلى رقم قياسي:",
    levelCleared: "رائع! أكملت المرحلة!",
    levelFailed: "لم تحقق النقاط المطلوبة!",
    levelScore: "نقاط المرحلة:",
    bullseyes: "إصابات في منتصف الهدف (Bullseye):",
    accuracy: "دقة التصويب:",
    nextLevel: "المرحلة التالية ⏩",
    replay: "إعادة المحاولة 🔄",
    gameOver: "انتهت الجولة!",
    finalScore: "مجموع النقاط النهائي:",
    playAgain: "العب مجدداً 🎯",
    windSpeed: "م/ث",
    levelNames: [
      "المرحلة 1: التدريب الهادئ",
      "المرحلة 2: المشي المتمايل",
      "المرحلة 3: رقصة المراوغة",
      "المرحلة 4: الجري السريع",
      "المرحلة 5: العاصفة القصوى"
    ],
    shouts: [
      "آخخخ!", "يا ساتر!", "في منتصف الهدف!", "ركز يا كابتن!",
      "تسلم إيدك!", "ضربة معلم!", "مؤلمة جداً!", "والله حسيت فيها!",
      "عين الصقر!", "مستحيل!"
    ],
    bullseyeTxt: "🎯 في قلب الهدف! +100",
    hitTxt: "إصابة ممتازة!",
    grazeTxt: "كشط خفيف!",
    missTxt: "خارج الهدف!"
  },
  en: {
    gameTitle: "Target Cheek Challenge!",
    gameSubtitle: "Hit the dartboard mounted on our hero's cheeks in the sunny park to score big!",
    score: "Score",
    combo: "Combo",
    darts: "Darts",
    dartClassic: "Classic",
    dartGold: "Gold (x2)",
    dartPlunger: "Plunger",
    dartFire: "Fire",
    aimClick: "🎯 Point & Click",
    aimDrag: "🏹 Slingshot Drag",
    modeCareer: "Career Levels",
    modeCareerDesc: "5 stages with increasing speed, movement & wind",
    modeBlitz: "60-Second Blitz",
    modeBlitzDesc: "Throw as fast as you can to beat high score",
    modeFree: "Free Practice",
    modeFreeDesc: "Unlimited darts to master your aim",
    playNow: "🚀 Play Now",
    highScore: "High Score:",
    levelCleared: "Level Completed!",
    levelFailed: "Target score not reached!",
    levelScore: "Level Score:",
    bullseyes: "Direct Bullseyes:",
    accuracy: "Accuracy:",
    nextLevel: "Next Level ⏩",
    replay: "Try Again 🔄",
    gameOver: "Game Over!",
    finalScore: "Final Total Score:",
    playAgain: "Play Again 🎯",
    windSpeed: "m/s",
    levelNames: [
      "Level 1: Gentle Warmup",
      "Level 2: Cheek Shuffle",
      "Level 3: Wiggle & Dodge",
      "Level 4: Sprinting Cheeks",
      "Level 5: Hypersonic Storm"
    ],
    shouts: [
      "Ouch!", "Bullseye!", "Right on target!", "That stings!",
      "Direct hit!", "Hey watch it!", "Nice shot!", "Right in the cheeks!",
      "Bullseye master!", "Oof!"
    ],
    bullseyeTxt: "🎯 BULLSEYE! +100",
    hitTxt: "GREAT HIT!",
    grazeTxt: "Cheek Graze!",
    missTxt: "MISSED!"
  }
};

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.container = document.getElementById('game-container');

    this.lang = 'ar';
    this.gameMode = 'career';
    this.aimMode = 'click'; // 'click' or 'drag'
    this.selectedDart = 'classic';

    this.level = 1;
    this.maxLevels = 5;
    this.score = 0;
    this.levelScore = 0;
    this.combo = 1;
    this.bullseyes = 0;
    this.shotsFired = 0;
    this.shotsHit = 0;
    this.totalDartsInLevel = 10;
    this.dartsLeft = 10;

    this.blitzTimer = 60;
    this.blitzInterval = null;

    this.highScore = parseInt(localStorage.getItem('dart_cheek_highscore') || '0', 10);

    // Wind
    this.wind = 0; // -10 to +10

    // Assets
    this.characterImg = new Image();
    this.characterImg.src = 'assets/character.png';
    this.characterLoaded = false;
    this.characterImg.onload = () => { this.characterLoaded = true; };

    // Character position & physics
    this.char = {
      x: 0,
      y: 0,
      baseY: 0,
      width: 220,
      height: 380,
      vx: 2,
      dir: 1,
      swayAngle: 0,
      jiggle: 0,
      jiggleAngle: 0,
      jumpOffset: 0,
      jumpVy: 0,
      isOnFire: 0,
      bubbleText: null,
      bubbleTimer: 0
    };

    // Dartboard location relative to character (from earlier coordinate analysis)
    // Butt center is approx at x: 60% of char width, y: 57.6% of char height
    this.targetRelX = 0.60;
    this.targetRelY = 0.576;
    this.targetRadius = 55; // board radius in pixels

    // Active thrown darts in flight
    this.flyingDarts = [];

    // Stuck darts attached to the target board
    this.stuckDarts = [];

    // Visual FX & particles
    this.particles = [];
    this.floatingTexts = [];
    this.clouds = [];
    this.butterflies = [];

    // Drag / Slingshot state
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.dragCurrent = { x: 0, y: 0 };
    this.mousePos = { x: 0, y: 0 };

    this.state = 'START'; // 'START', 'PLAYING', 'LEVEL_COMPLETE', 'GAMEOVER'
    this.lastTime = performance.now();

    this.initClouds();
    this.initButterflies();
    this.setupEventListeners();
    this.resizeCanvas();
    this.updateLanguageUI();
    this.updateHUD();

    window.addEventListener('resize', () => this.resizeCanvas());

    requestAnimationFrame((t) => this.gameLoop(t));
  }

  resizeCanvas() {
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;

    // Reset character dimensions and base position
    const ch = Math.min(rect.height * 0.65, 480);
    const cw = ch * (767 / 1024);
    this.char.width = cw;
    this.char.height = ch;
    this.targetRadius = cw * 0.28;

    if (this.state === 'START') {
      this.char.x = this.canvas.width * 0.55;
    }
    this.char.baseY = this.canvas.height - this.char.height - 40;
    this.char.y = this.char.baseY;
  }

  initClouds() {
    this.clouds = [];
    for (let i = 0; i < 5; i++) {
      this.clouds.push({
        x: Math.random() * 1200,
        y: 40 + Math.random() * 120,
        scale: 0.6 + Math.random() * 0.8,
        speed: 0.15 + Math.random() * 0.25
      });
    }
  }

  initButterflies() {
    this.butterflies = [];
    for (let i = 0; i < 4; i++) {
      this.butterflies.push({
        x: Math.random() * 800,
        y: 200 + Math.random() * 300,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        color: ['#ff4757', '#ffa502', '#2ed573', '#1e90ff'][i % 4],
        flap: 0
      });
    }
  }

  setupEventListeners() {
    // Mode buttons in Start screen
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        window.sounds.playClick();
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.gameMode = btn.dataset.mode;
      });
    });

    // Start Play CTA
    document.getElementById('start-play-btn').addEventListener('click', () => {
      window.sounds.playClick();
      window.sounds.startMusic();
      this.startGame();
    });

    // Next Level Button
    document.getElementById('next-level-btn').addEventListener('click', () => {
      window.sounds.playClick();
      this.nextLevel();
    });

    // Retry Level Button
    document.getElementById('retry-level-btn').addEventListener('click', () => {
      window.sounds.playClick();
      this.startLevel(this.level);
      document.getElementById('level-modal').classList.remove('active');
    });

    // Play Again Button
    document.getElementById('play-again-btn').addEventListener('click', () => {
      window.sounds.playClick();
      document.getElementById('game-over-modal').classList.remove('active');
      document.getElementById('start-screen').classList.add('active');
      this.state = 'START';
    });

    // Dart selector dock
    document.querySelectorAll('.dart-select').forEach(btn => {
      btn.addEventListener('click', () => {
        window.sounds.playClick();
        document.querySelectorAll('.dart-select').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedDart = btn.dataset.type;
      });
    });

    // Aim Mode Toggle (Click vs Drag)
    const modeClick = document.getElementById('mode-click');
    const modeDrag = document.getElementById('mode-drag');
    modeClick.addEventListener('click', () => {
      window.sounds.playClick();
      modeClick.classList.add('active');
      modeDrag.classList.remove('active');
      this.aimMode = 'click';
    });
    modeDrag.addEventListener('click', () => {
      window.sounds.playClick();
      modeDrag.classList.add('active');
      modeClick.classList.remove('active');
      this.aimMode = 'drag';
    });

    // Audio & Lang controls
    document.getElementById('sound-btn').addEventListener('click', () => {
      const enabled = window.sounds.toggleSound();
      document.getElementById('sound-btn').innerText = enabled ? '🔊' : '🔇';
    });

    document.getElementById('music-btn').addEventListener('click', () => {
      const enabled = window.sounds.toggleMusic();
      document.getElementById('music-btn').innerText = enabled ? '🎵' : '🎼';
    });

    document.getElementById('lang-btn').addEventListener('click', () => {
      window.sounds.playClick();
      this.lang = this.lang === 'ar' ? 'en' : 'ar';
      this.updateLanguageUI();
    });

    // Canvas Pointer Events
    this.canvas.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
    window.addEventListener('pointermove', (e) => this.handlePointerMove(e));
    window.addEventListener('pointerup', (e) => this.handlePointerUp(e));
  }

  updateLanguageUI() {
    const t = I18N[this.lang];
    document.documentElement.lang = this.lang;
    document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr';

    document.getElementById('lang-btn').innerText = this.lang === 'ar' ? '🌐 AR' : '🌐 EN';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.innerText = t[key];
    });

    document.getElementById('best-score-display').innerText = this.highScore;
    this.updateHUD();
  }

  startGame() {
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('level-modal').classList.remove('active');
    document.getElementById('game-over-modal').classList.remove('active');

    this.score = 0;
    this.combo = 1;
    this.level = 1;
    this.startLevel(1);
  }

  startLevel(lvl) {
    this.level = lvl;
    this.levelScore = 0;
    this.bullseyes = 0;
    this.shotsFired = 0;
    this.shotsHit = 0;
    this.stuckDarts = [];
    this.flyingDarts = [];
    this.particles = [];
    this.floatingTexts = [];
    this.state = 'PLAYING';

    // Set Level parameters
    if (this.gameMode === 'career') {
      this.totalDartsInLevel = 10;
      this.dartsLeft = 10;
      // Configure movement speed and wind
      this.char.vx = 1.2 + (lvl - 1) * 0.9;
      this.wind = (lvl > 2) ? (Math.random() * 8 - 4) * (lvl * 0.25) : 0;
    } else if (this.gameMode === 'blitz') {
      this.totalDartsInLevel = 999;
      this.dartsLeft = 999;
      this.blitzTimer = 60;
      this.char.vx = 2.5;
      this.wind = Math.random() * 6 - 3;

      if (this.blitzInterval) clearInterval(this.blitzInterval);
      this.blitzInterval = setInterval(() => {
        if (this.state !== 'PLAYING') return;
        this.blitzTimer--;
        if (this.blitzTimer <= 0) {
          clearInterval(this.blitzInterval);
          this.endGame();
        }
        this.updateHUD();
      }, 1000);
    } else { // Free mode
      this.totalDartsInLevel = 999;
      this.dartsLeft = 999;
      this.char.vx = 1.8;
      this.wind = 0;
    }

    this.char.x = this.canvas.width * 0.55;
    this.updateHUD();
  }

  updateHUD() {
    const t = I18N[this.lang];
    document.getElementById('score-val').innerText = this.score;
    document.getElementById('combo-val').innerText = `x${this.combo}`;

    // Level Title or Blitz timer
    const levelTitleEl = document.getElementById('level-title');
    if (this.gameMode === 'blitz') {
      levelTitleEl.innerText = `⏱️ ${this.blitzTimer}s`;
    } else if (this.gameMode === 'free') {
      levelTitleEl.innerText = t.modeFree;
    } else {
      levelTitleEl.innerText = t.levelNames[this.level - 1] || `${t.levelScore} ${this.level}`;
    }

    // Wind indicator
    const windArrow = document.getElementById('wind-arrow');
    const windVal = document.getElementById('wind-val');
    const speed = Math.abs(this.wind).toFixed(1);
    windVal.innerText = `${speed} ${t.windSpeed}`;
    windArrow.style.transform = `rotate(${this.wind >= 0 ? 0 : 180}deg)`;

    // Dart Icons container
    const iconsContainer = document.getElementById('dart-icons-container');
    iconsContainer.innerHTML = '';
    if (this.gameMode === 'career') {
      for (let i = 0; i < this.totalDartsInLevel; i++) {
        const icon = document.createElement('span');
        icon.className = `dart-mini-icon ${i >= this.dartsLeft ? 'used' : ''}`;
        iconsContainer.appendChild(icon);
      }
    } else {
      const infiniteSpan = document.createElement('span');
      infiniteSpan.innerText = '♾️';
      infiniteSpan.style.fontSize = '18px';
      iconsContainer.appendChild(infiniteSpan);
    }
  }

  handlePointerDown(e) {
    if (this.state !== 'PLAYING') return;
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (this.aimMode === 'drag') {
      this.isDragging = true;
      this.dragStart = { x, y };
      this.dragCurrent = { x, y };
    } else {
      // Direct click to shoot
      this.throwDartTowards(x, y);
    }
  }

  handlePointerMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.mousePos = { x, y };

    if (this.isDragging) {
      this.dragCurrent = { x, y };
    }
  }

  handlePointerUp(e) {
    if (this.isDragging) {
      this.isDragging = false;
      const dx = this.dragStart.x - this.dragCurrent.x;
      const dy = this.dragStart.y - this.dragCurrent.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 25) {
        // Launch along vector
        const power = Math.min(dist / 140, 1.8);
        const targetX = this.dragStart.x + dx * 2.5 * power;
        const targetY = this.dragStart.y + dy * 2.5 * power;
        this.throwDartTowards(targetX, targetY);
      }
    }
  }

  throwDartTowards(tx, ty) {
    if (this.dartsLeft <= 0) return;
    if (this.gameMode === 'career') {
      this.dartsLeft--;
    }
    this.shotsFired++;
    this.updateHUD();

    window.sounds.playDartThrow();

    // Spawn from bottom center
    const sx = this.canvas.width / 2;
    const sy = this.canvas.height - 20;

    // Apply wind drift
    const finalTx = tx + this.wind * 10;
    const finalTy = ty;

    this.flyingDarts.push({
      startX: sx,
      startY: sy,
      targetX: finalTx,
      targetY: finalTy,
      x: sx,
      y: sy,
      progress: 0,
      speed: 0.045, // takes ~22 frames
      type: this.selectedDart,
      scale: 1.8,
      rotation: Math.atan2(finalTy - sy, finalTx - sx)
    });
  }

  checkHit(dart) {
    // Current live center of target on the buttocks
    const boardPos = this.getTargetCenter();
    const dist = Math.hypot(dart.x - boardPos.x, dart.y - boardPos.y);

    const radius = this.targetRadius;

    if (dist <= radius * 1.25) {
      // HIT!
      this.shotsHit++;
      let basePoints = 0;
      let isBullseye = false;
      let hitText = '';

      if (dist <= radius * 0.22) {
        // Bullseye!
        basePoints = 100;
        isBullseye = true;
        this.bullseyes++;
        hitText = I18N[this.lang].bullseyeTxt;
        this.spawnConfetti(boardPos.x, boardPos.y, 35);
      } else if (dist <= radius * 0.55) {
        basePoints = 60;
        hitText = `+60 ${I18N[this.lang].hitTxt}`;
      } else if (dist <= radius * 0.85) {
        basePoints = 40;
        hitText = `+40 ${I18N[this.lang].hitTxt}`;
      } else if (dist <= radius) {
        basePoints = 25;
        hitText = `+25 ${I18N[this.lang].hitTxt}`;
      } else {
        basePoints = 10;
        hitText = `+10 ${I18N[this.lang].grazeTxt}`;
      }

      // Dart type bonus
      let multiplier = 1;
      if (dart.type === 'gold') multiplier = 2;
      if (dart.type === 'fire') {
        multiplier = 1.5;
        this.char.isOnFire = 90; // flame frames
      }

      const totalEarned = Math.round(basePoints * multiplier * this.combo);
      this.score += totalEarned;
      this.levelScore += totalEarned;
      this.combo++;

      // Trigger comic sound and character reaction
      window.sounds.playHit(isBullseye);
      if (Math.random() < 0.65 || isBullseye) {
        window.sounds.playYelp();
      }

      // Jiggle buttocks physics
      this.char.jiggle = 22;
      this.char.jumpVy = -6.5;

      // Comic speech bubble
      const quotes = I18N[this.lang].shouts;
      this.char.bubbleText = quotes[Math.floor(Math.random() * quotes.length)];
      this.char.bubbleTimer = 65;

      // Floating text effect
      this.floatingTexts.push({
        text: `${hitText} (+${totalEarned})`,
        x: boardPos.x,
        y: boardPos.y - 30,
        vy: -2,
        alpha: 1,
        color: isBullseye ? '#ffd32a' : '#ff4757',
        scale: isBullseye ? 1.4 : 1.0
      });

      // Sparks
      this.spawnSparks(dart.x, dart.y, isBullseye ? '#ffd32a' : '#ff6b81', 16);

      // Attach stuck dart relative to the target board center
      this.stuckDarts.push({
        relX: (dart.x - boardPos.x) / radius,
        relY: (dart.y - boardPos.y) / radius,
        type: dart.type,
        angle: dart.rotation + (Math.random() - 0.5) * 0.2
      });

    } else {
      // Missed!
      this.combo = 1;
      window.sounds.playMiss();

      this.floatingTexts.push({
        text: I18N[this.lang].missTxt,
        x: dart.x,
        y: dart.y,
        vy: -1.5,
        alpha: 1,
        color: '#747d8c',
        scale: 0.9
      });
      this.spawnSparks(dart.x, dart.y, '#a4b0be', 8);
    }

    this.updateHUD();

    // Check level completion
    if (this.gameMode === 'career' && this.dartsLeft <= 0 && this.flyingDarts.length <= 1) {
      setTimeout(() => this.checkLevelCompletion(), 800);
    }
  }

  getTargetCenter() {
    return {
      x: this.char.x + this.char.width * this.targetRelX,
      y: this.char.y + this.char.jumpOffset + this.char.height * this.targetRelY
    };
  }

  checkLevelCompletion() {
    if (this.state !== 'PLAYING') return;

    // Required scores per level
    const thresholds = [300, 500, 700, 900, 1100];
    const targetThreshold = thresholds[this.level - 1] || 400;

    const cleared = this.levelScore >= targetThreshold;
    const accuracy = this.shotsFired > 0 ? Math.round((this.shotsHit / this.shotsFired) * 100) : 0;

    if (cleared) {
      window.sounds.playVictory();
      this.state = 'LEVEL_COMPLETE';

      document.getElementById('modal-level-status').innerText = I18N[this.lang].levelCleared;
      document.getElementById('stat-level-score').innerText = this.levelScore;
      document.getElementById('stat-bullseyes').innerText = this.bullseyes;
      document.getElementById('stat-accuracy').innerText = `${accuracy}%`;

      // Star calculation
      const stars = document.querySelectorAll('#stars-container .star-icon');
      stars.forEach(s => s.classList.remove('filled'));
      stars[0].classList.add('filled');
      if (this.levelScore >= targetThreshold * 1.3) stars[1].classList.add('filled');
      if (this.levelScore >= targetThreshold * 1.6 || this.bullseyes >= 3) stars[2].classList.add('filled');

      document.getElementById('level-modal').classList.add('active');
    } else {
      this.endGame();
    }
  }

  nextLevel() {
    document.getElementById('level-modal').classList.remove('active');
    if (this.level < this.maxLevels) {
      this.startLevel(this.level + 1);
    } else {
      this.endGame();
    }
  }

  endGame() {
    this.state = 'GAMEOVER';
    if (this.blitzInterval) clearInterval(this.blitzInterval);

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('dart_cheek_highscore', this.highScore);
    }

    document.getElementById('gameover-score').innerText = this.score;
    document.getElementById('game-over-modal').classList.add('active');
  }

  spawnSparks(x, y, color, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 3,
        color,
        alpha: 1,
        decay: 0.03 + Math.random() * 0.02
      });
    }
  }

  spawnConfetti(x, y, count) {
    const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#ffd32a', '#e84393'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 5 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.015,
        rot: Math.random() * 6,
        rotSpeed: (Math.random() - 0.5) * 0.2
      });
    }
  }

  update(dt) {
    // Clouds drifting
    this.clouds.forEach(cloud => {
      cloud.x += cloud.speed;
      if (cloud.x > this.canvas.width + 150) cloud.x = -150;
    });

    // Butterflies flutter
    this.butterflies.forEach(b => {
      b.x += b.vx;
      b.y += b.vy;
      b.flap += 0.2;
      if (b.x < 20 || b.x > this.canvas.width - 20) b.vx *= -1;
      if (b.y < 120 || b.y > this.canvas.height - 100) b.vy *= -1;
    });

    // Character movement and animation
    if (this.state === 'PLAYING') {
      // Sway hip angle rhythm
      this.char.swayAngle = Math.sin(performance.now() * 0.003) * 0.06;

      // Patrol movement
      this.char.x += this.char.vx * this.char.dir;
      const minX = this.canvas.width * 0.25;
      const maxX = this.canvas.width * 0.72;

      if (this.char.x > maxX) {
        this.char.x = maxX;
        this.char.dir = -1;
      } else if (this.char.x < minX) {
        this.char.x = minX;
        this.char.dir = 1;
      }

      // Jump and spring physics on hit
      if (this.char.jumpVy !== 0 || this.char.jumpOffset !== 0) {
        this.char.jumpOffset += this.char.jumpVy;
        this.char.jumpVy += 0.5; // gravity
        if (this.char.jumpOffset >= 0) {
          this.char.jumpOffset = 0;
          this.char.jumpVy = 0;
        }
      }

      // Jiggle decay
      if (this.char.jiggle > 0) {
        this.char.jiggleAngle += 0.6;
        this.char.jiggle *= 0.92;
        if (this.char.jiggle < 0.2) this.char.jiggle = 0;
      }

      // Fire timer
      if (this.char.isOnFire > 0) {
        this.char.isOnFire--;
        if (Math.random() < 0.4) {
          this.spawnSparks(this.char.x + this.char.width * 0.6, this.char.y + this.char.height * 0.6, '#ff4757', 2);
        }
      }

      // Speech bubble timer
      if (this.char.bubbleTimer > 0) {
        this.char.bubbleTimer--;
      }
    }

    // Flying darts update
    for (let i = this.flyingDarts.length - 1; i >= 0; i--) {
      const d = this.flyingDarts[i];
      d.progress += d.speed;

      // Arc interpolation
      const t = d.progress;
      d.x = d.startX + (d.targetX - d.startX) * t;
      // Parabolic arc for depth
      const arcHeight = Math.sin(t * Math.PI) * 70;
      d.y = d.startY + (d.targetY - d.startY) * t - arcHeight;

      d.scale = 1.8 - t * 1.0; // shrinks as it flies away

      // Spawn trail particles
      if (d.type === 'fire') {
        this.particles.push({
          x: d.x, y: d.y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: 1 + Math.random() * 2,
          size: 4 + Math.random() * 4,
          color: '#ffa502',
          alpha: 0.9,
          decay: 0.05
        });
      } else if (d.type === 'gold') {
        this.particles.push({
          x: d.x, y: d.y,
          vx: (Math.random() - 0.5),
          vy: (Math.random() - 0.5),
          size: 3,
          color: '#ffd32a',
          alpha: 0.8,
          decay: 0.06
        });
      }

      if (d.progress >= 1.0) {
        this.flyingDarts.splice(i, 1);
        this.checkHit(d);
      }
    }

    // Particles update
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      if (p.rotSpeed) p.rot += p.rotSpeed;
      if (p.alpha <= 0) this.particles.splice(i, 1);
    }

    // Floating text update
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y += ft.vy;
      ft.alpha -= 0.015;
      if (ft.alpha <= 0) this.floatingTexts.splice(i, 1);
    }
  }

  draw() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    // 1. Draw Sunny Park Sky & Sun
    this.drawParkBackground(ctx, w, h);

    // 2. Draw Clouds
    this.drawClouds(ctx);

    // 3. Draw Butterflies
    this.drawButterflies(ctx);

    // 4. Draw Character & Dartboard on Buttocks
    this.drawCharacter(ctx);

    // 5. Draw Particles
    this.drawParticles(ctx);

    // 6. Draw Flying Darts
    this.drawFlyingDarts(ctx);

    // 7. Draw Floating Texts
    this.drawFloatingTexts(ctx);

    // 8. Draw Aim Assist (Slingshot or Crosshair)
    this.drawAimAssist(ctx);
  }

  drawParkBackground(ctx, w, h) {
    // Vibrant Blue Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.75);
    skyGrad.addColorStop(0, '#48dbfb');
    skyGrad.addColorStop(0.65, '#a0e7fd');
    skyGrad.addColorStop(1, '#e3f9ff');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Bright Sun & Warm Sun Rays
    const sunX = w * 0.88;
    const sunY = 90;
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 140);
    sunGrad.addColorStop(0, '#fff200');
    sunGrad.addColorStop(0.3, 'rgba(255, 238, 8, 0.5)');
    sunGrad.addColorStop(1, 'rgba(255, 238, 8, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
    ctx.fill();

    // Distant Rolling Hills
    ctx.fillStyle = '#6ab04c';
    ctx.beginPath();
    ctx.ellipse(w * 0.2, h * 0.78, w * 0.55, 140, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#22a6b3';
    ctx.beginPath();
    ctx.ellipse(w * 0.8, h * 0.77, w * 0.5, 120, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lush Foreground Grass
    const grassGrad = ctx.createLinearGradient(0, h * 0.72, 0, h);
    grassGrad.addColorStop(0, '#badc58');
    grassGrad.addColorStop(0.2, '#6ab04c');
    grassGrad.addColorStop(1, '#218c74');
    ctx.fillStyle = grassGrad;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.72);
    ctx.bezierCurveTo(w * 0.3, h * 0.69, w * 0.7, h * 0.74, w, h * 0.71);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Wooden park fence posts in background
    ctx.strokeStyle = '#b7791f';
    ctx.lineWidth = 4;
    ctx.beginPath();
    const fenceY = h * 0.72;
    ctx.moveTo(0, fenceY + 10);
    ctx.lineTo(w, fenceY + 5);
    ctx.moveTo(0, fenceY + 28);
    ctx.lineTo(w, fenceY + 23);
    ctx.stroke();

    for (let x = 30; x < w; x += 75) {
      ctx.fillStyle = '#975a16';
      ctx.fillRect(x, fenceY - 14, 10, 48);
    }
  }

  drawClouds(ctx) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    this.clouds.forEach(c => {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.scale(c.scale, c.scale);
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2);
      ctx.arc(28, -12, 35, 0, Math.PI * 2);
      ctx.arc(65, 0, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  drawButterflies(ctx) {
    this.butterflies.forEach(b => {
      ctx.save();
      ctx.translate(b.x, b.y);
      const wingScale = Math.sin(b.flap);
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.ellipse(-6 * wingScale, -4, 8 * Math.abs(wingScale), 10, 0.3, 0, Math.PI * 2);
      ctx.ellipse(6 * wingScale, -4, 8 * Math.abs(wingScale), 10, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  drawCharacter(ctx) {
    const char = this.char;
    ctx.save();

    // Shadow on the grass
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    ctx.beginPath();
    ctx.ellipse(
      char.x + char.width * 0.5,
      char.baseY + char.height - 12,
      char.width * 0.42,
      18,
      0, 0, Math.PI * 2
    );
    ctx.fill();

    // Position & sway transformations
    const centerX = char.x + char.width * 0.5;
    const baseY = char.y + char.jumpOffset + char.height;

    ctx.translate(centerX, baseY);

    // Jiggle butt wobble transformation
    let jiggleOffset = 0;
    if (char.jiggle > 0) {
      jiggleOffset = Math.sin(char.jiggleAngle) * char.jiggle;
    }
    ctx.rotate(char.swayAngle + (jiggleOffset * 0.005));

    // Render character image
    if (this.characterLoaded) {
      ctx.drawImage(
        this.characterImg,
        -char.width * 0.5,
        -char.height,
        char.width,
        char.height
      );
    }

    ctx.restore();

    // Draw the Classic Dartboard directly on the character's massive buttocks!
    this.drawButtDartboard(ctx);

    // Comic speech bubble
    if (char.bubbleTimer > 0 && char.bubbleText) {
      this.drawSpeechBubble(ctx, char.x + char.width * 0.35, char.y + char.jumpOffset - 25, char.bubbleText);
    }
  }

  drawButtDartboard(ctx) {
    const center = this.getTargetCenter();
    const radius = this.targetRadius;

    ctx.save();
    ctx.translate(center.x, center.y);

    // Slight slant to match hip angle
    ctx.rotate(this.char.swayAngle + (this.char.jiggle * 0.01));

    // 1. Board Outer Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 5;

    // 2. Outer Black Frame
    ctx.fillStyle = '#1e272e';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = 'transparent';

    // 3. Red & White Segments
    const segments = 12;
    const segAngle = (Math.PI * 2) / segments;
    for (let i = 0; i < segments; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius * 0.92, i * segAngle, (i + 1) * segAngle);
      ctx.closePath();
      ctx.fillStyle = (i % 2 === 0) ? '#ff4757' : '#ffffff';
      ctx.fill();
    }

    // 4. Inner Ring (Green & Red accents)
    for (let i = 0; i < segments; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius * 0.60, i * segAngle, (i + 1) * segAngle);
      ctx.closePath();
      ctx.fillStyle = (i % 2 === 0) ? '#2ed573' : '#ffa502';
      ctx.fill();
    }

    // 5. Middle Ring
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.40, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#2f3542';
    ctx.stroke();

    // 6. Bullseye Ring
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4757';
    ctx.fill();

    // 7. Golden Center Eye (100 pts)
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.10, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd32a';
    ctx.fill();

    // 8. Metallic Rim Highlight
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.96, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.stroke();

    // 9. Draw all Stuck Darts in the board!
    this.stuckDarts.forEach(dart => {
      ctx.save();
      ctx.translate(dart.relX * radius, dart.relY * radius);
      ctx.rotate(dart.angle);
      this.drawDartGraphic(ctx, dart.type, 0.85);
      ctx.restore();
    });

    ctx.restore();
  }

  drawDartGraphic(ctx, type, scale = 1) {
    ctx.save();
    ctx.scale(scale, scale);

    if (type === 'plunger') {
      // Hilarious Rubber Plunger
      ctx.fillStyle = '#eb4d4b';
      ctx.beginPath();
      ctx.arc(0, 0, 14, Math.PI * 0.8, Math.PI * 2.2);
      ctx.fill();

      // Wooden stick
      ctx.fillStyle = '#f0932b';
      ctx.fillRect(-2, -42, 4, 42);
      ctx.fillStyle = '#6ab04c';
      ctx.fillRect(-4, -46, 8, 5);

    } else {
      // Classic / Gold / Fire Dart
      const isGold = type === 'gold';
      const isFire = type === 'fire';

      // Sharp Point
      ctx.fillStyle = '#718093';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-3, -12);
      ctx.lineTo(3, -12);
      ctx.closePath();
      ctx.fill();

      // Barrel
      ctx.fillStyle = isGold ? '#ffd32a' : (isFire ? '#ff793f' : '#2f3542');
      ctx.fillRect(-3, -28, 6, 16);

      // Shaft
      ctx.fillStyle = '#dcdde1';
      ctx.fillRect(-1.5, -44, 3, 16);

      // Colorful Flights / Feathers
      ctx.fillStyle = isGold ? '#ffa502' : (isFire ? '#ff3838' : '#ff4757');
      ctx.beginPath();
      ctx.moveTo(-1.5, -44);
      ctx.lineTo(-12, -56);
      ctx.lineTo(-1.5, -52);
      ctx.lineTo(1.5, -52);
      ctx.lineTo(12, -56);
      ctx.lineTo(1.5, -44);
      ctx.closePath();
      ctx.fill();

      // Extra glow for gold/fire
      if (isGold) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  drawSpeechBubble(ctx, x, y, text) {
    ctx.save();
    ctx.font = 'bold 15px Cairo, sans-serif';
    const textWidth = ctx.measureText(text).width;
    const padX = 14;
    const padY = 8;
    const boxW = textWidth + padX * 2;
    const boxH = 34;

    ctx.translate(x - boxW / 2, y - boxH);

    // Bubble body
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#2f3542';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.roundRect(0, 0, boxW, boxH, 12);
    ctx.fill();
    ctx.stroke();

    // Tail
    ctx.beginPath();
    ctx.moveTo(boxW * 0.5, boxH);
    ctx.lineTo(boxW * 0.45, boxH + 10);
    ctx.lineTo(boxW * 0.6, boxH);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();

    // Text
    ctx.fillStyle = '#2f3542';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, boxW / 2, boxH / 2);

    ctx.restore();
  }

  drawFlyingDarts(ctx) {
    this.flyingDarts.forEach(d => {
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.rotate(d.rotation);
      this.drawDartGraphic(ctx, d.type, d.scale);
      ctx.restore();
    });
  }

  drawParticles(ctx) {
    this.particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      if (p.rot) ctx.rotate(p.rot);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
  }

  drawFloatingTexts(ctx) {
    this.floatingTexts.forEach(ft => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, ft.alpha);
      ctx.font = `bold ${Math.round(20 * ft.scale)}px Cairo, sans-serif`;
      ctx.textAlign = 'center';
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#2f3542';
      ctx.strokeText(ft.text, ft.x, ft.y);
      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    });
  }

  drawAimAssist(ctx) {
    if (this.state !== 'PLAYING') return;

    if (this.aimMode === 'drag' && this.isDragging) {
      // Slingshot Dotted Trajectory Line
      const sx = this.canvas.width / 2;
      const sy = this.canvas.height - 20;

      const dx = this.dragStart.x - this.dragCurrent.x;
      const dy = this.dragStart.y - this.dragCurrent.y;
      const power = Math.min(Math.hypot(dx, dy) / 140, 1.8);

      const targetX = this.dragStart.x + dx * 2.5 * power + this.wind * 10;
      const targetY = this.dragStart.y + dy * 2.5 * power;

      ctx.save();
      ctx.strokeStyle = 'rgba(255, 71, 87, 0.7)';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(
        (sx + targetX) / 2,
        Math.min(sy, targetY) - 50,
        targetX,
        targetY
      );
      ctx.stroke();

      // Power circle
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255, 165, 2, 0.8)';
      ctx.beginPath();
      ctx.arc(targetX, targetY, 8 + power * 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

    } else if (this.aimMode === 'click') {
      // Dynamic Crosshair on Mouse Pointer
      const mx = this.mousePos.x;
      const my = this.mousePos.y;

      if (mx > 0 && my > 0) {
        ctx.save();
        ctx.strokeStyle = '#ff4757';
        ctx.lineWidth = 2.5;

        // Outer Reticle Ring
        ctx.beginPath();
        ctx.arc(mx, my, 18, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(mx - 24, my); ctx.lineTo(mx - 8, my);
        ctx.moveTo(mx + 8, my); ctx.lineTo(mx + 24, my);
        ctx.moveTo(mx, my - 24); ctx.lineTo(mx, my - 8);
        ctx.moveTo(mx, my + 8); ctx.lineTo(mx, my + 24);
        ctx.stroke();

        // Center dot
        ctx.fillStyle = '#ffd32a';
        ctx.beginPath();
        ctx.arc(mx, my, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }
  }

  gameLoop(timestamp) {
    const dt = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    this.update(dt);
    this.draw();

    requestAnimationFrame((t) => this.gameLoop(t));
  }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
