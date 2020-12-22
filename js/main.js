/*!
 * Vico - Vertical Content Slider
 * (c) 2020 Dennis Dobirr, Marius Kosik, MIT License, https://breakpoint-media.io
 */

const vico = (function () {
    "use strict";

    //
    // Variables
    //

    let publicAPIs = {};

    let getVicoObj = document.querySelector(".vico");

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
            /* create item container and inject contnet items */
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




        /* dectect viewport  */
        let aniObjs = document.querySelectorAll(".vi_item");
        let lock = false;
        document.addEventListener("scroll", function () {
            Array.from(aniObjs).forEach(function(item, index) {
                if(isVisible(aniObjs[index])) {
                    item.classList.add('active');


                    if(!lock) {
                        vico.next();
                        lock = true;
                    } else {
                        lock = false;
                    }


                } else {
                    if(item.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                }
            });
        });
        function isVisible (ele) {
            const { top, bottom } = ele.getBoundingClientRect();
            const vHeight = (window.innerHeight || document.documentElement.clientHeight);
          
            return (
              (top > 0 || bottom > 0) &&
              top < vHeight
            );
        }

       


    };

    publicAPIs.next = function () {
        let nextActive = 0;
        let imgNext = document.querySelectorAll('.vi_image_item')[0];
        let imgCurrent = document.querySelectorAll('.vi_image_item')[1];
        
        publicAPIs.vdata.forEach(function (value, index) {

            /* remove current active true */
            if(value.active === true) {
                value.active = false;
                nextActive = value.index + 1;
                
            }
           
            /* set next active true */
            if(nextActive === index && nextActive) {
                if(nextActive === parseInt(publicAPIs.vdata.length - 1)) {
                    nextActive = 0;
                    publicAPIs.vdata[0].active = true;
                }
                value.active = true;

                /* if current index reaced end start over */
                if(value.index === publicAPIs.vdata.length -1) {
                    imgCurrent.style.backgroundImage = "url(" + publicAPIs.vdata[publicAPIs.vdata.length - 1].imagePath + ")";
                } else {
                    imgCurrent.style.backgroundImage = "url(" + publicAPIs.vdata[nextActive-1].imagePath + ")";
                }
                


                imgNext.style.backgroundImage = "url(" + publicAPIs.vdata[nextActive].imagePath + ")";
                imgNext.classList.remove('active');



                
                setTimeout(function() {
                    imgNext.classList.add('active');
                }, 200)
            }

            
        });
    };

    //
    // Return the Public APIs
    //

    return publicAPIs;
})();





document.addEventListener("DOMContentLoaded", function(event) {
    
    /* Render DOM */
    vico.render();


    /* TEST animation on click */
    document.querySelector(".next").addEventListener("click", function () {
        vico.next();
    });


});