// Site-wide content + data + image references
// Photography URLs reference Creative NZ's published media (placeholder use for demo)
// Logo, brand marks are explicit "[CNZ logo]" placeholders.

window.SITE = {
  name: 'Creative New Zealand',
  reo: 'Toi Aotearoa',
  whakatauki: {
    text: 'Mā te toi e ora ai te wairua, mā te wairua e ora ai te tangata.',
    en: 'The arts give life to the spirit; the spirit gives life to the people.',
  },
};

// Top-level navigation — mirrors creativenz.govt.nz IA exactly
window.NAV = [
  { id: 'home', label: 'Home', kupu: 'Kāinga', path: '/' },
  { id: 'funding', label: 'Funding & support', kupu: 'Pūtea tautoko', path: '/funding',
    children: [
      { label: 'Early career artists', kupu: 'Toi tipu', path: '/funding/early-career' },
      { label: 'Artists & practitioners', kupu: 'Ringatoi', path: '/funding/artists' },
      { label: 'Arts organisations & groups', kupu: 'Whakahaere', path: '/funding/organisations' },
      { label: 'All opportunities', kupu: 'Ngā tūmanako', path: '/funding/opportunities' },
      { label: 'Funding calendar', kupu: '', path: '/funding/calendar' },
      { label: 'Advice & support', kupu: 'Tohutohu', path: '/funding/advice' },
      { label: 'Speak with an adviser', kupu: '', path: '/funding/adviser' },
      { label: 'Sustainable careers', kupu: 'Mahi pūmau', path: '/funding/sustainable-careers' },
      { label: 'Results', kupu: 'Hua', path: '/funding/results' },
      { label: 'Award winners', kupu: '', path: '/funding/awards' },
    ]
  },
  { id: 'advocacy', label: 'Advocating for the arts', kupu: 'Tautoko toi', path: '/advocacy',
    children: [
      { label: 'Advocacy tools & research', path: '/advocacy/tools' },
      { label: 'Our advocacy work', path: '/advocacy/work' },
      { label: 'Te Rōpū Mana Toi', path: '/advocacy/rōpū' },
    ]
  },
  { id: 'resources', label: 'Development & resources', kupu: 'Rauemi', path: '/resources',
    children: [
      { label: 'New Zealanders & the Arts', kupu: 'Ko Aotearoa me ōna Toi', path: '/resources/research' },
      { label: 'Sustainable careers', path: '/resources/careers' },
      { label: 'Nui te Kōrero', path: '/resources/nui-te-korero' },
      { label: 'Toolkits', path: '/resources/toolkits' },
      { label: 'Research & reports', path: '/resources/reports' },
    ]
  },
  { id: 'about', label: 'About Creative NZ', kupu: 'Mō mātou', path: '/about',
    children: [
      { label: 'What we do', path: '/about/what-we-do' },
      { label: 'Our change journey', path: '/about/change' },
      { label: 'Our vision & values', path: '/about/vision' },
      { label: 'Our Council', path: '/about/council' },
      { label: 'Our team', path: '/about/team' },
      { label: 'Corporate documents', path: '/about/documents' },
      { label: 'Work for us', path: '/about/careers' },
      { label: 'Contact us', path: '/about/contact' },
    ]
  },
  { id: 'news', label: 'News & blog', kupu: 'Pitopito kōrero', path: '/news' },
  { id: 'maori', label: 'Ngā Toi Māori', kupu: 'Māori arts', path: '/toi-maori' },
  { id: 'pasifika', label: 'Toi Pasifika', kupu: 'Pacific arts', path: '/toi-pasifika' },
];

// Sample CNZ photography (linked from their CDN for demo purposes)
window.IMAGES = {
  early: 'https://creativenz.govt.nz/-/media/project/creative-nz/creativenz/fundingandsupportimages/20231106_website_early_career.png?w=900&hash=FB5B108A7A58FB687AC422A8C3888876',
  artists: 'https://creativenz.govt.nz/-/media/project/creative-nz/creativenz/fundingandsupportimages/20231106_website_artists.png?w=900&hash=36132AA865027545E2B660826A9FB40E',
  orgs: 'https://creativenz.govt.nz/-/media/project/creative-nz/creativenz/fundingandsupportimages/20231106_website_arts_organisaions.png?w=900&hash=DE600A55066E554B3AE16DCC9D8AE4EE',
  // Generic editorial fallback imagery for news/stories
  pasifika: 'https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb?w=1200&q=80',
  performance: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1200&q=80',
  community: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&q=80',
  gallery: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&q=80',
  studio: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80',
  music: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80',
  dance: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1200&q=80',
  craft: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&q=80',
  literature: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80',
  theatre: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&q=80',
  carving: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1200&q=80',
};

