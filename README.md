This project is a React application that let users navigate through three type of nodes (locations, assets and components) in a tree strucuture.
All data and the design was provided by Tractian as part of a front-end challenge. The challenge consists in the creation of the component that shows the tree,
filtering the tree nodes according to filters (two boolean properties and a text filter) and showing mocked details data from selected components. 
The video below shows usage and comments about the implementation, with portuguese (PT-BR) narration:

[![Tractian challenge: front-end (HygorLBM)](https://img.youtube.com/vi/lwpAdCiSTPE/0.jpg)](https://www.youtube.com/watch?v=lwpAdCiSTPE)

(+) Extras of my implementation:
- Paginated tree root nodes if there are more than 25 of them. For APEX Unit this resulted on 11 pages.
- A function is provided that readjusts the tree, hiding root nodes from the extreme (top or bottom) less close to where the user is currently navigating.
- If possible, when the user collapses child nodes previously expanded the hidden nodes are returned.
- When you can't readjust the tree without hiding a expanded node, the root changes to the level you're currently expanding, as a file explorer.
- The application make changes to the design if the aspect ratio of the browser changes from landscape to portrait, what makes it responsive in mobile and other vertical screens.
- The application uses the full data provided by Tractian as a fallback if the fake-api is down or return empty value.
- The two main components (tree and details viewers) are showed as different sides of a card with a cool flip animation between them in portrait mode.
- In landscape mode is possible to click in a section with my name and a new tab of the browser will redirect to my Linked In. 

(-) Shortcomings 
- Loading the page 1 of the APEX tree takes too long (over 20 seconds frequently, a loading indicator is provided).
- There are no tests. Decided to not use Jest or Jasmine since the project was small, it was a bad decision.
- Usage of React+Redux is way overtuned, should've used props and better componentization to reduce actions and made code cleaner and with better performance.
- Since the Portrait mode was added at a later point, some minor changes were introduced as conditions in the rendering of some components, what is a bad pratice.
- Usage of create-react-app, that is deprecated. Should've used Vite.

Main references:
[How to show a tree strucuture using just CSS](https://www.youtube.com/watch?v=rvKCsHS590o)
https://vanslaars.io/articles/create-a-card-flip-animation-with-css#hide-the-back-side-of-cards
