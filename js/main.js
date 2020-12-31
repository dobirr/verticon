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

    let nextActive = 1;

    let imgNext;
    let imgCurrent;

    var scrollPos = 0;

    publicAPIs.vdata = [];

    //
    // Methods
    //

    publicAPIs.render = function () {
        let arr = Array.from(getVicoObj.children);

        /* create image container */
        let imgContainer = document.createElement("div");
        imgContainer.classList.add("vi_stage");

        /* create contnet container */
        let contentContainer = document.createElement("div");
        contentContainer.classList.add("vi_content");

        arr.forEach(function (value, index) {
            /* get the path of new image */
            let pathOfImage = value
                .getElementsByTagName("img")[0]
                .getAttribute("src");

            /* delete img */
            let imgObj = value.getElementsByTagName("img")[0];
            imgObj.parentNode.removeChild(imgObj);

            /* get the text contnet */
            let textObj = value.innerHTML;

            /* bring all together and push object to array */
            publicAPIs.vdata.push({
                active: false,
                index: index,
                imagePath: pathOfImage,
                text: textObj,
            });
        });

        /* delete all contnet from DOM */
        getVicoObj.innerHTML = "";

        /* inject to dom */
        for (var item in publicAPIs.vdata) {
            /* create item container and inject contentt items */
            let contnetItem = document.createElement("div");
            contnetItem.classList.add("vi_item");

            contnetItem.innerHTML +=
                '<div class="vi_item_inner">' +
                publicAPIs.vdata[item].text +
                "</div>";

            contentContainer.append(contnetItem);

            /* build 2 img tags with start path */
            let imgDiv = document.createElement("div");
            imgDiv.classList.add("vi_image_item");

            imgDiv.style.backgroundImage =
                "url(" + publicAPIs.vdata[item].imagePath + ")";
            if (item < 2) {
                imgContainer.append(imgDiv);
            }
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
                        // doRender = false;
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
                if ((document.body.getBoundingClientRect()).top > scrollPos) {
                    vico.next('-1');
                } else {
                    vico.next('+1');
                }
                // saves the new position for iteration.
                scrollPos = (document.body.getBoundingClientRect()).top;
                
            }
        });
        function isVisible (ele) {
            const { top, bottom } = ele.getBoundingClientRect();
            const vHeight = (window.innerHeight || document.documentElement.clientHeight);
          
            return (
              (top > 0 || bottom > 0) &&
              top < vHeight
            );
        }

        // set next and prev variables
        imgNext = document.querySelectorAll('.vi_image_item')[0];
        imgCurrent = document.querySelectorAll('.vi_image_item')[1];


    };

   


    publicAPIs.next = function (step) {
        
        publicAPIs.vdata.forEach(function (value) {
            /* remove current active true and set next active*/
            if(nextActive >= 0 && nextActive < publicAPIs.vdata.length)  {
                if(value.active === true) {
                    value.active = false;
                    nextActive = value.index + parseInt(step);
                }
            }
        });

        if(step.includes('+')) {
            if(nextActive >= 0 && nextActive < publicAPIs.vdata.length) {
                imgCurrent.style.backgroundImage = "url(" + publicAPIs.vdata[nextActive - 1].imagePath + ")";
                imgNext.style.backgroundImage = "url(" + publicAPIs.vdata[nextActive].imagePath + ")";
            }
        } 
        else if(step.includes('-')) {
            if(nextActive >= 0 && nextActive < publicAPIs.vdata.length) {
                imgCurrent.style.backgroundImage = "url(" + publicAPIs.vdata[nextActive + 1].imagePath + ")";
                imgNext.style.backgroundImage = "url(" + publicAPIs.vdata[nextActive].imagePath + ")";
            }    
        }


        if(nextActive >= 0 && nextActive < publicAPIs.vdata.length)  {
            publicAPIs.vdata[nextActive].active = true;

            imgNext.classList.remove('active');
            setTimeout(function() {
                imgNext.classList.add('active');
            }, 200);
        } else {
            if(nextActive === parseInt(publicAPIs.vdata.length)) {
                publicAPIs.vdata[publicAPIs.vdata.length - 1].active = true;
                nextActive = 4;
            }
            if(nextActive === -1) {
                publicAPIs.vdata[0].active = true;
                nextActive = 1;
            }
        }


        
    };

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


});