/**
 * Fifa WorldCup 2018 Fixture Project
 * Developed by Hasin Hayder From HappyMonster
 * Author url: https://hasin.me & https://happymonster.me
 * Released under MIT license
 **/
let fixtures =[];
(function($){
    $(document).ready(function(){
        $("table tr").each(function(){
            let id = $(this).find("td:nth-child(1)").html().replace(".","").trim();
            let p1 = $(this).find("td:nth-child(4)").html().split("vs")[0].trim();
            let p2 = $(this).find("td:nth-child(4)").html().split("vs")[1].trim();
            let date = $(this).find("td:nth-child(2)").html().trim();
            let time = $(this).find("td:nth-child(3)").html().trim();
            let time24 = convertTo24(time);
            // console.log(id,p1,p2,date,time,time24);

            let data = {
                "id": id,
                "p1": p1.toLowerCase(),
                "p2": p2.toLowerCase(),
                "date": date,
                "time": time,
                "time24": time24
            };

            fixtures.push(data);
        });

        console.log(JSON.stringify(fixtures));
    });

})(jQuery);

function convertTo24(timestr){
    if(timestr.includes("PM")){
        return parseInt(timestr.split(":")[0])+12+":"+timestr.split(":")[1].replace(" PM","");
    }else{
        return parseInt(timestr.split(":")[0])+":"+timestr.split(":")[1].replace(" AM","");
    }
}