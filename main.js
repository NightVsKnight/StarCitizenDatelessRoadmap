
function main() {
  //console.log('+main()');

  var result;

  // <div class="Release__Categories-sc-1y9ya50-6 biwapj">...</div>
  result = $('div.Release__Categories-sc-1y9ya50-6.biwapj');
  //console.log('result', result);
  //result.css('border', '3px solid red');

  // <h3 class="Release__Description-sc-1y9ya50-4 jSxVzn">Q3 2019</h3>
  result = $('h3.Release__Description-sc-1y9ya50-4.jSxVzn');
  //console.log('result', result);
  //result.css('border', '3px solid red');
  result.hide(); 
  result.html('X% (Y of Z)'); // TODO:(pv)
  
  //console.log('-main()');
}

var releaseCountPrevious = -1;

var interval = setInterval(() => {
  //console.log('document.readyState', document.readyState);
  if (document.readyState === 'complete') {
    var result = $('h3.Release__Description-sc-1y9ya50-4.jSxVzn');
    //console.log('result', result);
    var releaseCountCurrent = result.length;
    //console.log('releaseCountCurrent', releaseCountCurrent);
    if (releaseCountCurrent == releaseCountPrevious) {
      clearInterval(interval);
      main();
    } else {
      releaseCountPrevious = releaseCountCurrent;
    }
  }    
}, 100);

