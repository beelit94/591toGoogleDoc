

var isIe = (navigator.userAgent.toLowerCase().indexOf("msie") != -1 
           || navigator.userAgent.toLowerCase().indexOf("trident") != -1);

document.addEventListener('copy', function(e) {
    var textToPutOnClipboard = GetInfo();
    if(textToPutOnClipboard == "")
    	return

    if (isIe) {
        window.clipboardData.setData('Text', textToPutOnClipboard);    
    } else {
        e.clipboardData.setData('text/plain', textToPutOnClipboard);
    }
    e.preventDefault();
    console.log(textToPutOnClipboard + " copied!")
});


function GetInfo(){
	rentObj = $("#detailInfo > ul > li.first > em")

	if(!rentObj.length) return ""
	rent = $("#detailInfo > ul > li.first > em").text().replace(",", "").trim();
	rent = parseInt(rent,10);
	size = $("#detailInfo ul li:nth-child(3) .multiLine").text();
	floor = $("#detailInfo ul li:nth-child(4) .multiLine").text();
	address = $(".addr").text();
	pathname = window.location.href;
	
	additional_fee = $("div.inner div:nth-child(1)").text()
		.replace("管理費：", "")
		.replace("--", "")
		.replace("元/月", "")
		.replace("無", "")
		.trim()
		.replace("", "0");

	additional_fee = parseInt(additional_fee, 10);
	console.log(additional_fee);

	host = $("div.contact div.linkman").text();

	arr = []
	arr.push(pathname);
	arr.push(rent);
	arr.push(additional_fee);
	arr.push(rent+additional_fee);
	arr.push(size);
	arr.push(floor);
	arr.push(address);
	arr.push(host);

	return_html = ""
	for (i=0; i < arr.length; i++){
		// return_html += "<td>";
		return_html += arr[i].toString();
		return_html += "\t";
	}
	// return_html += "</tr></table>"

	return return_html
}

$(function () {
	document.execCommand('copy');
});