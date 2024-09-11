# Tractian-Challenge
This project is a challenge by Tractian.
Given specifications, data and a Figma a user should create a application to navigate between data from 3 Units and exhibit a component to view a tree structure. 
The tree may be filtered by 3 different properties (2 booleans related to the type of components, and a text filter). No libraries should be used to build the UI or tree. 

[<img src="https://i.ibb.co/Dw0smzp/thumbnail.png" width="50%">]([https://www.youtube.com/watch?v=Hc79sDi3f0U](https://www.youtube.com/watch?v=lwpAdCiSTPE) "Tractan Challenge:front-end (HygorLBM)")


Extras of my solution (+):
<> Only 25 nodes at max are showed at the tree viewer, so I created pagination in the root nodes of the tree, with 25 root nodes for page. (APEX Unit contains more than 10.000 nodes)
<> If a user navigate to a child component going over the node limit to the page, a readjustment is done, hiding root nodes from the extreme more distant from where the user is navigating.
<> If hiding root nodes is not viable (you expanded nodes on both extremes or something similar) the user advances to the next level that he is clicking to see, as a file explorer.
<> Offline data is used if the API provided fails to return the data, as a fallback. 
<> A Loader was created since the APEX tree creation takes a while in page Apex.
<> The application is responsive to portrait resolutions, being tested with Dev Tools on S10, IPhone 12, etc.
<> In order for the app be responsive in portrait the two main components (tree viewer and details viewer) are exchangeable through a nice card flip css animation, maximizing usability.
<> My LinkedIn is open in a new tab if the user clicks my name in the landscape visualization mode.

Shortcoming (-)
<> The APEX Unit tree takes a while to load (over 20 seconds usually)
<> There are no tests. I'm used to create tests using Jest or Jasmine, but I decided not to bother in this project, what is always a bad decision.
<> This project uses the Redux store a lot more than it should. Good component hierarchy and better use of props could diminish this problem.
<> Since the portrait changes were introduced later some of the changes were added as rendering conditionals.
<> I ended up creating this with create-react-app, that is currently deprecated. I'd use Vite if starting over.
