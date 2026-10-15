(() => {
  'use strict';
  const content = window.PORTFOLIO;
  const $ = (selector) => document.querySelector(selector);
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const safeAsset = value => typeof value === 'string' && (/^assets\/[a-z0-9/_.-]+$/i.test(value) || /^https:\/\//.test(value)) ? value : '';
  const artPath = project => `assets/${['coffee', 'home', 'learn'].includes(project.art) ? project.art : 'coffee'}.svg`;

  document.querySelectorAll('[data-profile]').forEach(node => { node.textContent = content.profile[node.dataset.profile] || ''; });
  document.title = `${content.profile.name} — ${content.profile.role}`;
  $('#year').textContent = new Date().getFullYear();

  $('#projects').innerHTML = content.projects.map(project => `
    <article class="project-card">
      <button class="project-button" type="button" data-project="${escape(project.id)}" aria-label="Read ${escape(project.title)}">
        <div class="project-image ${escape(project.art)}"><img src="${artPath(project)}" alt="${escape(project.brand)} concept illustration, not produced client work" width="640" height="800" loading="lazy"><span class="sample-badge">Concept film</span><span class="poster-opening arabic" lang="ar" dir="rtl">${escape(project.beats[0].text)}</span></div>
        <div class="project-writing"><div class="project-meta"><span>${escape(project.brand)}</span><span>${escape(project.duration.replace('seconds','sec'))}</span></div>
        <h3>${escape(project.title)}</h3><div class="project-footer"><span class="project-read">View script <span aria-hidden="true">↗</span></span></div></div>
      </button>
    </article>`).join('');

  const campaign = content.campaign;
  const demoCampaign = campaign.mode === 'demo';
  const hasEvidence = Boolean(campaign.verified && safeAsset(campaign.evidence.src) && campaign.evidence.alt && campaign.objective && campaign.period && campaign.spend && campaign.audience && campaign.role);
  $('#campaign-title').textContent = campaign.title;
  $('#campaign-intro').textContent = campaign.introduction;
  $('.status-tag').textContent = demoCampaign ? 'Illustrative campaign figures' : hasEvidence ? 'Campaign evidence supplied' : 'Results awaiting evidence';
  $('#campaign-context').innerHTML = [
    ['Objective', campaign.objective || 'Add the campaign objective'],
    ['Reporting period', campaign.period || 'Add the date range'],
    ['Ad spend', campaign.spend || 'Add amount and currency'],
    ['Audience', campaign.audience || 'Add targeting context'],
    ['My contribution', campaign.role || 'Add exact responsibilities'],
  ].map(([label, value]) => `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`).join('');
  $('#metrics').innerHTML = campaign.metrics.map(metric => {
    const present = (demoCampaign || hasEvidence) && metric.value !== null && String(metric.value).trim() !== '';
    return `<div class="metric"><span class="metric-label">${escape(metric.label)}</span><strong class="metric-value"${present ? '' : ' aria-label="Not yet supplied"'}>${present && metric.unit ? `<span class="metric-unit">${escape(metric.unit)}</span> ` : ''}${present ? escape(metric.value) : '—'}</strong><span class="metric-note">${escape(demoCampaign ? metric.note : present ? 'Evidence supplied below' : 'Awaiting verified evidence')}</span></div>`;
  }).join('');
  $('#campaign-evidence').innerHTML = (demoCampaign || hasEvidence) && safeAsset(campaign.evidence.src)
    ? `<a href="${escape(safeAsset(campaign.evidence.src))}" target="_blank" rel="noopener noreferrer" aria-label="${demoCampaign ? 'Open sample report layout' : 'Open full campaign evidence'}"><img class="evidence-image" src="${escape(safeAsset(campaign.evidence.src))}" alt="${escape(campaign.evidence.alt)}" loading="lazy"></a><p class="evidence-caption">${escape(campaign.evidence.caption)}${/^https:\/\//.test(campaign.evidence.source) ? ` <a href="${escape(campaign.evidence.source)}" target="_blank" rel="noopener noreferrer">Reporting source</a>` : ''}</p>`
    : `<div class="evidence-empty"><svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="6" width="24" height="21" rx="3"/><path d="m7 23 7-8 5 5 3-3 6 7"/><circle cx="23" cy="12" r="2"/></svg><h4>The proof goes here.</h4><p>Add a dated Meta Ads Manager screenshot or campaign report.</p><small>Placeholder only. No performance figures are claimed.</small></div>`;

  $('#services').innerHTML = content.services.map(service => `<span class="service">${escape(service.title)}</span>`).join('');
  $('#reviews-grid').innerHTML = content.reviews.items.map(review => `<figure class="review"><blockquote>${escape(review.quote)}</blockquote><figcaption><span class="review-avatar" aria-hidden="true">${escape(review.initials)}</span><span><strong>${escape(review.role)}</strong><span>${escape(review.company)}</span></span></figcaption></figure>`).join('');
  const contactLinks = [];
  if (!content.profile.isDemo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.profile.email)) contactLinks.push(`<a href="mailto:${escape(content.profile.email)}">${escape(content.profile.email)}</a>`);
  if (!content.profile.isDemo && /^https:\/\/wa\.me\/\d+$/.test(content.profile.whatsapp)) contactLinks.push(`<a href="${escape(content.profile.whatsapp)}" target="_blank" rel="noopener noreferrer">WhatsApp</a>`);
  $('#contact-links').innerHTML = content.profile.isDemo
    ? `<div class="demo-contact"><div class="email-row"><p>${escape(content.profile.email)}</p><button class="copy-email" type="button" aria-label="Copy sample email address">Copy email</button></div><p>${escape(content.profile.whatsapp)}</p><small>Sample contact</small><span id="copy-status" class="copy-status" role="status"></span></div>`
    : contactLinks.length
    ? `<div class="contact-links">${contactLinks.join('')}</div>`
    : '<div class="contact-pending"><span aria-hidden="true">↗</span><div><strong>Your contact details, here.</strong><p>Email and WhatsApp will appear once your details are added.</p></div></div>';

  const dialog = $('#project-dialog');
  let opener;
  function openProject(id) {
    const project = content.projects.find(item => item.id === id);
    if (!project) return;
    const index = content.projects.indexOf(project);
    const previous = content.projects[(index - 1 + content.projects.length) % content.projects.length];
    const next = content.projects[(index + 1) % content.projects.length];
    const video = project.media && safeAsset(project.media.src);
    $('#dialog-content').innerHTML = `
      <div class="dialog-intro"><p>${escape(project.brand)} / ${escape(project.category)} / ${escape(project.duration)}</p><h2 id="dialog-title">${escape(project.title)}</h2></div>
      <div class="dialog-brief"><div><h3>The brief</h3><p>${escape(project.goal)}</p></div><div><h3>The audience</h3><p>${escape(project.audience)}</p></div></div>
      <p class="dialog-role">Contribution: ${escape(project.role)}</p>
      <div class="dialog-deliverables" aria-label="Project deliverables">${project.deliverables.map(item => `<span>${escape(item)}</span>`).join('')}</div>
      <div class="dialog-insight"><h3>The thinking</h3><p>${escape(project.insight)}</p></div>
      <div class="dialog-script">${project.beats.map(beat => `<section class="dialog-beat"><div class="dialog-beat-heading"><h4>${escape(beat.label)}</h4><span>${escape(beat.time)}</span></div><p class="arabic" lang="ar" dir="rtl">${escape(beat.text)}</p><p><strong>On screen:</strong> ${escape(beat.visual)}</p></section>`).join('')}</div>
      <details class="dialog-hooks"><summary>Three opening routes <span aria-hidden="true">＋</span></summary>${project.hooks.map(hook => `<div><h3>${escape(hook.label)}</h3><p class="arabic" lang="ar" dir="rtl">${escape(hook.text)}</p></div>`).join('')}</details>
      <div class="dialog-media">${video ? `<video src="${escape(video)}"${safeAsset(project.media.poster) ? ` poster="${escape(safeAsset(project.media.poster))}"` : ''} controls playsinline preload="none" aria-label="${escape(project.title)} finished creative"></video>` : `<img src="${artPath(project)}" alt="${escape(project.brand)} concept illustration, not finished footage" width="640" height="800" loading="lazy">`}<p>${video ? 'Finished creative supplied for this project.' : 'Concept illustration. No finished client footage or campaign results are attached.'}</p></div>
      <button class="dialog-proof" type="button" data-proof-project="${escape(project.id)}"><span>Explore the sample performance</span><span aria-hidden="true">↗</span></button>
      <nav class="dialog-nav" aria-label="Browse writing projects"><button type="button" data-project="${escape(previous.id)}">← ${escape(previous.title)}</button><button type="button" data-project="${escape(next.id)}">${escape(next.title)} →</button></nav>`;
    if (!dialog.open) { opener = document.activeElement; dialog.showModal(); document.documentElement.classList.add('dialog-open'); }
    dialog.scrollTop = 0;
    $('#close-dialog').focus();
  }
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-project]');
    if (trigger) openProject(trigger.dataset.project);
  });
  const pauseDialogMedia = () => dialog.querySelectorAll('video').forEach(video => video.pause());
  const closeProject = () => { pauseDialogMedia(); dialog.close(); };
  $('#close-dialog').addEventListener('click', closeProject);
  dialog.addEventListener('cancel', pauseDialogMedia);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject();
    }
  });
  dialog.addEventListener('close', () => {
    pauseDialogMedia();
    document.documentElement.classList.remove('dialog-open');
    if (opener?.isConnected) opener.focus({preventScroll:true});
  });

  document.addEventListener('click',event => {
    const trigger = event.target.closest('[data-proof-project]');
    if (!trigger) return;
    // Native dialog cleanup completes before moving focus to the proof section.
    dialog.addEventListener('close', () => {
      document.dispatchEvent(new CustomEvent('portfolio:show-performance',{detail:{projectId:trigger.dataset.proofProject}}));
      $('#attention').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
      $('#attention-title').focus({preventScroll:true});
    },{once:true});
    closeProject();
  });

  const copyButton = $('.copy-email');
  if (copyButton) copyButton.addEventListener('click',async () => {
    try {
      await navigator.clipboard.writeText(content.profile.email);
      $('#copy-status').textContent = 'Sample email copied.';
      copyButton.textContent = 'Copied';
    } catch {
      copyButton.textContent = 'Copy email';
      $('#copy-status').textContent = 'Select the email address to copy it.';
    }
  });

  const navLinks = [...document.querySelectorAll('.site-header nav a')];
  if ('IntersectionObserver' in window) {
    const visibility = new Map();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => visibility.set(entry.target.id,entry.isIntersecting ? entry.intersectionRatio : 0));
      const current = [...visibility.entries()].sort((a,b) => b[1]-a[1]).find(([,ratio]) => ratio > 0)?.[0];
      navLinks.forEach(link => {
        if (link.hash === `#${current === 'results' ? 'attention' : current}`) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    },{rootMargin:'-12% 0px -35% 0px',threshold:[0,.1,.25,.5,.75,1]});
    navLinks.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
    observer.observe($('#results'));
  }
})();
