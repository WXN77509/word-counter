const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y', 'é', 'è', 'ê', 'ë', 'à', 'â', 'ä', 'ô', 'ö', 'ù', 'û', 'ü', 'ï', 'î'];
const CONSONANTS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm','n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
const VOCAL_GROUPS = ['oi', 'ou', 'an', 'en', 'on', 'in', 'un', 'am', 'em', 'om', 'um','ain', 'ein', 'oin', 'ien', 'eu', 'au', 'ai', 'ei'];

const POINTS = ['.', '!', '?', '...'];
const SPACES = ['\n', ' ', '\t'];

function getNumberOfWords(text: string): number {
    const words = text.trim().split(/\s+/);
    return text.trim().length === 0 ? 0 : words.length;
}

function getNumberOfChar(text: string): number {
    return text.length;
}

function getNumberOfCharWithoutSpace(text: string): number {
    return text.replace(/\s/g, '').length;
}

function getNumberOfSyllables(text: string): number {
    const trimmed = text.trim();
    if (trimmed.length === 0) return 0;

    const regex = /[aeiouyéèêëàâäôöùûüïî]+|[oi][nm]|[aouei][u]|[ae][i]/gi;
    const matches = trimmed.match(regex);
    let syllableCount = matches ? matches.length : 0;

    if (
        trimmed.toLowerCase().endsWith('e') &&
        !trimmed.toLowerCase().endsWith('ée') &&
        !trimmed.toLowerCase().endsWith('ie') &&
        !trimmed.toLowerCase().endsWith('ue') &&
        !trimmed.toLowerCase().endsWith('oe')
    ) {
        syllableCount--;
    }

    return Math.max(syllableCount, 1);
}

function getNumberOfSentences(text: string): number {
    const regex = /[.!?]+\s*(?=$|\s|[.!?])/g;
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

function getNumberOfParagraph(text: string): number {
    const trimmed = text.trim();
    if (trimmed.length === 0) return 0;

    const paragraphs = trimmed
        .split(/\n+/)
        .filter(paragraph => paragraph.trim().length > 0);

    return paragraphs.length;
}

function getNumberOfVowels(text: string): number {
    let vowelsCount =0;
    for (const char of text.trim().toLowerCase()) {
        if (VOWELS.includes(char)) vowelsCount++;
    }
    return vowelsCount;
}

function getNumberOfConsonants(text: string): number {
    let consonantsCount =0;
    for (const char of text.trim().toLowerCase()) {
        if (CONSONANTS.includes(char)) consonantsCount++;
    }
    return consonantsCount;
}

function getKeywords(text: string): [string, number, number][] {
    const keyWords: [string, number, number][] = []
    const words = text.trim().split(/\s+/);

    let map: Map<string, number> = new Map();
    for (const word of words) {
        map.set(word, (map.get(word) || 0) + 1);
    }

    for (const [key, value] of map.entries()) {
        keyWords.push([key,value, calculatePercent(value, words.length)]);
    }

    return keyWords;
}

function calculatePercent(total: number, quantity: number): number {
    return (quantity / total) * 100;
}

function isValidEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}