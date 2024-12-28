// Ініціалізація об'єкта для збереження даних форми
const formData = { email: '', message: '' };

// Отримання елементів форми
const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// Завантаження даних із локального сховища при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';
      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
    }
  }
});

// Збереження даних у локальне сховище під час введення
form.addEventListener('input', event => {
  if (event.target.name === 'email' || event.target.name === 'message') {
    formData[event.target.name] = event.target.value.trim(); // Зберігаємо обрізані значення
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// Обробка відправлення форми
form.addEventListener('submit', event => {
  event.preventDefault();

  // Перевірка, чи заповнені всі поля
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  // Логування об'єкта formData
  console.log(formData);

  // Очищення локального сховища, об'єкта formData і форми
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
});
