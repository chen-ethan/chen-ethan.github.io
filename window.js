var width = document.documentElement.clientWidth;

var height = document.documentElement.clientHeight;

var tablet="false";

var smallThresh = 650;

var totalExpanded = 0;

/*
$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});
*/

$(document).ready(function(){
    //document.getElementsByTagName("HTML")[0].style['scroll-behavior']="auto";

    var scrollTop = $(this).scrollTop(); 

    updateWindowSize();
    $(this).scrollTop(0);
//uncomment to scroll up
    //document.getElementsByTagName("HTML")[0].style['scroll-behavior']="smooth";

});



window.addEventListener("resize",updateWindowSize);

function updateWindowSize(){
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    //document.getElementById("result").innerHTML = "Width: " + width + ", " + "Height: " + height;
    
    if(width<=smallThresh && tablet==="false"){
        makeSmall();
        tablet="true";
    }else if(width>=smallThresh && tablet === "true"){
        makeBig();
        tablet="false";
    }
    
}

var Imgs = document.getElementsByClassName("img_cropper");
var expHead = document.getElementsByClassName("header");
var skillsBlocks = document.getElementsByClassName("SkillsBlock");

console.log(expHead);


function makeSmall(){
    var sz = Imgs.length;
    for(var i = 0; i< sz; ++i){
        Imgs[i].style.width="75px";
        Imgs[i].style.height="75px";

    }
    sz = expHead.length;
    for(var j = 0; j< sz; ++j){
        expHead[j].innerHTML = expHead[j].innerHTML.replace(/<span class="title">/g,'<br><span class="title">');

    }
    sz = skillsBlocks.length;
    for(var k = 0; k< sz; ++k){
        skillsBlocks[k].style.width = "45%";
        skillsBlocks[k].style.height = "8.75vh";
        skillsBlocks[k].style.margin = "0 2.55% 1.25vh 0%";    


    }
    document.getElementById("profilePic").style.width="200px";
    document.getElementById("profilePic").style.height="200px";

}
function makeBig(){
    document.getElementById("profilePic").style.width="300px";
    document.getElementById("profilePic").style.height="300px";

    var sz = Imgs.length;
    for(var i = 0; i< sz; ++i){
        Imgs[i].style.width="";
        Imgs[i].style.height="";
    }
    sz = expHead.length;
    for(var j = 0; j< sz; ++j){
        expHead[j].innerHTML = expHead[j].innerHTML.replace(/<br>/g,"");

    }
    sz = skillsBlocks.length;
    for(var k = 0; k< sz; ++k){
        skillsBlocks[k].style.width = "";
        skillsBlocks[k].style.height = "";
        skillsBlocks[k].style.margin = "";    

    }
}

var footer = document.getElementById("footer");


$.fn.moveIt = function(){

    var $window = $(window);
    var instances = [];

    $(this).each(function(){
       instances.push(new moveItItem($(this),$window.scrollTop()));
    });
    window.onscroll = function(){
        var scrollTop = $window.scrollTop(); 
        
        /*if(scrollTop >= 900* height * .03){
            console.log("footer z-ind");
            footer.style.zIndex = 10;
        }*/

        instances.forEach(function(inst){
           inst.update(scrollTop);
       });

    }
    

}


var moveItItem = function(el,scrollTop){
   this.el = $(el);
   this.speed = parseInt(this.el.attr('data-scroll-speed'));

    
};

function handleFade(scrollTop){
    var fades = document.getElementsByClassName("fade");
    var sz = fades.length;
    for(var i = 0; i< sz; ++i){
        var cap = fades[i];
        var FadeB = (parseInt(cap.getAttribute('data-fade-begin'))+totalExpanded) * height * .03;
        var FadeE = (parseInt(cap.getAttribute('data-fade-end'))+totalExpanded) * height * .03;
        //console.log(cap + "beg:" + FadeB + "end:" + FadeE + " ST " +scrollTop);
        if(scrollTop>FadeB && scrollTop<FadeE){
            var dist = FadeE-FadeB;
            var o = (scrollTop-FadeB)/dist;
            cap.style.opacity = o+"";
        } else if(scrollTop<FadeB ){
            cap.style.opacity = "0";
        } else if(scrollTop>FadeE ){
            cap.style.opacity = "1";
        }


    }
}

