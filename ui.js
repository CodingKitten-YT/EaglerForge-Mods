(() => {

  invAnimDone = false;
  invAnimSpeed = 300;


  function hsl2rgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  }

  function popupYGui(yElement, yStart, yEnd, duration, popupScale) {
    yElement.$guiTop = yStart;
    const originalHeight = yElement.height; // Assuming the element has a 'height' property

    const startTime = Date.now();

    const popupStartTime = startTime;
    const popupEndTime = startTime + duration / 2;
    const scaleStartTime = startTime + duration / 2;
    const scaleEndTime = startTime + duration;

    function updatePopup() {
      const currentTime = Date.now();
      if (currentTime < popupEndTime) {
        // Popup phase: increase height gradually
        const progress = (currentTime - popupStartTime) / (popupEndTime - popupStartTime);
        const popupHeight = originalHeight + (popupScale - 1) * originalHeight * progress;
        yElement.height = popupHeight;
      } else if (currentTime < scaleEndTime) {
        // Scale back phase: decrease height gradually to original
        const progress = (currentTime - scaleStartTime) / (scaleEndTime - scaleStartTime);
        const popupHeight = originalHeight + (popupScale - 1) * originalHeight * (1 - progress);
        yElement.height = popupHeight;
      } else {
        clearInterval(popupInterval);
        yElement.height = originalHeight; // Ensure element is back to original size
      }
    }

    const popupInterval = setInterval(updatePopup, 16);
  }
  
  function invSlideIn() {
    if (ModAPI.mcinstance.$currentScreen != null) {
      if (ModAPI.mcinstance.$currentScreen.$guiTop != null) {
        if (!invAnimDone) {
          popupYGui(ModAPI.mcinstance.$currentScreen, 0, ModAPI.mcinstance.$currentScreen.$guiTop, invAnimSpeed, 1.2); // Adjust popupScale as needed
          invAnimDone = true;
        }
      } else {
        invAnimDone = false;
      }
    } else {
      invAnimDone = false;
    }
  }

  function customMainMenu() {
    if (ModAPI.mcinstance.$currentScreen != null) {
      if (ModAPI.currentScreen().startsWith("net.minecraft.client.gui.GuiMainMenu")) {
        var singlePlayer =
          ModAPI.mcinstance.$currentScreen.$buttonList.$array1.data[0];
        var multiPlayer =
          ModAPI.mcinstance.$currentScreen.$buttonList.$array1.data[1];
        var mods = ModAPI.mcinstance.$currentScreen.$buttonList.$array1.data[2];
        var forkOnGitHub =
          ModAPI.mcinstance.$currentScreen.$buttonList.$array1.data[3];
        var options =
          ModAPI.mcinstance.$currentScreen.$buttonList.$array1.data[4];
        var editProfile =
          ModAPI.mcinstance.$currentScreen.$buttonList.$array1.data[5];
        var launguage =
          ModAPI.mcinstance.$currentScreen.$buttonList.$array1.data[6];
        var currentScreen = ModAPI.mcinstance.$currentScreen;

        var buttonDistance = 42;
        var buttonDistanceRel = 22;
        var buttonSpacing = 2;
        var buttonWidth = 100;
        var enc = new TextEncoder();
        //options
        options.$width13 = buttonWidth;
        options.$yPosition = currentScreen.$height7 - buttonDistance;
        //mods
        mods.$width13 = buttonWidth / 2;
        mods.$xPosition0 = options.$xPosition0 - buttonWidth / 2 - buttonSpacing;
        mods.$yPosition = currentScreen.$height7 - buttonDistance;
        //SinglePlayer
        singlePlayer.$width13 = buttonWidth;
        singlePlayer.$yPosition = options.$yPosition - buttonDistanceRel;
        //MultiPlayer
        multiPlayer.$width13 = buttonWidth + launguage.$width13 + buttonSpacing;
        multiPlayer.$xPosition0 =
          singlePlayer.$xPosition0 + buttonWidth + buttonSpacing;
        multiPlayer.$yPosition = options.$yPosition - buttonDistanceRel;
        //Edit profile
        editProfile.$width13 = buttonWidth;
        editProfile.$yPosition = currentScreen.$height7 - buttonDistance;
        //Lang
        launguage.$xPosition0 =
          editProfile.$xPosition0 + editProfile.$width13 + buttonSpacing;
        launguage.$yPosition = currentScreen.$height7 - buttonDistance;
        //Fork
        forkOnGitHub.$width13 = buttonWidth / 2;
        forkOnGitHub.$yPosition = mods.$yPosition - buttonDistanceRel;
        forkOnGitHub.$xPosition0 = mods.$xPosition0;
        forkOnGitHub.$displayString.$characters.data = enc.encode("Fork");

        currentScreen.$openGLWarning1.$characters.data = enc.encode("");
        //currentScreen.$splashText.$characters.data = enc.encode("Justin is the sped version of Daniel")
      }
    }
  }
  
  function drawHudThings() {
    // Add your HUD drawing code here if needed
  }

  function setIntervalThings() {
    invSlideIn();
    customMainMenu();
  }

  ModAPI.addEventListener("drawhud", drawHudThings);
  var interv = setInterval(setIntervalThings, 16);
})();
