{

// TODO:(pv) Add menu to 1) Browse to roadmap, 2) Option to [not] highlight changes
// TODO:(pv) Support SQ42 roadmap (this is a bit different of a paradigm)
// TODO:(pv) Support Firefox/etc...
// TODO:(pv) Use storage to save # of tasks, and then report increase or decrease since beginning of version

class RoadmapProcessor {
  constructor() {
    this.unreleasedVersionsCountPrevious = 0;
  }
  formatFloat(number, decimals) {
    return parseFloat(number).toFixed(decimals);
  }
  _getUnreleasedVersions() {
    return $('section.Release__Wrapper-sc-1y9ya50-0.kzsHGd');
  }
  _getCardCounts(unreleasedVersion) {
    return unreleasedVersion.find($('h3.Category__CardCount-sc-3z36kz-4.cgDnlq'));
  }
  _getTaskCount(cardCount) {
    return cardCount.find($('span.Category__TaskCount-sc-3z36kz-5.grmSrF'));
  }
  _getHeader(unreleasedVersion) {
    return unreleasedVersion.find($('header.Release__Header-sc-1y9ya50-1.uNMJL'));
  }
  _getSubtitle(unreleasedVersion) {
    return unreleasedVersion.find($('h3.Release__Description-sc-1y9ya50-4.jSxVzn'));
  }
  process() {
    //console.log('process()');

    var unreleasedVersions = this._getUnreleasedVersions();
    //console.log('unreleasedVersions', unreleasedVersions);
    //unreleasedVersions.css('border', '3px solid red');

    var isRoadmapStillRendering = true;
    //console.log('document.readyState', document.readyState);
    if (document.readyState === 'complete') {
      //console.log('unreleasedVersions', unreleasedVersions);
      var unreleasedVersionsCountCurrent = unreleasedVersions.length;
      //console.log('unreleasedVersionsCountCurrent', unreleasedVersionsCountCurrent);
      if (unreleasedVersionsCountCurrent > 0 && unreleasedVersionsCountCurrent == this.unreleasedVersionsCountPrevious) {
        isRoadmapStillRendering = false;
      } else {
        this.unreleasedVersionsCountPrevious = unreleasedVersionsCountCurrent;
      }
    }
    if (isRoadmapStillRendering) {
      //console.log('retrying...');
      setTimeout(this.process.bind(this), 100);
      return;
    }

    //console.log('processing...');

    unreleasedVersions.each((index, unreleasedVersion) => {
      //console.log('unreleasedVersion', unreleasedVersion);
      unreleasedVersion = $(unreleasedVersion);
      var cardCounts = this._getCardCounts(unreleasedVersion)
      //console.log('cardCounts', cardCounts);
      var totalCount = 0;
      var totalCountCompleted = 0;
      cardCounts.each((index, cardCount) => {
        cardCount = $(cardCount);
        var cardCountText = cardCount.text();
        //console.log('cardCountText1', cardCountText);
        var taskCount = this._getTaskCount(cardCount);
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

      var header = this._getHeader(unreleasedVersion);
      //console.log('header', header);
      header.css('height', 'auto');
      var subtitle = this._getSubtitle(unreleasedVersion);
      //console.log('subtitle', subtitle);
      var subtitlePercentCompleted = `${totalCountCompleted} completed of ${totalCount} (${this.formatFloat(100 * totalCountCompleted / totalCount, 2)}%)`;
      var subtitleHtml = subtitlePercentCompleted;

      if (false) {
        var subtitleReleaseDate = subtitle.html();
        //subtitleReleaseDate = 'Q2 2019'; // <- for test purposes only
        //subtitleReleaseDate = '2019/07/01'; // <- for test purposes only
        if (/Q\d \d{4}/.test(subtitleReleaseDate)) {
          subtitleReleaseDate = `End of ${subtitleReleaseDate}`
        }
        subtitleHtml += `<br>Estimate: ${subtitleReleaseDate}`;
      }

      subtitle.html(subtitleHtml);
      subtitle.css('border', '3px solid yellow');
    });
  }
}

new RoadmapProcessor().process();

}