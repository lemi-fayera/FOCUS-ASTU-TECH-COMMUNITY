# Modern To-Do List UI 📝

A clean, responsive, and minimalist To-Do List interface built with **HTML5** and **CSS3**. This project was created as a learning exercise to master CSS layout techniques, Flexbox, and visual hierarchy.

## 🚀 Live Preview
![Project Screenshot](./screenshot.png) 
*Note: Replace 'screenshot.png' with your actual image file name*

---

## 🛠️ Concepts Learned

Building this project helped me bridge the gap between "making things work" and "making things look professional." Key concepts include:

### 1. The Box Model & Alignment
- **Centered Layouts:** Learned how to use `margin: 0 auto` and `max-width` to keep the app centered and readable on large screens.
- **Fixed Widths:** Solved alignment issues by ensuring all components (Stats, Input, and List) share the same `max-width` constraint.

### 2. Flexbox Mastery
- Used `display: flex` with `flex: 1` to create three perfectly equal-sized cards in the statistics row.
- Used the `gap` property instead of messy individual margins for consistent spacing.

### 3. CSS "Logic" (Interactive States)
- **Checkbox Hack:** Used the `:checked` pseudo-class and the sibling selector (`+` / `~`) to strike through text and change colors when a task is completed—all without JavaScript!
- **Hover Transitions:** Implemented `transform: translateY()` and `opacity` changes to give the UI a "snappy" and interactive feel.

---

## 📂 Project Structure

```text
├── index.html   # The structural skeleton (HTML5)
├── styles.css   # The styling and layout (CSS3)
└── screenshot.png  # Preview of the final design
