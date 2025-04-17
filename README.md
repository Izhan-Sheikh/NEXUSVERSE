# Anime Nexus - Anime Themed Website

An eye-catching anime-themed website featuring a stunning hero section with video background and a responsive navbar.

## Features

- Responsive design for all devices
- Anime-themed video background in the hero section
- Interactive navigation with mobile-friendly menu
- Particle animation effects
- Cursor trail animation
- Modern gradient color scheme
- Fallback image if video fails to load

## Usage

1. Clone this repository or download the files
2. Open `index.html` in your browser

## Personalization

### Changing the Video

To replace the hero video:
1. Find a suitable anime video clip (MP4 format recommended)
2. Replace the `src` attribute in the video tag in `index.html`:
   ```html
   <source src="your-video-path.mp4" type="video/mp4">
   ```

### Changing the Colors

The color scheme can be modified in the `styles.css` file by updating the CSS variables:
```css
:root {
    --primary-color: #ff4d94;
    --secondary-color: #9333ea;
    --dark-color: #120f2d;
    --light-color: #f8f9fa;
    --accent-color: #00ffd5;
}
```

### Adding Content

This is a starter template focusing on the hero section and navbar. You can add more sections by:
1. Adding HTML markup below the hero section in `index.html`
2. Styling your new sections in `styles.css`

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)

## Credits

- Font Awesome for icons
- Google Fonts for the Poppins font family

---

Made with ❤️ by Izhan Sheikh 