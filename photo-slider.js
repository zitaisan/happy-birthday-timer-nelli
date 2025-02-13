document.addEventListener('DOMContentLoaded', () => {
    // Список изображений
    const images = [
        'images/photo1.jpg',
        'images/photo2.jpg',
        'images/photo3.jpg',
        'images/photo4.jpg',
        'images/photo5.jpg',
        'images/photo6.jpg',
        'images/photo7.jpg',
        'images/photo8.jpg',
        'images/photo9.jpg',
        'images/photo10.jpg',
        'images/photo11.jpg',
        'images/photo12.jpg',
        'images/photo13.jpg',
        'images/photo14.jpg',
        'images/photo15.jpg',
        'images/photo16.jpg',
        'images/photo17.jpg',
        'images/photo18.jpg',
        'images/photo19.jpg',
        'images/photo20.jpg',
        'images/photo21.jpg',
        'images/photo22.jpg',
        'images/photo23.jpg',
        'images/photo24.jpg',
        'images/photo25.jpg',
        'images/photo26.jpg',
        'images/photo27.jpg'
    ];
    
    // Получаем текущий день года
    function getDayOfYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    // Определяем индекс изображения
    const dayOfYear = getDayOfYear();
    const imageIndex = dayOfYear % images.length;

    // Устанавливаем изображение на страницу
    const dailyImage = document.getElementById('dailyImage');
    dailyImage.src = images[imageIndex];
});