const app = document.querySelector('#app');

const cityNodes = [
  { id: 'xian', name: '西安', x: 28, y: 39, tasks: 68, rate: 98 },
  { id: 'zhengzhou', name: '郑州', x: 46, y: 30, tasks: 72, rate: 100 },
  { id: 'wuhan', name: '武汉', x: 62, y: 39, tasks: 86, rate: 99 },
  { id: 'hangzhou', name: '杭州', x: 77, y: 49, tasks: 65, rate: 100 },
  { id: 'nanchang', name: '南昌', x: 66, y: 62, tasks: 70, rate: 99 },
  { id: 'fuzhou', name: '福州', x: 80, y: 66, tasks: 54, rate: 97 },
  { id: 'guangzhou', name: '广州', x: 56, y: 81, tasks: 95, rate: 99 },
  { id: 'guiyang', name: '贵阳', x: 31, y: 72, tasks: 60, rate: 98 },
];

const resourceUse = [
  ['CPU使用率', 72, '#43d7ff'],
  ['内存使用率', 68, '#ffb33f'],
  ['存储使用率', 65, '#41e0a3'],
  ['网络使用率', 58, '#79a7ff'],
];

const ranking = [
  ['广州', 95],
  ['武汉', 86],
  ['郑州', 72],
  ['南昌', 70],
  ['西安', 68],
  ['杭州', 65],
  ['贵阳', 60],
  ['福州', 54],
];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#${name}"></use></svg>`;
}

function metricCard(iconName, label, value, unit = '个', hot = false) {
  return `
    <article class="metric-card ${hot ? 'is-hot' : ''}">
      <span class="metric-icon">${icon(iconName)}</span>
      <div><p>${label}</p><strong>${value}</strong><small>${unit}</small></div>
      <em>↑</em>
    </article>`;
}

function panel(title, body, extra = '') {
  return `<section class="panel ${extra}"><h2><span></span>${title}</h2>${body}</section>`;
}

