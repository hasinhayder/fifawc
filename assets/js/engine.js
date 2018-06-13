/**
 * Fifa WorldCup 2018 Fixture Project
 * Developed by Hasin Hayder From HappyMonster
 * Author url: https://hasin.me & https://happymonster.me
 * Released under MIT license
 **/
var urlParams;
;(function ($) {
    $(document).ready(function () {
        $("li").on("click", function () {
            var c = $(this).attr('class');
            $(".fixtures-body tr").hide();
            $(".fixtures-body tr." + c).show();
            window.scrollTo(0, 500);
        });

        $(".filter").on("click", function () {
            var filter = $(this).data("filter");
            $(".fixtures-body tr").hide();
            $(".fixtures-body tr." + filter).show();
        });

        //console.log(countries);

        for (var i in fixtures) {
            var class1 = countries[fixtures[i].p1] ? countries[fixtures[i].p1].code : "w";
            var class2 = countries[fixtures[i].p2] ? countries[fixtures[i].p2].code : "w";
            var class3 = "";

            var flag1 = countries[fixtures[i].p1] ? '<img class="mr-1" src="http://www.countryflags.io/' + countries[fixtures[i].p1].code + '/flat/32.png" alt="' + fixtures[i].p1 + '">' : "";
            var flag2 = countries[fixtures[i].p2] ? '<img class="mr-1" src="http://www.countryflags.io/' + countries[fixtures[i].p2].code + '/flat/32.png" alt="' + fixtures[i].p2 + '">' : "";

            if (i >= 48 && i <= 55) class3 = "k";
            else if (i >= 56 && i <= 59) class3 = "qf";
            else if (i >= 60 && i <= 61) class3 = "sf";
            else if (i == 62) class3 = "tf";
            else if (i == 63) class3 = "f";

            var td0 = $("<td/>").html(i * 1 + 1).attr("width", "5%");
            var td1 = $("<td/>").html(flag1 + toTitleCase(fixtures[i].p1)).attr("width", "25%");
            var td2 = $("<td/>").html(flag2 + toTitleCase(fixtures[i].p2)).attr("width", "25%");
            var td3 = $("<td/>").html(fixtures[i].date).attr("width", "25%").addClass("date").data("date", fixtures[i].date);
            var td4 = $("<td/>").html(fixtures[i].time).attr("width", "20%").addClass("time").data("t24", fixtures[i].time24).data("t", fixtures[i].time);

            $("<tr/>").attr("id", "g" + (i * 1 + 1))
                .append([td0, td1, td2, td3, td4])
                .data({
                    "p1": fixtures[i].p1,
                    "p2": fixtures[i].p2,
                    "t24": fixtures[i].time24,
                    "t": fixtures[i].time,
                    "d": fixtures[i].date
                })
                .addClass(['all', class1, class2, class3])
                .appendTo($(".fixtures-body"));
        }

        $("#timezone").on('change', function () {
            var tz = parseFloat($(this).val());
            var tzMinutes = (tz - parseInt(tz)) * 60;
            tzMinutes = tzMinutes ? tzMinutes : "00";
            var tzHours = parseInt(tz);
            if (tz > 0) {
                $(".fixtures-time-heading").html("Time (UTC/GMT + " + tzHours + ":" + tzMinutes + ")");
            } else {
                $(".fixtures-time-heading").html("Time (UTC/GMT - " + Math.abs(tzHours) + ":" + tzMinutes + ")");
            }
            convertTimeZone(tz);
        });

        convertTimeZone(6); //Let's Set time to Bangladesh Time

        //process query strings like http://fifawc.xyz/?utc=2
        //process query strings like http://fifawc.xyz/?utc=-4
        if(urlParams['utc']){
            $("#timezone").val(urlParams['utc']).trigger('change');
        }

    });
})(jQuery);

function convertTimeZone(tz = "6") {
    $(".fixtures-body tr").each(function () {
        var date = $(this).find(".date").data("date");
        var time = $(this).find(".time").data("t");
        var dt = new Date(date + " " + time);
        dt.setTime(dt.getTime() + parseFloat(tz) * 3600 * 1000);
        var newDate = dt.toLocaleString('en-US', {month: "long"}) + " " + dt.getDate() + ", " + dt.getFullYear();
        var newTime = dt.toLocaleString('en-US', {hour: 'numeric', hour12: true, minute: 'numeric'});
        $(this).find(".date").html(newDate);
        $(this).find(".time").html(newTime);
    });
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

//parse query strings
//thanks to https://stackoverflow.com/a/2880929/727268
(window.onpopstate = function () {
    var match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) {
            return decodeURIComponent(s.replace(pl, " "));
        },
        query = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
})();

