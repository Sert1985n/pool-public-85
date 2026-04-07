
(async function () {
  document.title = 'public-pool-btc.ru';

  const I18N = {
    en: {
      miningDashboard: 'mining dashboard',
      home: 'Home',
      blocks: 'Blocks',
      miners: 'Miners',
      help: 'Help',
      pools: 'Pools',
      theme: 'Theme',
      soloPools: 'SOLO Mining Pools',
      pool: 'Pool',
      algorithm: 'Algorithm',
      hashrate: 'Hashrate',
      networkHashrate: 'Network Hashrate',
      networkDifficulty: 'Network Difficulty',
      currentPrice: 'Current Price',
      reward: 'Reward',
      poolStatistics: 'Pool Statistics',
      blockStatistics: 'Block Statistics',
      minersCount: 'Miners',
      currentEffort: 'Current Effort',
      lastBlock: 'Last Block',
      blocksFound: 'Blocks found',
      currentHeight: 'Current Height',
      priceUsd: 'Price USD',
      priceBtc: 'Price BTC',
      searchWallet: 'Search wallet',
      poolHashrate: 'Pool Hashrate',
      howToConnect: 'HOW TO CONNECT',
      rewardScheme: 'Reward Scheme',
      poolFee: 'Pool Fee',
      blockReward: 'Block Reward',
      connectionTcp: 'Connection TCP',
      difficulty: 'Difficulty',
      server: 'Server',
      description: 'Description',
      configuration: 'Configuration',
      useOwnWallet: 'Use your own BTC payout address and optional worker name.',
      poolWallet: 'Pool Wallet',
      copy: 'Copy',
      workers: 'Workers',
      online: 'Online',
      offline: 'Offline',
      currentHashrate30m: 'Current Hashrate (30m)',
      averageHashrate3h: 'Average Hashrate (3h)',
      work: 'Work',
      shareSum: 'Share Sum',
      personalEffort: 'Personal Effort',
      unconfirmed: 'Unconfirmed',
      balance: 'Balance',
      pending: 'Pending',
      hashrateChart: 'Hashrate Chart',
      lastBestShare: 'Last Best Share',
      bestShare: 'Best Share',
      portDifficulty: 'Port Difficulty',
      worker: 'Worker',
      valids: 'Valids',
      invalid: 'Invalid',
      stale: 'Stale',
      port: 'Port',
      lastShare: 'Last Share',
      dashboard: 'DASHBOARD',
      rewards: 'REWARDS',
      payouts: 'PAYOUTS',
      interval: 'Interval',
      amount: 'Amount',
      time: 'Time',
      type: 'Type',
      effort: 'Effort',
      solution: 'Solution',
      status: 'Status',
      hour: 'Hour',
      hours12: '12 Hours',
      hours24: '24 Hours',
      week: 'Week',
      month: 'Month',
      noData: 'No Data',
      minutesAgo: 'minutes ago',
      minuteAgo: 'minute ago',
      secondsAgo: 'seconds ago',
      secondAgo: 'second ago',
      hoursAgo: 'hours ago',
      hourAgo: 'hour ago',
      daysAgo: 'days ago',
      dayAgo: 'day ago',
      blockMaturity: 'Block maturation requires 101 new blocks in the network.',
      information: 'Information',
      services: 'Services',
      agreements: 'Agreements',
      feedback: 'Feedback',
      compatible: 'Compatible',
      blockExplorer: 'Block Explorer',
      networkStats: 'Network Stats',
      miningCalculator: 'Mining Calculator',
      nicehashRentals: 'NiceHash Rentals',
      miningRigRentals: 'Mining Rig Rentals',
      privacyStatement: 'Privacy Statement',
      termsConditions: 'Terms and Conditions',
      telegram: 'Telegram',
      telegramNews: 'Telegram News',
      email: 'Email',
      light: 'Light',
      dark: 'Dark'
    },
    ru: {
      miningDashboard: ' ',
      home: '',
      blocks: '',
      miners: '',
      help: '',
      pools: '',
      theme: '',
      soloPools: 'SOLO Mining Pools',
      pool: '',
      algorithm: '',
      hashrate: '',
      networkHashrate: ' ',
      networkDifficulty: ' ',
      currentPrice: ' ',
      reward: '',
      poolStatistics: ' ',
      blockStatistics: ' ',
      minersCount: '',
      currentEffort: ' ',
      lastBlock: ' ',
      blocksFound: ' ',
      currentHeight: ' ',
      priceUsd: ' USD',
      priceBtc: ' BTC',
      searchWallet: ' ',
      poolHashrate: ' ',
      howToConnect: ' ',
      rewardScheme: ' ',
      poolFee: ' ',
      blockReward: '  ',
      connectionTcp: 'Connection TCP',
      difficulty: '',
      server: '',
      description: '',
      configuration: '',
      useOwnWallet: '  BTC-      .',
      poolWallet: ' ',
      copy: '',
      workers: '',
      online: '',
      offline: '',
      currentHashrate30m: '  (30)',
      averageHashrate3h: '  (3)',
      work: '',
      shareSum: ' ',
      personalEffort: ' ',
      unconfirmed: '',
      balance: '',
      pending: ' ',
      hashrateChart: 'Hashrate Chart',
      lastBestShare: '  ',
      bestShare: ' ',
      portDifficulty: ' ',
      worker: '',
      valids: '',
      invalid: '',
      stale: '',
      port: '',
      lastShare: ' ',
      dashboard: '',
      rewards: '',
      payouts: '',
      interval: '',
      amount: '',
      time: '',
      type: '',
      effort: '',
      solution: '',
      status: '',
      hour: '',
      hours12: '12 ',
      hours24: '24 ',
      week: '',
      month: '',
      noData: ' ',
      minutesAgo: ' ',
      minuteAgo: ' ',
      secondsAgo: ' ',
      secondAgo: ' ',
      hoursAgo: ' ',
      hourAgo: ' ',
      daysAgo: ' ',
      dayAgo: ' ',
      blockMaturity: '   101    .',
      information: '',
      services: '',
      agreements: '',
      feedback: ' ',
      compatible: '',
      blockExplorer: ' ',
      networkStats: ' ',
      miningCalculator: ' ',
      nicehashRentals: ' NiceHash',
      miningRigRentals: ' Mining Rig Rentals',
      privacyStatement: ' ',
      termsConditions: ' ',
      telegram: '',
      telegramNews: ' ',
      email: 'Email',
      light: '',
      dark: 'Ҹ'
    }
  };

  const tz = 'Europe/Moscow';
  const app = document.getElementById('app');
  const site = await fetch('/site-data.json', { cache:'no-store' }).then(r => r.json());
  const READY_ORDER = (window.__POOL_COIN_ORDER && window.__POOL_COIN_ORDER.length ? window.__POOL_COIN_ORDER : ((site.pools || []).map(p => String(p.id || '').toLowerCase()).filter(Boolean)));
  let pools = Array.isArray(site.pools) ? site.pools.filter(Boolean) : [];
  pools.sort((a,b) => {
    const ai = READY_ORDER.indexOf(String(a.id).toLowerCase());
    const bi = READY_ORDER.indexOf(String(b.id).toLowerCase());
    const av = ai === -1 ? 999 : ai;
    const bv = bi === -1 ? 999 : bi;
    return av - bv || String(a.title).localeCompare(String(b.title));
  });
  const byId = Object.fromEntries(pools.map(p => [String(p.id).toLowerCase(), p]));
  const defaultPool = byId['btc'] || pools[0] || { id:'btc', title:'Bitcoin', symbol:'BTC', icon:'/favicon.png', algorithm:'Sha256D', rewardDisplay:'3.125 BTC' };

  if (!location.hash) location.hash = '#/';

  function getLang(){
    const v = (localStorage.getItem('pp_lang') || 'en').toLowerCase();
    return v === 'ru' ? 'ru' : 'en';
  }
  function setLang(v){
    localStorage.setItem('pp_lang', v === 'ru' ? 'ru' : 'en');
    renderRoute();
  }
  function t(k){
    const lang = getLang();
    return (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;
  }
  function getTheme(){
    const v = (localStorage.getItem('pp_theme') || 'dark').toLowerCase();
    return v === 'light' ? 'light' : 'dark';
  }
  function applyTheme(){
    document.documentElement.setAttribute('data-theme', getTheme());
  }
  function toggleTheme(){
    localStorage.setItem('pp_theme', getTheme() === 'dark' ? 'light' : 'dark');
    applyTheme();
    renderRoute();
  }
  applyTheme();

  function api(path){
    return fetch(path, { cache:'no-store' }).then(r => {
      if (!r.ok) throw new Error(path + ' -> ' + r.status);
      return r.json();
    });
  }
  function esc(s){return String(s ?? '').replace(/[&<>"']/g,m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
  function n(v,d=0){const x=Number(v); return Number.isFinite(x)?x:d}
  function shortAddr(v){ v=String(v||''); return v.length>24 ? v.slice(0,11)+'...'+v.slice(-11) : v; }
  function explorerFor(wallet){
    const base = site.btcExplorerBase || 'https://mempool.space/address/';
    return wallet ? `${base}${encodeURIComponent(wallet)}` : '#';
  }
  function moscowDate(ts){
    if(!ts || ts<=0) return t('noData');
    try{return new Intl.DateTimeFormat(getLang()==='ru'?'ru-RU':'en-GB',{timeZone:tz,day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(ts));}
    catch{return t('noData');}
  }
  function moscowTime(ts){
    if(!ts || ts<=0) return '';
    try{return new Intl.DateTimeFormat(getLang()==='ru'?'ru-RU':'en-GB',{timeZone:tz,hour:'2-digit',minute:'2-digit'}).format(new Date(ts));}
    catch{return '';}
  }
  function relTime(ts){
    ts = Number(ts);
    if (!Number.isFinite(ts) || ts <= 0) return t('noData');
    const diff = Date.now() - ts;
    if (diff < 0) return t('noData');
    const s = Math.floor(diff/1000);
    if (getLang() === 'ru') {
      if (s < 60) return s === 1 ? t('secondAgo') : `${s} ${t('secondsAgo')}`;
      const m = Math.floor(s/60);
      if (m < 60) return m === 1 ? t('minuteAgo') : `${m} ${t('minutesAgo')}`;
      const h = Math.floor(m/60);
      if (h < 24) return h === 1 ? t('hourAgo') : `${h} ${t('hoursAgo')}`;
      const d = Math.floor(h/24);
      return d === 1 ? t('dayAgo') : `${d} ${t('daysAgo')}`;
    }
    if (s < 60) return `${s} ${s===1?t('secondAgo'):t('secondsAgo')}`;
    const m = Math.floor(s/60);
    if (m < 60) return `${m} ${m===1?t('minuteAgo'):t('minutesAgo')}`;
    const h = Math.floor(m/60);
    if (h < 24) return `${h} ${h===1?t('hourAgo'):t('hoursAgo')}`;
    const d = Math.floor(h/24);
    return `${d} ${d===1?t('dayAgo'):t('daysAgo')}`;
  }
  function fmtHashrate(v){
    let x = n(v,0);
    const units=['H/s','KH/s','MH/s','GH/s','TH/s','PH/s','EH/s'];
    let i=0; while(x>=1000 && i<units.length-1){ x/=1000; i++; }
    const digits = x>=100 ? 0 : x>=10 ? 2 : 2;
    return `${x.toFixed(digits)} ${units[i]}`;
  }
  function fmtDifficulty(v){
    let x = n(v,0);
    const units=['','K','M','G','T','P','E'];
    let i=0; while(x>=1000 && i<units.length-1){ x/=1000; i++; }
    const digits = x>=100 ? 0 : x>=10 ? 2 : 2;
    return `${x.toFixed(digits)} ${units[i]}`.trim();
  }
  function fmtUsd(v, d=2){
    return `$${n(v,0).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d})}`;
  }
  function fmtUsdPrice(v){
    return `$${n(v,0).toLocaleString('en-US',{minimumFractionDigits:3,maximumFractionDigits:3})}`;
  }
  function fmtBtcPrice(v){
    const x=n(v,0);
    if (Math.abs(x-1) < 1e-12) return '1';
    return x.toLocaleString('en-US',{maximumFractionDigits:8}).replace(/\.?0+$/,'') || '0';
  }
  function deltaSpan(v){
    const x=n(v,0);
    const cls=x>0?'green':x<0?'red':'muted';
    return `<span class="${cls}">${x>=0?'+':''}${x.toFixed(2)}%</span>`;
  }
  function difficultyBadge(v, region='RU'){
    const x=n(v,0);
    if(!x) return `<span class="kbd-badge">0 ${region}</span>`;
    let value=x, unit='';
    if (x>=1e12){ value=x/1e12; unit='T'; }
    else if (x>=1e9){ value=x/1e9; unit='G'; }
    else if (x>=1e6){ value=x/1e6; unit='M'; }
    else if (x>=1e3){ value=x/1e3; unit='K'; }
    return `<span class="kbd-badge">${value.toFixed(0)}${unit ? ' '+unit : ''} ${region}</span>`;
  }

  
  function poolApiBase(poolId){
    const pid = String(poolId || '').toLowerCase();
    return `/poolapi/${pid}`;
  }

  async function poolApiJson(poolId, path){
    const url = `${poolApiBase(poolId)}${path}`;
    const r = await fetch(url, { cache:'no-store' });
    if(!r.ok) throw new Error(url + ' -> ' + r.status);
    return await r.json();
  }

  async function fetchPoolStats(poolId){
    try{
      const data = await poolApiJson(poolId, '/stats');
      return data && data.result ? data.result : null;
    }catch(e){
      return null;
    }
  }

  
  function blocksStateKey(poolId){
    return `pool85_live_blocks_v4_${String(poolId || '').toLowerCase()}`;
  }

  async function fetchNewBlocksCount(poolId){
    try{
      const payload = await poolApiJson(poolId, '/blocks');
      const rows = ((((payload || {}).result || {}).blocks) || []).filter(Boolean);

      const getHeight = (b) => String(b.blockHeight ?? b.height ?? '').trim();
      const getStatus = (b) => String(b.status || b.state || '').toLowerCase();

      const livePending = rows
        .filter(b => {
          const st = getStatus(b);
          return !!getHeight(b) && !st.includes('confirm') && !st.includes('orphan');
        })
        .map(getHeight);

      const liveConfirmed = rows
        .filter(b => {
          const st = getStatus(b);
          return !!getHeight(b) && st.includes('confirm');
        })
        .map(getHeight);

      let saved = { pending: [] };
      try{
        saved = JSON.parse(localStorage.getItem(blocksStateKey(poolId)) || '{"pending":[]}') || { pending: [] };
      }catch(e){
        saved = { pending: [] };
      }

      let pending = Array.isArray(saved.pending) ? saved.pending.map(x => String(x)) : [];

      for(const h of livePending){
        if(!pending.includes(h)) pending.push(h);
      }

      pending = pending.filter(h => !liveConfirmed.includes(h));

      localStorage.setItem(blocksStateKey(poolId), JSON.stringify({ pending }));
      return pending.length;
    }catch(e){
      return 0;
    }
  }


  function helpRowsFromStats(stats){
    const diff = stats && stats.difficulty ? stats.difficulty : {};
    return Object.entries(diff)
      .sort((a,b) => Number(a[0]) - Number(b[0]))
      .map(([port, info]) => ({
        port: Number(port),
        difficultyRaw: String((info && info.difficulty) ?? ''),
        difficultyLabel: String((info && (info.description || info.name)) || 'Connection'),
        description: String((info && (info.description || info.name)) || 'Connection')
      }));
  }

  function explorerMap(){
    return {
      btc:  { address:'https://mempool.space/address/',               block:'https://mempool.space/block/' },
      bch:  { address:'https://blockchair.com/bitcoin-cash/address/', block:'https://blockchair.com/bitcoin-cash/block/' },
      xec:  { address:'https://explorer.e.cash/address/',             block:'https://explorer.e.cash/block/' },
      dgb:  { address:'https://digiexplorer.info/address/',           block:'https://digiexplorer.info/block/' },
      rvn:  { address:'https://rvn.cryptoscope.io/address/?address=', block:'https://rvn.cryptoscope.io/block/?hash=' },
      lcc:  { address:'https://chainz.cryptoid.info/lcc/address.dws?',block:'https://chainz.cryptoid.info/lcc/block.dws?' },
      bc2:  { address:'#', block:'#' },
      bch2: { address:'#', block:'#' },
      btcs: { address:'#', block:'#' },
      wjk:  { address:'#', block:'#' },
      grs:  { address:'https://chainz.cryptoid.info/grs/address.dws?',block:'https://chainz.cryptoid.info/grs/block.dws?' },
      smly: { address:'#', block:'#' },
      dgco: { address:'#', block:'#' },
      bgco: { address:'#', block:'#' }
    };
  }


  function explorerFor(pidOrWallet, walletMaybe){
    let pid = 'btc';
    let wallet = walletMaybe;
    if(typeof walletMaybe === 'undefined'){
      wallet = pidOrWallet;
    }else{
      pid = String(pidOrWallet || 'btc').toLowerCase();
    }
    const base = (explorerMap()[pid] && explorerMap()[pid].address) || site.btcExplorerBase || 'https://mempool.space/address/';
    if(!wallet || base === '#') return '#';
    return `${base}${encodeURIComponent(wallet)}`;
  }

  function blockHeightHref(pid, height, hash){
    const base = (explorerMap()[String(pid||'').toLowerCase()] || {}).block || '#';
    if(base === '#') return '#';
    const ref = String(hash || '').trim();
    if(ref) return `${base}${encodeURIComponent(ref)}`;
    return '#';
  }


  function parseHashRoute(){
    const raw = location.hash || '#/';
    const [pathPart, queryPart=''] = raw.slice(2).split('?');
    const parts = pathPart.split('/').filter(Boolean);
    const query = new URLSearchParams(queryPart);
    if (!parts.length) return { kind:'landing', query };
    const pid = String(parts[0]).toLowerCase();
    if (parts.length === 1) return { kind:'home', pid, query };
    if (parts[1] === 'blocks') return { kind:'blocks', pid, query };
    if (parts[1] === 'miners') return { kind:'miners', pid, pageNum:Number(query.get('page') || '1'), query };
    if (parts[1] === 'help') return { kind:'help', pid, query };
    if (parts[1] === 'account') return { kind:'account', pid, wallet:decodeURIComponent(parts[2] || ''), tab:parts[3] || 'dashboard', query };
    return { kind:'landing', query };
  }

  function topAppBar(){
    return `
      <header class="topbar">
        <div class="wrap topbar__inner">
          <div class="brand" id="brand-home">
            <img class="brand__logo" src="/assets/brand/favicon.png" alt="" onerror="this.src='/favicon.png'">
            <div class="brand__text">
              <strong>public-pool-btc.ru</strong>
              <span>${esc(t('miningDashboard'))}</span>
            </div>
          </div>
          <nav class="topnav">
            <a class="pill active" href="#/">
              <span class="pill__icon"><svg viewBox="0 0 24 24" class="ico"><path d="M3 11.5 12 4l9 7.5"></path><path d="M5 10.5V20h14v-9.5"></path></svg></span>
              <span>${esc(t('home'))}</span>
            </a>
            <button class="pill" type="button" id="lang-btn">
              <span class="pill__icon"><svg viewBox="0 0 24 24" class="ico"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></span>
              <span>${getLang().toUpperCase()}</span>
            </button>
            <button class="pill" type="button" id="theme-btn">
              <span class="pill__icon"><svg viewBox="0 0 24 24" class="ico"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path></svg></span>
              <span>${esc(getTheme()==='dark' ? t('dark') : t('light'))}</span>
            </button>
          </nav>
        </div>
      </header>
    `;
  }

  function pageWrap(innerHtml){
    app.innerHTML = `<div class="app-root">${topAppBar()}<main class="main">${innerHtml}</main></div>`;
    const brand = document.getElementById('brand-home');
    if (brand) brand.onclick = () => { location.hash = '#/'; };
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.onclick = () => setLang(getLang() === 'en' ? 'ru' : 'en');
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) themeBtn.onclick = () => toggleTheme();
  }

  function innerCoinLayout(pool, active, body, counters={}){
    const icon = pool.icon || '/favicon.png';
    const tabs = [
      [`#/${pool.id}`, t('home'), 'home', null],
      [`#/${pool.id}/blocks`, t('blocks'), 'blocks', n(counters.blocks,0)],
      [`#/${pool.id}/miners`, t('miners'), 'miners', n(counters.miners,0)],
      [`#/${pool.id}/help`, t('help'), 'help', null],
      ['#/', t('pools'), 'pools', null],
    ];
    return `
      <div class="wrap">
        <div class="inner-panel">
          <div class="inner-nav">
            ${tabs.map(([href,label,key,badge]) => `
              <a class="subpill ${active===key?'active':''}" href="${href}">
                <span>${esc(label)}</span>
                ${badge !== null ? `<span class="subpill__badge">${badge}</span>` : ''}
              </a>
            `).join('')}
          </div>
          <div class="coin-head">
            <img src="${icon}" alt="${esc(pool.symbol)}">
            <div class="coin-head__title">${esc(pool.title)} (${esc(pool.symbol)})</div>
          </div>
          <div class="content">
            ${body}
            
          </div>
        </div>
      </div>
    `;
  }

  function buildChart(containerId, points, options){
    const el = document.getElementById(containerId);
    if (!el) return;
    if (!Array.isArray(points) || !points.length) {
      el.innerHTML = `<div class="chart-empty">${esc(t('noData'))}</div>`;
      return;
    }

    let series = (options.series || []).map(s => ({...s, visible:true}));
    const width = 1100, height = 300, ml = 58, mr = 18, mt = 16, mb = 34;
    const iw = width - ml - mr, ih = height - mt - mb;
    const xs = points.map(p => n(p.t || p.time || p.x, 0)).filter(Boolean);
    if (!xs.length) {
      el.innerHTML = `<div class="chart-empty">${esc(t('noData'))}</div>`;
      return;
    }
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const xScale = x => ml + ((x - minX) / Math.max(1, maxX - minX)) * iw;

    const legend = el.closest('.chart-card').querySelector('.legend');
    if (legend) {
      legend.innerHTML = '';
      series.forEach((s, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.innerHTML = `<i class="dot" style="background:${s.color}"></i>${s.label}`;
        btn.onclick = () => {
          series[idx].visible = !series[idx].visible;
          btn.classList.toggle('off', !series[idx].visible);
          draw();
        };
        legend.appendChild(btn);
      });
    }

    function smoothPath(vals, maxVal){
      const coords = vals.map((v,i) => {
        const x = xScale(xs[i]);
        const y = mt + ih - (maxVal > 0 ? (v / maxVal) * ih : 0);
        return [x,y];
      });
      if (coords.length < 2) return '';
      let d = `M ${coords[0][0].toFixed(2)} ${coords[0][1].toFixed(2)}`;
      for (let i=0;i<coords.length-1;i++) {
        const [x0,y0] = coords[i];
        const [x1,y1] = coords[i+1];
        const cx = (x0 + x1) / 2;
        d += ` C ${cx.toFixed(2)} ${y0.toFixed(2)}, ${cx.toFixed(2)} ${y1.toFixed(2)}, ${x1.toFixed(2)} ${y1.toFixed(2)}`;
      }
      return d;
    }

    function draw(){
      const visible = series.filter(s => s.visible);
      const globalMax = Math.max(1, ...visible.flatMap(s => points.map(p => n(p[s.key],0))));
      const axisSeries = series[0];
      const axisMax = Math.max(1, ...points.map(p => n(p[axisSeries.key],0)));
      const svg = [];

      for (let i=0;i<5;i++) {
        const y = mt + (ih/4)*i;
        svg.push(`<line class="grid-line" x1="${ml}" y1="${y}" x2="${width-mr}" y2="${y}"></line>`);
      }
      svg.push(`<line class="axis-line" x1="${ml}" y1="${mt+ih}" x2="${width-mr}" y2="${mt+ih}"></line>`);

      for (let i=0;i<5;i++) {
        const val = axisMax - (axisMax/4)*i;
        const y = mt + (ih/4)*i + 4;
        svg.push(`<text x="4" y="${y}">${esc(axisSeries.axisFormat ? axisSeries.axisFormat(val) : options.defaultFormat(val))}</text>`);
      }

      const ticks = Math.min(6, xs.length);
      for (let i=0;i<ticks;i++) {
        const tx = minX + ((maxX-minX)/Math.max(1,ticks-1))*i;
        svg.push(`<text x="${xScale(tx)}" y="${height-8}" text-anchor="middle">${esc(moscowTime(tx))}</text>`);
      }

      series.forEach(s => {
        if (!s.visible) return;
        const vals = points.map(p => n(p[s.key], 0));
        const maxVal = s.ownScale ? Math.max(1, ...vals) : globalMax;
        const d = smoothPath(vals, maxVal);
        if (s.fill && d) {
          const sx = xScale(xs[0]);
          const ex = xScale(xs[xs.length-1]);
          svg.push(`<path d="${d} L ${ex.toFixed(2)} ${mt+ih} L ${sx.toFixed(2)} ${mt+ih} Z" fill="${s.fill}" opacity="0.18"></path>`);
        }
        svg.push(`<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2.5"></path>`);
      });

      svg.push(`<line id="${containerId}-cross" class="crosshair" x1="${ml}" y1="${mt}" x2="${ml}" y2="${mt+ih}" style="display:none"></line>`);
      series.forEach((s,i) => {
        svg.push(`<circle id="${containerId}-c${i}" r="5" fill="${s.color}" stroke="#fff" stroke-width="1.5" style="display:none"></circle>`);
      });
      svg.push(`<rect id="${containerId}-hover" x="${ml}" y="${mt}" width="${iw}" height="${ih}" fill="transparent"></rect>`);

      el.innerHTML = `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" width="100%" height="100%">${svg.join('')}</svg><div class="chart-tip" id="${containerId}-tip"></div>`;

      const hover = document.getElementById(`${containerId}-hover`);
      const cross = document.getElementById(`${containerId}-cross`);
      const tip = document.getElementById(`${containerId}-tip`);
      const circles = series.map((_,i) => document.getElementById(`${containerId}-c${i}`));

      hover.onmousemove = ev => {
        const rect = hover.getBoundingClientRect();
        const rel = (ev.clientX - rect.left) / rect.width;
        const idx = Math.max(0, Math.min(points.length - 1, Math.round(rel * (points.length - 1))));
        const ts = xs[idx];
        const x = xScale(ts);

        cross.setAttribute('x1', x);
        cross.setAttribute('x2', x);
        cross.style.display = 'block';

        const lines = [moscowDate(ts)];
        series.forEach((s,i) => {
          const vals = points.map(p => n(p[s.key], 0));
          const maxVal = s.ownScale ? Math.max(1, ...vals) : globalMax;
          const v = n(points[idx][s.key], 0);
          const y = mt + ih - (maxVal > 0 ? (v / maxVal) * ih : 0);
          if (s.visible) {
            circles[i].setAttribute('cx', x);
            circles[i].setAttribute('cy', y);
            circles[i].style.display = 'block';
            lines.push(`${s.label}: ${(s.tooltipFormat || options.defaultFormat)(v)}`);
          } else {
            circles[i].style.display = 'none';
          }
        });

        tip.innerHTML = lines.join('<br>');
        tip.style.display = 'block';
        tip.style.left = `${((x / width) * 100).toFixed(2)}%`;
        tip.style.top = `42%`;
      };

      hover.onmouseleave = () => {
        cross.style.display = 'none';
        circles.forEach(c => c.style.display = 'none');
        tip.style.display = 'none';
      };
    }

    draw();
  }
  async function renderLanding(){
    const statsList = await Promise.all(pools.map(async pool => {
      const stats = await fetchPoolStats(pool.id);
      return { pool, stats };
    }));

    const rows = statsList.map(({pool, stats}) => {
      const priceCell = stats ? `${fmtUsd(n(stats.usd,0),3)} ${deltaSpan(stats.usd_24h_change)}` : `<span class="muted">—</span>`;
      const rewardValue = stats ? n(stats.reward,0) : 0;
      const rewardUsd = stats ? fmtUsd(rewardValue * n(stats.usd,0), 2) : '$0.00';
      const rewardDisplay = rewardValue > 0
        ? `${rewardValue.toFixed(3)} ${pool.symbol}`
        : (pool.rewardDisplay || '—');

      return `
        <tr>
          <td>
            <a class="row-link" href="#/${pool.id}">
              <div class="pool-cell">
                <img src="${pool.icon || '/favicon.png'}" alt="${esc(pool.symbol)}">
                <div class="pool-name">${esc(pool.symbol)}</div>
              </div>
            </a>
          </td>
          <td>${esc(pool.algorithm || 'Sha256D')}</td>
          <td>${stats ? n(stats.totalMiners,0) : '<span class="muted">—</span>'}</td>
          <td>${stats ? fmtHashrate(stats.totalHashrate) : '<span class="muted">—</span>'}</td>
          <td>${stats ? fmtHashrate(stats.networkHashrate) : '<span class="muted">—</span>'}</td>
          <td>${stats ? fmtDifficulty(stats.networkDifficulty) : '<span class="muted">—</span>'}</td>
          <td class="right-col">${priceCell}</td>
          <td class="right-col">${esc(rewardDisplay)} <span class="green">(${rewardUsd})</span></td>
        </tr>
      `;
    }).join('');

    const html = `
      <div class="wrap">
        <div class="section-title">${esc(t('soloPools'))}</div>
        <div class="table-card">
          <table>
            <thead>
              <tr>
                <th>${esc(t('pool'))}</th>
                <th>${esc(t('algorithm'))}</th>
                <th>${esc(t('miners'))}</th>
                <th>${esc(t('hashrate'))}</th>
                <th>${esc(t('networkHashrate'))}</th>
                <th>${esc(t('networkDifficulty'))}</th>
                <th>${esc(t('currentPrice'))}</th>
                <th>${esc(t('reward'))}</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    `;
    pageWrap(html);
  }

  function buildFooterLinkWallet(wallet){
    return wallet ? `${site.btcExplorerBase || 'https://mempool.space/address/'}${encodeURIComponent(wallet)}` : '#';
  }
  async function renderHome(pid){
    const pool = byId[pid] || defaultPool;
    const s = await fetchPoolStats(pid);
    if(!s) return renderPlaceholder(pool, 'home');

    const newBlocks = await fetchNewBlocksCount(pid);

    const reward = n(s.reward,0);
    const rewardUsd = reward * n(s.usd,0);

    const body = `
      <div class="grid grid-2">
        <div class="card">
          <div class="card-title">${esc(t('poolStatistics'))}</div>
          <div class="stat-row" style="--cols:2">
            <div class="stat-cell"><div class="stat-label">${esc(t('minersCount'))}</div><div class="stat-value">${n(s.totalMiners,0)}</div></div>
            <div class="stat-cell"><div class="stat-label">${esc(t('hashrate'))}</div><div class="stat-value">${fmtHashrate(s.totalHashrate)}</div></div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">${esc(t('blockStatistics'))}</div>
          <div class="stat-row" style="--cols:3">
            <div class="stat-cell"><div class="stat-label">${esc(t('currentEffort'))}</div><div class="stat-value green">${(n(s.currentEffort,0)*100).toFixed(3)}%</div></div>
            <div class="stat-cell"><div class="stat-label">${esc(t('lastBlock'))}</div><div class="stat-value">${s.lastBlockFound ? relTime(s.lastBlockFound) : t('noData')}</div></div>
            <div class="stat-cell"><div class="stat-label">${esc(t('blocksFound'))}</div><div class="stat-value">${n(s.totalBlocks,0)}</div></div>
          </div>
        </div>
      </div>

      <div class="grid grid-2" style="margin-top:14px">
        <div class="card">
          <div class="card-title">${esc(t('networkStats'))}</div>
          <div class="stat-row" style="--cols:3">
            <div class="stat-cell"><div class="stat-label">${esc(t('networkDifficulty'))}</div><div class="stat-value">${fmtDifficulty(s.networkDifficulty)}</div></div>
            <div class="stat-cell"><div class="stat-label">${esc(t('networkHashrate'))}</div><div class="stat-value">${fmtHashrate(s.networkHashrate)}</div></div>
            <div class="stat-cell"><div class="stat-label">${esc(t('currentHeight'))}</div><div class="stat-value">${n(s.currentHeight,0).toLocaleString('en-US')}</div></div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">${esc(t('currentPrice'))}</div>
          <div class="stat-row" style="--cols:2">
            <div class="stat-cell"><div class="stat-label">${esc(t('priceUsd'))}</div><div class="stat-value">${fmtUsdPrice(s.usd)} ${deltaSpan(s.usd_24h_change)}</div></div>
            <div class="stat-cell"><div class="stat-label">${esc(t('priceBtc'))}</div><div class="stat-value">${fmtBtcPrice(s.btc)} ${deltaSpan(s.btc_24h_change)}</div></div>
          </div>
        </div>
      </div>

      <div class="search-row">
        <form class="search-box" id="wallet-search-form">
          <span>🔍</span>
          <input id="wallet-search-input" placeholder="${esc(t('searchWallet'))}" value="">
        </form>
      </div>

      <div class="chart-card">
        <div class="legend"></div>
        <div class="chart-wrap"><div class="chart-box" id="home-chart"></div></div>
      </div>

      <div class="grid grid-4" style="margin-top:14px">
        <div class="card"><div class="card-title">${esc(t('algorithm'))}</div><div class="stat-cell"><div class="stat-value">${esc(s.algo || pool.algorithm || 'Unknown')}</div></div></div>
        <div class="card"><div class="card-title">${esc(t('rewardScheme'))}</div><div class="stat-cell"><div class="stat-value">${esc(s.scheme || 'SOLO')}</div></div></div>
        <div class="card"><div class="card-title">${esc(t('blockReward'))}</div><div class="stat-cell"><div class="stat-value">${reward > 0 ? `${reward.toFixed(8)} ${pool.symbol}` : '—'} <span class="green">(${fmtUsd(rewardUsd,2)})</span></div></div></div>
        <div class="card"><div class="card-title">${esc(t('poolFee'))}</div><div class="stat-cell"><div class="stat-value">${n(s.fee,0).toFixed(1)}%</div></div></div>
      </div>

      <div class="center" style="margin:22px 0 10px">
        <a href="#/${pool.id}/help" class="btn-green">${esc(t('howToConnect'))}</a>
      </div>
    `;

    pageWrap(innerCoinLayout(pool, 'home', body, { blocks:newBlocks, miners:n(s.totalMiners,0) }));
    buildChart('home-chart', Array.isArray(s.chart) ? s.chart : [], {
      series: [
        { key:'h', label:t('poolHashrate'), color:'#0e87d8', ownScale:true, tooltipFormat:fmtHashrate, axisFormat:fmtHashrate },
        { key:'d', label:t('networkDifficulty'), color:'#d89215', fill:'#d89215', ownScale:true, tooltipFormat:fmtDifficulty }
      ],
      defaultFormat: fmtHashrate
    });

    const form = document.getElementById('wallet-search-form');
    const input = document.getElementById('wallet-search-input');
    form.onsubmit = e => {
      e.preventDefault();
      const v = input.value.trim();
      if (v) location.hash = `#/${pool.id}/account/${encodeURIComponent(v)}`;
    };
  }

  function buildBlockSummaries(blocks){
    const confirmed = blocks.filter(b => String(b.status||'').toLowerCase().includes('confirm'));
    if (!confirmed.length) {
      return `<table><thead><tr><th>${esc(t('blocks'))}</th><th>${esc(t('effort'))}</th><th>Orphan</th></tr></thead><tbody><tr><td class="center">0</td><td class="center green">0%</td><td class="center red">0%</td></tr></tbody></table>`;
    }
    const intervals=[64,128,256,1024];
    const rows = intervals.map(nRows=>{
      const slice = confirmed.slice(0,nRows);
      const eff = slice.length ? (slice.reduce((a,b)=>a+n(b.effort,0),0)/slice.length)*100 : 0;
      const orphan = slice.filter(b=>String(b.status||'').toLowerCase().includes('orphan')).length;
      const orphanPct = slice.length ? (orphan/slice.length)*100 : 0;
      return `<tr><td class="center">${nRows}</td><td class="center ${eff<=100?'green':'blue'}">${eff.toFixed(0)}%</td><td class="center red">${orphanPct.toFixed(0)}%</td></tr>`;
    }).join('');
    return `<table><thead><tr><th>${esc(t('blocks'))}</th><th>${esc(t('effort'))}</th><th>Orphan</th></tr></thead><tbody>${rows}</tbody></table>`;
  }
  async function renderBlocks(pid){
    const pool = byId[pid] || defaultPool;
    const [payload, stats] = await Promise.all([
      poolApiJson(pid, '/blocks').catch(()=>({result:{blocks:[]}})),
      fetchPoolStats(pid)
    ]);
    if(!stats) return renderPlaceholder(pool, 'blocks');

    const newBlocks = await fetchNewBlocksCount(pid);

    const blocks = (((payload||{}).result||{}).blocks || []).filter(Boolean);

    const confirmed = blocks.filter(b => String(b.status||'').toLowerCase().includes('confirm'));
    const intervals = [64,128,256,1024];
    const statsRows = intervals.map(limit => {
      const slice = confirmed.slice(0, limit);
      const avgEffort = slice.length ? slice.reduce((a,b)=>a+n(b.effort,0),0) / slice.length * 100 : 0;
      const orphanPct = slice.length ? (slice.filter(b => String(b.status||'').toLowerCase().includes('orphan')).length / slice.length) * 100 : 0;
      const effortClass = avgEffort <= 100 ? 'green' : 'blue';

      return `
        <tr>
          <td>${limit}</td>
          <td class="${effortClass}">${avgEffort.toFixed(0)}%</td>
          <td class="red">${orphanPct.toFixed(0)}%</td>
        </tr>
      `;
    }).join('');

    const rows = blocks.length ? blocks.map(b => {
      const height = n(b.height || b.blockHeight,0);
      const href = blockHeightHref(pool.id, height, b.hash || b.solution || '');
      const minerRef = b.miner || b.address || '';

      return `
        <tr>
          <td>${href !== '#' ? `<a class="addr-link" href="${href}" target="_blank" rel="noopener noreferrer">${height}</a>` : height}</td>
          <td>${esc(b.type || 'Block')}</td>
          <td>${esc(moscowDate(n(b.time || b.created,0)))}</td>
          <td>${esc(b.server || 'RU')}</td>
          <td><a class="addr-link" href="#/${pool.id}/account/${encodeURIComponent(minerRef)}">${esc(shortAddr(minerRef))}</a></td>
          <td class="${n(b.effort,0)*100 <= 100 ? 'green' : 'blue'}">${(n(b.effort,0)*100).toFixed(0)}%</td>
          <td>${esc(b.solution || t('noData'))}</td>
          <td>${esc(b.status || t('noData'))}</td>
          <td>${n(b.reward,0).toLocaleString('en-US', {maximumFractionDigits: 8})}</td>
        </tr>
      `;
    }).join('') : `<tr><td colspan="9" class="center">${esc(t('noData'))}</td></tr>`;

    const body = `
      <section class="blocks-page">
        <h2 class="blocks-page__title">${esc(t('blockStatistics'))}</h2>

        <div class="table-card table-card--summary">
          <table>
            <thead>
              <tr>
                <th>Blocks</th>
                <th>${esc(t('effort'))}</th>
                <th>Orphan</th>
              </tr>
            </thead>
            <tbody>${statsRows}</tbody>
          </table>
        </div>

        <p class="blocks-page__maturity">
          ${esc(t('blockMaturity'))}
        </p>

        <div class="table-card table-card--full">
          <table>
            <thead>
              <tr>
                <th>Height</th>
                <th>${esc(t('type'))}</th>
                <th>${esc(t('time'))}</th>
                <th>${esc(t('server'))}</th>
                <th>${esc(t('miners'))}</th>
                <th>${esc(t('effort'))}</th>
                <th>${esc(t('solution'))}</th>
                <th>${esc(t('status'))}</th>
                <th>${esc(t('reward'))}</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>
    `;

    pageWrap(innerCoinLayout(pool, 'blocks', body, { blocks:newBlocks, miners:n(stats.totalMiners,0) }));
  }
  async function renderMiners(pid, pageNum=1){
    const pool = byId[pid] || defaultPool;
    const pageSize = 15;
    const [payload, stats] = await Promise.all([
      poolApiJson(pid, `/miners/${pageNum}/${pageSize}`).catch(()=>({result:{miners:[], totalCount:0}})),
      fetchPoolStats(pid)
    ]);
    if(!stats) return renderPlaceholder(pool, 'miners');

    const newBlocks = await fetchNewBlocksCount(pid);

    const result = payload.result || {};
    const miners = result.miners || [];
    const total = n(result.totalCount, miners.length);
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const rows = miners.length ? miners.map(m => `
      <tr>
        <td><span class="online-dot"></span><a class="addr-link" href="#/${pool.id}/account/${encodeURIComponent(m.address || m.wallet || m.miner || '')}">${esc(m.address || m.wallet || m.miner || '')}</a></td>
        <td>${fmtHashrate(m.hashrate || m.currentHashrate)}</td>
        <td>${esc(relTime(m.lastShare || m.lastShareTime))}</td>
      </tr>`).join('') : `<tr><td colspan="3" class="center">${esc(t('noData'))}</td></tr>`;

    const pages = [];
    const start = Math.max(1, pageNum - 3);
    const end = Math.min(totalPages, start + 7);
    for(let pn=start; pn<=end; pn++){
      pages.push(`<a href="#/${pool.id}/miners?page=${pn}" class="page-btn ${pn===pageNum?'active':''}">${pn}</a>`);
    }

    const body = `
      <h2 class="section-title">${esc(t('miners'))}</h2>
      <div class="table-card">
        <table>
          <thead><tr><th>${esc(t('miners'))}</th><th>${esc(t('hashrate'))}</th><th>${esc(t('lastShare'))}</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="pagination">${pages.join('')}</div>
    `;
    pageWrap(innerCoinLayout(pool, 'miners', body, { blocks:newBlocks, miners:n(stats.totalMiners,0) }));
  }
  async function renderHelp(pid){
    const pool = byId[pid] || defaultPool;
    const stats = await fetchPoolStats(pid);
    if(!stats) return renderPlaceholder(pool, 'help');

    const newBlocks = await fetchNewBlocksCount(pid);

    const wallet = pool.wallet || stats.poolWallet || site.btcWallet || '';
    const rows = helpRowsFromStats(stats).length ? helpRowsFromStats(stats) : (Array.isArray(site.help && site.help.rows) ? site.help.rows : []);

    const bodyRows = rows.map(r => {
      const endpoint = `stratum+tcp://${location.hostname}:${r.port}`;
      return `
        <tr>
          <td><span class="kbd-badge mono">${esc(r.difficultyRaw)} (${esc(r.difficultyLabel)})</span></td>
          <td>
            <span class="kbd-badge mono">${esc(endpoint)}</span>
            <button class="copy-btn" type="button" data-copy="${esc(endpoint)}" title="${esc(t('copy'))}">
              <svg viewBox="0 0 24 24" class="ico"><rect x="9" y="9" width="10" height="10" rx="1"></rect><rect x="5" y="5" width="10" height="10" rx="1"></rect></svg>
            </button>
          </td>
          <td>${esc(r.description)}</td>
        </tr>
      `;
    }).join('');

    const body = `
      <div class="table-card">
        <div class="card-title">${esc(t('connectionTcp'))}</div>
        <table>
          <thead><tr><th>${esc(t('difficulty'))}</th><th>${esc(t('server'))}</th><th>${esc(t('description'))}</th></tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>

      <div class="card" style="margin-top:18px">
        <div class="card-title">${esc(t('configuration'))}</div>
        <div style="padding:14px">
          <div class="small" style="margin-bottom:12px">${esc(t('useOwnWallet'))}</div>
          <div class="mono" style="margin-bottom:10px">wallet.worker</div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <span class="small">${esc(t('poolWallet'))}:</span>
            <span class="mono">${esc(wallet || t('noData'))}</span>
            ${wallet ? `<a href="${explorerFor(pool.id, wallet)}" target="_blank" rel="noopener noreferrer" title="${esc(t('blockExplorer'))}">↗</a>` : ''}
          </div>
        </div>
      </div>
    `;
    pageWrap(innerCoinLayout(pool, 'help', body, { blocks:newBlocks, miners:n(stats.totalMiners,0) }));

    document.querySelectorAll('[data-copy]').forEach(btn => {
      btn.onclick = async () => {
        const text = btn.getAttribute('data-copy') || '';
        try {
          await navigator.clipboard.writeText(text);
          const old = btn.style.color;
          btn.style.color = 'var(--green)';
          setTimeout(()=>btn.style.color=old,700);
        } catch {}
      };
    });
  }
  async function renderAccount(pid, wallet, tab='dashboard'){
    const pool = byId[pid] || defaultPool;
    const encoded = encodeURIComponent(wallet);

    const [accountPayload, rewardsPayload, payoutsPayload, stats] = await Promise.all([
      poolApiJson(pid, `/account/${encoded}/1/10`).catch(()=>({result:{}})),
      tab === 'rewards' ? poolApiJson(pid, `/account/${encoded}/rewards`).catch(()=>({result:{}})) : Promise.resolve({result:{}}),
      tab === 'payouts' ? poolApiJson(pid, `/account/${encoded}/payments`).catch(()=>({result:[]})) : Promise.resolve({result:[]}),
      fetchPoolStats(pid)
    ]);

    if(!stats) return renderPlaceholder(pool, 'home');

    const newBlocks = await fetchNewBlocksCount(pid);

    const a = accountPayload.result || {};
    const workers = Array.isArray(a.workers) ? a.workers : [];
    const chart = Array.isArray(a.chart) ? a.chart : [];
    const current30 = n(a.currentHashrate30m || a.currentHashrate,0);
    const avg3 = n(a.averageHashrate3h || a.averageHashrate || a.avgHashrate3h || a.avgHashrate,0);

    const walletHead = `
      <div class="wallet-head">
        <span class="wallet-short mono">${esc(shortAddr(wallet))}</span>
        <a class="wallet-arrow" href="${explorerFor(pool.id, wallet)}" target="_blank" rel="noopener noreferrer" title="${esc(t('blockExplorer'))}">↗</a>
      </div>
    `;
    const tabs = `
      <div class="tabs">
        <a href="#/${pool.id}/account/${encoded}" class="tab-btn ${tab==='dashboard'?'active':''}">${esc(t('dashboard'))}</a>
        <a href="#/${pool.id}/account/${encoded}/rewards" class="tab-btn ${tab==='rewards'?'active':''}">${esc(t('rewards'))}</a>
        <a href="#/${pool.id}/account/${encoded}/payouts" class="tab-btn ${tab==='payouts'?'active':''}">${esc(t('payouts'))}</a>
      </div>
    `;

    if (tab === 'rewards') {
      const rewardsResult = rewardsPayload.result || {};
      const rewards = Array.isArray(rewardsResult.rewards) ? rewardsResult.rewards : [];
      const summary = Array.isArray(rewardsResult.sumrewards) ? rewardsResult.sumrewards : [];

      const summaryMap = {};
      summary.forEach(x => { if (x && x.interval) summaryMap[String(x.interval)] = x; });

      const intervals = [
        ['hour', t('hour')],
        ['hours12', t('hours12')],
        ['hours24', t('hours24')],
        ['week', t('week')],
        ['month', t('month')]
      ];

      const summaryRows = intervals.map(([key, label]) => {
        const row = summaryMap[key] || {};
        const reward = n(row.reward, 0);
        const usd = reward * n(stats.usd, 0);
        const effort = n(row.personalEffort, 0);
        const effortClass = effort <= 100 ? 'green' : 'blue';
        return `
          <tr>
            <td>${esc(label)}</td>
            <td>${n(row.blocks,0)}</td>
            <td class="${effortClass}">${effort.toFixed(0)}%</td>
            <td>${reward.toLocaleString('en-US', {maximumFractionDigits: 8})}</td>
            <td>${fmtUsd(usd,2)}</td>
          </tr>
        `;
      }).join('');

      const body = `
        ${walletHead}${tabs}
        <div class="grid grid-2">
          <div class="table-card">
            <table>
              <thead><tr><th>${esc(t('interval'))}</th><th>${esc(t('blocks'))}</th><th>${esc(t('personalEffort'))}</th><th>${esc(pool.symbol)}</th><th>USD</th></tr></thead>
              <tbody>${summaryRows}</tbody>
            </table>
          </div>
          <div class="table-card">
            <table>
              <thead><tr><th>${esc(t('blocks'))}</th><th>${esc(t('personalEffort'))}</th></tr></thead>
              <tbody><tr><td>${n(a.blocksFound,0)}</td><td class="green">${n(a.personalEffort,0).toFixed(0)}%</td></tr></tbody>
            </table>
          </div>
        </div>
        <div class="table-card" style="margin-top:18px">
          <table>
            <thead><tr><th>Height</th><th>${esc(t('type'))}</th><th>${esc(t('time'))}</th><th>${esc(t('worker'))}</th><th>${esc(t('personalEffort'))}</th><th>${esc(t('solution'))}</th><th>${esc(t('status'))}</th><th>Percent</th><th>${esc(t('reward'))}</th></tr></thead>
            <tbody>
              ${rewards.length ? rewards.map(r => `
                <tr>
                  <td>${esc(r.height || '')}</td>
                  <td>${esc(r.type || 'Block')}</td>
                  <td>${esc(moscowDate(Number(r.created || r.time || 0)))}</td>
                  <td>${esc(r.worker || r.address || '')}</td>
                  <td>${n(r.personalEffort,0).toFixed(0)}%</td>
                  <td>${esc(r.solution || '')}</td>
                  <td>${esc(r.status || '')}</td>
                  <td>${esc(r.percent || '')}</td>
                  <td>${n(r.reward,0).toLocaleString('en-US', {maximumFractionDigits: 8})}</td>
                </tr>`).join('') : `<tr><td colspan="9" class="center">${esc(t('noData'))}</td></tr>`}
            </tbody>
          </table>
        </div>
      `;
      pageWrap(innerCoinLayout(pool, 'home', body, { blocks:newBlocks, miners:n(stats.totalMiners,0) }));
      return;
    }

    if (tab === 'payouts') {
      const payouts = Array.isArray(payoutsPayload.result) ? payoutsPayload.result : [];
      const body = `
        ${walletHead}${tabs}
        <div class="table-card">
          <table>
            <thead><tr><th>${esc(t('amount'))}</th><th>${esc(t('time'))}</th><th>TX</th></tr></thead>
            <tbody>
              ${payouts.length ? payouts.map(r => `
                <tr>
                  <td>${n(r.amount,0).toLocaleString('en-US', {maximumFractionDigits: 8})}</td>
                  <td>${esc(moscowDate(Number(r.created || r.time || r.timestamp || 0)))}</td>
                  <td>${r.tx || r.hash ? `<span class="mono">${esc(shortAddr(r.tx || r.hash))}</span>` : esc(t('noData'))}</td>
                </tr>`).join('') : `<tr><td colspan="3" class="center">${esc(t('noData'))}</td></tr>`}
            </tbody>
          </table>
        </div>
      `;
      pageWrap(innerCoinLayout(pool, 'home', body, { blocks:newBlocks, miners:n(stats.totalMiners,0) }));
      return;
    }

    const body = `
      ${walletHead}${tabs}

      <div class="grid grid-3">
        <div class="card"><div class="card-title">${esc(t('currentHashrate30m'))}</div><div class="stat-cell"><div class="stat-value">${fmtHashrate(current30)}</div></div></div>
        <div class="card"><div class="card-title">${esc(t('averageHashrate3h'))}</div><div class="stat-cell"><div class="stat-value">${fmtHashrate(avg3)}</div></div></div>
        <div class="card"><div class="card-title">${esc(t('workers'))}</div><div class="stat-row" style="--cols:2"><div class="stat-cell"><div class="stat-label">${esc(t('online'))}</div><div class="stat-value">${n(a.workerOnline,0)}</div></div><div class="stat-cell"><div class="stat-label">${esc(t('offline'))}</div><div class="stat-value">${n(a.workerOffline,0)}</div></div></div></div>
      </div>

      <div class="grid grid-4" style="margin-top:14px">
        <div class="card"><div class="card-title">${esc(t('shareSum'))}</div><div class="stat-cell"><div class="stat-value">${n(a.shareSum || a.yourRoundShareSum,0).toFixed(2)}</div></div></div>
        <div class="card"><div class="card-title">${esc(t('personalEffort'))}</div><div class="stat-cell"><div class="stat-value">${n(a.personalEffort || a.estimatedShareRound,0).toFixed(2)}%</div></div></div>
        <div class="card"><div class="card-title">${esc(t('balance'))}</div><div class="stat-cell"><div class="stat-value">${n(a.balance,0).toLocaleString('en-US', {maximumFractionDigits: 8})}</div></div></div>
        <div class="card"><div class="card-title">${esc(t('pending'))}</div><div class="stat-cell"><div class="stat-value">${n(a.pending,0).toLocaleString('en-US', {maximumFractionDigits: 8})}</div></div></div>
      </div>

      <div class="chart-card" style="margin-top:14px">
        <div class="legend"></div>
        <div class="chart-wrap"><div class="chart-box" id="account-chart"></div></div>
      </div>

      <div class="table-card" style="margin-top:18px">
        <table>
          <thead>
            <tr>
              <th>${esc(t('worker'))}</th>
              <th>${esc(t('currentHashrate30m'))}</th>
              <th>${esc(t('averageHashrate3h'))}</th>
              <th>${esc(t('valids'))}</th>
              <th>${esc(t('stale'))}</th>
              <th>${esc(t('invalid'))}</th>
              <th>${esc(t('bestShare'))}</th>
              <th>${esc(t('port'))}</th>
              <th>${esc(t('lastShare'))}</th>
            </tr>
          </thead>
          <tbody>
            ${workers.length ? workers.map(w => `
              <tr>
                <td>${esc(w.worker || w.name || '')}</td>
                <td>${fmtHashrate(w.currentHashrate30m || w.currentHashrate || w.hashrate)}</td>
                <td>${fmtHashrate(w.averageHashrate3h || w.averageHashrate || w.avgHashrate3h || w.avgHashrate)}</td>
                <td>${n(w.valids || w.valid || w.accepted,0)}</td>
                <td>${n(w.stale || w.stales,0)}</td>
                <td>${n(w.invalid || w.invalids,0)}</td>
                <td>${n(w.bestShare || w.best || w.bestShareValue,0).toLocaleString('en-US')}</td>
                <td>${n(w.port || w.portDifficulty || w.difficulty,0).toLocaleString('en-US')}</td>
                <td>${esc(relTime(w.lastShare || w.lastShareTime || w.created))}</td>
              </tr>
            `).join('') : `<tr><td colspan="9" class="center">${esc(t('noData'))}</td></tr>`}
          </tbody>
        </table>
      </div>
    `;

    pageWrap(innerCoinLayout(pool, 'home', body, { blocks:newBlocks, miners:n(stats.totalMiners,0) }));
    buildChart('account-chart', chart, {
      series: [
        { key:'h', label:t('currentHashrate30m'), color:'#0e87d8', ownScale:true, tooltipFormat:fmtHashrate, axisFormat:fmtHashrate },
        { key:'a', label:t('averageHashrate3h'), color:'#d89215', fill:'#d89215', ownScale:true, tooltipFormat:fmtHashrate, axisFormat:fmtHashrate }
      ],
      defaultFormat: fmtHashrate
    });
  }

  function renderPlaceholder(pool, section){
    const body = `
      <div class="card">
        <div class="card-title">${esc(t('pool'))}</div>
        <div class="stat-cell"><div class="stat-value">${esc(t('noData'))}</div></div>
      </div>
    `;
    pageWrap(innerCoinLayout(pool, section, body, { blocks:0, miners:0 }));
  }

  async function renderRoute(){
    const route = parseHashRoute();
    try {
      if (route.kind === 'landing') return renderLanding();
      if (route.kind === 'home') return renderHome(route.pid);
      if (route.kind === 'blocks') return renderBlocks(route.pid);
      if (route.kind === 'miners') return renderMiners(route.pid, route.pageNum || 1);
      if (route.kind === 'help') return renderHelp(route.pid);
      if (route.kind === 'account') return renderAccount(route.pid, route.wallet, route.tab);
      return renderLanding();
    } catch (err) {
      pageWrap(`<div class="wrap"><div class="card"><div class="stat-cell">Error: ${esc(err.message || err)}</div></div></div>`);
      console.error(err);
    }
  }

  window.addEventListener('hashchange', renderRoute);
  renderRoute();
})();