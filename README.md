# Unimelb-Subject-Tree

### [Official website](https://unimelbtree.github.io/) can be found here.

**Front-end react source (src/unimelb-subject-tree) is not always kept up to date. The up-to-date source is held [here](https://github.com/unimelbtree/unimelbtree.github.io) due to hosting on github pages**

A website that visualizes all possible future subjects for a given University of Melbourne undergraduate subject. This project aims to help first/second year students by listing
possible future subjects for a foundational course, thereby allowing easier course planning and degree planning. All data is sourced from the official Unimelb handbook. 

Built using ReactJS, ExpressJS/NodeJS and MongoDB. Data are scraped using Python and BeautifulSoup.

## Running locally

Requirements:
- NodeJS14
- NPM

All required packages can be found in package.json respectively. 

To run the server locally, simply run `npm start`. Edit the variable baseURL in React app and change it to localhost:yourport. 
