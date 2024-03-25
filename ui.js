(() => {

  invAnimDone = false;
  invAnimSpeed = 300;

  function popupYGui(yElement, yStart, yEnd, duration, popupScale) {
    const originalHeight = yElement.height; // Assuming the element has a 'height' property

    const startTime = Date.now();
    
    const popupEndTime = startTime + duration / 2;
    const scaleEndTime = startTime + duration;

    function updatePopup() {
      const currentTime = Date.now();
      if (currentTime < popupEndTime) {
        // Popup phase: increase height gradually
        const progress = (currentTime - startTime) / (popupEndTime - startTime);
        const popupHeight = yStart + (yEnd - yStart) * progress;
        yElement.height = popupHeight;
      } else if (currentTime < scaleEndTime) {
        // Scale back phase: decrease height gradually to original
        const progress = (currentTime - popupEndTime) / (scaleEndTime - popupEndTime);
        const popupHeight = yEnd + (yStart - yEnd) * progress;
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
        // Your custom main menu code here
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