function renderShell() {
  app.innerHTML = `
    <svg class="svg-sprite" aria-hidden="true">
      <symbol id="i-calendar" viewBox="0 0 24 24"><path d="M7 2v3M17 2v3M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/><path d="M8 13h3v3H8z"/></symbol>
      <symbol id="i-cloud" viewBox="0 0 24 24"><path d="M7 18a4 4 0 0 1 .6-7.96A6 6 0 0 1 19 12a3 3 0 0 1-1 6H7Z"/><path d="M12 13v6m-3-3 3 3 3-3"/></symbol>
      <symbol id="i-grid" viewBox="0 0 24 24"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/></symbol>
      <symbol id="i-user" viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0"/></symbol>
      <symbol id="i-chip" viewBox="0 0 24 24"><path d="M8 3v3M12 3v3M16 3v3M8 18v3M12 18v3M16 18v3M3 8h3M3 12h3M3 16h3M18 8h3M18 12h3M18 16h3"/><path d="M7 7h10v10H7zM10 10h4v4h-4z"/></symbol>
      <symbol id="i-gear" viewBox="0 0 24 24"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="m4 12 .9-3 2.7-.6 1.5-2.4L12 5l2.9 1 1.5 2.4 2.7.6.9 3-.9 3-2.7.6-1.5 2.4L12 19l-2.9-1-1.5-2.4-2.7-.6L4 12Z"/></symbol>
      <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 5 3.2 8.4 7 10 3.8-1.6 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-5"/></symbol>
    </svg>
    <header class="topbar">
      <div class="timebox">${icon('i-calendar')}<span>2025-05-20&nbsp;&nbsp;10:28:36</span><b>星期二</b></div>
      <div class="brand"><i></i><h1>5800大数据平台</h1><p>5800 BIG DATA PLATFORM</p></div>
      <nav class="modules">
        ${['数据接入','数据治理','云边协同','智能分析','资源调度','系统管理'].map((item, index) => `<a>${icon(index % 2 ? 'i-chip' : 'i-cloud')}<span>${item}</span></a>`).join('')}
      </nav>
    </header>
    <main class="dashboard">
      <aside class="left-column">
        ${panel('节点在线总览', `
          <div class="online-grid">
            <div>${metricCard('i-cloud', '边端节点总数', '8')}</div>
            <div>${metricCard('i-grid', '在线节点数', '8', '个', true)}</div>
            <div class="online-ring"><strong>100<small>%</small></strong><span>在线率</span><em>较昨日 ↑12%</em></div>
          </div>`)}
        ${panel('任务统计', `<div class="task-grid">
          ${metricCard('i-user', '协同任务总数', '1,268')}
          ${metricCard('i-grid', '运行中任务', '342', '个', true)}
          ${metricCard('i-chip', '今日完成任务', '926')}
          ${metricCard('i-cloud', '任务成功率', '98.6', '%')}
        </div>`)}
        ${panel('数据汇聚趋势（近24小时）', `<div class="chart-card"><svg viewBox="0 0 360 150"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#2da8ff" stop-opacity=".7"/><stop offset="1" stop-color="#2da8ff" stop-opacity="0"/></linearGradient></defs><g class="grid-lines">${Array.from({length:5},(_,i)=>`<path d="M0 ${25+i*25}H360"/>`).join('')}</g><path class="area" d="M0 126 L0 92 30 68 60 82 90 42 120 74 150 65 180 68 210 40 240 48 270 92 300 32 330 58 360 24 L360 126Z"/><path class="line blue" d="M0 92 30 68 60 82 90 42 120 74 150 65 180 68 210 40 240 48 270 92 300 32 330 58 360 24"/><path class="line green" d="M0 118 30 96 60 52 90 78 120 103 150 92 180 63 210 88 240 76 270 110 300 82 330 84 360 62"/></svg></div>`)}
        ${panel('告警概览', `<div class="alarm"><div class="donut"><b>12</b><span>今日告警</span></div><ul><li><span>紧急告警</span><b>2</b></li><li><span>重要告警</span><b>4</b></li><li><span>一般告警</span><b>6</b></li><li><span>提示告警</span><b>0</b></li></ul></div>`)}
      </aside>
      <section class="map-stage" aria-label="可拖动节点的云边协同地图">
        <div class="china-map">
          <svg class="map-shape" viewBox="0 0 900 640" aria-hidden="true">
            <defs><linearGradient id="mapGlow" x1="0" x2="1"><stop stop-color="#0661d8"/><stop offset="1" stop-color="#0cb9ff"/></linearGradient></defs>
            <path class="back layer-3" d="M112 272 160 216 244 202 302 146 383 174 449 135 529 175 617 128 720 159 790 234 760 316 815 383 705 420 674 505 563 514 490 584 393 535 318 555 251 492 160 458 137 365Z"/>
            <path class="back layer-2" d="M112 252 160 196 244 182 302 126 383 154 449 115 529 155 617 108 720 139 790 214 760 296 815 363 705 400 674 485 563 494 490 564 393 515 318 535 251 472 160 438 137 345Z"/>
            <path class="land" d="M112 232 160 176 244 162 302 106 383 134 449 95 529 135 617 88 720 119 790 194 760 276 815 343 705 380 674 465 563 474 490 544 393 495 318 515 251 452 160 418 137 325Z"/>
            <path class="province" d="M244 162 285 246 230 337 251 452M383 134 380 236 449 330 393 495M529 135 502 241 563 328 563 474M617 88 648 207 760 276M160 176 230 337 137 325M302 106 380 236 285 246M449 95 502 241 449 330M705 380 563 328 490 544M318 515 393 495 490 544"/>
          </svg>
          <svg class="flow-layer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg>
          <div class="hub" style="--x:55%;--y:55%"><span></span><strong>长沙</strong><small>云端中心</small></div>
          <div class="nodes"></div>
          <div class="drag-tip">拖动节点调整拓扑</div>
        </div>
      </section>
      <aside class="right-column">
        ${panel('分系统运行状态', `<div class="status-grid">${['数据接入','数据治理','云边协同','智能分析','资源调度','系统管理'].map((name, i)=>`<div>${icon(i%2?'i-chip':'i-cloud')}<span>${name}</span><b>正常</b></div>`).join('')}</div>`)}
        ${panel('资源使用率', `<div class="gauge-grid">${resourceUse.map(([name, value, color])=>`<div class="gauge" style="--p:${value};--c:${color}"><b>${value}%</b><span>${name}</span></div>`).join('')}</div>`)}
        ${panel('边端节点排行（按任务数）', `<ol class="rank-list">${ranking.map(([name,value], index)=>`<li><i>${index+1}</i><span>${name}</span><em><b style="width:${value}%"></b></em><strong>${value}</strong></li>`).join('')}</ol>`)}
        ${panel('今日处理量', `<div class="today"><p><span>GB</span><strong>2,856</strong><em>较昨日 ↑18.6%</em></p><svg viewBox="0 0 360 150"><path class="area" d="M0 132 0 122 30 92 60 105 90 70 120 90 150 70 180 52 210 22 240 38 270 74 300 32 330 62 360 58 360 132Z"/><path class="line blue" d="M0 122 30 92 60 105 90 70 120 90 150 70 180 52 210 22 240 38 270 74 300 32 330 62 360 58"/><path class="dash" d="M180 12V132"/></svg></div>`)}
      </aside>
    </main>
    <footer class="footerbar"><span>${icon('i-cloud')}数据汇聚总量 <b>128.75</b> TB</span><span>${icon('i-grid')}今日新增数据 <b>12.34</b> TB</span><span>${icon('i-user')}累计处理任务 <b>293,726</b> 个</span><span>${icon('i-chip')}平台运行时长 <b>128</b> 天 <b>16</b> 时</span><strong>${icon('i-shield')}平台状态：运行正常</strong></footer>
  `;

  const nodesLayer = app.querySelector('.nodes');
  cityNodes.forEach((node) => nodesLayer.append(createNode(node)));
  updateConnections();
  enableDrag();
}

function createNode(node) {
  const card = el('article', 'map-node');
  card.dataset.id = node.id;
  card.style.left = `${node.x}%`;
  card.style.top = `${node.y}%`;
  card.innerHTML = `<button type="button" aria-label="拖动${node.name}节点"><i></i></button><div><h3>${node.name}</h3><p><span></span>在线</p><p>任务：${node.tasks}</p><p>在线率：${node.rate}%</p></div>`;
  return card;
}

function updateConnections() {
  const flow = app.querySelector('.flow-layer');
  if (!flow) return;
  const hub = { x: 55, y: 55 };
  flow.innerHTML = `<defs><linearGradient id="flowHot" x1="0" x2="1"><stop stop-color="#ff335d"/><stop offset=".5" stop-color="#ffd36a"/><stop offset="1" stop-color="#36c8ff"/></linearGradient><filter id="lineGlow"><feGaussianBlur stdDeviation=".7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
  cityNodes.forEach((node, index) => {
    const dx = (hub.x - node.x) * 0.45;
    const dy = (hub.y - node.y) * 0.25 - 8;
    const cx = node.x + dx;
    const cy = node.y + dy;
    const path = `M ${hub.x} ${hub.y} Q ${cx} ${cy} ${node.x} ${node.y}`;
    flow.insertAdjacentHTML('beforeend', `<path class="connection base" d="${path}"/><path class="connection energy" style="--delay:${index * -0.32}s" d="${path}"/>`);
  });
}

function enableDrag() {
  const stage = app.querySelector('.china-map');
  app.querySelectorAll('.map-node').forEach((nodeEl) => {
    nodeEl.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      nodeEl.setPointerCapture(event.pointerId);
      nodeEl.classList.add('dragging');
      const id = nodeEl.dataset.id;
      const data = cityNodes.find((node) => node.id === id);
      const rect = stage.getBoundingClientRect();

      const move = (moveEvent) => {
        const x = ((moveEvent.clientX - rect.left) / rect.width) * 100;
        const y = ((moveEvent.clientY - rect.top) / rect.height) * 100;
        data.x = Math.max(8, Math.min(92, x));
        data.y = Math.max(10, Math.min(90, y));
        nodeEl.style.left = `${data.x}%`;
        nodeEl.style.top = `${data.y}%`;
        updateConnections();
      };

      const up = () => {
        nodeEl.classList.remove('dragging');
        nodeEl.removeEventListener('pointermove', move);
        nodeEl.removeEventListener('pointerup', up);
        nodeEl.removeEventListener('pointercancel', up);
      };

      nodeEl.addEventListener('pointermove', move);
      nodeEl.addEventListener('pointerup', up);
      nodeEl.addEventListener('pointercancel', up);
    });
  });
}

renderShell();
