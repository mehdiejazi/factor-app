# FactorApp

A modern invoicing application frontend built with Angular.

## Description

FactorApp is an Angular-based web application for managing invoices and billing operations. It provides a user-friendly interface for creating, managing, and tracking invoices with discount capabilities and total calculations.

## Technologies Used

- **Framework**: Angular 17+
- **Language**: TypeScript
- **Styling**: CSS/SCSS
- **Package Manager**: npm
- **Build Tool**: Angular CLI
- **State Management**: RxJS

## Key Features

- Invoice creation and management
- Discount and deduction handling
- Total calculation and summary
- Responsive design
- Component-based architecture
- Real-time updates with RxJS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

Run `npm start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Building

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
npm test
```

Executes unit tests via Karma.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── invoice/
│   │   ├── discount/
│   │   └── summary/
│   ├── services/
│   ├── models/
│   └── app.module.ts
├── assets/
└── environments/
```

## License

This project is part of the FactorApp ecosystem.
