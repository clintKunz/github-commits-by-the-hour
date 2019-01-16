var argv = require('yargs').argv,
    Github = require('github'),
    github = new Github({
      version: '3.0.0',
      protocol: 'https'
    }),
    page = 1,
    Spinner = require('its-thinking'),
    spinner = new Spinner(),
    token = argv._[1],
    username = argv._[0],
    punchcards,
    repos

function fetchRepos (page) {
  github.authenticate({
    type: 'oauth',
    token: token
  });
  github.repos.getFromUser({
    user: username,
    per_page: 20,
    page: page,
    sort: 'pushed',
  }, function (err, res) {
    if (!err) {
      handleRepos(res);
    }
  });
}

function handleRepos (res) {
  repos = repos || [];

  if (res.length) {
    repos = repos.concat(res);
    fetchRepos(++page);
  } else {
    findPunchCards();
  }
}

function fetchPunchCards (repo) {
  github.authenticate({
    type: 'oauth',
    token: token
  });
  github.repos.getStatsPunchCard({
    user: username,
    repo: repo.name
  }, function (err, res) {
    if (!err) {
      handlePunchCards(res);
    }
  });
}

function handlePunchCards (res) {
  punchcards = punchcards || [];
  punchcards = punchcards.concat(res);

  findPunchCards();
}

function findPunchCards () {
  if (repos.length) {
    fetchPunchCards(repos.pop());
  } else {
    calculateHours();
  }
}

//^above code comes from https://github.com/ahmednuaman/my-punch-card

function calculateHours () {
  let midnight = 0;
  let oneAm = 0;
  let twoAm = 0;
  let threeAm = 0; 
  let fourAm = 0;
  let fiveAm = 0;
  let sixAm = 0; 
  let sevenAm = 0; 
  let eightAm = 0; 
  let nineAm = 0; 
  let tenAm = 0;
  let elevenAm = 0;
  let noon = 0;
  let onePm = 0;
  let twoPm = 0; 
  let threePm = 0;
  let fourPm = 0;
  let fivePm = 0;
  let sixPm = 0;
  let sevenPm = 0;
  let eightPm = 0;
  let ninePm = 0;
  let tenPm = 0;
  let elevenPm = 0; 
  let commits = 0;

  punchcards.forEach(function (card) {
    if(card[1] === 0 && card[2] > 0) midnight = midnight + card[2];
    if(card[1] === 1 && card[2] > 0) oneAm = oneAm + card[2];
    if(card[1] === 2 && card[2] > 0) twoAm = twoAm + card[2];
    if(card[1] === 3 && card[2] > 0) threeAm = threeAm + card[2];
    if(card[1] === 4 && card[2] > 0) fourAm = fourAm + card[2];
    if(card[1] === 5 && card[2] > 0) fiveAm = fiveAm  + card[2];
    if(card[1] === 6 && card[2] > 0) sixAm = sixAm  + card[2];
    if(card[1] === 7 && card[2] > 0) sevenAm = sevenAm + card[2];
    if(card[1] === 8 && card[2] > 0) eightAm = eightAm + card[2];
    if(card[1] === 9 && card[2] > 0) nineAm = nineAm + card[2];
    if(card[1] === 10 && card[2] > 0) tenAm = tenAm + card[2];
    if(card[1] === 11 && card[2] > 0) elevenAm = elevenAm + card[2];
    if(card[1] === 12 && card[2] > 0) noon = noon + card[2];
    if(card[1] === 13 && card[2] > 0) onePm = onePm + card[2];
    if(card[1] === 14 && card[2] > 0) twoPm = twoPm + card[2];
    if(card[1] === 15 && card[2] > 0) threePm = threePm + card[2];
    if(card[1] === 16 && card[2] > 0) fourPm = fourPm + card[2];
    if(card[1] === 17 && card[2] > 0) fivePm = fivePm + card[2];
    if(card[1] === 18 && card[2] > 0) sixPm = sixPm + card[2];
    if(card[1] === 19 && card[2] > 0) sevenPm = sevenPm + card[2];
    if(card[1] === 20 && card[2] > 0) eightPm = eightPm + card[2];
    if(card[1] === 21 && card[2] > 0) ninePm = ninePm + card[2];
    if(card[1] === 22 && card[2] > 0) tenPm = tenPm + card[2];
    if(card[1] === 23 && card[2] > 0) elevenPm = elevenPm + card[2];
    commits = commits + card[2];
  });

  spinner.stop();
  spinner.reset();
  console.log("\n" + 'Total commits during the Midnight hour: ' + midnight);
  console.log("\n" + 'Total commits during the 1 hour: ' + oneAm);
  console.log("\n" + 'Total commits during the 2 hour: ' + twoAm);
  console.log("\n" + 'Total commits during the 3 hour: ' + threeAm);
  console.log("\n" + 'Total commits during the 4 hour: ' + fourAm);
  console.log("\n" + 'Total commits during the 5 hour: ' + fiveAm);
  console.log("\n" + 'Total commits during the 6 hour: ' + sixAm);
  console.log("\n" + 'Total commits during the 7 hour: ' + sevenAm);
  console.log("\n" + 'Total commits during the 8 hour: ' + eightAm);
  console.log("\n" + 'Total commits during the 9 hour: ' + nineAm);
  console.log("\n" + 'Total commits during the 10 hour: ' + tenAm);
  console.log("\n" + 'Total commits during the 11 hour: ' + elevenAm);
  console.log("\n" + 'Total commits during the 12 hour: ' + noon);
  console.log("\n" + 'Total commits during the 13 hour: ' + onePm);
  console.log("\n" + 'Total commits during the 14 hour: ' + twoPm);
  console.log("\n" + 'Total commits during the 15 hour: ' + threePm);
  console.log("\n" + 'Total commits during the 16 hour: ' + fourPm);
  console.log("\n" + 'Total commits during the 17 hour: ' + fivePm);
  console.log("\n" + 'Total commits during the 18 hour: ' + sixPm);
  console.log("\n" + 'Total commits during the 19 hour: ' + sevenPm);
  console.log("\n" + 'Total commits during the 20 hour: ' + eightPm);
  console.log("\n" + 'Total commits during the 21 hour: ' + ninePm);
  console.log("\n" + 'Total commits during the 22 hour: ' + tenPm);
  console.log("\n" + 'Total commits during the 23 hour: ' + elevenPm);
  console.log("\n" + 'Total commits all time: ' + commits);
}

spinner.set(8);
spinner.start('Loading Github data ');
fetchRepos(page);

//test for wakaTime
