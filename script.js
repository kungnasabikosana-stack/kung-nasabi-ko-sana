// ==================== PARTICLES ==================== 

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
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

// Create floating petals around envelope
function createFloatingPetals() {
    const petalsContainer = document.querySelector('.floating-petals');
    const petalCount = 8;
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = (Math.random() * 80 + 10) + '%';
        petal.style.top = (Math.random() * -50 - 20) + 'px';
        petal.style.animationDelay = (Math.random() * 2) + 's';
        petalsContainer.appendChild(petal);
    }
}

// ==================== NAVIGATION ==================== 

function goToAccess() {
    // Placeholder for "Open Memories" - will show letter list in future
    openLetterCodeModal();
}

function goToLetterCode() {
    openLetterCodeModal();
}

function openLetterCodeModal() {
    const modal = document.getElementById('letterCodeModal');
    modal.classList.remove('hidden');
    document.getElementById('letterCodeInput').focus();
}

function closeModal() {
    const modal = document.getElementById('letterCodeModal');
    modal.classList.add('hidden');
    document.getElementById('codeError').classList.remove('visible');
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('letterCodeModal');
    if (event.target === modal) {
        closeModal();
    }
});

// ==================== LETTER CODE SUBMISSION ==================== 

async function submitLetterCode() {
    const code = document.getElementById('letterCodeInput').value.trim().toUpperCase();
    const errorElement = document.getElementById('codeError');
    
    if (!code) {
        errorElement.textContent = 'Please enter a letter code.';
        errorElement.classList.add('visible');
        return;
    }
    
    try {
        // Fetch letters data
        const response = await fetch('data/letters.json');
        const data = await response.json();
        
        // Find letter by code
        const letter = data.letters.find(l => l.id === code);
        
        if (letter) {
            // Store current letter in sessionStorage
            sessionStorage.setItem('currentLetter', JSON.stringify(letter));
            
            // Trigger envelope opening animation
            animateEnvelopeOpening(() => {
                // Redirect to letter view
                window.location.href = 'letter.html';
            });
        } else {
            errorElement.textContent = 'Hmm... it seems this memory has not found its home yet.';
            errorElement.classList.add('visible');
        }
    } catch (error) {
        console.error('Error loading letters:', error);
        errorElement.textContent = 'Something went wrong. Please try again.';
        errorElement.classList.add('visible');
    }
}

// ==================== ENVELOPE ANIMATION ==================== 

function animateEnvelopeOpening(callback) {
    const envelope = document.querySelector('.envelope');
    const envelopeFlap = document.querySelector('.envelope-flap');
    
    // Add opening animation
    envelope.style.animation = 'envelope-open 0.8s ease forwards';
    envelopeFlap.style.animation = 'flap-open 0.8s ease forwards';
    
    setTimeout(callback, 800);
}

// ==================== INITIALIZATION ==================== 

document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    createFloatingPetals();
});

// ==================== ADMIN AUTHENTICATION ==================== 

// Check if user is on admin page
if (document.body.classList.contains('admin-page')) {
    // Admin page logic will be here
}
