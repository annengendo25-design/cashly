# Cashly – Personal Finance Tracker

Cashly is a responsive personal finance tracking web application built to help users manage their money more confidently. It allows users to record income and expenses, organize transactions into categories, monitor their financial position through an interactive dashboard, and personalize their experience.

## Problem Statement

Keeping track of daily income and expenses can be difficult without a consistent system. People may struggle to understand where their money goes, recognize unnecessary spending, and maintain a clear view of their available balance.

## Proposed Solution

Cashly provides a simple, user-friendly platform for recording and managing financial transactions. Its dashboard summarizes income, expenses, and balance, while transaction tools and custom categories help users organize and review their financial activity.

## Features

- **User registration and login:** Create an account and access its saved information.
- **Personalized dashboard:** View total income, total expenses, available balance, recent transactions, and financial charts.
- **Transaction management:** Add, edit, and delete income and expense transactions.
- **Transaction search and filters:** Search by description and filter by type, category, date, or custom date range. Transactions can also be sorted by date or amount.
- **Custom categories:** Create, edit, and delete personal income and expense categories.
- **Currency preferences:** Choose a display currency, with exchange rates retrieved from an external service and cached in the browser.
- **Spending reminder preference:** Enable or disable the reminder setting for an account.
- **Dark mode:** Switch between light and dark appearance.
- **Responsive layout:** Adapt the interface for desktop, tablet, and mobile screens.
- **Data protection within the app flow:** Log out and restrict access to the main pages when no user is logged in.
- **Date validation:** Reject malformed, impossible, excessively old, and future transaction dates.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser LocalStorage
- Chart.js
- ExchangeRate-API (`open.er-api.com`) for currency conversion rates
- Font Awesome for icons

## Getting Started

Cashly is a front-end project and does not require a package installation.
1. Open the project folder in your code editor.
2. Run `index.html` using a local development server, such as the Live Server extension in Visual Studio Code.
3. Select **Get Started** to open the login and registration page.
4. Create an account, sign in, and start recording transactions.

## Links

- **Live Demo:** [Try Cashly](https://annengendo25-design.github.io/cashly/)
- **GitHub Repository:** [View Source Code](https://github.com/annengendo25-design/cashly)

A local server is recommended so the pages and scripts run consistently. An internet connection is needed to retrieve fresh exchange rates and load the externally hosted Chart.js and Font Awesome resources. Previously cached exchange rates may still be available in LocalStorage.

## Project Structure

```text
Cashly/
├── index.html
├── login.html
├── dashboard.html
├── transactions.html
├── categories.html
├── settings.html
├── style.css
├── dashboard.css
├── transaction.css
├── settings.css
├── categories.css
├── login.css
├── common.js
├── login.js
├── dashboard.js
├── transactions.js
├── categories.js
├── settings.js
├── images/
└── README.md
```

## Data Storage and Limitations

Cashly currently stores account information, transactions, categories, and preferences in the browser's LocalStorage. This makes it suitable as a front-end learning project, but data is tied to the browser and device where it was created. Clearing browser storage can remove saved data, and the information does not automatically synchronize between devices.

The current login flow is a front-end demonstration, not production-grade authentication. Passwords are stored in browser LocalStorage, so this approach should not be used for real accounts or sensitive financial information. A production version would need a secure backend, password hashing, server-side authentication, and a proper database.

Currency conversion depends on an external exchange-rate service. Rates are based on KES and cached locally for up to 24 hours; the displayed conversion may fall back to KES when a requested rate is unavailable.

## Future Improvements

- Add secure server-side authentication and database storage.
- Synchronize account data across devices.
- Implement actual scheduled spending notifications.
- Add data export and backup options.
- Expand reporting and budgeting tools.

## Project Purpose

Cashly was developed as a practical web development project to apply HTML, CSS, and JavaScript concepts while building an interactive application for everyday financial tracking.
