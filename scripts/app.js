(function () {

  var fileDirectory = __dirname + '/scripts/script.js';

  var txtArea = document.getElementById('txt');

  txtArea.addEventListener('keyup', (evt) => {
    fs.writeFileSync(fileDirectory, txtArea.value, { encoding: 'UTF8', flag: 'w' });
  })

  document.getElementById('btn').addEventListener('click', () => {
    var child = exec('node ' + fileDirectory, function (error, stdout, stderr) {

      stdout = stdout.split(/\n|\r\n/).filter(v => v);

      stdout.forEach(v => {
        document.getElementById('result').innerHTML += v;
      });

    //  console.log(stderr.split(/\n|\r\n/))
    });
  })
})()