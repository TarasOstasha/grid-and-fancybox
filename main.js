$(document).ready(function () {

    function createMyDom(img_url,data_caption,data_href) {
        $wrapper = $('#gallery');
        $div = $("<div class='grid-item'></div>");
        $a = $(`<a data-caption="<h1>${data_caption}</h1>" data-fancybox="gallery" href="${img_url}"></a>`);
        $img = $(`<img src="${img_url}" />`);

        $a.append($img);
        $div.append($a);
        $wrapper.append($div);
    }

    let category = 287;
    let startItem = 0;
    let defaultPageItems = 9;
    let filtered;
    let showedItems;
    let click = 1;
      

    //fetch('https://api.github.com/users')
    fetch('./OUR-WORK-JSON.json')
        .then(response => response.json())
        .then(items => {
            //console.log(items)

            filtered = items.filter((element) => {
                return parseInt(element.categoryids) == parseInt(category);
                
                // createMyDom(element.product_img_small,element.productname,element.product_link);
                // initMasonry();
                // initFancybox();
            });
            showedItems = filtered.slice(startItem,defaultPageItems);
            showedItems.forEach(element => {
                createMyDom(element.product_img_small,element.productname,element.product_link);
                initMasonry();
                initFancybox();
            });
            //console.log(filtered, 'filtered');
            console.log(showedItems)
        });
     
    
    $('#showMore').on('click', function() {
        click++; // increase counter on click, it means how many times button was clicked
        let nextItem = defaultPageItems * click; // looking for the next sliced item
        let lastItem = filtered.length; // looking for last item in filtered arr

        if(filtered.length < defaultPageItems * click) { // if filtered items are less 
            showedItems = filtered.slice(nextItem,defaultPageItems);
            console.log(showedItems)
            showedItems.forEach(element => {
                createMyDom(element.product_img_small,element.productname,element.product_link);
                initMasonry();
                
                //initFancybox();
            });
        } else {
            showedItems = filtered.slice(nextItem,lastItem);
            console.log(showedItems)
            showedItems.forEach(element => {
                createMyDom(element.product_img_small,element.productname,element.product_link);
                initMasonry();
                //initFancybox();
            });
        }
        
    });  

    function initMasonry() {
        setTimeout(() => {
            var $grid = $('.grid').masonry({
                // options...
            });
            // layout Masonry after each image loads
            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
            });
            $grid.masonry('reloadItems'); // reload masonry
        }, 100);
    }

    function initFancybox() {
        Fancybox.bind("#gallery div a", {
            groupAll: true, // Group all items
            on: {
                ready: (fancybox) => {
                    console.log(fancybox);
                    console.log(`fancybox #${fancybox.id} is ready!`);

                }
            }
        });
    }

});



// https://imagesloaded.desandro.com/
// https://masonry.desandro.com/
// https://fancyapps.com/docs/ui/fancybox/