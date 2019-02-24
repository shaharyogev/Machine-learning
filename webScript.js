
// Under date range choose from Feb 1st till now


dateRangeSelector = (period) =>{
	//select the ranges element
	const datePop = document.getElementsByClassName('filter-date');
	datePop[0].click();
	const ranges = document.getElementsByClassName("ranges");
	ranges[0].firstChild.querySelector('li[data-range-key="'+period+'"]').click();

return true;
}




//Change “Days running” to 30  

daysRunningSelector = (period) =>{
	//select the "days-to pull-right"
	const daysTo = document.getElementsByClassName("days-to pull-right");

	//insert the value
	daysTo[0].innerText = period;

	return daysTo;
}

daysRunningSelector(30);

//Under “Ad Type” choose “Popup”

popupSelector = () =>{

//went with a primitive approach, i wanted to find the id base on the popup string

	let popupDiv = document.getElementById("adType_2");
	let obj = popupDiv.parentElement.parentElement.getElementsByClassName("check-block__link-item")[0].firstElementChild;
	obj.click();
	
	//need to test for the window to fully load the filtered data
	//will add event listener or dom element test before the function ends.

	return obj.innerText();
}

//Open each one of the results you get on the right-hand side.
//When opened, under“ Offer & Tracking” there’ s a“ Show More” button that displays a“ Landing
//Page Details” dialog that looks like this:

//pseudo code - can't test if its working


getPageUrl = () =>{
	let items = document.getElementsByClassName("search-results-grid__item");
	let urlList = [];

	//collect the urls links to array
	for (let i in items) {
		let temp = items[i].firstElementChild.firstElementChild.href;
		urlList[i] = temp;
	};

	for (let i in urlList){
		
		//window.open(urlList[i]) //open the url in the same window if the website prevent iframe from loading
		//in the new tab run the same script

		let fr = document.createElement("iframe");
		fr.setAttribute("src", urlList[i]);
		fr.setAttribute("name", urlList[i]);
		fr.style.width = "640px";
		fr.style.height = "480px";
		document.body.appendChild(fr);

		//pseudo code - can't test if its working, I didn't open any links from the search results its all based on assumptions
		let showMore = document.getElementsByClassName('btn-danger');
		showMore[0].click();
		

		let redirectChainUrls = document.getElementsByClassName("redirectChainUrls");
		let redirectChainUrlsList = [];

		//collect the urls links to array
		for (let i in redirectChainUrls) {
			let temp = redirectChainUrls[i].href;
			redirectChainUrlsList[i] = temp;
		};

		let outgoingUrls = document.getElementsByClassName("outgoingUrls");
		let outgoingUrlsList = [];

		//collect the urls links to array
		for (let i in outgoingUrls) {
			let temp = outgoingUrls[i].href;
			outgoingUrlsList[i] = temp;
		};
	}
 return ({
	 'redirectChainUrlsList' : redirectChainUrlsList,
	  'outgoingUrlsList' : outgoingUrlsList
	});
}

//async functions call to keep everything in the right order.

startScript = async ()=> {
try{
	const date = await dateRangeSelector('This Month');
	const days = await daysRunningSelector(30);
	const popup = await popupSelector();
	let urlListJson  = await getPageUrl();

	return urlListJson;
	
}catch(err){
		console.trace(err);
}
}

//start the script if the page is fully loaded for auto script injection Scraper. 

window.onload = () => {
	startScript();
}


// start the script with the Scraper Skeleton extension.
/*
(function () {
	startScript();
})();
*/