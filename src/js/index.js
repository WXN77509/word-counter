import * as lib from './lib.js';
const textAreaZone = document.getElementById('textarea-zone');
const div_textArea = document.getElementById('textarea');
const textArea = document.getElementById('text-input');
const closeButton = document.querySelector('#textarea button:nth-of-type(1)');
const addButton = document.querySelector('#textarea button:nth-of-type(2)');
const section_stats = document.querySelector('main div section#stats');
const wordDt = document.querySelector('#div-word dt');
const wordDd = document.querySelector('#div-word dd');
const characterDt = document.querySelector('#div-character dt');
const characterDd = document.querySelector('#div-character dd');
const withoutSpaceDt = document.querySelector('#div-without-space dt');
const withoutSpaceDd = document.querySelector('#div-without-space dd');
const syllableDt = document.querySelector('#div-syllable dt');
const syllableDd = document.querySelector('#div-syllable dd');
const sentenceDt = document.querySelector('#div-sentence dt');
const sentenceDd = document.querySelector('#div-sentence dd');
const paragraphDt = document.querySelector('#div-paragraph dt');
const paragraphDd = document.querySelector('#div-paragraph dd');
const vowelDt = document.querySelector('#div-vowel dt');
const vowelDd = document.querySelector('#div-vowel dd');
const consonantDt = document.querySelector('#div-consonant dt');
const consonantDd = document.querySelector('#div-consonant dd');
const keywordsSection = document.querySelector('#keywords');
const keywordsH2 = document.querySelector('#keywords h2');
const keywordsDiv = document.querySelector('#keywords div');
const keywordsDivP = document.querySelector('#keywords div p');
if (!textAreaZone ||
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
    !keywordsDivP) {
    console.error('Un ou plusieurs éléments du DOM n’ont pas été trouvés.');
    throw new Error('Initialisation échouée : éléments DOM manquants.');
}
closeButton.addEventListener('click', () => {
    textArea.value = '';
    updateStats('');
});
addButton.addEventListener('click', () => {
    const newTextArea = div_textArea.cloneNode(true);
    textAreaZone.appendChild(newTextArea);
});
function updateStats(text) {
    if (text !== '')
        section_stats.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
    else
        section_stats.style.backgroundColor = '';
    const wordCount = lib.getNumberOfWords(text);
    wordDt.textContent = `${wordCount}`;
    wordDd.textContent = wordCount > 1 ? 'Words' : 'Word';
    const charCount = lib.getNumberOfChar(text);
    characterDt.textContent = `${charCount}`;
    characterDd.textContent = charCount > 1 ? 'Characters' : 'Character';
    const charNoSpaceCount = lib.getNumberOfCharWithoutSpace(text);
    withoutSpaceDt.textContent = `${charNoSpaceCount}`;
    withoutSpaceDd.textContent = charNoSpaceCount > 1 ? 'Characters without space' : 'Character without space';
    const syllableCount = lib.getNumberOfSyllables(text);
    syllableDt.textContent = `${syllableCount}`;
    syllableDd.textContent = syllableCount > 1 ? 'Syllables' : 'Syllable';
    const sentenceCount = lib.getNumberOfSentences(text);
    sentenceDt.textContent = `${sentenceCount}`;
    sentenceDd.textContent = sentenceCount > 1 ? 'Sentences' : 'Sentence';
    const paragraphCount = lib.getNumberOfParagraph(text);
    paragraphDt.textContent = `${paragraphCount}`;
    paragraphDd.textContent = paragraphCount > 1 ? 'Paragraphs' : 'Paragraph';
    const vowelCount = lib.getNumberOfVowels(text);
    vowelDt.textContent = `${vowelCount}`;
    vowelDd.textContent = vowelCount > 1 ? 'Vowels' : 'Vowel';
    const consonantCount = lib.getNumberOfConsonants(text);
    consonantDt.textContent = `${consonantCount}`;
    consonantDd.textContent = consonantCount > 1 ? 'Consonants' : 'Consonant';
    const keywords = lib.getKeywords(text);
    keywordsDiv.innerHTML = '';
    if (keywords.length === 0) {
        keywordsSection.style.color = '#B7B7B7';
        keywordsSection.style.backgroundColor = '';
        keywordsH2.style = 'font-size: 18px;margin: 0;border:none;padding: 0.5rem 0 0 0';
        const p = document.createElement('p');
        p.textContent = 'Type or paste your text or URL to see the most used keywords';
        keywordsDiv.appendChild(p);
        keywordsDiv.style = 'display: flex;height: 100%;align-items: center;justify-content: center;';
    }
    else {
        keywordsSection.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
        keywordsSection.style.color = '#E1E1E1';
        keywordsH2.style = 'font-size: 18px;margin: 0;border-bottom: 1px solid rgb(255, 255, 255, 0.14);padding: 0.5rem 0 1rem 0';
        const ul = document.createElement('ul');
        keywords.forEach(([word, count, percent]) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${word}</span><div style="display:flex;gap:1rem;flex-direction:row;"><span>${count}</span><div><span style="color: #B7B7B7;">${percent}%</span></div></div>`;
            li.style = 'padding:0.5rem 0;border-bottom: 1px solid rgb(255, 255, 255, 0.14);display: flex;justify-content: space-between;width:100%;font-size: 18px;';
            ul.appendChild(li);
            ul.style.listStyle = 'none';
            ul.style = 'list-style:none;display: flex;justify-content:start;align-items:start;flex-direction:column;width:100%;margin: 0;padding: 0;height:100%';
        });
        keywordsDiv.appendChild(ul);
        keywordsDiv.style = 'display: flex;height: 100%;';
    }
}
textArea.addEventListener('input', () => {
    updateStats(textArea.value);
});
//# sourceMappingURL=index.js.map