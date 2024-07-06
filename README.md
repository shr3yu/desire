# DESIRE- MERN stack application
Desire is a dynamic and responsive web application built using the MERN stack (MongoDB, Express.js, React, Node.js) and styled with Tailwind CSS. The primary purpose of this application is to allow users to manage and keep track of items they desire. The application is deployed on Render and can be accessed at https://desire.onrender.com.

## Navigation
Navigating through the application's pages is quite simple. There's the login, signup, and dashboard page. 

### Login
The login page allows users to access their accounts by entering their credentials. If a user does not have an account, they can easily navigate to the signup page.

![image](https://github.com/shr3yu/desire/assets/172000527/01d0a344-4845-491f-9613-ccade0132e11)

### Signup
New users can create an account by providing their full name, email, and password on the signup page. Once registered, users can log in using their new credentials.

![image](https://github.com/shr3yu/desire/assets/172000527/e5acaf7c-ab2e-4137-9149-611151a453f9)

### Dashboard
Upon successful login, users are redirected to their personalized dashboard. The dashboard serves as the central hub for managing their desired items. Key features of the dashboard include:
- **Item/List management** : Items/Lists can be added, deleted, or edited, based on user preferences.
- **Pin important items** : Items of higher prority can be pinned, this will make the items appear at the beginning of the list.
- **Profile management** : Users can edit their profile information, or choose to delete their account.
- **Responsive design** : The application is fully responsive; the user experience is seamless across various devices. 

![image](https://github.com/shr3yu/desire/assets/172000527/fdb3b2cf-d292-47e2-ad8f-410d992fe056)

## Technical overview
* **Frontend** : Developed using React, styled using tailwind CSS for a modern reponsive user interface.
* **Backend** : Built with Node.js and Express.js, providing a robust and scalable server environment.
* **Database**: Utilizes MongoDB for efficient data storage and retrieval. Data is structured into models: List, Item, and User.
* **Deployment**: Application is deployed on Render, ensuring high availibity and reliability.
* **Password security**: Passwords are hashed using bycrypt before being sent to be stored in the database.
* **User authentification**: Implemented using JSON web token (JWT).

## Development process
With the access to various Artifical intelligence such as Chat GPT, I believe in the importance of showing the project development process to show originality and creativity.

### Inital Wireframes and Mockups
The inital steps of the project included skteching up a visison for the different pages of the application. This included how the login, signup, and dashboard would look like, and writing out the functionality of various components on these pages.
See this at: 

### Progession of ideas 
As the development of the application progressed, several layout and functionality changes were made to enhance the user experience and improve performance. 
See this at:
