const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y', 'é', 'è', 'ê', 'ë', 'à', 'â', 'ä', 'ô', 'ö', 'ù', 'û', 'ü', 'ï', 'î'];
const CONSONANTS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
export function getNumberOfWords(text) {
    if (!text.trim())
        return 0;
    const rawMatches = text.match(/\b[\wÀ-ÿ'-]+\b/g);
    if (!rawMatches)
        return 0;
    const validSingleLetters = new Set(['a', 'à', 'y', 'é', 'ô', 'ù', 'u', 'e', 'o']);
    const filtered = rawMatches.filter(word => {
        if (word.length > 1)
            return true;
        return validSingleLetters.has(word.toLowerCase());
    });
    return filtered.length;
}
export function getNumberOfChar(text) {
    return text.length;
}
export function getNumberOfCharWithoutSpace(text) {
    return text.replace(/\s/g, '').length;
}
export function getNumberOfSyllables(text) {
    const trimmed = text.trim();
    if (trimmed.length === 0)
        return 0;
    const vowelPattern = VOWELS.join('');
    const regex = new RegExp(`[${vowelPattern}]+|[oi][nm]|[aouei][u]|[ae][i]`, 'gi');
    const matches = trimmed.match(regex);
    let syllableCount = matches ? matches.length : 0;
    const words = trimmed.split(/\s+/);
    for (const word of words) {
        if (word.length > 2 &&
            word.toLowerCase().endsWith('e') &&
            !['ée', 'ie', 'ue', 'oe'].some(ending => word.toLowerCase().endsWith(ending))) {
            syllableCount--;
        }
    }
    return Math.max(syllableCount, 0);
}
export function getNumberOfSentences(text) {
    const trimmed = text.trim();
    if (trimmed.length === 0)
        return 0;
    const normalized = trimmed.replace(/\n+/g, ' ');
    const clean = normalized.replace(/\.{2,}/g, '.');
    const regex = /(?<!\d)[.!?](?!\d)/g;
    const matches = clean.match(regex);
    let sentenceCount = matches ? matches.length : 0;
    if (sentenceCount === 0 && clean.length > 0 && /^[A-ZÀ-ÿ]/.test(clean)) {
        sentenceCount = 1;
    }
    return sentenceCount;
}
export function getNumberOfParagraph(text) {
    const trimmed = text.trim();
    if (trimmed.length === 0)
        return 0;
    const paragraphs = trimmed
        .split(/\n+/)
        .filter(paragraph => paragraph.trim().length > 0);
    return paragraphs.length;
}
export function getNumberOfVowels(text) {
    const trimmed = text.trim().toLowerCase();
    const matches = trimmed.match(new RegExp(`[${VOWELS.join('')}]`, 'g'));
    return matches ? matches.length : 0;
}
export function getNumberOfConsonants(text) {
    const trimmed = text.trim().toLowerCase();
    const matches = trimmed.match(new RegExp(`[${CONSONANTS.join('')}]`, 'g'));
    return matches ? matches.length : 0;
}
export function getKeywords(text) {
    const trimmed = text.trim();
    if (trimmed.length === 0)
        return [];
    const validSingleLetters = new Set(['a', 'à', 'y', 'é', 'u', 'o', 'e']);
    const words = trimmed
        .toLowerCase()
        .replace(/[.,!?;:"()\[\]{}<>]/g, '')
        .split(/\s+/)
        .filter(Boolean)
        .filter(word => word.length > 1 || validSingleLetters.has(word));
    const map = new Map();
    for (const word of words) {
        map.set(word, (map.get(word) || 0) + 1);
    }
    const totalWords = words.length;
    const keywords = [];
    for (const [key, value] of map.entries()) {
        const percent = Number(((value / totalWords) * 100).toFixed(1));
        keywords.push([key, value, percent]);
    }
    keywords.sort((a, b) => b[1] - a[1]);
    return keywords;
}
export function calculatePercent(total, quantity) {
    return total === 0 ? 0 : (quantity / total) * 100;
}
export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
}
//# sourceMappingURL=lib.js.map