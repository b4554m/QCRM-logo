    // The below code executes after DOM content loaded. Animate logo boxes upon load by assigning a new class for each box
document.onreadystatechange = function () {
    if (document.readyState !== "complete")
        return;
    let animationCount = "logo-animation";
    let ele = document.getElementsByClassName("box");
    for (let i = 0; i < ele.length; ++i) {
        ele[i].className = ele[i].className + " " + animationCount + i;
        // console.log(animationCount + i)
    }

    let el1 = document.getElementsByClassName("outer-box");
    console.log(el1)

    setTimeout(() => {
        el1[0].className = el1[0].className + " " + "remove-outer-box-animation";
    }, 10);


    document.body.className = document.body.className + " body-animation";

    let intervalSec = 10; // How many seconds between each background change?
    let times = 6;  // How many times should the background change?
    let bkgChangeCount = 0; // How many times did the background change?
    let lastBkgIdx = -1;    // What was the last background index? This is used to avoid reapeating the same background in two subsequent cycles.
    let timeoutId = null;
    // Array of background pool to randomly choose from
    const backgrounds = [
        "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/414102/pexels-photo-414102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1596387451750-f7bfb51461ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
    ];

    // The background change procedure
    const changeBackground = () => {
        if (timeoutId)
            clearTimeout(timeoutId);

        console.log("Cycle: ", bkgChangeCount);

        let bkgEle = document.body;

        /*
            Process:
            - At first cycle (on initial page load), attempt to load recently used background index from localStorage.
            - If there exists an index, that means this is not the first time the page has been opened, and that this was the index of the last background presented
            to the user before either the user closed the page or the cycles specified in _times_ variable has been completed, so we load the background.
            - If this is not the first cycle, meaning any subsequent cycle after initial page load, or if this is the first cycle but there is no recent eackground saved in localStorage,
            and we load random background from the _background_ array.
        */
        let savedBkgIdx = localStorage.getItem("lastBkgIdx");
        if (savedBkgIdx >= 0 && bkgChangeCount === 0) {
            bkgIdx = savedBkgIdx;
        } else {
            bkgIdx = lastBkgIdx;
            // Avoid repeating backgrounds in two subsequent cycles by keeping on generating a random number until they differ
            while (bkgIdx === lastBkgIdx)
                // Generate random number for a random background index
                bkgIdx = Math.floor(Math.random() * (backgrounds.length));
        }

        lastBkgIdx = bkgIdx;

        // Save the last background index in localStorage so that we can keep track of the last image that was presented to the user
        localStorage.setItem("lastBkgIdx", lastBkgIdx);

        let bkg = backgrounds[bkgIdx];
        bkgEle.style.background = `url("${bkg}")`;

        // Increment change count so that we keep track of how many times the backgroud has changed and we can terminate based on the value specified in _times_
        bkgChangeCount += 1;

        // Terminate backkground change after _times_ cycles
        if (bkgChangeCount < times) {
            timeoutId = setTimeout(changeBackground, intervalSec * 1000);
        }
    };

    changeBackground();
};
