document.addEventListener('DOMContentLoaded', function() {
    
    function ControlDarkMode() {
        const switchBtn = document.querySelector('.dark-mode-switch');
        const checkbox = document.querySelector('.dark-mode-switch input');
        const body = document.querySelector('body');
        let darkMode = localStorage.getItem('darkMode');
    
        if(darkMode == 'true') {
            body.classList.add('dark-mode');
            checkbox.checked = true;
        } else {
            body.classList.remove("dark-mode");
            checkbox.checked = false;
        }
    
        switchBtn.addEventListener('click', () => {
            if(checkbox.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem("darkMode", true);
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', false);
            }
        })
    }
    
    ControlDarkMode();
}, false);
