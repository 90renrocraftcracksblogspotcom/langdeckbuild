export function exportToAnki(deck, topic) {
  if (!deck || deck.length === 0) return;

  // Anki TSV format: Front \t Back
  const tsvLines = deck.map(card => {
    const front = `${card.target_word}<br><small>${card.pronunciation}</small>`;
    const back = `${card.native_translation}<br><br><i>${card.context_sentence_target}</i><br><i>${card.context_sentence_native}</i>`;
    return `${front}\t${back}`;
  });

  const tsvContent = tsvLines.join('\n');
  
  const blob = new Blob([tsvContent], { type: 'text/tab-separated-values' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `LangDeck_${topic.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.tsv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
