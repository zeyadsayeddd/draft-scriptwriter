(function () {
  'use strict';

  function retentionAt(points, second) {
    if (!points.length) throw new RangeError('Retention points are required.');
    if (second <= points[0][0]) return points[0][1];
    for (let index = 1; index < points.length; index++) {
      const [endTime, endValue] = points[index];
      const [startTime, startValue] = points[index - 1];
      if (second <= endTime) return startValue + (endValue - startValue) * (second - startTime) / (endTime - startTime);
    }
    return points.at(-1)[1];
  }

  // Compare the same fraction of each video, not the same absolute second.
  function cohortAt(videos, progress) {
    if (!videos.length) throw new RangeError('A cohort needs at least one video.');
    const fraction = Math.max(0, Math.min(100, progress)) / 100;
    return videos.reduce((sum, video) => sum + retentionAt(video.points, video.duration * fraction), 0) / videos.length;
  }

  function cohortCurve(videos) {
    return Array.from({length:21}, (_, index) => [index * 5, cohortAt(videos, index * 5)]);
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = {retentionAt, cohortAt, cohortCurve};
  if (typeof window === 'undefined') return;

  const content = window.PORTFOLIO;
  const examples = content.performance.examples;
  const $ = selector => document.querySelector(selector);
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const chart = $('#retention-chart');
  const slider = $('#retention-scrubber');
  const percent = value => `${Math.round(value)}%`;
  let selected = 0;
  let currentProgress = 50;
  let chartWidth = 0;
  let dimensions;

  $('#retention-examples').innerHTML = examples.map((example, index) => `<button type="button" data-example="${index}" aria-pressed="${index === 0}"><span class="brand-monogram" aria-hidden="true">${escape(example.monogram)}</span><span>${escape(example.label)}</span></button>`).join('');

  function updateCursor() {
    const sample = examples[selected];
    const writer = cohortAt(sample.writerVideos, currentProgress);
    const brand = cohortAt(sample.brandVideos, currentProgress);
    const {left,right,top,bottom} = dimensions;
    const x = left + (right-left) * currentProgress / 100;
    const y = value => bottom - (bottom-top) * value / 100;
    const line = $('#retention-cursor');
    line.setAttribute('x1',x); line.setAttribute('x2',x);
    $('#writer-dot').setAttribute('cx',x); $('#writer-dot').setAttribute('cy',y(writer));
    $('#brand-dot').setAttribute('cx',x); $('#brand-dot').setAttribute('cy',y(brand));
    slider.value = currentProgress;
    slider.setAttribute('aria-valuetext',`${currentProgress} percent through the videos; Zeyad’s scripts ${percent(writer)} retained, brand average ${percent(brand)} retained`);
    $('#retention-readout').textContent = `${currentProgress}% through · Zeyad ${percent(writer)} · Brand ${percent(brand)}`;
  }

  function drawChart() {
    const sample = examples[selected];
    const width = Math.max(250,Math.round(chart.clientWidth));
    chartWidth = width;
    const left = 39, right = width-13, top = 22, bottom = 219;
    dimensions = {left,right,top,bottom};
    const x = progress => left+(right-left)*progress/100;
    const y = retained => bottom-(bottom-top)*retained/100;
    const pathFor = points => points.map(([progress,value],index) => `${index ? 'L' : 'M'}${x(progress).toFixed(2)},${y(value).toFixed(2)}`).join(' ');
    const writerLine = pathFor(cohortCurve(sample.writerVideos));
    const brandLine = pathFor(cohortCurve(sample.brandVideos));
    const area = `${writerLine} L${right},${bottom} L${left},${bottom} Z`;
    const grid = [100,75,50,25,0].map(value => `<line x1="${left}" x2="${right}" y1="${y(value)}" y2="${y(value)}" stroke="#745367" stroke-opacity=".45"/><text x="${left-8}" y="${y(value)+3}" text-anchor="end" fill="#ceb6c8" font-size="10">${value}%</text>`).join('');
    const ticks = [[0,'Start'],[25,'25%'],[50,'50%'],[75,'75%'],[100,'End']].map(([progress,label]) => `<text x="${x(progress)}" y="242" text-anchor="middle" fill="#ceb6c8" font-size="10">${label}</text>`).join('');
    chart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 259" role="img" aria-labelledby="retention-title retention-description"><title id="retention-title">Sample average retention for ${escape(sample.label)}</title><desc id="retention-description">Illustrative equal-weight averages of ${sample.writerVideos.length} Zeyad-scripted videos and ${sample.brandVideos.length} other brand videos, normalized by video length. At the end, ${percent(cohortAt(sample.writerVideos,100))} and ${percent(cohortAt(sample.brandVideos,100))} of starting viewers remain, respectively. Use the slider or table to inspect both averages.</desc><defs><linearGradient id="retention-fill" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#e7aec5" stop-opacity=".18"/><stop offset="1" stop-color="#e7aec5" stop-opacity="0"/></linearGradient></defs>${grid}<path d="${area}" fill="url(#retention-fill)"/><path id="retention-brand" d="${brandLine}" stroke="#b7a4b2" stroke-width="2" fill="none" stroke-dasharray="6 5" stroke-linejoin="round"/><path id="retention-writer" d="${writerLine}" stroke="#f1b7d1" stroke-width="2.7" fill="none" stroke-linejoin="round" stroke-linecap="round"/><line id="retention-cursor" x1="0" x2="0" y1="${top}" y2="${bottom}" stroke="#e9cedf" stroke-width="1" stroke-dasharray="3 5"/><circle id="brand-dot" cx="0" cy="0" r="4" fill="#b7a4b2" stroke="#251e27" stroke-width="2"/><circle id="writer-dot" cx="0" cy="0" r="5" fill="#f6d7e8" stroke="#7b3c5d" stroke-width="2"/>${ticks}</svg>`;
    updateCursor();
  }

  function selectExample(index) {
    selected = index;
    currentProgress = 50;
    const sample = examples[index];
    $('#retention-examples').querySelectorAll('button').forEach((button,i) => button.setAttribute('aria-pressed',i === index));
    $('#attention-context').textContent = `${sample.writerVideos.length} scripted videos · ${sample.brandVideos.length} other brand videos`;
    $('#attention-summary').innerHTML = [[50,'At halfway'],[100,'At the final frame']].map(([progress,label]) => `<div class="attention-stat"><span>${label}</span><strong aria-label="Zeyad’s scripts: ${percent(cohortAt(sample.writerVideos,progress))}">${percent(cohortAt(sample.writerVideos,progress))}</strong><small>Brand average ${percent(cohortAt(sample.brandVideos,progress))}</small></div>`).join('');
    $('#retention-table').innerHTML = Array.from({length:11},(_,index) => index*10).map(progress => `<tr><th scope="row">${progress}%</th><td>${cohortAt(sample.writerVideos,progress).toFixed(1)}%</td><td>${cohortAt(sample.brandVideos,progress).toFixed(1)}%</td></tr>`).join('');
    $('#retention-definition').textContent = `${content.performance.definition} ${sample.label}: ${sample.format}, ${sample.period}.`;
    drawChart();
  }

  $('#retention-examples').addEventListener('click',event => {
    const button = event.target.closest('[data-example]');
    if (button) selectExample(Number(button.dataset.example));
  });
  slider.addEventListener('input',() => {currentProgress=Number(slider.value);updateCursor();});
  function inspectChart(event) {
    const rect = chart.querySelector('svg').getBoundingClientRect();
    const localX = (event.clientX-rect.left)*chartWidth/rect.width;
    currentProgress = Math.round(Math.max(0,Math.min(1,(localX-dimensions.left)/(dimensions.right-dimensions.left)))*100);
    updateCursor();
  }
  chart.addEventListener('pointermove',event => {if(event.pointerType==='mouse') inspectChart(event);});
  chart.addEventListener('pointerdown',inspectChart);
  document.addEventListener('portfolio:show-performance',event => {
    const index = examples.findIndex(sample => sample.projectId===event.detail.projectId);
    if(index>=0) selectExample(index);
  });
  selectExample(0);
  if(window.ResizeObserver) new ResizeObserver(() => {
    if(Math.abs(chart.clientWidth-chartWidth)>1) drawChart();
  }).observe(chart);
})();
