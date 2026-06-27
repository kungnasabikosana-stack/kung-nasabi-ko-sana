// ==================== LETTER PAGE INITIALIZATION ==================== 

document.addEventListener('DOMContentLoaded', function() {
    loadLetter();
    createParticles();
});

// ==================== LOAD LETTER DATA ==================== 

function loadLetter() {
    // First check sessionStorage (from home page navigation)
    let letterData = sessionStorage.getItem('currentLetter');
    
    if (letterData) {
        const letter = JSON.parse(letterData);
        displayLetter(letter);
        return;
    }
    
    // Otherwise, try to get from URL parameters
    const params = new URLSearchParams(window.location.search);
    const letterId = params.get('id');
    
    if (letterId) {
        // Fetch from data/letters.json
        fetchLetterById(letterId);
    } else {
        // No letter found, redirect to home
        window.location.href = 'index.html';
    }
}

function fetchLetterById(letterId) {
    fetch('data/letters.json')
        .then(response => response.json())
        .then(data => {
            const letter = data.letters.find(l => l.id === letterId);
            if (letter) {
                displayLetter(letter);
            } else {
                // Letter not found
                showNotFoundMessage();
            }
        })
        .catch(error => {
            console.error('Error loading letter:', error);
            showErrorMessage();
        });
}

function displayLetter(letter) {
    const letterContent = document.getElementById('letterContent');
    
    const letterHTML = `
        <div class="letter-header-content">
            <h1 class="letter-title">${escapeHtml(letter.title)}</h1>
            <div class="letter-meta">
                <div class="letter-date">${escapeHtml(letter.date)}</div>
                <div class="letter-from">from ${escapeHtml(letter.sender)}</div>
            </div>
        </div>
        <div class="letter-body">${escapeHtml(letter.content)}</div>
    `;
    
    letterContent.innerHTML = letterHTML;
    
    // Store in sessionStorage for sharing
    sessionStorage.setItem('currentLetter', JSON.stringify(letter));
    
    // Update page title
    document.title = `${letter.title} - Kung Nasabi Ko Sana`;
}

function showNotFoundMessage() {
    const letterContent = document.getElementById('letterContent');
    letterContent.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <h1 style="color: #d4a5a5; margin-bottom: 20px;">Letter Not Found</h1>
            <p style="color: #5c5c5c; margin-bottom: 30px;">This letter seems to have wandered away.</p>
            <a href="index.html" style="color: #d4a5a5; text-decoration: underline;">← Return Home</a>
        </div>
    `;
}

function showErrorMessage() {
    const letterContent = document.getElementById('letterContent');
    letterContent.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <h1 style="color: #d4a5a5; margin-bottom: 20px;">Error Loading Letter</h1>
            <p style="color: #5c5c5c; margin-bottom: 30px;">Something went wrong while loading this letter.</p>
            <a href="index.html" style="color: #d4a5a5; text-decoration: underline;">← Return Home</a>
        </div>
    `;
}

// ==================== SHARE FUNCTIONS ==================== 

function shareLetter() {
    const modal = document.getElementById('shareModal');
    modal.classList.remove('hidden');
}

function closeShareModal() {
    const modal = document.getElementById('shareModal');
    modal.classList.add('hidden');
}

function copyLetterLink() {
    const letterData = sessionStorage.getItem('currentLetter');
    if (!letterData) return;
    
    const letter = JSON.parse(letterData);
    const letterLink = `${window.location.origin}${window.location.pathname}?id=${letter.id}`;
    
    copyToClipboard(letterLink);
    showCopyStatus();
}

function copyLetterText() {
    const letterData = sessionStorage.getItem('currentLetter');
    if (!letterData) return;
    
    const letter = JSON.parse(letterData);
    const letterText = `"${letter.title}"\n\nfrom ${letter.sender}\n${letter.date}\n\n${letter.content}`;
    
    copyToClipboard(letterText);
    showCopyStatus();
}

function shareViaEmail() {
    const letterData = sessionStorage.getItem('currentLetter');
    if (!letterData) return;
    
    const letter = JSON.parse(letterData);
    const subject = encodeURIComponent(`A Letter: ${letter.title}`);
    const body = encodeURIComponent(`${letter.title}\n\nFrom: ${letter.sender}\nDate: ${letter.date}\n\n${letter.content}\n\nShared via Kung Nasabi Ko Sana`);
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

function showCopyStatus() {
    const status = document.getElementById('copyStatus');
    status.classList.remove('hidden');
    setTimeout(() => {
        status.classList.add('hidden');
    }, 2000);
}

// ==================== PRINT/SAVE FUNCTION ==================== 

function printLetter() {
    window.print();
}

// ==================== PARTICLE EFFECTS ==================== 

function createParticles() {
    const particlesContainer = document.getElementById('letterParticles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 20) + 's';
        particlesContainer.appendChild(particle);
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
    const modal = document.getElementById('shareModal');
    if (event.target === modal) {
        closeShareModal();
    }
});

// ==================== PRINT STYLES ==================== 

window.addEventListener('beforeprint', function() {
    const footer = document.querySelector('.letter-footer');
    if (footer) {
        footer.style.display = 'none';
    }
});

window.addEventListener('afterprint', function() {
    const footer = document.querySelector('.letter-footer');
    if (footer) {
        footer.style.display = 'block';
    }
});
