// Функции для модального окна продукта
function showProduct(id) {
  const modal = document.getElementById("product-details");
  modal.classList.remove("hidden");
  
  // Добавляем анимацию появления
  modal.style.opacity = "0";
  modal.style.transform = "scale(0.8)";
  
  setTimeout(() => {
    modal.style.opacity = "1";
    modal.style.transform = "scale(1)";
  }, 10);
  
  // Блокируем прокрутку страницы
  document.body.style.overflow = "hidden";
}

function hideProduct() {
  const modal = document.getElementById("product-details");
  
  // Анимация исчезновения
  modal.style.opacity = "0";
  modal.style.transform = "scale(0.8)";
  
  setTimeout(() => {
    modal.classList.add("hidden");
    // Разблокируем прокрутку страницы
    document.body.style.overflow = "auto";
  }, 300);
}

// Закрытие модального окна по клику вне его
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("product-details");
  
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        hideProduct();
      }
    });
  }
  
  // Закрытие по клавише Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      hideProduct();
    }
  });
});

// Валидация формы контактов
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Простая валидация
      const name = form.querySelector('input[name="name"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      const message = form.querySelector('textarea[name="message"]').value.trim();
      
      if (name.length < 2) {
        alert("Имя должно содержать минимум 2 символа");
        return;
      }
      
      if (!email.includes("@")) {
        alert("Введите корректный email адрес");
        return;
      }
      
      if (message.length < 10) {
        alert("Сообщение должно содержать минимум 10 символов");
        return;
      }
      
      // Показываем сообщение об успехе
      showSuccessMessage("Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.");
      form.reset();
    });
  }
});

// Функция показа сообщения об успехе
function showSuccessMessage(message) {
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.textContent = message;
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-weight: 500;
    transform: translateX(400px);
    transition: transform 0.5s ease;
  `;
  
  document.body.appendChild(successDiv);
  
  // Анимация появления
  setTimeout(() => {
    successDiv.style.transform = "translateX(0)";
  }, 100);
  
  // Автоматическое скрытие через 5 секунд
  setTimeout(() => {
    successDiv.style.transform = "translateX(400px)";
    setTimeout(() => {
      document.body.removeChild(successDiv);
    }, 500);
  }, 5000);
}

// Плавная прокрутка для навигации
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a[href^='#']");
  
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});

// Анимация появления элементов при прокрутке
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".card, .about-card, .contact-card");
  
  animatedElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});
