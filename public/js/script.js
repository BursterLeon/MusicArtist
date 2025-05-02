document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.tour').forEach(tour => {
    tour.addEventListener('mouseenter', () => {
      tour.style.transform = 'scale(1.02)';
      tour.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });

    tour.addEventListener('mouseleave', () => {
      tour.style.transform = 'scale(1)';
      tour.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
  });
});


  // Modal setup
  const modal = document.getElementById('ticket-modal');
  const closeBtn = document.querySelector('.modal .close');
  const buttons = document.querySelectorAll('.tour button');

  // Ticket input elements
  const vipInput = document.getElementById('vip-count');
  const normalInput = document.getElementById('normal-count');
  const discountInput = document.getElementById('discount-count');
  const totalDisplay = document.getElementById('total-price');
  const purchaseBtn = document.getElementById('purchase-btn');
  const paymentForm = document.getElementById('payment-form');

  // Function to calculate and display total price
  function updateTotal() {
    const vip = parseInt(vipInput.value) || 0;
    const normal = parseInt(normalInput.value) || 0;
    const discount = parseInt(discountInput.value) || 0;
    const total = vip * 100 + normal * 50 + discount * 25;
    totalDisplay.textContent = total;
  }

  // Update price on input
  vipInput.addEventListener('input', updateTotal);
  normalInput.addEventListener('input', updateTotal);
  discountInput.addEventListener('input', updateTotal);

  // Show modal when Buy Tickets is clicked
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      modal.style.display = 'flex';
      vipInput.value = 0;
      normalInput.value = 0;
      discountInput.value = 0;
      totalDisplay.textContent = '0';
      paymentForm.style.display = 'none';
    });
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Click outside to close modal
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Show payment form when Purchase clicked
  purchaseBtn.addEventListener('click', () => {
    const total = parseInt(totalDisplay.textContent);
    if (total === 0) {
      alert('Please select at least one ticket.');
    } else {
      paymentForm.style.display = 'block';
    }
  });
