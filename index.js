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

  let hours = [];

  const add24 = (arr) => {
    for(i=0; i<24; i++) {
      arr.push(0);
    }
  }

  add24(hours);

  punchcards.forEach(function (card) {
    hours[card[1]] += card[2];
  });

  spinner.stop();
  spinner.reset();

  for(i=0; i<24; i++) {
    console.log('\n' + `Total commits during the ${i} hour: ${hours[i]}`);
  }

  let commits = hours.reduce((a, b) => a + b, 0);
  
  console.log("\n" + 'Total commits all time: ' + commits);
}

spinner.set(8);
spinner.start('Loading Github data ');
fetchRepos(page);

//test for wakaTime
