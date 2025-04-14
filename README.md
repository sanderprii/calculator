# Calculator Application

A simple calculator web application built with Node.js, Express, and Prisma.

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Support for parentheses in expressions
- Calculation history stored in a database
- View last 10 calculations in history
- Clear history functionality

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: SQLite (via Prisma ORM)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sanderprii/calculator.git
   cd calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment:
    - Make sure you have a `.env` file in the root directory with the following content:
      ```
      DATABASE_URL="file:./dev.db"
      ```

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start the server with nodemon, which automatically restarts the server when files are changed.

### Production Mode

```bash
npm start
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Use the calculator interface to perform calculations
3. View your calculation history below the calculator
4. Use the "Clear History" button to delete all previous calculations

## Project Structure

- `index.js` - Express server and API endpoints
- `prisma/schema.prisma` - Database schema definition
- `public/` - Frontend files
    - `index.html` - Calculator UI
    - `styles.css` - Styling for the calculator
    - `script.js` - Client-side JavaScript for calculator functionality

## API Endpoints

- `GET /api/calculations` - Retrieve calculation history (latest 10 entries)
- `POST /api/calculations` - Save a new calculation
- `DELETE /api/calculations` - Clear calculation history

## Extending the Application

### Adding New Operations

To add new mathematical operations like percentage or square root:

1. Add buttons to the calculator UI in `public/index.html`
2. Update the JavaScript in `public/script.js` to handle the new operations

### Switching to a Different Database

This project uses SQLite by default. To use a different database:

1. Update the `datasource` section in `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
2. Update your `.env` file with the appropriate connection string
3. Run `npx prisma generate && npx prisma db push`

## License

ISC

## Author

This project is maintained by [sanderprii](https://github.com/sanderprii).

---

Feel free to contribute to this project by submitting issues or pull requests.