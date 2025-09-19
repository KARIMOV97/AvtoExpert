// --------------------------BASE URL--------------------------
const API_BASE = 'https://avtoexpert-production.up.railway.app/api/'; // HTTPS bilan

// --------------------------CSRF token olish--------------------------
function getCsrfToken() {
    const tokenEl = document.querySelector('[name=csrfmiddlewaretoken]');
    return tokenEl ? tokenEl.value : '';
}

// --------------------------GET--------------------------
export async function apiGet(endpoint) {
    const url = `${API_BASE}${endpoint}`;
    const res = await fetch(url, {
        credentials: 'include' // CSRF cookie lar bilan ishlash uchun
    });
    if (!res.ok) throw new Error(`Xatolik: ${res.status}`);
    return await res.json();
}

// --------------------------POST--------------------------
export async function apiPost(endpoint, data) {
    const url = `${API_BASE}${endpoint}`;
    const res = await fetch(url, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "X-CSRFToken": getCsrfToken()
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`Xatolik: ${res.status}`);
    return await res.json();
}

// --------------------------PUT--------------------------
export async function apiPut(endpoint, data) {
    const url = `${API_BASE}${endpoint}`;
    const res = await fetch(url, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "X-CSRFToken": getCsrfToken()
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`Xatolik: ${res.status}`);
    return await res.json();
}

// --------------------------DELETE--------------------------
export async function apiDelete(endpoint) {
    const url = `${API_BASE}${endpoint}`;
    const res = await fetch(url, { 
        method: "DELETE",
        headers: { "X-CSRFToken": getCsrfToken() },
        credentials: 'include'
    });
    if (!res.ok) throw new Error(`Xatolik: ${res.status}`);
    return true;
}

// --------------------------ALERT--------------------------
export function showBootstrapAlert(message, type = 'danger') {
    const alertEl = document.getElementById('formAlert');
    if (!alertEl) return;
    alertEl.textContent = message || `Iltimos ma'lumot kiriting`;
    alertEl.className = `alert alert-${type}`;
    alertEl.classList.remove('d-none');
    setTimeout(() => alertEl.classList.add('d-none'), 2000);
}

// --------------------------COOKIE/CSRF--------------------------
export function getCookie(name) {
    const cookies = document.cookie.split(";").map(c => c.trim());
    for (let cookie of cookies) {
        if (cookie.startsWith(name + "=")) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}

export const csrftoken = getCookie("csrftoken");

// --------------------------CALENDAR--------------------------
export function makeCalendar(box, chosenYear, id) {
    const select = document.createElement("select");
    select.className = `car-year-input-${id} form-select mb-3`;
    select.required = true;

    for (let year = 1940; year <= 2040; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        if (year === chosenYear) option.selected = true;
        select.appendChild(option);
    }
    box.appendChild(select);
}
