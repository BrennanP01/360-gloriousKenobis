
Mosaic 2.00
---------------

Mosaic Copyright (C) 2021
Maria Rodriguez
Lewis University
mariavictoriavrod@lewisu.edu

Mosaic is free software distributed under the GNU LGPL. 
Read LICENSE for more information about license.

The web page containts three sections:
	A header
	A body where the mosaic is built
	A footer with:
		- A button to redo the mosaic every time is clicked
		- A button to start/stop a timer. The timer is preloaded at 60 seconds
			When the button is clicked first, the timer is counting down every second
			When it is clicked again, the timer stops
		- A counter. It is preloaded at 60 seconds and decremented every second
			when the timer is active. If the timer is below 10 seconds, the background
			is red.
			When the timer reach zero, the timer stops, is recharged again at 60 seconds,
			generates a sound and the mosaic is randomized again.

The application has been developed in React js and based on Azure Static Web App resource 
linked with a Github repository. It is an example of continuous integration and continuous
deployment (CI/CD) so, every time the Github repository is updated, automatically the
process of deployment in Azure Static Web App is launched and the new deployment is also
automatically accessible using the application's public url.
Compared with version 1.00, mosaic 2.0 has been refactored to avoid an excesive number
or renders. The footer has been developed in a different function, so when the timer
is active, only the foorter is re-rendered avery second, while the mosaic remains unchanged

Usage:
	In order to access the application, launch your preferred web browser and access to the
	initial page. 
	In test environment: http://localhost:3000
	In production: https://mango-tree-009989910.azurestaticapps.net/
	A 12x12 mosaic of squares and circles (random) with random background color and a 
	random character between A and Z with a random color will appear.
	There is a Randomize! button in the footer. Everytime this button is clicked, the
	12x12 mosaic is updated with new shapes, colors and characters.
	Clicking in a shape will replace the character by an image. The rest of the mosaic
	remains unaltered. Clicking again in the shape with the image, will recover the
	original character and its color.
	The mosaic keeps its look and feel when the browser's window is resized
	(mosaic is not recalculated and it keeps proportions in squares, circles and characters)

Among some files generated automatically by the template building the project 
(json files, files in public folder...), the distribution package contains:

	README.md					- This file
	LICENSE						- License terms
	src/index.js				- Index React file
	src/index.css
	src/App.js					- Business logic
	src/App.css					- Application format
	src/Functions.js			- Auxiliary javascript functions
	src/facedraw.png			- Image used in the application
	src/whistle.mp3				- File with the sound to issue when the timer reach 0.
		
Installation
	The application is hosted in Azure Web Static App. 
	This application has a dependency with the react-sound component
	In the developer environment, can be installed using the following command:
		npm install react-sound --save
	This command will update the package.json file with the right dependencies.
	To access it, enter the following URL in a browser:
	https://mango-tree-009989910.azurestaticapps.net/
			
---
Acknowledge:
Contrast algorithm found in:
https://www.w3.org/TR/2008/REC-WCAG20-20081211/


End of document
