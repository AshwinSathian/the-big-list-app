# The Big List App

## Project Overview

Big List App is an Angular application designed to handle and display a large dataset of tickets efficiently. It utilizes virtual scrolling and web workers to ensure a smooth user experience even with large volumes of data.

## Features

- **Virtual Scrolling**: Dynamically loads and renders a subset of data based on the user's scroll position in the list.
- **Web Workers**: Offloads data processing (like filtering and grouping) to background threads to keep the UI responsive.
- **Grouping**: Allows users to group tickets based on various criteria such as status, labels, priority, and assignee.

## Technologies

- Angular 17
- Angular CDK
- Web Workers
- RxJS
- PrimeNG
- Tailwind CSS

## Live Demo

A deployed version of the app may be viewed [here](https://the-big-list-app.vercel.app/)

## Setup and Installation

To set up the Big List App, follow these steps:

1. Clone the repository
2. Navigate to the project directory: `cd big-list-app`
3. Install dependencies `npm install`
4. Run the application: `ng serve`

The app will be available at `http://localhost:4200`.

## Usage

After launching the app, you can:

- Scroll through the list to dynamically load more tickets.
- Use the filter options to display tickets based on specific criteria.
- Group tickets by selecting a group-by option.
