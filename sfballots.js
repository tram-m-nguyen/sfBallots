"use strict";

const BALLOT_API_URL = "https://data.sfgov.org/resource/xzie-ixjw.json";

// ballots[i] list area to manipulate
const $ballotList = $("#ballotList");
const $searchForm = $("#searchForm");

/**Given year input, search ballots that mattch that query.
 * 
 * Returns (promise) array of ballots[i] objects: [ballots[i], ballots[i], ballots[i]]
 * 
 * Each ballots[i] is an object, contains exactly:  
 * {
    "month": "JU
    "year": "1990",
    "letter": "A",
    "subject": "Public Safety Improvement Bonds $332,400,000",
    "yes_votes": "105865",
    "no_votes": "29447",
    "pass_or_fail": "P",
    "percent": "0.78237702494974581",
    "type_measure": "B",
    "by": "S",
    "keyword1": "FEMA",
    "keyword2": "Safety",
    "keyword3": "Earthquake",
    "keyword4": "Buildings",
    "keyword5": "Hazards"
  }
 *
 * Image will be the type_measure
 *
 */

 async function getBallotbyYear(year){
   console.log("this is year", year)
   //make axios request with url and type of request
   const response = await axios({
     method: "GET",
     url: `${BALLOT_API_URL}?year=${year}`,
   })

   console.log("this is response", response.data)
   // will get an array of objects
   return response.data
 }


 /**Given list of ballots, create markups for each to the DOM */
 function poplulateBallots(ballots){
   console.log("this is ballots", ballots)

   //if there's a list, empty for new searches
    $ballotList.empty();

    for (let i = 0; i < ballots.length; i++){
      const $ballots = $(
        `<div data-ballots[i]-id="${ballots[i].subject}" class="Show col-md-6 col-lg-5 mb-4 ml-2">
         <div class="media">
           <h4 src="" alt="" class="w-2 mr-4">${ballots[i].type_measure}</h4>
           <div class="media-body">
             <h5 class="text-primary">${ballots[i].subject}</h5>
             <div> Month ${(ballots[i].month).toLowerCase()}, Year: ${ballots[i].year}</div>
             <div> Yes: ${ballots[i].yes_votes}, No: ${ballots[i].no_votes}</div>
             <div> Percent: ${Math.floor(ballots[i].percent)}</div>
             <div> Status: ${ballots[i].pass_or_fail}</div>
             <div> Type of Measure: ${ballots[i].type_measure}</div>
           </div>
         </div>  
       </div>
      `)
      //add ballots[i] to list of ballots
      $ballotList.append($ballots)
    }
 }

/**Handle search form submisstion: get ballots from the API then display on DOM
  * with populateBallots()
  */
async function searchForBallotAndDisplay() {
  const year = $("#searchForm-year").val();
  const ballots = await getBallotbyYear(year);

  poplulateBallots(ballots);
}

//on submit, search for shows
$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForBallotAndDisplay();
})