$(document).ready(function(){

    var pgcount = 0;
    function makeApiCall(){
        
        var $num_photos = $('#num_photos');
        var $tags = $('#tags');
        var tag = $tags.val();
        var subtags = tag.split()
        pgcount++;
        var url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=197c41c0f47432d835afd6d84a7f5db8&tags=${$tags.val()}&privacy_filter=1&extras=url_n&per_page=${$num_photos.val()}&page=${pgcount}&format=json`;

        console.log(url);
        $.ajax({url:url, dataType:"jsonp", jsonp: 'jsoncallback'}).then(function(data) {
            //helper function - to be used to get the key for each of the 5 days in the future when creating cards for forecasting weather
            console.log(data);
            //$('#searched_images').append(data.photos.photo)
            $.each(data.photos.photo, function(i, sp){
                //console.log(sp);
                var server_id = sp.secret;
                var id = sp.id;
                var secret = sp.secret;
                var farm_id = sp.farm;
                var title = sp.title;
                console.log(title);
                var img_link = sp.url_n;

                $("#searched_images").append(
                `<div class="card" style="width: 18rem;">
                    <img class="card-img-top" src = ${img_link} alt="picture"></img>
                    <div class="card-body">
                        <p class="card-text">${title}</p>
                    </div>
                </div>`);
            })
        })
        
    }
    $('#search').on('click', function(){
        makeApiCall();
    })
    
    $(window).on("scroll", function() {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            makeApiCall();
        }
    });
});





// async function search(){
//     const response = await fetch(url);
//     const data = await response.json();
//     returnPhotos()
// }

// search()

// function returnPhotos(photos){

// }