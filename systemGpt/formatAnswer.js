function format(text) {
    // First replace <br> tags with newlines for proper line-based processing
    text = text.replace(/<br>/g, '\n');
    
    // Process headings (must come first)
    text = text.replace(/^#\s+(.*$)/gm, '<h2 style="margin-bottom: -0.65em;">$1</h2>');
    text = text.replace(/^##\s+(.*$)/gm, '<h3>$2</h3>');
    
    // Process bold/italic
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\_\_(.*?)\_\_/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/\_(.*?)\_/g, '<em>$1</em>');
    
    // Process code blocks
    text = text.replace(/\$\$(.*?)\$\$/g, '<pre><code>$1</code></pre>');
    
    // Process lists
    text = text.replace(/^-\s+(.*$)/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    
    // Convert newlines back to <br> tags for HTML display
    text = text.replace(/\n/g, '<br>');
    
    return text;
}