/*!
 * Vico - Vertical Content Slider
 * (c) 2020 Dennis Dobirr MIT License, https://breakpoint-media.io
 */

const vico = (function () {
    "use strict";

    //
    // Variables
    //

    let publicAPIs = {};

    let getVicoObj = document.querySelector(".vico");

    let nextActive = parseInt(sessionStorage.nextActive) || 0;

    let currentScrollPos = parseInt(sessionStorage.currentScrollPos) || 0;
    let nextScrollTop;

    let zIndex = 1;

    publicAPIs.vdata = [];

    console.log('currentScrollPos: ', currentScrollPos);

    //
    // Methods
    //


    function testInfos() {
        console.log('currentScrollPos: ', currentScrollPos, '\nnextScrollTop: ', nextScrollTop, '\nnextActive: ', nextActive);
        console.log('---------------------------------------');
    }


    function isVisible (ele) {
        const { top, bottom } = ele.getBoundingClientRect();
        const vHeight = (window.innerHeight || document.documentElement.clientHeight);
      
        return (
          (top > 0 || bottom > 0) &&
          top < vHeight
        );
    }
    function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
        var ratio = Math.max(maxWidth / srcWidth, maxHeight / srcHeight);
        return { width: srcWidth * ratio, height: srcHeight * ratio };
    }

    publicAPIs.render = function () {
        /* die if no obj exists */
        if(!document.querySelector('.vico')) return;

        let arr = Array.from(getVicoObj.children);

        /* create image container */
        let imgContainer = document.createElement("div");
        imgContainer.classList.add("vi_stage");

        /* create content container */
        let contentContainer = document.createElement("div");
        contentContainer.classList.add("vi_content");

        arr.forEach(function (value, index) {
            let itemType;
            /* get the path of new image */
            let pathOfBGObj = value
                .getElementsByTagName("img")[0]
                .getAttribute("src");
               

            /* detect if image or video in childNodes */
            for (let i = 0; i <= value.childNodes.length - 1; i++) {
                if (value.childNodes[i].tagName == 'IMG') {
                    itemType = 'img';
                }
                if (value.childNodes[i].tagName == 'video') {
                    /* VIDEO */                   
                }
            }
            

            /* delete bg item */
            let bgObj = value.getElementsByTagName(itemType)[0];
            bgObj.parentNode.removeChild(bgObj);

            /* get the text contnet */
            let textObj = value.innerHTML;

            /* bring all together and push object to array */
            publicAPIs.vdata.push({
                active: false,
                index: index,
                itemType: itemType,
                itemPath: pathOfBGObj,
                itemWidth: null,
                itemHeight: null,
                text: textObj,
            });
        });

        /* delete all contnet from DOM */
        getVicoObj.innerHTML = "";

        /* inject to dom */
        for (var item in publicAPIs.vdata) {
            /* create item container and inject contentt items */
            let contentItem = document.createElement("div");
            contentItem.classList.add("vi_item");

            contentItem.innerHTML +=
                '<div class="vi_item_inner">' +
                publicAPIs.vdata[item].text +
                "</div>";

            contentContainer.append(contentItem);

            /* build bg items with start path */
            /* check if bgItemObj is an image */
            let bgItemObj;
            if(getVicoObj.itemType = 'img') {
                bgItemObj = document.createElement('img');
                bgItemObj.classList.add("vi_image_item");
                bgItemObj.src = publicAPIs.vdata[item].itemPath;
            }

            imgContainer.append(bgItemObj);
           
        }

        
        getVicoObj.append(imgContainer);
        getVicoObj.append(contentContainer);
        publicAPIs.vdata[0].active = true;
        document.querySelectorAll('.vi_image_item')[0].classList.add('active');

        /* dectect viewport */ 
        let aniObjs = document.querySelectorAll(".vi_item_inner");
        
        document.addEventListener("scroll", function () {
            let doRender = false;

            Array.from(aniObjs).forEach(function(item, index) {
                if(isVisible(aniObjs[index])) {
                    if(!item.classList.contains('active')) {
                        item.classList.add('active');
                    }
                } else {
                    if(item.classList.contains('active')) {
                        doRender = true;
                        item.classList.remove('active');
                    }
                }
            });
            if(doRender) {
                nextScrollTop = (document.body.getBoundingClientRect()).top
                if (currentScrollPos < nextScrollTop) {
                    console.log('back');
                    publicAPIs.next('-1');


                    testInfos();
                    
                } else {
                    console.log('next');
                    publicAPIs.next('+1');


                    testInfos();

                }
                // saves the new position for iteration.
                currentScrollPos = (document.body.getBoundingClientRect()).top;
                sessionStorage.currentScrollPos = currentScrollPos;

                
                // save to sessionStorage
                sessionStorage.nextActive = nextActive;
                
            }
        });

        

        publicAPIs.update();


    };

    publicAPIs.next = function(step) {

        /* remove current active true and set next active*/
        publicAPIs.vdata.forEach(function (value) {
            if(nextActive >= 0 && nextActive < publicAPIs.vdata.length)  {
                if(value.active === true) {
                    value.active = false;
                    nextActive = nextActive + parseInt(step);
                    
                }
            }
        });
        

        if(nextActive >= 0 && nextActive < publicAPIs.vdata.length)  {
            /* set next active class in vdata.active */
            publicAPIs.vdata[nextActive].active = true;
        } else {
            if(nextActive === parseInt(publicAPIs.vdata.length)) {
                publicAPIs.vdata[publicAPIs.vdata.length - 1].active = true;
                nextActive = parseInt(publicAPIs.vdata.length - 1);
               
            }
            if(nextActive <= 0) {
                publicAPIs.vdata[0].active = true;
                nextActive = 0;
            }
        }

        publicAPIs.update();
        //console.log(sessionStorage.nextActive, nextActive);

        
        testInfos();

    };

    publicAPIs.update = function () {
        let getNewBgItemsArray =  Array.from(document.querySelectorAll('.vi_stage')[0].children);
        let getStage = document.querySelector('.vi_stage');
        zIndex++;

        /* save nextActive to session storage after next()  */
        sessionStorage.nextActive = nextActive;

        if(nextActive >= 0 && nextActive < publicAPIs.vdata.length)  {
            getNewBgItemsArray.forEach(function (value, index) {

                /* update current */
                let getScale = calculateAspectRatioFit(
                    value.clientWidth,
                    value.clientHeight,
                    getStage.clientWidth,
                    getStage.clientHeight
                );

                /* add current to publicAPIs obj */
                publicAPIs.vdata[index].itemWidth = getScale.width.toFixed(2);
                publicAPIs.vdata[index].itemHeight = getScale.height.toFixed(2);

                /* inject values to bg obj */
                value.style.width =  publicAPIs.vdata[index].itemWidth + 'px';
                value.style.height =  publicAPIs.vdata[index].itemHeight + 'px';

                /* set active class */
                value.classList.remove('active');
                getNewBgItemsArray[nextActive].classList.add('active');
                getNewBgItemsArray[nextActive].style.zIndex = zIndex;

            });
        }

        
    }

    //
    // Return the Public APIs
    //

    return publicAPIs;
})();


document.addEventListener("DOMContentLoaded", function(event) {
    
    /* Render DOM */
    vico.render();

    document.querySelector('#prev').addEventListener("click", function(event) {
        vico.next('-1');
    });
    document.querySelector('#next').addEventListener("click", function(event) {
        vico.next('+1');
    });
    document.querySelector('#delete').addEventListener("click", function(event) {
        sessionStorage.nextActive = 0;
        sessionStorage.currentScrollPos = 0;
    });

    // document.querySelector('#test').addEventListener("click", function(event) {
    //     let lock = false;
    //     setInterval(function() {
    //         if(!lock) {
    //             vico.next('+1');
    //             lock = !lock;
    //         } else {
    //             vico.next('-1');
    //             lock = !lock;
                
    //         }
    //     }, 300)
    // });

});