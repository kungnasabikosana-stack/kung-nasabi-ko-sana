// ==================== LETTER PAGE INITIALIZATION ==================== 

document.addEventListener('DOMContentLoaded', function() {
    loadLetter();
    createParticles();
});

// ==================== LOAD LETTER DATA ==================== 

function loadLetter() {
    const letterData = sessionStorage.getItem('currentLetter');
    
    if (!letterData) {
        // No letter found, redirect to home
        window.location.href = 'index.html';
        return;
    }
    
    const letter = JSON.parse(letterData);
    displayLetter(letter);
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
    
    // Update page title
    document.title = `${letter.title} - Kung Nasabi Ko Sana`;
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
    const letterLink = `${window.location.origin}${window.location.pathname}?letter=${letter.id}`;
    
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
