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