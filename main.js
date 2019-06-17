
// TODO:(pv) Add menu to 1) Browse to roadmap, 2) Option to [not] highlight changes
// TODO:(pv) Support SQ42 roadmap (this is a bit different of a paradigm)
// TODO:(pv) Support Firefox/etc...
// TODO:(pv) Use storage to save # of tasks, and then report increase or decrease since beginning of version

function main() {
  //console.log('+main()');

  // <section data-released="0" class="Release__Wrapper-sc-1y9ya50-0 kzsHGd">...</section>
  var unreleaseds = $('section.Release__Wrapper-sc-1y9ya50-0.kzsHGd');
  //console.log('unreleaseds', unreleaseds);
  //unreleaseds.css('border', '3px solid red');
  unreleaseds.each((index, unreleased) => {
    //console.log('unreleased', unreleased);
    unreleased = $(unreleased);
    var cardCounts = unreleased.find($('h3.Category__CardCount-sc-3z36kz-4.cgDnlq')); // "1 entry"
    //console.log('cardCounts', cardCounts);
    var totalCount = 0;
    var totalCountCompleted = 0;
    cardCounts.each((index, cardCount) => {
      cardCount = $(cardCount);
      var cardCountText = cardCount.text();
      //console.log('cardCountText1', cardCountText);
      var taskCount = cardCount.find($('span.Category__TaskCount-sc-3z36kz-5.grmSrF')); // "<span class="Category__CountSeparator-sc-3z36kz-6 gaLoHd"></span>9 completed, 4 in development"
      //console.log('taskCount', taskCount);
      var taskCountText = taskCount.text();
      //console.log(`taskCountText="${taskCountText}"`);
      cardCountText = cardCountText.replace(taskCountText, '');
      //console.log('cardCountText2', cardCountText);
      var cardCountTotal = parseInt(cardCountText.split(' ')[0]);
      //console.log('cardCountTotal', cardCountTotal);

      var taskCountParts = taskCountText.split(', ');
      //console.log('taskCountParts', taskCountParts);
      var taskCountCompleted = 0;
      if (taskCountParts.length > 0) {
        taskCountParts.forEach(taskCountPart => {
          //console.log(`taskCountPart="${taskCountPart}"`);
          if (taskCountPart === '') {
            return;
          }
          var index = taskCountPart.indexOf(' ');
          var partValue = parseInt(taskCountPart.substring(0, index));
          //console.log(`partValue="${partValue}"`);
          var partName = taskCountPart.substring(index).toLowerCase().trim();
          //console.log(`partName="${partName}"`);
          if (partName === 'completed') {
            taskCountCompleted = partValue;
          }
        });
      }
      //console.log('taskCountCompleted', taskCountCompleted);

      totalCount += cardCountTotal;
      totalCountCompleted += taskCountCompleted;
    });
    //console.log('totalCount', totalCount);
    //console.log('totalCountCompleted', totalCountCompleted);
    var header = unreleased.find($('header.Release__Header-sc-1y9ya50-1.uNMJL'));
    //console.log('header', header);
    header.css('height', 'auto');
    var subtitle = unreleased.find($('h3.Release__Description-sc-1y9ya50-4.jSxVzn'));
    //console.log('subtitle', subtitle);
    var subtitlePercentCompleted = `${totalCountCompleted} completed of ${totalCount} (${parseFloat(100 * totalCountCompleted / totalCount).toFixed(2)}%)`;
    subtitle.html(`${subtitlePercentCompleted}<br>Estimate: End of ${subtitle.html()}`);
    subtitle.css('border', '3px solid yellow');
  });
  
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
      setTimeout(main, 200);
    } else {
      releaseCountPrevious = releaseCountCurrent;
    }
  }    
}, 100);

