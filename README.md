# Vidly-Frontend

## Summary:

Vidly frontend is a react app created using create-react-app, an npm package that generates all necessary files and dependencies to start a basic react project.

## Workflow:

- Figma (design)
- create-react-app (npm package for creating base files)
- React 16/18
  - React 18 used for most components
  - React 16 used mainly for inheritance use (explained later)

## To-Do and Next Steps (see "projects" tab in repo)

- [ ] Fix the known issues

## Known Issues

- [x] "Save" upon editing throws error
  - ~~Likely due to Axios trying to load page before request is completed?~~
  - The wrong function was being called upon form submission, and default behavior (full page reload) was not being prevented. Axios trying to make a request while pages is reloading threw an error.
- [ ] New Product Upload - base64 is not decoding correctly, so image is not displayed
  - Seed images work just fine

## Dependencies

- @react-oauth/google
- @testing-library/jest-dom
- axios **(requests to server)**
- bootstrap
- bootstrap-icons
- bson-objectid **(creating ObjectID before requests are sent to server)**
- dotenv
- font-awesome
- joi **(form validation)**
- joi-browser **(form validation)**
- lodash **(utility functions)**
- react
- react-dom
- reat-file-base64 **(converting uploaded images to buffer)**
- react-router-dom
- react-scripts
- react-toastify **(display toast notifications)**

## Organization:

- node_modules
  - y'all know that this is
- public
  - favicon stored here
  - index.html
    - meta tags
    - google fonts
    - anything else that would normally belong inside `<head>` in an HTML file
- src
  - components
    - common
      - simple icon elements like `<Heart/>`, `<ViewIcon/>`, and `<RentIcon/>`
      - form.jsx, which holds functions to validate a form and render form elements **(to be inherited by something like `<LoginForm/>` element)**
    - all other components you see on the app, for example:
      - `<NavBar/>`
      - `<Movies/>`
      - `<Genres/>`
      - `<Customers/>`
      - `<Products/>`
  - img
    - film-reel.svg **(for logo)**
    - profile-user.svg **(bootstrap icons wasn't big enough for my taste)**
  - services
    - `movieService.js`, `genreService.js`, `productService.js`, and `customerService.js` have functions to grab data for their respective pages
    - httpService gives aliases to axios functions in case you want to change libraries
  - utils
    - filtering functions for each dataset
    - generic pagination function
  - App.js **(main component)**
    - context for app
    - routing
  - App.css **(styles for whole project)**
    -index.js **(root component)**
  - .gitignore
    - node_modules because **LARGE**
  - dockerfile
  - readme.md