window.STATS = [
  { value: 88, suffix: '%', label: 'of New Zealanders say arts contribute to our identity', kupu: 'tuakiri' },
  { value: 38.4, prefix: '$', suffix: 'M', label: 'invested in artists & organisations last year', kupu: 'haumi' },
  { value: 1247, label: 'projects funded across Aotearoa', kupu: 'kaupapa' },
  { value: 73, suffix: '%', label: 'of adults attended an arts event in the past year', kupu: 'haerenga' },
];

window.FUNDING_TIERS = [
  { id: 'early', label: 'Early career artists', kupu: 'Toi tipu', img: window.IMAGES.early, path: '/funding/early-career',
    blurb: 'Support for artists, practitioners and groups at an early stage of their career.',
    amount: 'Up to $25,000', next: '14 May 2026' },
  { id: 'artists', label: 'Artists & practitioners', kupu: 'Ringatoi', img: window.IMAGES.artists, path: '/funding/artists',
    blurb: 'For artists working independently or collaborating for a specific purpose or project.',
    amount: 'Up to $65,000', next: '28 May 2026' },
  { id: 'orgs', label: 'Arts organisations & groups', kupu: 'Whakahaere', img: window.IMAGES.orgs, path: '/funding/organisations',
    blurb: 'Multi-year support for arts organisations and groups with a long-term vision.',
    amount: '3-year commitment', next: 'Investment 2027' },
];

window.OPPORTUNITIES = [
  { id: 'ccs', code: 'CCS', title: 'Creative Communities Scheme', kupu: 'Ngā tahua hapori', amount: '$1k–$7,500',
    next: 'Open year-round', status: 'open', tier: 'community',
    desc: 'Local-council-administered grants for community-led arts projects everywhere in Aotearoa.' },
  { id: 'arts-grants-r2', code: 'AG-2', title: 'Arts Grants — Round 2', kupu: 'Tahua toi', amount: 'Up to $65,000',
    next: '28 May 2026', status: 'open', tier: 'artists',
    desc: 'For ringatoi and arts practitioners with a specific project, work or activity.' },
  { id: 'toi-tipu', code: 'TT', title: 'Toi Tipu — Early Career Fund', kupu: 'Toi tipu', amount: 'Up to $25,000',
    next: '14 May 2026', status: 'open', tier: 'early',
    desc: 'Helping artists at an early stage of their career develop their practice and audience.' },
  { id: 'tuk', code: 'TUK', title: 'Toi Uru Kahikatea', kupu: 'Investment Programme', amount: '3-year fund',
    next: 'Investment 2027', status: 'upcoming', tier: 'orgs',
    desc: 'Multi-year investment in arts organisations with a long-term vision and purpose.' },
  { id: 'pacific-heritage', code: 'PH', title: 'Pacific Arts Heritage Fund', kupu: 'Tuku iho Pasifika', amount: 'Up to $25,000',
    next: 'Open', status: 'open', tier: 'pasifika',
    desc: 'Support for the practice, transmission and revitalisation of Pacific heritage arts.' },
  { id: 'intl', code: 'INT', title: 'International Presentation', kupu: 'Whakaatu ki tāwāhi', amount: 'Up to $40,000',
    next: 'Rolling', status: 'open', tier: 'artists',
    desc: 'For artists and arts organisations to present and develop work overseas.' },
  { id: 'menton', code: 'KMM', title: 'Katherine Mansfield Menton Fellowship', kupu: 'Karahipi tuhituhi', amount: '€30,000 + travel',
    next: '12 Jun 2026', status: 'open', tier: 'literature',
    desc: 'A six-month residency for a New Zealand writer of fiction, non-fiction or poetry in Menton, France.' },
  { id: 'berlin-w', code: 'BWR', title: "Berlin Writer's Residency", kupu: '', amount: '€2,500/mo + flights',
    next: '4 Jul 2026', status: 'open', tier: 'literature',
    desc: 'A three-month residency for a New Zealand writer based in Berlin.' },
  { id: 'banff', code: 'BNF', title: 'Banff Centre Indigenous Arts Residencies', kupu: '', amount: 'Full residency',
    next: 'Aug 2026', status: 'upcoming', tier: 'maori',
    desc: 'Residencies for Māori artists at Banff Centre, Canada.' },
  { id: 'choreo', code: 'CHF', title: 'Creative NZ Choreographic Fellowship', kupu: '', amount: '$70,000', 
    next: '21 Aug 2026', status: 'upcoming', tier: 'dance',
    desc: 'A two-year fellowship for an established choreographer to develop new work.' },
  { id: 'craft', code: 'CRF', title: 'Craft / Object Fellowship', kupu: '', amount: '$70,000',
    next: '5 Sep 2026', status: 'upcoming', tier: 'craft',
    desc: 'For craft and object practitioners to develop ambitious new work.' },
  { id: 'samoa', code: 'SMR', title: 'Samoa Artist in Residence', kupu: '', amount: 'Full residency',
    next: 'Closed Apr 2026', status: 'closed', tier: 'pasifika',
    desc: 'A residency in Sāmoa for a New Zealand artist of Sāmoan or Pacific heritage.' },
];

