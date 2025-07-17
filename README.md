# ComboFinder

A **100% client-side** web application that lets users upload a CSV file of items and prices, choose a target amount (exact match) or lower/upper limits, and download all valid item combinations as an **Excel (.xlsx)** file. No backend or server required—everything runs in the browser!

---

## 🚀 Features

* **File Upload**: Read a CSV file containing `Item,Price` pairs.
* **Modes**:

  * **Without Limits**: Find combinations whose total price exactly matches the target amount.
  * **With Limits**: Find combinations whose total price falls within specified lower and upper bounds.
* **Duplicate Handling**: Automatically deduplicates identical `Item,Price` pairs and results.
* **Excel Export**: Generates and downloads a `.xlsx` file (`combo_results.xlsx`) with combinations.
* **Pure static**: Deploy anywhere static assets are supported (Netlify, GitHub Pages, Vercel, etc.).

---

## 🛠️ Tech Stack & Dependencies

* **HTML/CSS/JavaScript** for UI and logic
* [SheetJS](https://sheetjs.com/) (via CDN) for Excel file creation (`xlsx.full.min.js`)
* No server-side code—everything runs in browser

---

## 📂 Project Structure

```
combo-finder/
├── index.html      # Main HTML file
├── style.css       # Styling
├── index.js        # All client-side logic
└── README.md       # This file
```

---

## ⚙️ Getting Started

1. **Clone or download** this repo:

   ```bash
   git clone https://github.com/your-username/combo-finder.git
   cd combo-finder
   ```
2. **Open `index.html`** in your browser (double-click or use a simple HTTP server):

   ```bash
   # If you have Python installed, run:
   python3 -m http.server 8000
   # Then navigate to http://localhost:8000
   ```
3. **Usage**:

   1. Click **Choose File** and upload your CSV file with lines like:

      ```csv
      Apple,10
      Banana,5
      Orange,8
      Grapes,12
      Mango,15
      ```
   2. Enter **Total Amount** (for exact mode) or switch to "With Limits" and enter **Lower** and **Upper** limits.
   3. Click **Submit**.
   4. Your browser will download `combo_results.xlsx` containing all valid combinations.

---

## 📦 Deployment

Since this is a static site, you can deploy it on platforms like:

* **Netlify**: Drag & drop your folder in the dashboard or connect via Git.
* **GitHub Pages**: Push to a `gh-pages` branch and enable Pages in repo settings.
* **Vercel**: `vercel` CLI or Git integration.

No build steps are needed—just host the three files.

---

## 🚧 Customization

* **Styling**: Modify `style.css` for colors, layout.
* **Logic**: Tweak `index.js` algorithms (e.g. add new combination filters).
* **Export Format**: Use SheetJS API to add more columns or worksheets.

---

## 🤝 Contributing

Feel free to open issues or pull requests to improve this tool!

---

## 📄 License

This project is released under the [MIT License](LICENSE).
