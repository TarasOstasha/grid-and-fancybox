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
    fetch('https://api.github.com/users')
        .then(response => response.json())
        .then(items => {
            console.log(items)
            items.forEach(element => {
                createMyDom(element.avatar_url,element.login,element.following_url);
                initMasonry();
                //initFancybox();
            });

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