window.STORIES = [
  { id: 'pasifika-awards-2026', cat: 'Pacific Arts', kupu: 'Toi Pasifika', date: 'Apr 22, 2026', read: '4 min',
    title: 'Arts Pasifika Awards 2026 honour twelve recipients across Aotearoa',
    excerpt: 'This year\'s ceremony at Auckland\'s Aotea Centre celebrated lifetime achievement, emerging talent and contribution to community.',
    img: window.IMAGES.pasifika, accent: 'pohutukawa' },
  { id: 'ccs-r2-open', cat: 'Funding', kupu: 'Pūtea', date: 'Apr 18, 2026', read: '2 min',
    title: 'Round two of the Creative Communities Scheme opens 14 May',
    excerpt: 'Up to $25,000 available for projects that bring arts to local communities.',
    img: window.IMAGES.community, accent: 'kowhai' },
  { id: 'te-waka-toi', cat: 'Ngā Toi Māori', kupu: 'Ngā Toi Māori', date: 'Apr 12, 2026', read: '3 min',
    title: 'Te Waka Toi Awards return to Te Whanganui-a-Tara this November',
    excerpt: "Nominations open for the country's most prestigious awards recognising excellence in ngā toi Māori.",
    img: window.IMAGES.carving, accent: 'bush' },
  { id: 'nz-arts-2026', cat: 'Research', kupu: 'Rangahau', date: 'Apr 04, 2026', read: '8 min',
    title: 'New Zealanders & the Arts 2026 — full report now available',
    excerpt: '88% of New Zealanders say the arts contribute positively to our identity. Read the findings.',
    img: window.IMAGES.gallery, accent: 'moana' },
  { id: 'global-digital', cat: 'Funding', kupu: 'Pūtea', date: 'Mar 28, 2026', read: '3 min',
    title: 'Global Digital New Work Fund returns for a third year',
    excerpt: 'Supporting NZ artists to make digital work that reaches international audiences.',
    img: window.IMAGES.studio, accent: 'kowhai' },
  { id: 'menton-2026', cat: 'Literature', kupu: 'Tuhinga', date: 'Mar 22, 2026', read: '5 min',
    title: 'Menton Fellowship 2026: applications now open',
    excerpt: 'Six months on the French Riviera for a New Zealand writer of any form.',
    img: window.IMAGES.literature, accent: 'pohutukawa' },
  { id: 'change-journey', cat: 'About CNZ', kupu: 'Tā mātou haerenga', date: 'Mar 15, 2026', read: '6 min',
    title: 'Update on our change journey — what\'s shifting in 2026',
    excerpt: 'Putting artists, ringatoi, arts organisations and their communities at the heart of our work.',
    img: window.IMAGES.theatre, accent: 'bush' },
  { id: 'investment-results', cat: 'Funding', kupu: 'Hua', date: 'Mar 08, 2026', read: '4 min',
    title: 'Investment programme results: 81 organisations supported',
    excerpt: 'Our largest investment round in five years confirmed across both Toi Tōtara Haemata and Toi Uru Kahikatea.',
    img: window.IMAGES.dance, accent: 'moana' },
];

