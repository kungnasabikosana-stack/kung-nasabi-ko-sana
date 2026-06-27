// ==================== BROWSE PAGE INITIALIZATION ==================== 

document.addEventListener('DOMContentLoaded', function() {
    loadLetters();
    setupFilters();
    setupSearch();
    createFloatingElements();
});

// ==================== LOAD LETTERS ==================== 

function loadLetters() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'flex';
    
    fetch('data/letters.json')
        .then(response => response.json())
        .then(data => {
            window.allLetters = data.letters || [];
            displayLetters(window.allLetters);
            loadingIndicator.style.display = 'none';
        })
        .catch(error => {
            console.error('Error loading letters:', error);
            loadingIndicator.innerHTML = '<p>Error loading letters. Please refresh the page.</p>';
        });
}

// ==================== DISPLAY LETTERS ==================== 

function displayLetters(letters) {
    const grid = document.getElementById('lettersGrid');
    const noResults = document.getElementById('noResults');
    
    if (letters.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    grid.innerHTML = letters.map(letter => createLetterCard(letter)).join('');
    
    // Add click handlers
    document.querySelectorAll('.letter-card').forEach(card => {
        card.addEventListener('click', function() {
            const letterId = this.dataset.id;
            previewLetter(letterId);
        });
    });
}

function createLetterCard(letter) {
    const preview = letter.content.substring(0, 150) + '...';
    const categoryColor = getCategoryColor(letter.category);
    
    return `
        <div class="letter-card" data-id="${escapeHtml(letter.id)}">
            <div class="card-header" style="border-left: 4px solid ${categoryColor};">
                <h3 class="card-title">${escapeHtml(letter.title)}</h3>
                <span class="card-category">${escapeHtml(letter.category)}</span>
            </div>
            <div class="card-body">
                <p class="card-preview">${escapeHtml(preview)}</p>
            </div>
            <div class="card-footer">
                <span class="card-sender">from ${escapeHtml(letter.sender)}</span>
                <span class="card-date">${escapeHtml(letter.date)}</span>
            </div>
        </div>
    `;
}

function getCategoryColor(category) {
    const colors = {
        'love': '#d4a5a5',
        'family': '#9d7373',
        'friendship': '#b8a6a6',
        'regret': '#8b7a7a',
        'other': '#c9b0b0'
    };
    return colors[category.toLowerCase()] || colors['other'];
}

// ==================== PREVIEW LETTER ==================== 

function previewLetter(letterId) {
    const letter = window.allLetters.find(l => l.id === letterId);
    if (!letter) return;
    
    const preview = letter.content.substring(0, 300);
    const previewContent = document.getElementById('previewContent');
    
    previewContent.innerHTML = `
        <h2 class="preview-title">${escapeHtml(letter.title)}</h2>
        <div class="preview-meta">
            <span class="preview-from">from ${escapeHtml(letter.sender)}</span>
            <span class="preview-date">${escapeHtml(letter.date)}</span>
        </div>
        <div class="preview-body">
            ${escapeHtml(preview)}
        </div>
    `;
    
    // Store letter for full view
    window.currentPreviewLetter = letter;
    
    const modal = document.getElementById('previewModal');
    modal.classList.remove('hidden');
}

function readFullLetter() {
    if (!window.currentPreviewLetter) return;
    
    sessionStorage.setItem('currentLetter', JSON.stringify(window.currentPreviewLetter));
    window.location.href = `letter.html?id=${window.currentPreviewLetter.id}`;
}

function closePreview() {
    const modal = document.getElementById('previewModal');
    modal.classList.add('hidden');
}

// ==================== FILTER FUNCTIONALITY ==================== 

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter letters
            const category = this.dataset.filter;
            filterLetters(category);
        });
    });
}

function filterLetters(category) {
    let filtered = window.allLetters;
    
    if (category !== 'all') {
        filtered = window.allLetters.filter(letter => 
            letter.category.toLowerCase() === category.toLowerCase()
        );
    }
    
    displayLetters(filtered);
}

// ==================== SEARCH FUNCTIONALITY ==================== 

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const query = this.value.toLowerCase();
            searchLetters(query);
        }, 300);
    });
}

function searchLetters(query) {
    if (query === '') {
        displayLetters(window.allLetters);
        return;
    }
    
    const filtered = window.allLetters.filter(letter => 
        letter.title.toLowerCase().includes(query) ||
        letter.sender.toLowerCase().includes(query) ||
        letter.content.toLowerCase().includes(query)
    );
    
    displayLetters(filtered);
}

// ==================== FLOATING ELEMENTS ==================== 

function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const elementCount = 15;
    
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 20 + 's';
        element.style.animationDuration = (20 + Math.random() * 20) + 's';
        element.style.opacity = Math.random() * 0.5 + 0.1;
        container.appendChild(element);
    }
}

// ==================== UTILITY FUNCTIONS ==================== 

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ==================== CLOSE MODAL ON OUTSIDE CLICK ==================== 

document.addEventListener('click', function(event) {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        closePreview();
    }
});

// ==================== KEYBOARD NAVIGATION ==================== 

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePreview();
    }
});
