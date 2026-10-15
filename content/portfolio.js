/* Editable demo content. Biography, contacts, reviews, graphs, and campaign numbers are
   fictional placeholders. Keep demo labels until real, approved evidence replaces them. */
(() => {
  // Each fixture is an individual video, with retention measured in seconds.
  // The UI normalizes duration before computing equal-weight cohort averages.
  const video = (id, duration, retention) => ({id, duration, points: retention.map((value,index) => [Number((duration * [0,.1,.25,.5,.75,1][index]).toFixed(3)),value])});
window.PORTFOLIO = {
  profile: {
    name: 'Zeyad Sayed', role: 'Scriptwriter & creative strategist', isDemo: true,
    headline: 'Scripts worth staying for.',
    introduction: 'Arabic scripts for social videos and Meta ads.',
    location: 'Cairo, Egypt', languages: 'Arabic & English',
    aboutTitle: 'Hi, I’m Zeyad.',
    about: 'Scriptwriter and creative strategist, working in Arabic and English. I find the angle, write the story, and make every line count.',
    email: 'zeyad@scriptwriter.example', whatsapp: '+20 1XX XXX XXXX',
  },
  projects: [
    {
      id: 'morning-coffee', title: 'A slower kind of morning.', brand: 'Saba Coffee', category: 'UGC / Product launch', discipline: 'UGC & creative direction', duration: '30 seconds',
      concept: true, language: 'Egyptian Arabic', art: 'coffee',
      deliverables: ['3 hook variations', '30-second script', 'Shot-by-shot direction'],
      hooks: [
        {label: 'Ritual', text: 'كل يوم بيبدأ بسرعة… إلا أول رشفة.', note: 'An everyday ritual, with a moment of calm.'},
        {label: 'Contrast', text: 'مش محتاج منبّه تاني. محتاج صباح يبدأ على مزاجك.', note: 'Reframe the morning, before introducing the product.'},
        {label: 'Curiosity', text: 'في دقيقتين بين زحمة الصبح وأول رسالة… دول ليك.', note: 'Open a small gap in a familiar routine.'},
      ],
      summary: 'A coffee launch built around a moment of calm, rather than another product claim.',
      goal: 'Introduce a fictional specialty-coffee brand through a 30-second creator-led ad.',
      audience: 'Young professionals who make their morning coffee at home.',
      role: 'Concept, three hook options, Arabic script, and shot direction. No live client campaign.',
      insight: 'Start with the feeling of a morning that moves too quickly. Let the product enter as a small ritual, rather than opening with a list of features.',
      beats: [
        {label: 'Hook', time: '0–5 sec', text: 'كل يوم بيبدأ بسرعة… إلا أول رشفة.', visual: 'A busy morning stops for a beat. A hand reaches for a coffee cup.', caption: 'A moment, before the rush.', scene: 'The first pause', reason: 'The opening creates a contrast: a rushed morning, followed by one unhurried moment.'},
        {label: 'Body', time: '5–23 sec', text: 'قبل الرسايل والمشاوير، خد دقيقتين ليك. اطحن، صب، واستنى الريحة تملى المكان. دي قهوتك… وده وقتك.', visual: 'Close-ups of coffee being ground, water being poured, and a cup by the window.', caption: 'Make a little time for yourself.', scene: 'The morning ritual', reason: 'The body gives the director specific actions to show and the audience a ritual to recognise.'},
        {label: 'Call to action', time: '23–30 sec', text: 'ابدأ بكرة برشفة على مزاجك. اكتشف القهوة اللي تناسب صباحك.', visual: 'The coffee pack and cup share the frame. End on a simple product invitation.', caption: 'Find your morning cup.', scene: 'The invitation', reason: 'The final line turns the feeling into one clear invitation to explore the product.'},
      ],
    },
    {
      id: 'home-service', title: 'Off the to-do list.', brand: 'BeitCare', category: 'Meta ads / Lead generation', discipline: 'Paid social & hook testing', duration: '20 seconds',
      concept: true, language: 'Egyptian Arabic', art: 'home',
      deliverables: ['3 hook variations', '20-second ad', 'WhatsApp call to action'],
      hooks: [
        {label: 'Relatable', text: 'الحاجة اللي بتقول هصلّحها بكرة… بقالها كام بكرة؟', note: 'Make a postponed repair instantly recognisable.'},
        {label: 'Problem', text: 'حنفية بتنقّط. باب مش بيقفل. ومفيش وقت لكل ده؟', note: 'Show the small problems that stack up.'},
        {label: 'Next step', text: 'أول خطوة عشان تصلّحها؟ صوّرها.', note: 'Make the first action feel easy.'},
      ],
      summary: 'Open with a recognisable problem. Make the next step feel simple.',
      goal: 'Generate WhatsApp enquiries for a fictional home-maintenance service.',
      audience: 'Busy Cairo homeowners with small repairs they keep postponing.',
      role: 'Audience angle, three opening hooks, and a 20-second Arabic ad. No live client campaign.',
      insight: 'Make procrastination recognisable. Reduce the next step to a photo and a message.',
      beats: [
        {label: 'Hook', time: '0–4 sec', text: 'الحاجة اللي بتقول هصلّحها بكرة… بقالها كام بكرة؟', visual: 'A dripping tap interrupts a quiet kitchen. A repair reminder sits on the counter.', caption: 'Still on tomorrow’s list?', scene: 'The familiar problem'},
        {label: 'Body', time: '4–15 sec', text: 'حنفية بتنقّط؟ باب مش بيقفل؟ ابعتلنا صورة وقولنا محتاج إيه، وخلّينا نرتّب معاك الخطوة الجاية.', visual: 'A phone photographs the repair. Cut to a clean message with the image attached.', caption: 'A photo. A message. A next step.', scene: 'A simpler next step'},
        {label: 'Call to action', time: '15–20 sec', text: 'قلّل حاجة من قايمتك. ابعتلنا رسالة دلوقتي.', visual: 'A hand crosses the repair off a to-do list. The enquiry button remains visible.', caption: 'Let’s take it off your list.', scene: 'The enquiry'},
      ],
    },
    {
      id: 'learning-app', title: 'A little progress, daily.', brand: 'Khutwa', category: 'Brand storytelling', discipline: 'Brand voice & storytelling', duration: '45 seconds',
      concept: true, language: 'Egyptian Arabic', art: 'learn',
      deliverables: ['3 opening routes', '45-second launch film', 'Brand voice & visual notes'],
      hooks: [
        {label: 'Ambition', text: 'فاكر الحاجة اللي نفسك تتعلّمها؟ لسه مستنياك.', note: 'Reconnect with a personal learning goal.'},
        {label: 'Permission', text: 'مش لازم تبقى جاهز لكل حاجة. ابدأ بحاجة واحدة.', note: 'Remove the pressure to start perfectly.'},
        {label: 'Question', text: 'آخر مرة اتعلّمت حاجة لمجرد إنك بتحبها… كانت إمتى؟', note: 'Use a question to invite self-reflection.'},
      ],
      summary: 'A short brand story about making space for something you want to learn.',
      goal: 'Launch a fictional learning app with a 45-second story about making a start.',
      audience: 'Curious adults who want to learn but struggle to find time.',
      role: 'Brand narrative, three opening routes, and an Arabic launch script. No live client campaign.',
      insight: 'Replace the pressure to transform with the satisfaction of taking one small step.',
      beats: [
        {label: 'Hook', time: '0–7 sec', text: 'فاكر الحاجة اللي نفسك تتعلّمها؟ لسه مستنياك.', visual: 'An unfinished notebook opens. A saved lesson appears on a phone.', caption: 'That thing you want to learn.', scene: 'The unfinished idea'},
        {label: 'Body', time: '7–35 sec', text: 'مش لازم تفضّي يومك كله. ابدأ بفكرة، بسؤال، بدرس تختاره على مزاجك. بين مشوار ومشوار، خُد خطوة صغيرة ناحية حاجة بتحبها.', visual: 'A learner explores a lesson, takes a note, and returns to the same notebook later.', caption: 'One idea. Then another.', scene: 'A little forward movement'},
        {label: 'Call to action', time: '35–45 sec', text: 'يمكن البداية أبسط مما تتخيّل. افتح التطبيق واختار أول درس ليك.', visual: 'The first lesson is selected. End on an open notebook, ready for the next idea.', caption: 'Choose your first lesson.', scene: 'A place to begin'},
      ],
    },
  ],
  campaign: {
    mode: 'demo', title: 'Lead-generation campaign',
    introduction: 'Arabic ad scripts and hook variations.',
    objective: 'Home-service enquiries', period: '1–14 September 2026', spend: 'EGP 12,500', audience: 'Cairo homeowners, ages 25–44', role: 'Arabic scripts, ad angles, and hook variations',
    metrics: [
      {label: 'Leads', value: '312', note: 'Illustrative lead count'},
      {label: 'Cost per lead', value: '40.06', unit: 'EGP', note: 'Sample spend ÷ sample leads'},
      {label: 'Link CTR', value: '2.8%', note: 'Illustrative click-through rate'},
    ],
    evidence: {src: 'assets/sample-report.svg', alt: 'Fictional campaign report layout, prominently labeled demo; not an Ads Manager export', caption: 'Demo report layout. Replace with a dated, redacted campaign export.', source: ''},
    // Set true only after metric values and reporting context are backed by evidence.
    verified: false,
  },
  performance: {
    isDemo: true,
    definition: 'Equal-weight averages of illustrative videos, aligned by percentage of video length. Brand average includes other brand videos and excludes Zeyad’s scripts. Both cohorts share the sample format and reporting period. This is a descriptive comparison, not proof of a causal lift.',
    examples: [
      {
        projectId: 'morning-coffee', label: 'Saba Coffee', monogram: 'sc.', period: 'September 2026', format: 'Short-form product videos',
        brandVideos: [
          video('sc-brand-1',26,[100,69,55,41,30,21]), video('sc-brand-2',31,[100,73,60,45,35,25]),
          video('sc-brand-3',28,[100,71,58,43,33,24]), video('sc-brand-4',35,[100,75,62,46,36,28]),
          video('sc-brand-5',24,[100,70,57,42,32,23]), video('sc-brand-6',30,[100,74,61,45,35,26]),
        ],
        writerVideos: [
          video('sc-zeyad-1',28,[100,87,77,64,52,43]), video('sc-zeyad-2',30,[100,89,80,67,55,45]),
          video('sc-zeyad-3',32,[100,85,75,62,50,40]), video('sc-zeyad-4',27,[100,88,79,66,54,44]),
        ],
      },
      {
        projectId: 'home-service', label: 'BeitCare', monogram: 'bc.', period: 'September 2026', format: 'Short-form service ads',
        brandVideos: [
          video('bc-brand-1',18,[100,75,63,49,39,30]), video('bc-brand-2',23,[100,78,66,52,42,33]),
          video('bc-brand-3',21,[100,72,60,46,36,27]), video('bc-brand-4',26,[100,76,64,50,40,31]),
          video('bc-brand-5',20,[100,74,62,48,38,29]),
        ],
        writerVideos: [
          video('bc-zeyad-1',20,[100,90,82,73,63,54]), video('bc-zeyad-2',24,[100,87,79,69,59,50]),
          video('bc-zeyad-3',22,[100,89,81,71,61,52]),
        ],
      },
      {
        projectId: 'learning-app', label: 'Khutwa', monogram: 'k.', period: 'September 2026', format: 'Short-form brand stories',
        brandVideos: [
          video('k-brand-1',35,[100,65,51,37,26,18]), video('k-brand-2',45,[100,70,56,42,31,23]),
          video('k-brand-3',42,[100,68,54,40,29,21]), video('k-brand-4',52,[100,66,52,38,27,19]),
          video('k-brand-5',39,[100,69,55,41,30,22]), video('k-brand-6',48,[100,70,56,42,31,23]),
        ],
        writerVideos: [
          video('k-zeyad-1',45,[100,83,72,60,47,36]), video('k-zeyad-2',40,[100,86,75,63,50,39]),
          video('k-zeyad-3',48,[100,81,70,58,45,34]), video('k-zeyad-4',43,[100,87,76,64,51,40]),
        ],
      },
    ],
  },
  reviews: {
    isDemo: true,
    items: [
      {quote: 'Three distinct hooks, one clear direction. Our creator could shoot straight from the script.', role: 'Creative director', company: 'Saba Coffee / concept brand', initials: 'SC'},
      {quote: 'The rewrite made the offer easier to understand, with a much clearer next step.', role: 'Paid social lead', company: 'BeitCare / concept brand', initials: 'BC'},
    ],
  },
  services: [
    {title: 'Social video scripts', text: 'Reels, UGC concepts, and short-form stories written for the way people watch.'},
    {title: 'Paid-ad scripts', text: 'Audience-led angles, alternative hooks, and a clear journey from interest to action.'},
    {title: 'Brand stories', text: 'A voice, a point of view, and a narrative that helps people understand the brand.'},
  ],
};
})();
