/* ── Section Navigation ───────────────────────────────── */

function nextSection(current) {
    if (!validateSection(current)) return;
    setSection(current, current + 1);
}

function prevSection(current) {
    setSection(current, current - 1);
}

function setSection(from, to) {
    const fromEl = document.getElementById(`section-${from}`);
    const toEl   = document.getElementById(`section-${to}`);
    if (!toEl) return;

    fromEl.classList.remove('active');
    toEl.classList.add('active');

    // Update step indicators
    document.querySelectorAll('.step').forEach(s => {
        const n = parseInt(s.dataset.step);
        s.classList.remove('active', 'done');
        if (n === to)   s.classList.add('active');
        if (n < to)     s.classList.add('done');
    });

    // Scroll card into view smoothly
    document.querySelector('.card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ── Validation ───────────────────────────────────────── */

function validateSection(section) {
    if (section === 1) {
        const age = document.getElementById('age').value;
        const sex = document.getElementById('sex').value;
        const cp  = document.querySelector('input[name="cp"]:checked');

        if (!age || !sex || !cp) {
            shakeForm();
            showToast('Please fill in all fields before continuing.');
            return false;
        }
        // Sync hidden cp field
        document.getElementById('cp').value = cp.value;
    }

    if (section === 2) {
        const ids = ['trestbps', 'chol', 'thalach', 'fbs', 'restecg', 'exang'];
        const empty = ids.some(id => document.getElementById(id).value === '');
        if (empty) {
            shakeForm();
            showToast('Please complete all clinical fields.');
            return false;
        }
    }

    return true;
}

/* ── Predict ──────────────────────────────────────────── */

function predict() {
    // Final cp sync
    const cpRadio = document.querySelector('input[name="cp"]:checked');
    if (cpRadio) document.getElementById('cp').value = cpRadio.value;

    // Validate section 3
    const oldpeak = document.getElementById('oldpeak').value;
    const slope   = document.getElementById('slope').value;
    const ca      = document.getElementById('ca').value;
    const thal    = document.getElementById('thal').value;

    if (!oldpeak || !slope || !ca || !thal) {
        shakeForm();
        showToast('Please fill in all advanced parameters.');
        return;
    }

    const data = {
        age:      Number(document.getElementById('age').value),
        sex:      Number(document.getElementById('sex').value),
        cp:       Number(document.getElementById('cp').value),
        trestbps: Number(document.getElementById('trestbps').value),
        chol:     Number(document.getElementById('chol').value),
        fbs:      Number(document.getElementById('fbs').value),
        restecg:  Number(document.getElementById('restecg').value),
        thalach:  Number(document.getElementById('thalach').value),
        exang:    Number(document.getElementById('exang').value),
        oldpeak:  Number(document.getElementById('oldpeak').value),
        slope:    Number(document.getElementById('slope').value),
        ca:       Number(document.getElementById('ca').value),
        thal:     Number(document.getElementById('thal').value),
    };

    // Button loading state
    const btn = document.querySelector('.btn-predict');
    btn.classList.add('loading');
    btn.disabled = true;

    fetch('https://heart-disease-prediction-ai-v1-0.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(result => {
        showResult(result.result);
    })
    .catch(err => {
        console.error(err);
        showToast('Could not reach the API. Make sure the backend is running.');
    })
    .finally(() => {
        btn.classList.remove('loading');
        btn.disabled = false;
    });
}

/* ── Show Result ──────────────────────────────────────── */

function showResult(text) {
    const box   = document.getElementById('result-box');
    const icon  = document.getElementById('result-icon');
    const label = document.getElementById('result-text');
    const note  = document.getElementById('result-note');

    const isPositive = /disease|risk|positive|high/i.test(text);

    box.className = 'result-box ' + (isPositive ? 'positive' : 'negative');

    icon.textContent  = isPositive ? '⚠️' : '✅';
    label.textContent = isPositive
        ? 'Elevated Risk Detected'
        : 'Low Risk — Heart Appears Healthy';
    note.textContent = isPositive
        ? 'The model indicates a higher likelihood of heart disease. Please consult a cardiologist for a thorough evaluation.'
        : 'No significant risk factors detected based on the provided data. Continue maintaining a healthy lifestyle.';

    // Make visible
    box.classList.add('visible');
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ── Reset ────────────────────────────────────────────── */

function resetForm() {
    // Clear all inputs
    document.querySelectorAll('input[type="number"]').forEach(i => i.value = '');
    document.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
    document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);

    // Go back to section 1
    setSection(getCurrentSection(), 1);

    // Hide result
    const box = document.getElementById('result-box');
    box.classList.remove('visible', 'positive', 'negative');
}

function getCurrentSection() {
    for (let i = 1; i <= 3; i++) {
        if (document.getElementById(`section-${i}`).classList.contains('active')) return i;
    }
    return 1;
}

/* ── Toast Notification ───────────────────────────────── */

function showToast(msg) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed;
        bottom: 28px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: #1e2435;
        color: #e8eaf0;
        border: 1px solid rgba(232,39,75,0.35);
        padding: 12px 22px;
        border-radius: 999px;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.82rem;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        z-index: 999;
        transition: all 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* ── Shake Animation ──────────────────────────────────── */

function shakeForm() {
    const card = document.querySelector('.card');
    card.style.animation = 'shake 0.4s ease';
    card.addEventListener('animationend', () => {
        card.style.animation = '';
    }, { once: true });

    // Inject shake keyframes if not already present
    if (!document.getElementById('shake-style')) {
        const style = document.createElement('style');
        style.id = 'shake-style';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%       { transform: translateX(-8px); }
                40%       { transform: translateX(8px); }
                60%       { transform: translateX(-5px); }
                80%       { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

/* ── Radio → hidden input sync ────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[name="cp"]').forEach(radio => {
        radio.addEventListener('change', () => {
            document.getElementById('cp').value = radio.value;
        });
    });
});
