function chunkText(text, chunkSize = 500, overlap = 50) {
  const chunks = [];
  
  // Remove extra whitespace
  const cleanText = text.replace(/\s+/g, ' ').trim();
  
  if (cleanText.length <= chunkSize) {
    return [cleanText];
  }

  let start = 0;
  
  while (start < cleanText.length) {
    let end = start + chunkSize;
    
    if (end < cleanText.length) {
      // Try to find a sentence boundary (., !, ?)
      const sentenceEnd = cleanText.substring(start, end).lastIndexOf('. ');
      if (sentenceEnd > chunkSize * 0.5) {
        end = start + sentenceEnd + 1;
      } else {
        // If no sentence boundary, try to break at a word boundary
        const spaceIndex = cleanText.substring(start, end).lastIndexOf(' ');
        if (spaceIndex > chunkSize * 0.5) {
          end = start + spaceIndex;
        }
      }
    }
    
    chunks.push(cleanText.substring(start, end).trim());
    start = end - overlap;
  }
  
  return chunks;
}