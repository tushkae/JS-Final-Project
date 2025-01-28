document.addEventListener('DOMContentLoaded', function() {
    function Submit() {
        var form = document.getElementById('contact-form');
        let name = document.querySelector('#name');
        let email = document.querySelector('#email');
        let message = document.querySelector('#message');
        let btn = document.querySelector('.btn');
        

        btn.addEventListener('click', () => {
            if(form.checkValidity()) {
                let userDataObject =  {
                    Name: name.value,
                    Email: email.value,
                    Message: message.value
                };
                const expirationDays = 10;
                const date = new Date();
                date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
                const expires = `expires=${date.toUTCString()}`;
                document.cookie = `UserData=${JSON.stringify(userDataObject)}; ${expires}; path=/`;
            }
        })
        // localStorage.setItem('UserData', JSON.stringify(userDataObject));
    }

    Submit();
})