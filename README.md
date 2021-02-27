INFORMATIONAL
=============
Author: Brennan Price, Kurt Dankovich, Maria Rodriguez Del Corral
Last Updated: 2/28/2021  
Project: Coding Standards Validator - Part 2  
Course: Applied Programming Languages (CPSC360-1) with Professor Eric Pogue  

Contact
-------
Please direct any and all comments/concerns/inquiries to 
brennanjprice@lewisu.edu
kurt
maria

ORIGINALITY
===========
Credit to Chapter 8 of _Introducing Go_ by Caleb Doxsey for the code structure to open files 
	and directories using the io/ioutil package.

Credit to [Open Source Initiative](opensource.org/licenses/MIT) for the standard contents of an 
	MIT License.

Credit to Rich Goluszka for the base code of the validator that he shared with the rest of the class, 
including the checking packages and main validator.

All other code is the original work of the authors and may be used in accordance with the 
	specifications laid out in the LICENSE file.

BUILD / EXECUTE / DEPENDENCY
============================
Required files
--------------
coding-standards-validator-part-1
	-val.go
	-directorychk directory  
		-dirCheck.go
	-licensechk directory  
		-licenseCheck.go  
	-linefmtchk directory  
		-lineFmtCheck.go  
	-utf8chk directory  
		-utf8Check.go  

_Note: The GitHub repository https://github.com/BrennanP01/360-gloriousKenobis contains all_  
_required files plus README.md and LICENSE files. This repository is private and you will *NOT*_  
_be able to access it if you are not an invited collaborator._

Build instructions
------------------
To compile an executable:
1. Open the command-line or terminal
2. Navigate to the folder you wish to install the application into
3. Run `git clone https://github.com/BrennanP01/360-gloriousKenobis`
3. Run `go install` within each subdirectory (directorychk / licensechk / linefmtchk / utf8chk)
4. Run `go build` within the val subdirectory (.../coding-standards-validator-part-1/val)
You should now have a `val.exe` executable to call in order to run the program

Execution instructions
----------------------
1. Build the program _(using above instructions)_
2. Run val.exe and specify path to project when prompted
3. Optionally use `val.exe detail` to view detailed validation information
4. Optionally use `val.exe help` to view help instructions

Test-00
-------
1. Navigate to .../360-gloriousKenobis
2. Run /val/val.go
3. Enter `.` as the file path
4. All tests should pass

Successfully run and tested - Brennan

Test-01
-------
1. Navigate to .../360-gloriousKenobis
2. Run /val/val.go
3. Enter `./test-01` as the file path
4. All tests should pass

Successfully run and tested - Brennan

Test-00
-------
1. Navigate to .../360-gloriousKenobis
2. Run /val/val.go
3. Enter `./test-02` as the file path
4. All tests should fail, several times

Test-00
-------
1. Navigate to .../360-gloriousKenobis
2. Run /val/val.go
3. Enter `./test-03` as the file path
4. One test should fail

Test-00
-------
1. Navigate to .../360-gloriousKenobis
2. Run /val/val.go
3. Enter `./test-04` as the file path
4. One test should succeed

Automated Testing: directorychk
-------------------------------
1. Navigate to .../directorychk/
2. Run `go test`
3. Run `go test -v` for more info

Automated Testing: licensechk
-----------------------------
1. Navigate to .../licensechk/
2. Run `go test`
3. Run `go test -v` for more info

Automated Testing: linefmtchk
-----------------------------

Automated Testing: utf8chk
--------------------------