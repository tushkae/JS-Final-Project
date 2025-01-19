document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact-form');
    var modal = document.getElementById('thank-you-modal');
    var closeModal = document.getElementById('close-modal');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      modal.style.display = 'block';
  
      form.reset();
    });
  
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
  
    });
  
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  });
  