window.onload = function(){
    var sections = document.getElementsByTagName("section");
    var sectionIndex = 0;
    const windowScreenLeft = window.screenLeft;
    var navBarBtns = document.getElementById("navbar").getElementsByTagName("a");
    var navLeftBtns = document.getElementsByClassName("btn-left");
    var navRightBtns = document.getElementsByClassName("btn-right");

    var backgroundBtns = document.getElementById("background-swapper").getElementsByTagName("a");
    var background = document.getElementById("bg-image");
    var slider = document.getElementById("slider");

    var accordionBtns = document.getElementsByClassName("accordion-btn");
    var accordionInfos = document.getElementsByClassName("accordion-info");
    var accordionIndex = 4;

    var galleryProjects = document.getElementById("gallery").getElementsByClassName("project");
    var galleryDesc = document.getElementById("gallery").getElementsByClassName("desc");

    for(let i = 0; i < galleryProjects.length;i++){
        // i matches the projects to the descriptions as they are in the correct order in my html
        // Adds event listening for when the user hovers over a project in the gallery
        galleryProjects[i].addEventListener("mouseover", (event) => {
            fadeIn(galleryDesc[i]);
        });
        // Adds event listening for when user stops hovering over a project
        galleryProjects[i].addEventListener("mouseout",(event) => {
            galleryDesc[i].style.display = "none";
        });
    }

    for(let i = 0; i < accordionBtns.length;i++){
        accordionBtns[i].onclick = function(){
            // If user clicks the same accordion button twice it will revert back to the state in which no buttons are clicked
            if(accordionIndex == i){
                for(let j = 0; j < accordionBtns.length; j++){
                    accordionBtns[j].style.width = "25%";
                    accordionIndex = 4;
                    fadeOut(accordionInfos[j]);
                    accordionBtns[j].style.backgroundColor = "rgb(218, 215, 205)"
                    fadeIn(accordionInfos[4]);
                }
            } else {

                for(let j =0; j < accordionBtns.length; j++){
                    if(i!=j){
                        // Fades out the last accordion info 
                        accordionBtns[j].style.width = "20%";
                        accordionBtns[j].style.backgroundColor = "rgb(218, 215, 205)";
                        fadeOut(accordionInfos[j]);
                    } else{
                        // Fades in the new accordion info 
                        this.style.width ="40%";
                        this.style.backgroundColor = "#FFFFFF";
                        accordionIndex = i;
                        fadeIn(accordionInfos[i]);
                        fadeOut(accordionInfos[4]);
                    }
                }
            }
        }
    }
    function fadeIn(element){
        let fadeInTimer = null;
        clearInterval(fadeInTimer);
        fadeInTimer = setInterval(frame, 5);
        element.style.display = "flex";
        element.style.opacity = 0;
        // Recursively Adds 0.01 opacity onto element until it reaches 1
        function frame(){
            if(element.style.opacity < 1){
                element.style.opacity = parseFloat(element.style.opacity) + 0.01;
            } else {
                clearInterval(fadeInTimer);
            }
        }
    }

    function fadeOut(element){
        disableInput();
        let fadeOutTimer = null;
        clearInterval(fadeOutTimer);
        fadeOutTimer = setInterval(frame,5);
        element.style.opacity = 1;
        // Recursively Subtracts 0.01 opacity from element until it reaches 0
        function frame(){
            if(element.style.opacity > 0){
                element.style.opacity = parseFloat(element.style.opacity) - 0.01;
            } else {
                element.style.display = "none";
                clearInterval(fadeOutTimer);
                enableInput();
            }
        }
    }


    slider.oninput = function() {
        background.style.filter = "blur(" + this.value + "px)";
    }

    slider.addEventListener("input", (event) => {
        const tempSliderValue = event.target.value; 
        // Progress is calculated as a percentage of the maximum slider value
        const progress = (tempSliderValue / slider.max) * 100;
        // Slider visuals are updated to show the progress
        slider.style.background = `linear-gradient(to right, rgb(52, 78, 65) ${progress}%, rgb(88, 129, 87) ${progress}%)`;
    })

    for(let i = 0;i < backgroundBtns.length;i++){
        backgroundBtns[i].onclick = function(){
            // Changes the background image depending on button clicked
            switch(i){
                case 0:
                    background.style.backgroundImage = "url('/src/assets/index/background-1.jpg')";
                    break;
                case 1:
                    background.style.backgroundImage = "url('/src/assets/index/background-2.jpg')"
                    break;
                case 2:
                    background.style.backgroundImage = "url('/src/assets/index/background-3.jpg')"
                    break;
                case 3:
                    background.style.backgroundImage = "url('/src/assets/index/background-4.jpg')"
                    break;
                case 4:
                    background.style.backgroundImage = "url('/src/assets/index/background-5.jpg')"
                    break;
            }
            
        }
    }

    for(let i = 0;i < navBarBtns.length;i++){
        navBarBtns[i].onclick = function(){
            // Only changes to a section that isn't already on screen
            if(i != sectionIndex){
                // Disable input until transition is done
                disableInput();
                // Sets the section to come in to be just out of the window
                sections[i].style.left = windowScreenLeft + "px";
                moveSection("left", i);
            }
        }
    }

    for(let i = 0;i < navLeftBtns.length;i++){
        navLeftBtns[i].onclick = function(){
            disableInput();
            nextSectionIndex = spawnNextSection();
            sections[nextSectionIndex].style.left = windowScreenLeft + "px";
            moveSection("left", nextSectionIndex);
        }
    }
    
    for(let i = 0;i < navRightBtns.length;i++){
        navRightBtns[i].onclick = function(){
            disableInput();
            nextSectionIndex = spawnPrevSection();
            sections[nextSectionIndex].style.left = -windowScreenLeft + "px";
            moveSection("right", nextSectionIndex);
        }
    }

    function moveSection(direction, nextSectionIndex){
        let moveSectionTimer = null;
        sections[nextSectionIndex].style.display = "flex";
        let pos = 0;
        var isTransFinished = false;
        clearInterval(moveSectionTimer);
        moveSectionTimer = setInterval(frame,5);
        function frame(){
            //  Recursively adds 20 pixels to the section until it reaches the middle of the screen
            if(isTransFinished){
                //  Hides old section
                sections[sectionIndex].style.display = "none";
                //  Makes sure the new section is exactly in the middle
                sections[nextSectionIndex].style.left  = 0;
                sectionIndex = nextSectionIndex;
                enableInput();
                clearInterval(moveSectionTimer);
            }else{
                pos += 20;
                //  Changes the direction the section moves depending on the direction parameter
                if(direction == "left"){
                    if(sections[nextSectionIndex].offsetLeft > 0){
                        //  Moves new sectin in
                        sections[nextSectionIndex].style.left = -pos + windowScreenLeft +  "px";
                    } else {
                        //  Lets the loop know were finished
                        isTransFinished = true;
                    }
                    //  Moves old section out
                    sections[sectionIndex].style.left = -pos + "px";
                } else if(direction = "right") {
                    if(sections[nextSectionIndex].offsetLeft < 0){
                        sections[nextSectionIndex].style.left = pos - windowScreenLeft + "px";
                    } else {
                        isTransFinished = true;
                    }
                    sections[sectionIndex].style.left = pos + "px";
                }
            }
        }
    }
    function enableInput(){
        document.body.style.pointerEvents = "auto";
    }
    function disableInput(){
        document.body.style.pointerEvents = "none";
    }
    function spawnPrevSection(){
        if(sectionIndex == sections.length - 1){
            return 0;
        }else {
            return sectionIndex + 1;
        }
    }
    function spawnNextSection(){
        if(sectionIndex == 0){
            return sections.length - 1;
        }else {
            return sectionIndex - 1;
        }
    }
};



