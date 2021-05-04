//import logo from './logo.svg';
import './App.css';

function App() {
	function requestInfo() {
		var localUrl = "http://localhost:7071/api/FinalProject1"
		//var prodUrl = "https://gk-app-prog-lang-final.azurewebsites.net/api/getSocialMediaData?code=P2qWdJ5F0E921b6PFxyTRkcCoGiISWVuRPEpMNHLnki2i9HfaXkR5Q=="

		var platform = document.getElementById ("platform").value;
		var hashtag = document.getElementById ("hashtag").value;
		var tz = document.getElementById ("timezone").value;
		var url = localUrl + "?plat=" + platform + "&hash=" + hashtag + "&time=" + tz
		//var url = prodUrl + "?plat=" + platform + "&hash=" + hashtag + "&time=" + tz
		//var url = prodUrl
		fetch(url)
			.then(res => {
				console.log ("First step");
				return res.json();
			})
			.then(res => {
				console.log ("Second step");
				var plat = res.platform;
				var time = res.time;
				var str = "Platform: " + plat + "\nTime: " + time + "\nHashtags:\n"
				var nHashtags = res.hashtags.length;
				for (var i=0 ; i < nHashtags ; i++) {
					str = str + "\tHashtag: " + res.hashtags[i].hashtag + "\n";
					str = str + "\tOccurrences: " + res.hashtags[i].occur + "\n";
					str = str + "\n"
				}
				document.getElementById ("answer").value = str;
			})
			.catch(error => {
				var errStr = "Error found: " + error;
				document.getElementById ("answer").value = errStr;
			});
	}

	return (
		<div className="base">
			<h3>
				Glorious Kenobis Final Project
			</h3>
			<label className="label1">
				Input Parameters
			</label>
			<br></br>
			<br></br>
			<label htmlFor="platform" className="label">
				Select Platform
			</label>
			<select id="platform" name="platform" className="selectP">
				<option id="ptf1" value="twitter">Twitter</option>
				<option id="ptf2" value="youtube">Youtube</option>
				<option id="ptf3" value="facebook">Facebook</option>
			</select>
			<br></br>
			<label htmlFor="hashtag" className="label">
				Enter hashtag
			</label>
			<input id="hashtag" type="text" size="3" className="input">
			</input>
			<br></br>
			<label htmlFor="timezone" className="label">
				Select Timezone
			</label>
			<select id="timezone" name="timezone" className="selectT">
				<option id="tz1" value="est">est</option>
				<option id="tz2" value="cst">cst</option>
				<option id="tz3" value="mst">mst</option>
				<option id="tz4" value="pst">pst</option>
				<option id="tz5" value="akst">akst</option>
				<option id="tz6" value="hst">hst</option>
			</select>
			<br></br>
			<button 
				className="submit"
				onClick={() => requestInfo()}
			>
				Submit
			</button>
			<br></br>
			<br></br>
			<label className="label1">
				Output Parameters
			</label>
			<br></br>
			<textarea 
				id="answer" 
				name="answer"  
				className="textarea"
			>
			</textarea>
		</div>
	);
}

export default App;
