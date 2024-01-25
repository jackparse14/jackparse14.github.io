window.onload = function(){
    var sections = document.getElementsByTagName("section");
    var navBarBtns = document.getElementById("navbar").getElementsByTagName("a");
    var navLeftBtns = document.getElementsByClassName("btn-left");
    var navRightBtns = document.getElementsByClassName("btn-right");
    var sectionIndex = 0;
    
    for(let i = 0;i < navBarBtns.length;i++){
        navBarBtns[i].onclick = function(){
            
            sections[sectionIndex].style.display = "none";
            sectionIndex = i;
            sections[sectionIndex].style.display = "flex";
        }
    }

    for(let i = 0;i < navLeftBtns.length;i++){
        navLeftBtns[i].onclick = function(){
            document.body.style.pointerEvents = "none";
            moveSection("left");
        }
    }
    
    for(let i = 0;i < navRightBtns.length;i++){
        navRightBtns[i].onclick = function(){
            document.body.style.pointerEvents = "none";
            moveSection("right");
        }
    }

    function moveSection(direction){
        let id = null;
        const originalLeftPos = sections[sectionIndex].style.left;
        const originalRightPos = sections[sectionIndex].style.right;

        var nextSectionIndex = null;
        if(direction == "left"){
            nextSectionIndex = spawnNextSection();
            sections[nextSectionIndex].style.left = 4000 + "px";
            
        } else if (direction == "right"){
            nextSectionIndex = spawnPrevSection();
            sections[nextSectionIndex].style.left = -4000 + "px";
        };
        
        
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
                    document.body.style.pointerEvents = "auto";
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



