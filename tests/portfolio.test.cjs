const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {handler} = require('../scripts/serve.cjs');
const root = path.resolve(__dirname, '..');
const sandbox = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'content/portfolio.js'),'utf8'), sandbox);
const content = sandbox.window.PORTFOLIO;
const {retentionAt, cohortAt, cohortCurve} = require('../performance.js');

test('every concept includes a complete three-beat Arabic script and transparent attribution', () => {
  assert.equal(content.projects.length, 3);
  assert.equal(new Set(content.projects.map(p => p.id)).size, 3);
  for (const project of content.projects) {
    assert.equal(project.concept, true);
    assert.equal(project.beats.length, 3);
    assert.ok(project.goal && project.audience && project.insight && project.role);
    assert.equal(project.hooks.length,3);
    assert.equal(project.hooks[0].text,project.beats[0].text);
    assert.equal(project.deliverables.length,3);
    assert.match(project.role, /[Nn]o /);
    assert.ok(fs.existsSync(path.join(root,'assets',`${project.art}.svg`)));
    for (const beat of project.beats) {
      assert.match(beat.text, /[\u0600-\u06ff]/);
      assert.ok(beat.label && beat.time && beat.visual && beat.caption && beat.scene);
    }
  }
});

test('requested identity is correct and all fictional proof remains explicitly marked', () => {
  assert.equal(content.profile.name,'Zeyad Sayed');
  assert.equal(content.campaign.mode, 'demo');
  assert.equal(content.campaign.verified, false);
  assert.equal(content.profile.isDemo, true);
  assert.match(content.profile.email, /\.example$/);
  assert.equal(content.performance.isDemo, true);
  assert.equal(content.reviews.isDemo, true);
  content.reviews.items.forEach(review => assert.match(review.company, /concept brand$/));
  assert.match(fs.readFileSync(path.join(root,content.campaign.evidence.src),'utf8'), /Illustrative data only/);
});

test('cohort averages normalize video duration and weight each video equally', () => {
  const videos = [
    {duration:10,views:10000,points:[[0,100],[5,60],[10,20]]},
    {duration:20,views:10,points:[[0,100],[10,40],[20,10]]},
  ];
  assert.equal(retentionAt(videos[0].points,2.5),80);
  assert.equal(retentionAt(videos[0].points,-1),100);
  assert.equal(retentionAt(videos[0].points,11),20);
  assert.equal(cohortAt(videos,50),50);
  assert.equal(cohortAt(videos,-10),100);
  assert.equal(cohortAt(videos,110),15);
  assert.equal(cohortCurve(videos).length,21);
  assert.deepEqual(cohortCurve(videos)[10],[50,50]);
  assert.throws(() => cohortAt([],50),RangeError);
});

test('sample brand and writer cohorts are disjoint and use complete valid videos', () => {
  for (const sample of content.performance.examples) {
    assert.ok(content.projects.some(project => project.id === sample.projectId));
    assert.ok(sample.period && sample.format);
    assert.ok(sample.writerVideos.length > 1 && sample.brandVideos.length > 1);
    const all = [...sample.writerVideos,...sample.brandVideos];
    assert.equal(new Set(all.map(video => video.id)).size,all.length);
    for (const video of all) {
      assert.ok(video.duration > 0);
      assert.equal(video.points[0][0],0);
      assert.equal(video.points[0][1],100);
      assert.equal(video.points.at(-1)[0],video.duration);
      video.points.forEach(([time,value],index) => {
        assert.ok(Number.isFinite(time) && value >= 0 && value <= 100);
        if(index) assert.ok(time > video.points[index-1][0]);
      });
    }
    const expectedEnd = sample.writerVideos.reduce((sum,video) => sum + video.points.at(-1)[1],0)/sample.writerVideos.length;
    assert.equal(cohortAt(sample.writerVideos,100),expectedEnd);
  }
  const coffee = content.performance.examples[0];
  assert.equal(cohortAt(coffee.writerVideos,50),64.75);
  assert.ok(Math.abs(cohortAt(coffee.brandVideos,50)-43.6666666667)<1e-8);
  assert.equal(cohortAt(coffee.writerVideos,100),43);
  assert.equal(cohortAt(coffee.brandVideos,100),24.5);
});

test('preview server serves assets, supports media ranges, and refuses traversal', async () => {
  const server = http.createServer(handler);
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  try {
    const base = `http://127.0.0.1:${server.address().port}`;
    const page = await fetch(base);
    assert.equal(page.status,200);
    assert.match(await page.text(), /id="project-dialog"/);
    const image = await fetch(`${base}/assets/coffee.svg`);
    assert.equal(image.headers.get('content-type'),'image/svg+xml');
    const range = await fetch(`${base}/assets/coffee.svg`, {headers:{range:'bytes=0-19'}});
    assert.equal(range.status,206);
    assert.equal((await range.arrayBuffer()).byteLength,20);
    const suffix = await fetch(`${base}/assets/coffee.svg`, {headers:{range:'bytes=-10'}});
    assert.equal(suffix.status,206);
    assert.equal((await suffix.arrayBuffer()).byteLength,10);
    assert.equal((await fetch(`${base}/assets/coffee.svg`,{headers:{range:'bytes=999999-'}})).status,416);
    assert.equal((await fetch(`${base}/.gitignore`)).status,404);
    assert.equal((await fetch(`${base}/%2e%2e%2fREADME.md`)).status,404);
    assert.equal((await fetch(`${base}/%00`)).status,404);
    assert.equal((await fetch(`${base}/not-found`)).status,404);
    assert.equal((await fetch(base,{method:'POST'})).status,405);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
