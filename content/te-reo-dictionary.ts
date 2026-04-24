// content/te-reo-dictionary.ts
// Terms to wrap with <span lang="mi"> when found in English-language content.
// Longer phrases first.

export const teReoTerms: string[] = [
  'te reo Māori',
  'te reo',
  'Ngā Toi Māori',
  'ngā toi Māori',
  'Toi Aotearoa',
  'Toi Tōtara Haemata',
  'Toi Uru Kahikatea',
  'Te Waka Toi',
  'Te Waka Toi Awards',
  'Te Rōpū Mana Toi',
  'Ko Aotearoa me ōna Toi',
  'Nui te Kōrero',
  'Manatū Taonga',
  'Arts Council of New Zealand Toi Aotearoa',
  'Aotearoa',
  'Te Whanganui-a-Tara',
  'Tāmaki Makaurau',
  'Ōtepoti',
  'Te Waipounamu',
  'Te Ika-a-Māui',
  'whakapapa',
  'kaupapa',
  'tikanga',
  'mana',
  'rangatiratanga',
  'manaakitanga',
  'whakawhanaungatanga',
  'kaitiakitanga',
  'whānau',
  'hapū',
  'iwi',
  'marae',
  'ringatoi',
  'kaumātua',
  'tangata whenua',
  'te Tiriti o Waitangi',
  'te Tiriti',
  'te ao Māori',
  'taonga',
  'whenua',
  'tauiwi',
  'rangatahi',
  'tohunga',
  'koru',
  'karakia',
  'waiata',
  'Māori',
];

export function markTeReo(html: string): string {
  const sorted = [...teReoTerms].sort((a, b) => b.length - a.length);
  for (const term of sorted) {
    const pattern = new RegExp(
      `(?<!<span[^>]*lang="mi"[^>]*>[^<]*)\\b(${escapeRegex(term)})\\b(?!<\\/span>)`,
      'gi'
    );
    html = html.replace(pattern, '<span lang="mi">$1</span>');
  }
  return html;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
