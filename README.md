# Star Citizen Feature-Driven Roadmap

Reimagines Star Citizen's "Date-Driven" Roadmap (https://robertsspaceindustries.com/roadmap/board/1-Star-Citizen) to be Feature-Driven by simply removing all version future dates and adding their progress.

## Extensions
* Chrome: https://chrome.google.com/webstore/detail/phbndbagpnnikklakhiajklnkaefjikb/
* Safari/Firefox/Opera/Edge: "Soon™"

Usage:
1) Install the extension
2) Browse to the Star Citizen Roadmap @ https://robertsspaceindustries.com/roadmap/board/1-Star-Citizen
3) Bask in the calm of no longer thinking about CIGs negligently optimistic dates

## Permissions
DON'T FREAK because this extension says it needs permissions to:
1) "**Read and change data at robertsspaceindustries.com**"  
   The browser prompt it stupid. This extension is limited to the "https://robertsspaceindustries.com/roadmap/board/*" url, not all of robertsspaceindustries.com, and it needs this permission in order to replace the dates with feature progress.
2) "**Read your browsing history**"  
   This is because browser extensions are pretty stupid when it comes to more modern web page "apps" that maintain a single DOM while using pushState to navigate page transitions. ex: https://stackoverflow.com/questions/20865581/chrome-extension-content-script-not-loaded-until-page-is-refreshed/ This permission is necessary in order to handle navigating between the Star Citizen and Squadron 42 roadmaps.

If you have any concerns, the source code for this extension is at https://github.com/NightVsKnight/StarCitizenFeatureDrivenRoadmap, where you can see for yourself the few things that it does with no malicious intent.

## FAQs
* Q: Why not support Squadron 42?
  A: There is no need to; the release paradigm for SQ42 is different from SC, and not as fundamentally flawed/inept.
* Q: Why not support non-Chrome browsers?
  A: I'll work on it "Soon™"
