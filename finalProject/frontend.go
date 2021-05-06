/***************************************************************************************
*                                                                                      *
* Front End program to manage an Azure Functions web service.                          *
* This program carries ask the user for the information to be sent to the web service: *
*		Platform name (twitter, youtube...)                                            *
*		String to search                                                               *
*		Timezone (cst, est,...)                                                        *
* This information is sent to the web service in a GET request                         *
* The web service returns a JSON string with the following information:                *
*		Platform name (twitter, youtube...)                                            *
*		Ideal hour to post a message (in cst)                                          *
*		An array with the following structure:                                         *
*			Hashtag                                                                    *
*			Number of occurrences                                                      *
* This information is displayed in the standard output device                          *
* The program can be iteratively (and interactively) executed until the user quit      *
*                                                                                      *
***************************************************************************************/
package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
)

// Structures of the JSON response from the web service
type HashtagSt struct {
	Hashtag		string		`json:"hashtag"`
	Occur		int			`json:"occur"`
}
type WSst struct {
	Platform	string		`json:"platform"`
	Time		int			`json:"time"`
	//hashtags	string
	Hashtags	[]HashtagSt	`json:"hashtags"`
}

func main() {
	// Connect to the server and download the information
	var localUrl = "http://localhost:7071/api/finalProjectMVRC"
	//var prodUrl = "https://gk-app-prog-lang-final.azurewebsites.net/api/getSocialMediaData?code=P2qWdJ5F0E921b6PFxyTRkcCoGiISWVuRPEpMNHLnki2i9HfaXkR5Q=="
	var url 	string
	var selPlatform int			// Selected platform index
	var hastag string
	var tz int					// Selected timezone index
	var dummy string

	platforms := [3]string{"quit", "twitter", "youtube"}
	timezones := [6]string{"est", "cst", "mst", "pst", "akst", "hst"}

	selPlatform = 1
	fmt.Printf("\n\nSelect the Information to Request\n")
	fmt.Printf("=================================\n")
	// Loop until the user quits the application
	for selPlatform != 0 {
		fmt.Printf("\n")
		fmt.Printf("Select the Platform\n")
		for i := 0; i < len(platforms); i++ {
			fmt.Printf("\t%d - %s\n", i, platforms[i])
		}
		selPlatform = validateAnswer("Enter selected platform", len(platforms)-1)
		if selPlatform != 0 {
			fmt.Printf("Enter the message to search: ")
			fmt.Scanf("%s", &hastag)
			fmt.Scanf("%s", &dummy)
			fmt.Printf("Select timezone\n")
			for i := 0; i < len(timezones); i++ {
				fmt.Printf("\t%d - %s\n", i, timezones[i])
			}
			tz = validateAnswer("Enter timezone", len(timezones)-1)

			fmt.Printf("Results %s %s %s\n\n",platforms[selPlatform] , hastag, timezones[tz])
			// Add parameters to the url
			url = localUrl + "?plat=" + platforms[selPlatform]
			//url = prodUrl + "&plat=" + platforms[selPlatform]
			url = url + "&hash=" + hastag + "&time=" + timezones[tz]
			//url = prodUrl
			clientConnect(url)
		}
	}
}

/**************************************************************************
* This function sends a get message to the url passed as a parameter and  *
* handle the answer from the server                                       *
* Parameters to send in the GET request:                                  *
*		Platform name (twitter, youtube...)                               *
*		String to search                                                  *
*		Timezone (cst, est,...)                                           *
* The answer from the server is a JSON string with:                       *
*		Platform name (twitter, youtube...)                               *
*		Ideal hour to post a message (in cst)                             *
*		An array with the following structure:                            *
*			Hashtag                                                       *
*			Number of occurrences                                         *
**************************************************************************/
func clientConnect(url string) {

	// Send the request to the web service
	client := &http.Client{}
	request, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatal(err)
	}
	// Launch the function to receive the answer
	response, err := client.Do(request)
	if err != nil {
		log.Fatal(err)
	}
	// Wait until the answer is completed
	defer response.Body.Close()
	
	// Extract the json array of bytes returned by the web service
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Answer: %s\n", body)

	fmt.Printf("\nInformation Returned from the Web Service\n")
	fmt.Printf("=========================================\n\n")
	// Handle the response from the server
	resSrv := WSst{}
	// Encode the string received from the web service in a JSON object
	err = json.Unmarshal(body, &resSrv)
	if err != nil {
		fmt.Printf("Message from Web Service: %s\n", body)
		log.Println(err)
	} else {
		// Display in a ordered way, the information returned by the web service
		fmt.Printf("\tPlatform %s\n", resSrv.Platform)
		fmt.Printf("\tTime %d\n", resSrv.Time)
		nHashes := len (resSrv.Hashtags)
		for i := 0 ; i < nHashes ; i++ {
			fmt.Printf("\t\tHashtag %s\n", resSrv.Hashtags[i].Hashtag)
			fmt.Printf("\t\tOccur %d\n", resSrv.Hashtags[i].Occur)
			fmt.Printf("\n")
		}
	}
//
}

/*************************************************************************
 *                                                                       *
 * This function validates the information entered by the user           *
 * The function gets the entered information as a string and them checks *
 * whether this string represents a digit between 0 and high, otherwise  *
 * prints an error message and ask for the correct answer again          *
 * The function receives:                                                *
 *		The string with the question to ask                              *
 *		The array with the options to select                             *
 * The function returns the index of the selected option                 *
 *                                                                       *
 ************************************************************************/
func validateAnswer(question string, high int) int {
	var answer int
	var str string
	var FoundErr = errors.New("found")
	var err error

	// Just initialize err to a value different that nil to iterate until err = nil
	err = FoundErr
	for err != nil {
		// Ask the question
		fmt.Printf("%s (0 to %d): ", question, high)
		fmt.Scanf("%s", &str)
		// Convert the string to integer (if possible)
		answer, err = strconv.Atoi(str)
		// Check whether the conversion succeed and the integer is in the range 0 - high
		if err != nil || answer < 0 || answer > high {
			fmt.Printf("\tPlease, enter a digit from 0 to %d\n", high)
			fmt.Scanf("%s", &str)
			// To cover the case that the conversion is right
			// but the number is out of the expected range
			err = FoundErr
		}
	}
	// Flush the input buffer
	fmt.Scanf("%s", &str)
	return answer
}