// Council members (made up but representative)
window.COUNCIL = [
  { name: 'Caren Rangi', role: 'Chair', iwi: 'Sāmoa, Aotearoa', bio: 'Chair of the Arts Council. Sāmoan New Zealander with extensive governance experience across the public and Pacific community sector.' },
  { name: 'Dr Jeremy Mayall', role: 'Deputy Chair', iwi: 'Aotearoa', bio: 'Composer, sound designer and Director of Creative Waikato.' },
  { name: 'Dr Maaka Tibble', role: 'Council member · Te Kāhui Toi Māori', iwi: 'Ngāti Porou', bio: 'Senior public-sector leader with a long association with ngā toi Māori.' },
  { name: 'Pakihi Faleafa', role: 'Council member · Te Kāhui Toi Pasifika', iwi: 'Sāmoa', bio: 'Pacific arts leader and former Chair of the Pacific Arts Committee.' },
  { name: 'Sir Michael Houstoun', role: 'Council member', iwi: 'Aotearoa', bio: 'Concert pianist, recipient of the Arts Foundation Icon Award.' },
  { name: 'Anne Rodda', role: 'Council member', iwi: 'Aotearoa', bio: 'Arts manager and former CEO of New Zealand Festival.' },
  { name: 'Eteta Toofua-Squires', role: 'Council member', iwi: 'Tonga', bio: 'Tongan New Zealand artist and educator.' },
  { name: 'Stewart Sowman-Lund', role: 'Council member', iwi: 'Aotearoa', bio: 'Writer, journalist and arts commentator.' },
];

// Toolkits (mirrors public IA)
window.TOOLKITS = [
  { id: 'community', title: 'Community arts toolkit', kupu: 'Toi hapori', desc: 'Plan, fund and deliver community arts projects of any scale.', sections: 5 },
  { id: 'risk', title: 'Risk Management Toolkit', kupu: '', desc: 'Identify, plan for and respond to risks across your arts organisation.', sections: 4 },
  { id: 'volunteer', title: 'Volunteer Management Toolkit', kupu: '', desc: 'Recruit, support and recognise the volunteers who make the arts happen.', sections: 4 },
  { id: 'donations', title: 'Donations Toolkit', kupu: 'Tuku koha', desc: 'How to find donors, talk with them, and steward long-term relationships.', sections: 8 },
];

// Reports
window.REPORTS = [
  { year: '2026', title: 'New Zealanders and the Arts — Ko Aotearoa me ōna Toi', desc: 'Triennial study of Aotearoa\'s engagement with the arts.', size: '3.2 MB' },
  { year: '2025', title: 'Annual Report 2024–25', desc: 'A full account of CNZ\'s investment, advocacy and development work.', size: '8.1 MB' },
  { year: '2025', title: 'Statement of Intent 2025–2029', desc: 'Our four-year strategic direction.', size: '1.4 MB' },
  { year: '2024', title: 'Pacific Arts Strategy refresh', desc: 'A renewed strategy for our work with Pacific artists and communities.', size: '2.6 MB' },
  { year: '2024', title: 'Te Hā o ngā Toi — Māori Arts Strategy', desc: 'Our long-term strategy for ngā toi Māori.', size: '2.1 MB' },
];

window.FILTERS = {
  who: ['Individual artist', 'Group / collective', 'Organisation', 'Iwi / hapū', 'School / community'],
  artform: ['Visual arts', 'Ngā toi Māori', 'Toi Pasifika', 'Music', 'Theatre', 'Dance', 'Literature', 'Craft / object', 'Inter-arts', 'Multi-disciplinary'],
  stage: ['Research / develop', 'Create new work', 'Present / tour', 'Professional development', 'Organisation building'],
};
