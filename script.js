console.log("script.js loaded");

let isScrolling = false;  //if animated and scrolling

//todo: try requestAnimationFrame() or css keyframe animation instead of setInterval()

/**
 * Scrolls from current scroll position to targetId.
 * Does not work while already doing animated scrolling.
 * @param {String} targetId Assumed valid id. No need to put "#". Ex: portfolio
 */
function animateScrollTo(targetId) {
  if (isScrolling) {
    console.log("already scrolling..");
    return;
  }

  isScrolling = true;

  console.log(`scrolling to ${targetId}`);

  let currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;

  let targetScrollPos = $("#" + targetId).offset().top;

  let distance = Math.abs(targetScrollPos - currentScrollPos);
  let numSlices = 100;
  let distSlice = distance / numSlices;

  //we need to go up. instead of down.
  if (targetScrollPos < currentScrollPos)
    distSlice = -distSlice;

  //scroll to target, in numSlices
  let scrollInterval = setInterval(function () {
    currentScrollPos += distSlice;
    $("html").scrollTop(currentScrollPos);

    //no more slices left
    if (numSlices == 0) {
      $("html").scrollTop(targetScrollPos);
      clearInterval(scrollInterval);
      isScrolling = false;
    }

    numSlices--;
  }, 5);

};
