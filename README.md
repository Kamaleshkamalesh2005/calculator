# Simple Calculator

A small browser-based calculator built with HTML, CSS and JavaScript. This project implements a basic four-function calculator with a decimal point, clear (AC) and equals operations.

## Features
- Add, subtract, multiply and divide
- Decimal support
- Clear (AC) to reset the calculator
- Basic input validation and division-by-zero handling
- Simple, responsive UI

## Files
- `index.html` — page markup and calculator buttons
- `styles.css` — visual styling for the calculator
- `script.js` — calculator logic and event handling (previously `design.javascript`)

## Quick start

1. Clone or download the repository:
   git clone https://github.com/Kamaleshkamalesh2005/calculator.git

2. Ensure the JavaScript file is named `script.js` at the project root (the page expects `script.js`):
   - If your file is named `design.javascript`, rename it to `script.js`, or
   - Update the `<script src="...">` tag in `index.html` to reference the actual filename.

3. Open `index.html` in a browser (double-click or serve with a static server).

## Notes on recent fixes and improvements
- The JS file in the repository was originally named `design.javascript`, while `index.html` referenced `script.js`. This prevented the page from running scripts. Rename the file to `script.js` or update the `<script>` tag.
- The display input has been set to `value="0"` and `readonly` so the screen shows a default value and is non-editable.
- Digit detection was made robust using a regex test for single digits (^\d$).
- Added a division-by-zero guard: division returns `Error` and resets calculator state for a fresh start.
- Event handling improved using `event.target.closest('button')` to avoid issues if button content includes nested elements.
- Results are rounded to avoid long floating-point tails.

## Known limitations / future improvements
- Repeated-equals behavior (applying the last operation repeatedly) is not implemented. This can be added by storing the last operator and operand when `=` is pressed.
- More advanced error handling and user messaging could be implemented (e.g., preventing further input while showing `Error` until AC is pressed).
- Keyboard support (typing numbers/operators) is not implemented yet.
- Unit tests are not included.

## Contributing
Contributions are welcome. Please open issues or pull requests with suggested fixes or enhancements.

## License
This project is provided under the MIT License. See LICENSE for details (add a LICENSE file as needed).
