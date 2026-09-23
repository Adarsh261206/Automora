/* ═══════════════════════════════════════════════════════════
   SERVICES ACCORDION - JavaScript
   Handles toggle functionality with smooth animations
   ═══════════════════════════════════════════════════════════ */

/**
 * Toggle accordion item open/close
 * @param {string} serviceId - The ID of the accordion item to toggle
 */
function toggleAccordion(serviceId) {
  const clickedItem = document.getElementById(serviceId);
  const allItems = document.querySelectorAll('.accordion-item');
  
  // Check if clicked item is already open
  const isOpen = clickedItem.classList.contains('open');
  
  // Close all accordion items
  allItems.forEach(item => {
    item.classList.remove('open');
    const body = item.querySelector('.accordion-body');
    if (body) {
      body.style.maxHeight = '0';
    }
  });
  
  // If the clicked item was not open, open it
  if (!isOpen) {
    clickedItem.classList.add('open');
    const body = clickedItem.querySelector('.accordion-body');
    if (body) {
      // Set max-height to scrollHeight for smooth animation
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  }
}

/**
 * Initialize accordion on page load
 */
document.addEventListener('DOMContentLoaded', function() {
  // Open first accordion item by default
  const firstItem = document.getElementById('service-1');
  if (firstItem) {
    firstItem.classList.add('open');
    const body = firstItem.querySelector('.accordion-body');
    if (body) {
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  }
  
  // Add keyboard accessibility
  const accordionRows = document.querySelectorAll('.accordion-row');
  accordionRows.forEach(row => {
    // Make focusable
    row.setAttribute('tabindex', '0');
    
    // Add keyboard support (Enter and Space)
    row.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const itemId = this.parentElement.id;
        toggleAccordion(itemId);
      }
    });
  });
  
  // Recalculate max-height on window resize (for responsive)
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      const openItems = document.querySelectorAll('.accordion-item.open');
      openItems.forEach(item => {
        const body = item.querySelector('.accordion-body');
        if (body) {
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    }, 250);
  });
});

/**
 * Optional: Close accordion when clicking outside
 */
document.addEventListener('click', function(e) {
  // Check if click is outside accordion
  if (!e.target.closest('.accordion-item')) {
    // Uncomment below to enable close-on-outside-click
    // const allItems = document.querySelectorAll('.accordion-item');
    // allItems.forEach(item => {
    //   item.classList.remove('open');
    //   const body = item.querySelector('.accordion-body');
    //   if (body) {
    //     body.style.maxHeight = '0';
    //   }
    // });
  }
});
