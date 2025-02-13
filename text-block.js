let isTyped = false;  // Flag to check if the typing effect has already been triggered

window.onscroll = function() {
    let contentBlock = document.querySelector('.content-h');
    let contentPosition = contentBlock.getBoundingClientRect().top;

    // Check if the content block is in the viewport
    if (contentPosition < window.innerHeight && contentPosition > 0 && !isTyped) {
        let text = "your birthday is in ";
        let i = 0;
        const speed = 50; // Speed of typing (ms)

        function typeText() {
            if (i < text.length) {
                contentBlock.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeText, speed);
            }
        }

        // Trigger typing text effect only once
        isTyped = true;
        typeText();
    } else if (contentPosition > window.innerHeight || contentPosition < 0) {
        // Clear the content if it's out of the viewport
        contentBlock.textContent = "";
    }
    else if (isTyped){
        contentBlock.textContent = "your birthday is in ";
    }
}
