INFORMATIONAL
=============
Author: Brennan Price, Kurt Dankovich, Maria Rodriguez Del Corral
Last Updated: 3/14/2021  
Project: Quiz Master Server 
Course: Applied Programming Languages (CPSC360-1) with Professor Eric Pogue  

Contact
-------
Please direct any and all comments/concerns/inquiries to 
brennanjprice@lewisu.edu
kurt
maria

ORIGINALITY
===========
Credit to [Open Source Initiative](opensource.org/licenses/MIT) for the standard contents of an 
	MIT License.

All other code is the original work of the authors and may be used in accordance with the 
	specifications laid out in the LICENSE file.

BUILD / EXECUTE / DEPENDENCY
============================ 
_Note: The GitHub repository https://github.com/BrennanP01/360-gloriousKenobis contains all_  
_required files plus README.md and LICENSE files. This repository is private and you will *NOT*_  
_be able to access it if you are not an invited collaborator._

Build instructions
------------------
To compile an executable:
1. Open the command-line or terminal
2. Navigate to the folder you wish to install the application into
3. Run `git clone https://github.com/BrennanP01/360-gloriousKenobis`

Execution instructions
----------------------
1. Build the program _(using above instructions)_
2. Start the node.js server using visual studio code
3. Access the server through the browser

Info Request
------------
1. Start the server
2. Add to the url '?goal=info'

Quiz Request
------------
1. Start the server
2. Add to the url `?goal=quiz`
3. Using ampersands (`&`), add the id (`id=`) of each quizbank and the amount (`amount=`) of questions you want from that questionbank
