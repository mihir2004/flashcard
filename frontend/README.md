# Flashcard Frontend

This document provides an overview of the frontend components used in the Flashcard web application. The frontend is built using React.js and is responsible for rendering the user interface and handling user interactions.

## Components

### 1. `App.js`

- **Description**: The root component that sets up the main structure of the application. It includes the routing logic and renders the appropriate pages.
- **Usage**: Handles navigation between different parts of the app, such as the login page, dashboard, and study sessions.

### 2. `Login.js`

- **Description**: Manages user authentication, allowing users to log in or register.
- **Usage**: Contains form elements for entering credentials and communicates with the backend for user validation.

### 3. `Dashboard.js`

- **Description**: The main interface for logged-in users. Displays a list of flashcards and options to create, edit, or delete them.
- **Usage**: Central hub for managing flashcards. It retrieves flashcards from the backend and renders them in a user-friendly manner.

### 4. `FlashcardForm.js`

- **Description**: A form component for creating and editing flashcards.
- **Usage**: Includes fields for the question and answer, and buttons for saving the flashcard.

### 5. `FlashcardList.js`

- **Description**: Displays a list of flashcards in the dashboard.
- **Usage**: Renders each flashcard component and provides options to edit or delete.

### 6. `Flashcard.js`

- **Description**: Represents an individual flashcard with its question and answer.
- **Usage**: Used within `FlashcardList.js` to display flashcard content and actions.

### 7. `StudyMode.js`

- **Description**: Engages the user in an interactive study session, displaying flashcards one by one.
- **Usage**: Facilitates the learning process by flipping between questions and answers, allowing users to self-test.

## Styling

- The components are styled using a combination of CSS and inline styles.
- Responsive design principles are applied to ensure the application works well on both desktop and mobile devices.

## Setup Instructions

To run the frontend locally:

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Start the Development Server:**

   ```bash
   npm start
   ```

This will start the application on `http://localhost:3000/`.

## Contributing

Contributions to the frontend are welcome. Please ensure your code is well-documented and follows the project's coding standards.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Open a pull request with a clear description of your work.

## Contact

For any frontend-specific questions, feel free to open an issue or contact the maintainer.

---

Happy coding!