function handleHide(scrollTop){
    var hides = document.getElementsByClassName("expandCaret");
    var sz = hides.length;
    for(var i = 0; i< sz; ++i){
        var cap = hides[i];
        var HideA = parseInt(cap.getAttribute('data-hide-after')) * height * .03;
        if(scrollTop>HideA){
            cap.style.opacity = "0";
            cap.style.display = "none";
        } else {
            cap.style.opacity = "1";
            cap.style.display = "block";
        }


    }
}


moveItItem.prototype.update = function(scrollTop){
   //this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
    //this.speed = parseInt(this.el.attr('data-scroll-speed'));
        var SB = parseInt(this.el.attr('data-scroll-begin'));
        var SU = parseInt(this.el.attr('data-scroll-until'));
        var FSB = parseInt(this.el.attr('data-fast-scroll-begin'));
        var FSU = parseInt(this.el.attr('data-fast-scroll-until'));
        var SS = parseInt(this.el.attr('data-scroll-speed'));
        var FastSS = parseFloat(this.el.attr('data-fast-scroll-speed'));

    
        //convery vh units to pixels
        var pSB = SB*height*.03;
        var pSU = SU*height*.03;
        var pFSB = FSB*height*.03;
        var pFSU = FSU*height*.03;
        
        handleFade(scrollTop);
        handleHide(scrollTop);
        
        if(scrollTop<=pSB && scrollTop>=pSU){
            //this.speed = 0;
            //this.el.css('transform', 'translateY(' + -((scrollTop-SB) / this.speed) + 'px)');
        }else if(scrollTop>=pSB){
            this.speed = SS;
            this.el.css('transform', 'translateY(' + -((scrollTop-(pSB-pSU)) / this.speed) + 'px)');
        }else if(scrollTop>=pFSB && scrollTop <=pFSU){
            this.speed=FastSS;
            this.el.css('transform', 'translateY(' + -((pFSB/3)+((scrollTop-FSB)/this.speed)) + 'px)');
        }else if(scrollTop>=pFSU){
            this.speed = SS;
            this.el.css('transform','translateY(' + -((pFSB/SS)+(pFSU-pFSB)/FastSS+(scrollTop-pFSU)/SS) + 'px)');
    
        }else if(scrollTop<=pFSB){
            this.speed = SS;
            this.el.css('transform', 'translateY(' + -((scrollTop)/ this.speed) + 'px)');
    
        }else{
            this.speed = SS;
            this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
        }
        
        
    
};

// Initialization
$(function(){
   $('[data-scroll-speed]').moveIt();
});


  // Add smooth scrolling to all links
$("a").on('click', function(event) {
    var dist = parseInt(this.getAttribute('data-scroll-to')) * height*.03;
    $(window).scrollTop(dist);
  });



//NO LONGER IN USE
function expandProj(caret,i){
    var projName = 'proj'+i;
    var ProjWrap = document.getElementById(projName);
    ProjWrap.style.height="150vh";
    //ProjWrap.style.position="absolute";
    ProjWrap.style.overflow="visible";
    ProjWrap.style.zIndex="2";



    var dist = (totalExpanded + parseInt(caret.getAttribute('data-scroll-to'))) * height*.03;
    $(window).scrollTop(dist);
    totalExpanded+= 50;
    
    var childs = ProjWrap.childNodes;

    var sz = childs.length;
    for(var x = 0; x<sz; ++x){
        console.log(childs[x]);
        var gchilds = childs[x].childNodes;
        var gsz = gchilds.length;
        console.log(gchilds);
        for(var y = 0; y< gsz; ++y ){
            console.log("current gchild: " + gchilds[y]);
            console.log("gchild classname: " + gchilds[y].className);
            
            if(gchilds[y].className && gchilds[y].className.indexOf("hidden")){
                gchilds[y].style.display = "block";
            }
        }
    }
    

}
