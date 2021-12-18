import HomePage from "./HomePage";
import { Redirect } from "../Router/Router";

let leaderboardPage = `
<p id="bestScores">Best Scores !!!</p>
<div class="container">
<table class="table">
<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Pseudo</th>
    <th scope="col">Score</th>
    
  </tr>
</thead>
<tbody>
  
  <div id="score">
    
  </div>
  
</tbody>
</table>
</div>

`;


/**
 * Render the NewPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
function Leaderboard() {
  // Deal with your NewPage content here
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = leaderboardPage;

  /*
  // create a login form
  const submit = document.createElement("input");
  submit.value = "Go back to HomePage";
  // Example on how to use Bootstrap to style a Button
  submit.className = "btn btn-secondary mt-3";
  // Example on how to add an event handler : when the button is clicked, redirect
  // to the HomePage
  submit.addEventListener("click", () => {
    Redirect("/");
  });
  pageDiv.appendChild(submit);*/
  
}

const score = () => {
  
}

export default Leaderboard;
