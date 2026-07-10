# Stock Portfolio Dashboard
# Restful API for Online Stock Trading Application using SpringBoot and Reactjs for frontEnd 

- This project is a stock portfolio management application built using React with TypeScript for the frontend and Spring Boot for the backend. It allows users to manage their stock portfolio and view the top stocks.
### Deploy Link
##### There seems to be an issue with the deployment of the project. If needed, I can demonstrate the deployed project for you to review and check during the interview process. Please let me know if this would be helpful.

### Demo - Video (YouTube)
[Watch the video on YouTube](https://youtu.be/fXSm0wjJLdg)

## Tech Stack and Technology Used

- Java
- Spring Framework
- Spring Boot
- React
- Spring Data JPA
- Hibernate
- MySQL (DataBase)
- JSON Web Tokens (JWT)
- Maven
- TailwindCSS
- Bootstrap

## Features

- Portfolio Management: Users can view and manage their stock portfolio.
- Top Stocks: Displays the top stocks based on market performance.
- User Can add new Stock 
- User can add and delete according to gain and loss of stock

## Limitatios
1. **API Rate Limits:**
    - The Tiingo API enforces strict rate limits. If more than 10 requests  a 429 Too Many Requests error is triggered.
    - To avoid this, the application makes Tiingo API calls every 6 hours. Consequently, the stock data updates in real-time on the frontend but only reflect the latest data every 6 hours.
2. **Top 50 Stocks Data:**
    - The Tiingo API does not provide data for the “Top 50 Stocks” directly. Therefore, these stocks have been manually added to the application for display.

## Future Improvements
1. **Paid API Integration:**
   - Upgrading to a paid tier of the  API or an alternative stock market API will allow for higher rate limits and more frequent updates, enhancing the real-time tracking experience.

2. **AI-Powered Features:**
   - Incorporate AI to answer stock-related questions using **sentiment analysis** to evaluate market trends.  
     - [Reference: Sentiment Analysis Google Colab File](https://colab.research.google.com/drive/1Vlsarlmzuad2ghsyMM7ztyCpU7tN4l96?usp=sharing)
   - Implement **algorithmic trading** concepts to provide intelligent stock suggestions, helping users make informed decisions based on market analysis and trends.

## Getting Started

To get started with this project, you will need to have the following installed on your local machine:

- JDK 17+
- Maven 3+


This will get a copy of the project installed locally. To configure all of its dependencies and start each app, follow the instructions below.
# backed setup on local machine

# 1.**Configure Database**
1.***Set Username and Password***
- By default, the username and password for MySQL are root.
- If you’ve changed them, update the backend configuration file accordingly.
2.***Update application.properties***
Navigate to src/main/resources/application.properties and configure the database details:
```
server.port=8080

spring.datasource.url=jdbc:mysql://localhost:3306/stock_portfolio
spring.datasource.username=Your_Username
spring.datasource.password=Your_Password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Tiingo API Configuration
tiingo.api.key=Your_API_Key
tiingo.api.url=https://api.tiingo.com/tiingo/daily/%s/prices?token=%s

# Configure ObjectMapper for Jackson
spring.jackson.property-naming-strategy=SNAKE_CASE
spring.jackson.deserialization.fail-on-unknown-properties=false
```
Replace:
- Your_Username with your MySQL username.
- Your_Password with your MySQL password.
- Your_API_Key with the API key for Tiingo if required.
# 2.**Steps for Create database**
step:1 ***Create the database:***
CREATE DATABASE stock_portfolio;

step:2 ***Switch to the database:***
USE stock_portfolio;

step:3 ***checking existing data***
Use a SQL client (e.g., MySQL Workbench) or the MySQL command line to verify the schema and data.
3.  **setup in intelliJ IDE**
Follow these steps to set up the backend in IntelliJ IDEA:
#### option1: Use the Terminal
	1.	Open the terminal in IntelliJ IDEA.
    2.	Run the Spring Boot application using Maven Wrapper:
```
    ./mvnw spring-boot:run
```

#### Option 2: Use the Maven Lifecycle in IntelliJ IDEA
    1.	Open the Maven tab in IntelliJ IDEA.
	2.	Navigate to the Lifecycle section.
	3.	Perform the following steps:
        - Clean: Click on clean to remove old build files.
        - nstall: Click on install to build the project and install dependencies.
    4. Run the application:
        - Expand the Plugins section in the Maven tab and find spring-boot.
        - Click on spring-boot:run to start the backend.
4.   Verify the Setup
	1.	Ensure the backend is running on http://localhost:8080.

# Frontend Setup on Local Machine

Step 1: Install Dependencies
```
    #Navigate to the frontend directory in your terminal:
    
    cd <frontend-folder>
    
    #Run the following command to install all dependencies listed in the package.json file:
    
    npm install
```
Step 2: Run the Development Server
```
    #Start the development server using the following command:
    npm run dev
```
    This will:
    - Start the React development server. 
    - Serve the frontend application at http://localhost:5173 (default for Vite)

## Prerequisites
Before running the project, ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Git](https://git-scm.com/)

## Use Docker to Set Up the Project

### **Setup Instructions**
1. **Clone the repository**  
   ```sh
   git clone <your-github-repo-url>
   cd <your-project-folder>
   ```

2. **Build Docker images**  
   ```sh
   docker compose build
   ```

3. **Start the containers**  
   ```sh
   docker compose up 
   ```

4. **Verify running containers**  
   ```sh
   docker ps
   ```

5. **Access the application**  
   - **Frontend:** Open `http://localhost:5173`
   - **Backend:** Check `http://localhost:8080`
   - **Database:** Running at `localhost:3307`


## Now, your project is up and running on your local machine. Enjoy managing your stock portfolio! 🚀

