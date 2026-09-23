# Services Accordion - Standalone Section

A premium, animated collapsible accordion showcasing your services with visual mockups.

## 📁 Files Included

```
services-accordion-standalone/
├── index.html      # Complete HTML structure
├── accordion.css   # All styles and animations
├── accordion.js    # Toggle functionality
└── README.md       # This file
```

## 🚀 How to Use

### Option 1: Use as Standalone Page
Simply open `index.html` in your browser - it works immediately!

### Option 2: Integrate into Your Website

**1. Copy the CSS**
```html
<link rel="stylesheet" href="path/to/accordion.css">
```

**2. Copy the HTML section**
Copy everything inside `<section class="services-accordion-section">` from index.html

**3. Add the JavaScript**
```html
<script src="path/to/accordion.js"></script>
```

**4. Make sure you have the fonts**
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
```

## ✨ Features

- ✅ **Smooth animations** - CSS-powered transitions
- ✅ **Auto-close** - Only one service open at a time
- ✅ **Keyboard accessible** - Tab, Enter, and Space key support
- ✅ **Responsive** - Works on mobile, tablet, and desktop
- ✅ **Visual mockups** - Browser, chat, chart, and WhatsApp mockups
- ✅ **Light theme** - Clean, professional design

## 🎨 Customization

### Change Colors
Edit the CSS variables in `accordion.css`:
```css
:root {
  --bg: #F8F7F4;           /* Background */
  --text: #0A0A0C;         /* Text color */
  --accent: #8AAD00;       /* Accent color (green) */
}
```

### Edit Services
In `index.html`, each service follows this structure:
```html
<div class="accordion-item" id="service-1">
  <div class="accordion-row" onclick="toggleAccordion('service-1')">
    <div class="service-number">01</div>
    <div class="service-name">Your Service Name</div>
    <div class="service-tags">
      <span class="service-tag">Tag1</span>
    </div>
    <div class="accordion-toggle">+</div>
  </div>
  
  <div class="accordion-body">
    <div class="accordion-content">
      <!-- Your content here -->
    </div>
  </div>
</div>
```

### Add More Services
1. Copy an existing `.accordion-item` block
2. Change the `id` (e.g., `service-5`)
3. Update the `onclick` attribute to match
4. Update service number, name, description, and features

## 🎯 JavaScript Functions

### `toggleAccordion(serviceId)`
Opens/closes a specific accordion item.

**Usage:**
```javascript
toggleAccordion('service-2');
```

### Auto-open First Item
By default, the first service opens on page load. To change this:
```javascript
// In accordion.js, change:
const firstItem = document.getElementById('service-1');
// To:
const firstItem = document.getElementById('service-3'); // Opens third item
```

### Disable Auto-close Behavior
To allow multiple items open at once:
```javascript
// In toggleAccordion function, remove these lines:
allItems.forEach(item => {
  item.classList.remove('open');
  // ...
});
```

## 📱 Responsive Breakpoints

- **Desktop**: Full 2-column layout with all features
- **Tablet** (< 1024px): Stacked layout, visual mockup on top
- **Mobile** (< 768px): Simplified layout, tags hidden

## 🔧 Browser Support

- ✅ Chrome, Edge, Safari, Firefox (latest versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ IE11 not supported (uses CSS Grid and modern features)

## 💡 Tips

1. **Keep descriptions concise** - 2-3 sentences max
2. **Use 4-6 features per service** - More makes it overwhelming
3. **Customize mockups** - Edit the visual mockups in CSS to match your brand
4. **Test on mobile** - Always check mobile view

## 🐛 Troubleshooting

**Accordion not opening?**
- Make sure `accordion.js` is loaded after the HTML
- Check browser console for JavaScript errors

**Styling looks broken?**
- Verify `accordion.css` path is correct
- Check that Google Fonts are loading

**Animations not smooth?**
- Don't override `max-height` transitions in external CSS
- Check `prefers-reduced-motion` isn't enabled in OS settings

## 📞 Support

Need help? Check that all three files (HTML, CSS, JS) are in the same folder and paths are correct!

---

**Built with ❤️ by Automora Tech Solutions**
