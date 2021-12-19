import HomePage from "./HomePage";
import { Redirect } from "../Router/Router";
import {getUserSessionData} from "../../utils/session.js";
/*
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

`;*/
let leaderboardPage = `<div class="container-fluid justify-content-center h-100">

<div class="row justify-content-center p-4">

<p id="bestScores">Best Scores !!!</p>
</h1>
</div>
        <div id="score">
</div>
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
  loadleaderboard();

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


const loadleaderboard = async () => {
  const response = await fetch("/api/auths/users");
    console.log("response:", response);

    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const scores = await response.json(); // we wait for the scores
    scores.sort(function (a, b) {
      return b.highScore - a.highScore;
    });
    console.log(scores);
    onShowLeaderboard(scores);
}

const onShowLeaderboard  = async (scores) => {
  let scoreDiv = document.querySelector("#score");
  let scoreText = `<div class="container" id="leaderboard">
<ol class="list-group">`;
  for (let i = 0; i < scores.length; i++) {
      scoreText+= `<strong><li class="list-group-item"> <div class="row"><div class="col-sm text-sm-left text-center">${i+1}</div><div class="col-sm text-center">${scores[i].username}</div><div class="col-sm text-sm-right text-center">${scores[i].highScore}</div></div></li></strong>`;
  }
  scoreText += "</ol></div>";
  return (scoreDiv.innerHTML = scoreText);
}

export default Leaderboard;
