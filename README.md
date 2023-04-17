# StartupFinal

Elevator Pitch: Introducing a new way to stay connected with friends and family through video sharing! Our website allows you to easily upload and view videos of your loved ones, no matter where they are in the world. Everyone can add their experiences to keep memories alive. Never miss a moment with our user-friendly platform.

Detailed description: This website will allow a user to do many things. First - they can create an event. Inside of this event they can upload pictures or videos. They can add a journal entry to this event on whatever they want to say about this event. They can share this event with others if they'd like. You can select which users can upload videos, pictures or journal entries of their own to this event. They then can select who can view this event. Another feature is that they can view their friends and families events - if they have been given permission.

VMOCK start of what it will look like - too much info to complete for a free version https://ninjamock.com/s/FHKQVKx

Different Pages functions:

Home Page: This is where it all starts. A little welcome saying on the front. At the bottom of the page it will have the users most recent events. On the side, the user can select "New Event" or "Your Wall" or "Family Wall" or "Friend Wall". At the top the user can select their profile which will go to an account page where they can change info about themselves. The friends tab will take them to a different page

Family/Friend/Your wall page: These pages will display the different events posted by other friends, family, or yourself that have included you in their view category.

Create Event Page: This page will allow the user to create a new event. They will create a Title, add the date, add what users were a part of the event. They also will select which people can view the event - either friends, family and/or all. Once the event is created it will take them to that event page.

Event Page: On the event page - it will display the title at the top as well as the users who were a part of it. It will have options to add photos, videos, or Journal entries. It will also display all of the photos, videos, and journal entries that have been added already.

Friend Page: Here the user can add users to their friend group or family group.

Simon - learning: Now I know how to make subdomains for my project. Honestly not entirely sure that's what I did, but it seems that way. Really easy to do. Also, very easy to create different pages and have links to them inside each page. The deployWebsites.sh file is amazing. It really does all the work. Github desktop is also very user friendly. Making pull requests or pushing commits is very intuitive. It took me a second to get my simon deployed becasue I wasn't naming my files correctly. So that was interesting. I need to take a closer look at the deployWebsites.sh file to know why that was not working. Once I changed the file names it worked great.

Simon - CSS What I really learned here was that it is difficult to make the website appear the way you envision it. It's important to deploy often to see what it actually looks like, instead of doing it all blind. I spent too much time changing things when they didn't even look good.

Simon - JS Some things I learned from this is to just be careful to use the correct id names. The play wasn't working for awhile because I was not refrencing the correct thing. Javascript makes it really easy to use local storage data to keep record of whats happened.

Simon-Service: The endpoints provided for the Simon web service exemplify the use of HTTP methods and conforming to RESTful API design. Additionally, the example code for calling third-party endpoints using fetch illustrates asynchronous programming and DOM manipulation. Understanding these concepts is crucial for building efficient and effective web applications that provide a good user experience. I've gained insights into best practices for web development, and ultimately can now create more robust and user-friendly applications.

Simon-DB: Mongo DB uses a flexible document data model that maps naturally to JavaScript objects, making it easy to work with data in both languages. Additionally, MongoDB has a built-in driver for JavaScript, allowing developers to interact with the database directly from their JavaScript code without the need for a separate ORM or middleware.

Simon-Login: It is cool to see how a web application implements user authentication and authorization using secure cookies and service endpoints. When a user logs in, logs out, or creates credentials, the service endpoints are called. The application uses a secure cookie to store the authorization token, and when a secure request is made, the cookie is checked. The service endpoints interact with the database to store and retrieve user credentials and update the authorization cookie. The secureApiRouter middleware function verifies the authorization cookie's validity before passing the request to endpoints that require authorization, making it easy to create secure endpoints. This concept highlights the importance of security configurations such as secure, httpOnly, and sameSite in setting the authorization cookie to protect it from attacks.

Simon-WebSocket: One cool thing about WebSockets is that they enable real-time communication between a client (usually a web browser) and a server, without the need for constant requests and responses. This allows for the development of interactive web applications that can provide instant updates to users, such as chat applications, real-time gaming, and collaborative editing tools.

WebSockets also have a relatively low overhead compared to other real-time communication protocols, making them a great choice for applications that require high-performance and low-latency communication.

Simon-React: I really find the react components so useful and handy. They make the application so much more simple and just function way better I think. Components are reusable building blocks for UI elements. Components can be composed and nested to create complex user interfaces. JSX: React allows developers to write HTML-like syntax called JSX, which makes it easier to work with components and define the structure of the UI. Reactive updates: React uses a one-way data flow, where changes to the data are automatically reflected in the UI. This makes it easier to keep the UI in sync with the data.

URL: http://3.12.97.31/ ssh -i ~/Downloads/production.pem ubuntu@3.12.97.31
