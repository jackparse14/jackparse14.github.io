window.onload = function(){
    var sections = document.getElementsByTagName("section");
    var navBarBtns = document.getElementById("navbar").getElementsByTagName("a");
    var navLeftBtns = document.getElementsByClassName("btn-left");
    var navRightBtns = document.getElementsByClassName("btn-right");
    var backgroundBtns = document.getElementById("background-swapper").getElementsByTagName("a");
    var background = document.getElementById("bg-image");
    var slider = document.getElementById("slider");
    var accordionBtns = document.getElementsByClassName("accordion-btn");
    var accordionInfos = document.getElementsByClassName("accordion-info");
    var galleryProjects = document.getElementById("gallery").getElementsByClassName("project");
    var galleryDesc = document.getElementById("gallery").getElementsByClassName("desc");
    var accordionIndex = 4;
    var sectionIndex = 0;
    
    for(let i = 0; i < galleryProjects.length;i++){
        galleryProjects[i].addEventListener("mouseover", (event) => {
            fadeIn(galleryDesc[i]);
        });
        galleryProjects[i].addEventListener("mouseout",(event) => {
            galleryDesc[i].style.display = "none";
        });
    }

    for(let i = 0; i < accordionBtns.length;i++){
        accordionBtns[i].onclick = function(){
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
                        accordionBtns[j].style.width = "16.66%";
                        accordionBtns[j].style.backgroundColor = "rgb(218, 215, 205)";
                        
                        fadeOut(accordionInfos[j]);
                    } else{
                        this.style.width ="50%";
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
        let id = null;
        clearInterval(id);
        id = setInterval(frame, 5);
        element.style.display = "flex";
        element.style.opacity = 0;
        function frame(){
            if(element.style.opacity < 1){
                element.style.opacity = parseFloat(element.style.opacity) + 0.01;
            } else {
                
                clearInterval(id);
            }
        }
    }

    function fadeOut(element){
        disableInput();
        let id = null;
        clearInterval(id);
        id = setInterval(frame,5);
        element.style.opacity = 1;
        function frame(){
            if(element.style.opacity > 0){
                element.style.opacity = parseFloat(element.style.opacity) - 0.01;
            } else {
                element.style.display = "none";
                clearInterval(id);
                enableInput();
            }
        }
    }


    slider.oninput = function() {
        background.style.filter = "blur(" + this.value + "px)";
    }

    slider.addEventListener("input", (event) => {
        const tempSliderValue = event.target.value; 
        const progress = (tempSliderValue / slider.max) * 100;
        slider.style.background = `linear-gradient(to right, rgb(52, 78, 65) ${progress}%, rgb(88, 129, 87) ${progress}%)`;
    })

    for(let i = 0;i < backgroundBtns.length;i++){
        backgroundBtns[i].onclick = function(){
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
            if(i != sectionIndex){
                disableInput();
                sections[i].style.left = 4000 + "px";
                moveSection("left", i);
            }
            
        }
    }

    for(let i = 0;i < navLeftBtns.length;i++){
        navLeftBtns[i].onclick = function(){
            disableInput();
            nextSectionIndex = spawnNextSection();
            sections[nextSectionIndex].style.left = 4000 + "px";
            moveSection("left", nextSectionIndex);
        }
    }
    
    for(let i = 0;i < navRightBtns.length;i++){
        navRightBtns[i].onclick = function(){
            disableInput();
            nextSectionIndex = spawnPrevSection();
            sections[nextSectionIndex].style.left = -4000 + "px";
            moveSection("right", nextSectionIndex);
        }
    }

    function moveSection(direction, nextSectionIndex){
        let id = null;
        const originalLeftPos = sections[sectionIndex].style.left;
        const originalRightPos = sections[sectionIndex].style.right;

        
        sections[nextSectionIndex].style.display = "flex";
        

        let pos = 0;
        clearInterval(id);
        id = setInterval(frame,5);
        function frame(){
                if(pos == 3000){
                    sections[sectionIndex].style.display = "none";
                    
                    
                    sections[sectionIndex].style.left = originalLeftPos;
                    sections[sectionIndex].style.right = originalRightPos;

                    sectionIndex = nextSectionIndex;
                    enableInput();
                    clearInterval(id);
                }else{
                    pos += 10;
                    if(direction == "left"){
                        if(sections[nextSectionIndex].offsetLeft > 0){
                            sections[nextSectionIndex].style.left = -pos + 2000 +  "px";
                        }
                        
                        sections[sectionIndex].style.left = -pos + "px";
                        
                    } else if(direction = "right") {
                        if(sections[nextSectionIndex].offsetLeft < 0){
                            sections[nextSectionIndex].style.left = pos - 2000 + "px";
                            
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



