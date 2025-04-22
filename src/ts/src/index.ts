import * as lib from './lib';

const textAreaZone = document.getElementById('textarea-zone') as HTMLDivElement | null;
const textArea = document.getElementById('text-input') as HTMLTextAreaElement | null;
const closeButton = document.querySelector('#textarea button:nth-of-type(1)') as HTMLButtonElement | null;
const addButton = document.querySelector('#textarea button:nth-of-type(2)') as HTMLButtonElement | null;

const section_stats = document.querySelector('main div section#stats') as HTMLElement;

const wordDt = document.querySelector('#div-word dt') as HTMLDListElement | null;
const wordDd = document.querySelector('#div-word dd') as HTMLDListElement | null;
const characterDt = document.querySelector('#div-character dt') as HTMLDListElement | null;
const characterDd = document.querySelector('#div-character dd') as HTMLDListElement | null;
const withoutSpaceDt = document.querySelector('#div-without-space dt') as HTMLDListElement | null;
const withoutSpaceDd = document.querySelector('#div-without-space dd') as HTMLDListElement | null;

const syllableDt = document.querySelector('#div-syllable dt') as HTMLDListElement | null;
const syllableDd = document.querySelector('#div-syllable dd') as HTMLDListElement | null;
const sentenceDt = document.querySelector('#div-sentence dt') as HTMLDListElement | null;
const sentenceDd = document.querySelector('#div-sentence dd') as HTMLDListElement | null;
const paragraphDt = document.querySelector('#div-paragraph dt') as HTMLDListElement | null;
const paragraphDd = document.querySelector('#div-paragraph dd') as HTMLDListElement | null;

const vowelDt = document.querySelector('#div-vowel dt') as HTMLDListElement | null;
const vowelDd = document.querySelector('#div-vowel dd') as HTMLDListElement | null;
const consonantDt = document.querySelector('#div-consonant dt') as HTMLDListElement | null;
const consonantDd = document.querySelector('#div-consonant dd') as HTMLDListElement | null;

const keywordsSection = document.querySelector('#keywords') as HTMLElement | null;
const keywordsH2 = document.querySelector('#keywords h2') as HTMLHeadingElement | null;
const keywordsDiv = document.querySelector('#keywords div') as HTMLDivElement | null;
const keywordsDivP = document.querySelector('#keywords div p') as HTMLParagraphElement | null;

if (
    !textAreaZone ||
    !textArea ||
    !closeButton ||
    !addButton ||
    !wordDt ||
    !wordDd ||
    !characterDt ||
    !characterDd ||
    !withoutSpaceDt ||
    !withoutSpaceDd ||
    !syllableDt ||
    !syllableDd ||
    !sentenceDt ||
    !sentenceDd ||
    !paragraphDt ||
    !paragraphDd ||
    !vowelDt ||
    !vowelDd ||
    !consonantDt ||
    !consonantDd ||
    !keywordsSection ||
    !keywordsH2 ||
    !keywordsDiv ||
    !keywordsDivP
) {
    console.error('Un ou plusieurs éléments du DOM n’ont pas été trouvés.');
    throw new Error('Initialisation échouée : éléments DOM manquants.');
}

closeButton.addEventListener('click', () => {
    textArea.value = '';
    updateStats('');
});

addButton.addEventListener('click', () => {
    const newTextArea = document.createElement('textarea');
    newTextArea.placeholder = 'Nouveau texte...';
    textAreaZone.appendChild(newTextArea);
});

function updateStats(text: string) {
    if (text !== '') section_stats.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
    else section_stats.style.backgroundColor ='';

    const wordCount = lib.getNumberOfWords(text);
    wordDt!.textContent = `${wordCount}`;
    wordDd!.textContent = wordCount > 1 ? 'Words' : 'Word';

    const charCount = lib.getNumberOfChar(text);
    characterDt!.textContent = `${charCount}`;
    characterDd!.textContent = charCount > 1 ? 'Characters' : 'Character';

    const charNoSpaceCount = lib.getNumberOfCharWithoutSpace(text);
    withoutSpaceDt!.textContent = `${charNoSpaceCount}`;
    withoutSpaceDd!.textContent = charNoSpaceCount > 1 ? 'Characters without space' : 'Character without space';

    const syllableCount = lib.getNumberOfSyllables(text);
    syllableDt!.textContent = `${syllableCount}`;
    syllableDd!.textContent = syllableCount > 1 ? 'Syllables' : 'Syllable';

    const sentenceCount = lib.getNumberOfSentences(text);
    sentenceDt!.textContent = `${sentenceCount}`;
    sentenceDd!.textContent = sentenceCount > 1 ? 'Sentences' : 'Sentence';

    const paragraphCount = lib.getNumberOfParagraph(text);
    paragraphDt!.textContent = `${paragraphCount}`;
    paragraphDd!.textContent = paragraphCount > 1 ? 'Paragraphs' : 'Paragraph';

    const vowelCount = lib.getNumberOfVowels(text);
    vowelDt!.textContent = `${vowelCount}`;
    vowelDd!.textContent = vowelCount > 1 ? 'Vowels' : 'Vowel';

    const consonantCount = lib.getNumberOfConsonants(text);
    consonantDt!.textContent = `${consonantCount}`;
    consonantDd!.textContent = consonantCount > 1 ? 'Consonants' : 'Consonant';

    const keywords = lib.getKeywords(text);
    keywordsDiv!.innerHTML = '';
    if (keywords.length === 0) {
        keywordsSection!.style.backgroundColor='';
        keywordsDivP!.textContent = 'Type or paste your text or URL to see the most used keywords';
    } else {
        keywordsSection!.style.backgroundColor='rgba(255, 255, 255, 0.14)';
        const ul = document.createElement('ul');
        keywords.forEach(([word, count, percent]) => {
            const li = document.createElement('li');
            li.textContent = `${word}: ${count} (${percent}%)`;
            ul.appendChild(li);
        });
        keywordsDiv!.appendChild(ul);
    }
}

textArea.addEventListener('input', () => {
    updateStats(textArea.value);
});