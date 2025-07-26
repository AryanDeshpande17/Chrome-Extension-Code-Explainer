let triggerButton;
let panel;
let lastSelectedText = '';

const SPARKLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ai-explainer-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.456-2.456L12.5 18l1.178-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.5 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" /></svg>`;

function createTriggerButton() {
    if (triggerButton) return;
    triggerButton = document.createElement('button');
    triggerButton.id = 'ai-explainer-trigger';
    triggerButton.innerHTML = SPARKLE_SVG;
    triggerButton.addEventListener('click', handleTriggerClick);
    document.body.appendChild(triggerButton);
}

function createPanel() {
    if (panel) return;
    panel = document.createElement('div');
    panel.id = 'ai-explainer-panel';
    panel.style.display = 'none';

    panel.innerHTML = `
        <div class="ai-explainer-panel-header">
            <h3>${SPARKLE_SVG} AI Code Explainer</h3>
            <button id="ai-explainer-close-btn">&times;</button>
        </div>
        <div class="ai-explainer-panel-content"></div>
    `;

    document.body.appendChild(panel);
    panel.querySelector('#ai-explainer-close-btn').addEventListener('click', () => {
        panel.style.display = 'none';
    });
}

function formatExplanation(text) {
    let html = text
        
        .replace(/```[\s\S]*?```/g, (match) => {
            const code = match.replace(/```(\w*\n)?/, '').replace(/```$/, '').trim();
            const safeCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `<pre><code>${safeCode}</code></pre>`;
        })
        
        .replace(/`([^`\n]+?)`/g, '<code>$1</code>')
        
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    
    return html.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('');
}

async function handleTriggerClick(e) {
    e.stopPropagation();
    hideTrigger();
    showPanel();

    const contentDiv = panel.querySelector('.ai-explainer-panel-content');
    contentDiv.innerHTML = '<div class="ai-explainer-loader"></div><p>Analyzing code...</p>';

    try {
        const response = await chrome.runtime.sendMessage({
            type: 'explainCode',
            code: lastSelectedText
        });

        if (response.error) {
            contentDiv.innerHTML = `<div class="ai-explainer-error"><strong>Error:</strong> ${response.error}</div>`;
        } else {
            const formattedHtml = formatExplanation(response.explanation);
            const originalCodeHtml = `<div class="ai-explainer-original-code"><h4>Original Code</h4><pre><code>${lastSelectedText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre></div>`;
            contentDiv.innerHTML = originalCodeHtml + formattedHtml;
            // contentDiv.innerHTML = formattedHtml;
        }
    } catch (error) {
        contentDiv.innerHTML = `<div class="ai-explainer-error"><strong>Error:</strong> Could not communicate with the extension's background service.</div>`;
        console.error("Extension communication error:", error);
    }
}

function showPanel() {
    if (!panel) createPanel();
    panel.style.display = 'block';
}

function hideTrigger() {
    if (triggerButton) {
        triggerButton.style.display = 'none';
    }
}



document.addEventListener('mouseup', (e) => {

    if (panel && panel.contains(e.target)) {
        return;
    }

    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText.length > 5) { 
        lastSelectedText = selectedText;
        if (!triggerButton) createTriggerButton();

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        triggerButton.style.display = 'block';
        triggerButton.style.top = `${rect.bottom + 5}px`; 
        triggerButton.style.left = `${rect.left}px`;
    } else {
        hideTrigger();
    }
});

document.addEventListener('mousedown', (e) => {
    if (triggerButton && !triggerButton.contains(e.target)) {
        hideTrigger();
    }
});