const OPTIONS = ["Oleana", "Cuttys", "Sarma", "NeptuneOyster"];

// What to vote for is a command line argument
const voteFor = process.argv[2];
if (OPTIONS.indexOf(voteFor) < 0) {
    console.log('Invalid vote option');
    return;
}

// Setup a JIFF client and connect to the server.
function connect() {
  const { JIFFClient } = require('jiff-mpc');
  const jiffClient = new JIFFClient('http://localhost:10000', 'homework', {
    autoConnect: true,
    party_count: 3,
    onConnect: start,
    crypto_provider: true,
    // Shamir secret sharing operates modulo a prime number
    // If you solve the bonus question, consider making this a smaller prime number,
    // e.g. 13,
    // and see what impact this has on performance ;)
    Zp: 16777729
  });
}

// The MPC computation
// Your solution goes here.
async function start(jiffClient) {
  // Iterate over every option
  for (let i = 0; i < OPTIONS.length; i++) {
      // Secret share 1 if this matches the user's vote, 0 otherwise.
      // ...

      // Bonus question solution goes here: do sanity check to make sure none
      // of the users are cheating with their votes.
      // ...

      // Sum all the vote shares for this option
      // Look at https://github.com/multiparty/jiff-standalone-example/blob/a4aa88d562024b224dfef290a019b3c1dff33e10/party.js#L39
      // ...
  
      // Reveal the total vote tally for this option and print it.
      // Look at https://github.com/multiparty/jiff-standalone-example/blob/a4aa88d562024b224dfef290a019b3c1dff33e10/party.js#L45
      const output = '?';
      console.log(OPTIONS[i], output);
  }
  
  // disconnect safely.
  jiffClient.disconnect(true, true);
}

// Connect and start computation
connect();
