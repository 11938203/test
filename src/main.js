const slides = [
  {
    eyebrow: 'CLIP-PATH DEMO',
    title: '设计问能不能实现这种碎片化的效果',
    caption: '用 CSS polygon 将同一张图切成随机碎片，再用 JS 驱动位移、旋转和透明度，模拟玻璃破碎般的图像切换。',
    from: '#ff8a00',
    to: '#e52e71',
    accent: '#ffe66d',
    pattern: 'radial-gradient(circle at 24% 28%, rgba(255,255,255,.95) 0 8%, transparent 9%), radial-gradient(circle at 72% 18%, rgba(255,255,255,.45) 0 7%, transparent 8%), linear-gradient(135deg, #ff8a00, #e52e71)',
  },
  {
    eyebrow: 'FRAGMENT TRANSITION',
    title: '每一片都拥有独立的轨迹',
    caption: '碎片层使用同样的背景，只改变 background-position 和 clip-path。切换时为每个碎片设置不同延迟，形成错落的散开与重组。',
    from: '#00c6ff',
    to: '#0072ff',
    accent: '#7cffcb',
    pattern: 'radial-gradient(circle at 30% 22%, rgba(255,255,255,.95) 0 7%, transparent 8%), radial-gradient(circle at 66% 58%, rgba(255,255,255,.38) 0 10%, transparent 11%), linear-gradient(135deg, #00c6ff, #0072ff)',
  },
  {
    eyebrow: 'PURE FRONTEND',
    title: '无需切图，前端也能完成动态海报',
    caption: '页面保留了原思路的核心：clip-path: polygon(x y, x2 y2, x3 y3...)，并补充了自动播放、缩略图与响应式舞台。',
    from: '#7f00ff',
    to: '#e100ff',
    accent: '#ffef9f',
    pattern: 'radial-gradient(circle at 26% 70%, rgba(255,255,255,.75) 0 9%, transparent 10%), radial-gradient(circle at 76% 26%, rgba(255,255,255,.4) 0 8%, transparent 9%), linear-gradient(135deg, #7f00ff, #e100ff)',
  },
];

const shardPolygons = [
  '0 0, 18% 0, 13% 24%, 0 16%',
  '18% 0, 39% 0, 31% 26%, 13% 24%',
  '39% 0, 61% 0, 58% 28%, 31% 26%',
  '61% 0, 82% 0, 76% 22%, 58% 28%',
  '82% 0, 100% 0, 100% 18%, 76% 22%',
  '0 16%, 13% 24%, 20% 48%, 0 42%',
  '13% 24%, 31% 26%, 38% 50%, 20% 48%',
  '31% 26%, 58% 28%, 51% 57%, 38% 50%',
  '58% 28%, 76% 22%, 81% 49%, 51% 57%',
  '76% 22%, 100% 18%, 100% 45%, 81% 49%',
  '0 42%, 20% 48%, 16% 76%, 0 82%',
  '20% 48%, 38% 50%, 36% 78%, 16% 76%',
  '38% 50%, 51% 57%, 62% 78%, 36% 78%',
  '51% 57%, 81% 49%, 76% 75%, 62% 78%',
  '81% 49%, 100% 45%, 100% 80%, 76% 75%',
  '0 82%, 16% 76%, 28% 100%, 0 100%',
  '16% 76%, 36% 78%, 45% 100%, 28% 100%',
  '36% 78%, 62% 78%, 64% 100%, 45% 100%',
  '62% 78%, 76% 75%, 84% 100%, 64% 100%',
  '76% 75%, 100% 80%, 100% 100%, 84% 100%',
];

const app = document.querySelector('#app');
let active = 0;
let isAnimating = false;

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function updateTheme(slide) {
  app.style.setProperty('--from', slide.from);
  app.style.setProperty('--to', slide.to);
  app.style.setProperty('--accent', slide.accent);
}

function makeShard(clip, index, slide) {
  const shard = createElement('span');
  const row = Math.floor(index / 5);
  const col = index % 5;
  shard.style.setProperty('--clip', `polygon(${clip})`);
  shard.style.setProperty('--delay', `${index * 24}ms`);
  shard.style.setProperty('--x', `${(col - 2) * 18}px`);
  shard.style.setProperty('--y', `${(row - 1.5) * 20}px`);
  shard.style.setProperty('--rotate', `${(index % 2 ? 1 : -1) * (8 + (index % 4) * 5)}deg`);
  shard.style.background = slide.pattern;
  shard.setAttribute('aria-hidden', 'true');
  shard.append(createElement('i', '', String(index + 1).padStart(2, '0')));
  return shard;
}

function render() {
  const slide = slides[active];
  updateTheme(slide);
  app.innerHTML = '';

  const hero = createElement('section', 'hero');
  hero.setAttribute('aria-label', '碎片化图像切换效果演示');

  const copy = createElement('div', 'copy');
  copy.append(createElement('p', 'eyebrow', slide.eyebrow));
  copy.append(createElement('h1', '', slide.title));
  copy.append(createElement('p', 'caption', slide.caption));

  const actions = createElement('div', 'actions');
  const nextButton = createElement('button', '', '切换下一张');
  nextButton.type = 'button';
  nextButton.addEventListener('click', goNext);
  const sourceLink = createElement('a', '', '参考文章');
  sourceLink.href = 'https://juejin.cn/post/7365831792428875813';
  actions.append(nextButton, sourceLink);
  copy.append(actions);

  const stage = createElement('div', 'stage');
  stage.setAttribute('role', 'img');
  stage.setAttribute('aria-label', '由多边形碎片拼合成的渐变海报');
  const base = createElement('div', 'poster base');
  base.style.background = slide.pattern;
  const shards = createElement('div', 'poster shards');
  shardPolygons.forEach((clip, index) => shards.append(makeShard(clip, index, slide)));
  stage.append(base, shards, createElement('div', 'rings'));

  hero.append(copy, stage);
  app.append(hero, makeThumbs());
}

function makeThumbs() {
  const thumbs = createElement('nav', 'thumbs');
  thumbs.setAttribute('aria-label', '选择演示画面');

  slides.forEach((slide, index) => {
    const button = createElement('button', index === active ? 'active' : '');
    button.type = 'button';
    button.style.setProperty('--from', slide.from);
    button.style.setProperty('--to', slide.to);
    button.append(createElement('span', '', String(index + 1).padStart(2, '0')));
    button.append(createElement('strong', '', slide.eyebrow));
    button.addEventListener('click', () => jumpTo(index));
    thumbs.append(button);
  });

  return thumbs;
}

function jumpTo(next) {
  if (next === active || isAnimating) return;
  isAnimating = true;
  const shards = app.querySelector('.shards');
  shards.classList.add('is-exploding');

  window.setTimeout(() => {
    active = next;
    render();
    isAnimating = false;
  }, 460);
}

function goNext() {
  jumpTo((active + 1) % slides.length);
}

render();
window.setInterval(goNext, 4600);
