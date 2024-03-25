(() => {

  function customMainMenu() {
    if (ModAPI.mcinstance.$currentScreen != null) {
      if (
        ModAPI.currentScreen().startsWith("net.minecraft.client.gui.GuiMainMenu")
      ) {
        
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
        forkOnGitHub.$displayString.$characters.data = enc.encode("Github");

        currentScreen.$openGLWarning1.$characters.data = enc.encode("");
        currentScreen.$splashText.$characters.data = enc.encode("")
      }
    }
  }
  
  function drawHudThings(){
    
  }

  function setIntervalThings(){
    customMainMenu();
  }

  ModAPI.addEventListener("drawhud",drawHudThings);
  var interv = setInterval(setIntervalThings,16);
})();
