// Инициализация Telegram Web App
const tg = window.Telegram?.WebApp;

// Элементы DOM
const alertBtn = document.getElementById('alertBtn');
const themeBtn = document.getElementById('themeBtn');
const telegramBtn = document.getElementById('telegramBtn');
const output = document.getElementById('output');
const appInfo = document.getElementById('appInfo');

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Если мы в Telegram
    if (tg) {
        tg.ready();
        tg.expand(); // Раскрываем на весь экран
        
        // Показываем информацию о Mini App
        displayAppInfo();
        
        // Меняем кнопку Telegram
        telegramBtn.innerHTML = '🔄 Отправить данные в Telegram';
    } else {
        output.innerHTML = '<p style="color: #dc3545;">⚠️ Открыто вне Telegram. Некоторые функции недоступны.</p>';
        telegramBtn.disabled = true;
        telegramBtn.innerHTML = '❌ Требуется Telegram';
    }
}

function displayAppInfo() {
    if (!tg) return;
    
    const info = `
        <p><strong>Платформа:</strong> ${tg.platform}</p>
        <p><strong>Версия:</strong> ${tg.version}</p>
        <p><strong>Цветовая тема:</strong> ${tg.colorScheme}</p>
        <p><strong>Язык:</strong> ${tg.initDataUnsafe.user?.language_code || 'не определён'}</p>
        <p><strong>User ID:</strong> ${tg.initDataUnsafe.user?.id || 'не доступен'}</p>
    `;
    
    appInfo.innerHTML = info;
}

function setupEventListeners() {
    // Кнопка Alert
    alertBtn.addEventListener('click', function() {
        output.innerHTML = `<p style="color: #28a745;">✅ Alert показан! Время: ${new Date().toLocaleTimeString()}</p>`;
        alert('Привет из Telegram Mini App! 🎉');
    });
    
    // Кнопка смены темы
    themeBtn.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-theme');
        output.innerHTML = `<p style="color: #ffc107;">🎨 Тема изменена: ${isDark ? 'Тёмная' : 'Светлая'}</p>`;
        this.innerHTML = isDark ? '☀️ Светлая тема' : '🌙 Тёмная тема';
    });
    
    // Кнопка Telegram действия
    telegramBtn.addEventListener('click', function() {
        if (!tg) return;
        
        output.innerHTML = '<p style="color: #0088cc;">📤 Отправка данных в Telegram...</p>';
        
        // Имитация отправки данных
        setTimeout(() => {
            tg.sendData(JSON.stringify({
                action: 'button_clicked',
                timestamp: new Date().toISOString(),
                button: 'telegram_action'
            }));
            
            output.innerHTML += '<p style="color: #28a745;">✅ Данные отправлены!</p>';
            
            // Опционально: закрыть Mini App через 2 секунды
            // setTimeout(() => tg.close(), 2000);
        }, 1000);
    });
}

// Добавляем CSS для темной темы
const style = document.createElement('style');
style.textContent = `
    .dark-theme {
        background: #121212 !important;
        color: #ffffff !important;
    }
    
    .dark-theme .container {
        background: #1e1e1e;
    }
    
    .dark-theme .card {
        background: #2d2d2d;
        border-color: #404040;
    }
`;
document.head.appendChild(style);