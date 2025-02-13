let currentIndex = 0;
const inner = document.querySelector(".carousel-inner");
const items = document.querySelectorAll(".carousel-item");

// Функция для определения количества видимых элементов
function getVisibleItems() {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    if (window.innerWidth < 1200) return 3;
    return 4;
}

// Функция перелистывания карусели
function moveSlide(direction = 1) {
    const visibleItems = getVisibleItems();
    currentIndex += direction;

    if (currentIndex >= items.length - visibleItems + 1) {
        currentIndex = 0; // Возвращаемся в начало
    } else if (currentIndex < 0) {
        currentIndex = items.length - visibleItems; // Возвращаемся в конец
    }

    inner.style.transition = "transform 0.5s ease-in-out";
    inner.style.transform = `translateX(-${currentIndex * (100 / visibleItems)}%)`;
}

// Автопрокрутка каждые 20 секунд
setInterval(() => moveSlide(1), 20000);

// Привязываем кнопки управления
document.querySelector(".prev").addEventListener("click", () => moveSlide(-1));
document.querySelector(".next").addEventListener("click", () => moveSlide(1));

// Пересчитываем количество элементов при изменении размера окна
window.addEventListener("resize", () => {
    moveSlide(0);
});
