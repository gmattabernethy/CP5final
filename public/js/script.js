    function _cb_findItemsByKeywords(root) {
        var items = root && root.findItemsByKeywordsResponse && root.findItemsByKeywordsResponse[0] && root.findItemsByKeywordsResponse[0].searchResult && root.findItemsByKeywordsResponse[0].searchResult[0] && root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
        var item = items[0];
        var pic = item.galleryURL;
        var title = item.title;
        insertedHTML = '<p>' + item.title.toString().substring(0, 40) + '</p>';
        insertedHTML += '<img src="' + pic + '"border = "1">';
        //  Maybe use?
        var shippingInfo = item.shippingInfo && item.shippingInfo[0] || {};
        var sellingStatus = item.sellingStatus && item.sellingStatus[0] || {};
        var listingInfo = item.listingInfo && item.listingInfo[0] || {};
        var subtitle = item.subtitle || '';

        var viewitem = item.viewItemURL;
        var currentPrice = sellingStatus.currentPrice && sellingStatus.currentPrice[0] || {};
        var displayPrice = currentPrice['__value__'] + ' ' + currentPrice['@currencyId'];
        insertedHTML += '<p style="color:green">$' + displayPrice + '</p>';

        var buyItNowAvailable = listingInfo.buyItNowAvailable && listingInfo.buyItNowAvailable[0] === 'true';
        if(buyItNowAvailable){
            insertedHTML += '<p>Buy it now available</p>'
        }else{
            insertedHTML += '<p>Buy it now NOT available</p>'
        }

        insertedHTML += '<button type="button" class="btn btn-lg btn-block btn-primary" onclick="window.location.href=\'' + viewitem + '\'">Purchase</button>';
        // Display data
        $("#ebayBox").html(insertedHTML);
    }

$(document).ready(function() {
    var url = '';
    $("#SearchVal").change(function(e) {
        var val = $("#SearchVal").val();
        if(val.length>2){
           goSearch(val);
        }
    });

    function goSearch(val){
        var url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=GlennAbe-BYUCS260-PRD-1132041a0-e2eb0ce1&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=" + val + "%20watch&paginationInput.entriesPerPage=1&GLOBAL-ID=EBAY-US&siteid=0"

        $.ajax({
            url : url,
            dataType : "jsonp",
            success : function(json){
                console.log(json);

            }
        });
    }

  $('#myModal').on('shown.bs.modal', function () {
    $('#adminButton').trigger('focus')
  })

});
