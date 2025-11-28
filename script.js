const passwordInput = document.getElementById('password');
const checkBtn = document.getElementById('checkBtn');
const strengthText = document.getElementById('strengthText');
const timeText = document.getElementById('timeText');

checkBtn.addEventListener('click', () => {
    const password = passwordInput.value;
    if (!password) return;

    // Easter egg
    if (password.toLowerCase() === 'cookie') {
        alert('🎉 Secret Cookie Clicker game unlocked!');
        return;
    }

    // Character checks
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    const length = password.length;

    // Scoring
    let score = 0;
    if (length >= 12) score++;
    if (hasLower && hasUpper) score++;
    if (hasNumber || hasSymbol) score++;

    // Strength text
    let strength;
    switch(score) {
        case 0: strength = 'Change your password'; break;
        case 1: strength = 'Weak'; break;
        case 2: strength = 'Great'; break;
        case 3: strength = 'Never gets cracked'; break;
    }
    strengthText.textContent = strength;

    // Estimate crack time
    const charsetSize = (hasLower ? 26 : 0) + (hasUpper ? 26 : 0) + (hasNumber ? 10 : 0) + (hasSymbol ? 32 : 0);
    let possibilities = Math.pow(charsetSize, length);
    let seconds = possibilities / 1e9; // assuming 1 billion guesses/sec

    let displayTime = '';
    if (seconds < 60) displayTime = `${Math.round(seconds)} seconds`;
    else {
        let minutes = seconds/60;
        if (minutes < 60) displayTime = `${Math.round(minutes)} minutes`;
        else {
            let hours = minutes/60;
            if (hours < 24) displayTime = `${Math.round(hours)} hours`;
            else {
                let days = hours/24;
                if (days < 365) displayTime = `${Math.round(days)} days`;
                else {
                    let years = days/365;
                    if (years < 10) displayTime = `${Math.round(years)} years`;
                    else {
                        let decades = years/10;
                        if (decades < 10) displayTime = `${Math.round(decades)} decades`;
                        else {
                            let centuries = decades/10;
                            displayTime = `${Math.round(centuries)} centuries`;
                        }
                    }
                }
            }
        }
    }

    timeText.textContent = `Crack time: ${displayTime}`;
});
