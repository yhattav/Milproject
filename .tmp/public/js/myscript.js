// myscript is the main script running in the site. created by yhattav@gmail.com. 


// CREATING THE VARIABLES THAT WILL LATER BE CALLED FROM THE DB, MEANWHILE ARE STATIC
 //   var name = 'Yonatan' ;
 //   var date = 95;
 //   var updated = 66;
 //   var latest = 66;
 //   var deathtime = 90;
 //   var perc = 0.55;


// CALCULATING THE PROGRESS
    function calcProgress(timeSince,aDeathTime) {
        
        var a = timeSince/aDeathTime;
        if ( a>1 ) { 
            return(1);
            }
            else return(a);
    }
    
    function calcDaysPast(first){
        var firstDate = Date.parse(first);
        var secondDate = Date.today();
        var dayz = ((secondDate - firstDate)/3600/24/1000);
        return(dayz);
        
    }




//PROGRESS BAR CREATION FUNCTIONS (line and circle)

function makeProgressLine(id,percent,daysleft) {     
 itemz = document.getElementById(id);
 var bar = new ProgressBar.Line(itemz, {
  strokeWidth: 1,
  easing: 'easeInOut',
  duration: 1400,
  color: '#FFEA82',
  trailColor: '#999',
  trailWidth: 0.5,
  svgStyle: {width: '100%', height: '100%'},
  text: {
    style: {
      // Text color.
      // Default: same as stroke color (options.color)
      color: '#00FFAA',
      position: 'absolute',
      right: '0px',
      top: '0px',
      padding: 0,
      margin: 0,
      transform: null
    },
    autoStyleContainer: true
  },
  from: {color: '#00ff00'},
  to: {color: '#ED6A5A'},
  step: function (state, bar) {
      bar.path.setAttribute('stroke', state.color);
      bar.setText(daysleft);
  }
    });

    bar.animate(percent);
 //   var stringname = '<div class="big">' + name + '</div>';
 //   $(itemz).after(stringname);
}   

function makeProgressCircle(id,percent) {     
    itemz = document.getElementById(id);
    var day = new ProgressBar.Circle(itemz, {
    color: '#aaa',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {
        autoStyleContainer: false
    },
    from: { color: '#f0f', width: 1 },
    to: { color: '#333', width: 4 },
    // Set default step function for all animate calls
    step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 100);
        if (value === 0) {
        circle.setText('');
        } else {
        circle.setText(value);
        console.log(value);
        }

    }
    });
    //day.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    //day.text.style.fontSize = '2rem';
    day.animate(percent);  // Number from 0.0 to 1.0
}



//DOCUMENT READY - Calling the functions
$(document).ready(function () { 
    
    $(".external").hide();
    $(".btnToggle").click(function(){
        $(this).siblings(".external").toggle("slow");
        $(this).children(".toggler").toggleClass("fa-arrow-down").toggleClass("fa-arrow-up");
    });
    
    $.ajax({
            url:"/friends",
            type: 'GET',
            dataType: 'json',
            success:function(data) {
                for (var f = data.length - 1; f >= 0; f--) {
                    if (data[f].typeFriend == 1) {
                    //console.log("working on number: " + f);
                    var pastDays = calcDaysPast(data[f].latest);
                    var groupish = 0; 
                        for  (var a = data.length - 1; a >= 0; a--) {
                            if (data[a].id == data[f].group) {
                                //console.log("f=" + f);
                                //console.log("a=" + a);
                                //console.log("the id of a is :" + data[a].id);
                                //console.log("the group of f is: " + data[f].group);
                                //console.log(data[a].id == data[f].group);
                                groupish = a;
                            }
                       }
                    //console.log(groupish);
                    //console.log("past days for:"+ f + " are: " + pastDays + " group is: " + groupish);
                    
                    //console.log(data[groupish].deathTime);
                    var prog = calcProgress(pastDays,data[groupish].deathTime)
                    //console.log("progress for:"+ f + " is: " + prog);
                     var days = days = data[groupish].deathTime-pastDays;
                    //
                     if (days <= 0) {
                        days = days = '<i class="fa fa-frown-o toggler">&nbsp;</i>';
                        //alert(classa);
                    }
                    var percentID = '#progPercent' + f;
                    
                    $(percentID).html(Math.round(prog*100));
                    makeProgressLine('progress' + f,prog,days);
                    
                    
                   
                    
            }
                }
                
    }
    });


    $(".checkDelete").click(function() {
        $(this).html($(this).text() == 'Delete' ? 'Are you sure?  Click again to cancel' : 'Delete').toggleClass("btn-danger").toggleClass("btn-success");
    });

   //var trialvar = $('input[name=group]:checked', '#friendCreationForm').val();
   
   $('.groupSelect').click(function(){
    $(this).toggleClass("btn-success").toggleClass("btn-info");
    var a = $(this).val();
    var classa = '.group' + a;
    $(classa).toggle("slow");
    $(classa).prev("br").toggle();
    $(classa).find(".external").hide();

    });
    $('#showAllGroups').click(function(){
        
        if ( $(this).val() == 1) {
            $(this).removeClass("btn-success").addClass("btn-info");
            $(".groupSelect").addClass("btn-info").removeClass("btn-success");
            $('.oneFriendLine').hide("slow");
            $('.oneFriendLine').siblings("br").hide();
            $(".friendList").find(".external").hide();
            $(this).val("0");
        } 
        else
        {
            $(this).removeClass("btn-info").addClass("btn-success");
            $(".groupSelect").addClass("btn-success").removeClass("btn-info");
            $('.oneFriendLine').show("slow");
            $('.oneFriendLine').siblings("br").show();
            $(this).val("1");  
        }
        
            
        });
    var $divs = $("li.oneFriendLine");

    $('#byAlphBet').on('click', function () {
        var alphabeticallyOrderedDivs = $divs.sort(function (a, b) {
            return $(a).find("h4").text() > $(b).find("h4").text();
        });
        $(".friendList").html(alphabeticallyOrderedDivs);
        $(".oneFriendLine").after("</br>");
        $(".oneFriendLine").find(".btnToggle").click(function(){  
            $(this).siblings(".external").toggle("slow");
            $(this).children(".toggler").toggleClass("fa-arrow-down").toggleClass("fa-arrow-up");
        });
        $('.updateFriend').submit(function (e) {
            e.preventDefault();
            $.ajax({
            url: $(this).attr('action'),
            //url: '/friends/update',
            type: 'put',
            data: $(this).serialize(),
            success: function () {
                document.location.reload();
            }
            });
        });
        $(".checkDelete").click(function() {
            $(this).html($(this).text() == 'Delete' ? 'Are you sure?  Click again to cancel' : 'Delete').toggleClass("btn-danger").toggleClass("btn-success");
        });
        $('#byAlphBet').addClass("btn-success").removeClass("btn-info");
        $('#byProgress').removeClass("btn-success").addClass("btn-info");
        $('#byUrgency').removeClass("btn-success").addClass("btn-info");
    });
    $('#byProgress').on('click', function () {
        var alphabeticallyOrderedDivs = $divs.sort(function (a, b) {
            return $(b).find(".progPercent").text() - $(a).find(".progPercent").text();
        });
        $(".friendList").html(alphabeticallyOrderedDivs);
        $(".oneFriendLine").after("</br>");
        $(".oneFriendLine").find(".btnToggle").click(function(){  
            $(this).siblings(".external").toggle("slow");
            $(this).children(".toggler").toggleClass("fa-arrow-down").toggleClass("fa-arrow-up");
        });
        $('.updateFriend').submit(function (e) {
            e.preventDefault();
            $.ajax({
            url: $(this).attr('action'),
            //url: '/friends/update',
            type: 'put',
            data: $(this).serialize(),
            success: function () {
                document.location.reload();
            }
            });
        });
        $(".checkDelete").click(function() {
            $(this).html($(this).text() == 'Delete' ? 'Are you sure?  Click again to cancel' : 'Delete').toggleClass("btn-danger").toggleClass("btn-success");
        });
        $('#byProgress').addClass("btn-success").removeClass("btn-info");
        $('#byAlphBet').removeClass("btn-success").addClass("btn-info");
        $('#byUrgency').removeClass("btn-success").addClass("btn-info");
    });
    $('#byUrgency').on('click', function () {
        var alphabeticallyOrderedDivs = $divs.sort(function (a, b) {
            console.log(a + ",  " + b);
            return $(a).find(".progressbar-text").text() - $(b).find(".progressbar-text").text();
        });
        $(".friendList").html(alphabeticallyOrderedDivs);
        $(".oneFriendLine").after("</br>");
        $(".oneFriendLine").find(".btnToggle").click(function(){  
            $(this).siblings(".external").toggle("slow");
            $(this).children(".toggler").toggleClass("fa-arrow-down").toggleClass("fa-arrow-up");
        });
        $('.updateFriend').submit(function (e) {
            e.preventDefault();
            $.ajax({
            url: $(this).attr('action'),
            //url: '/friends/update',
            type: 'put',
            data: $(this).serialize(),
            success: function () {
                document.location.reload();
            }
            });
        });
        $(".checkDelete").click(function() {
            $(this).html($(this).text() == 'Delete' ? 'Are you sure?  Click again to cancel' : 'Delete').toggleClass("btn-danger").toggleClass("btn-success");
        });
        $('#byUrgency').addClass("btn-success").removeClass("btn-info");
        $('#byProgress').removeClass("btn-success").addClass("btn-info");
        $('#byAlphBet').removeClass("btn-success").addClass("btn-info");
    });
});


// A function to place Todays date inside the update bar (for easier use of the update friend form)
$('.changeToday').click(function(){             
    var now = new Date();
   //console.log(now);
    var today = now.getFullYear()  + '-' + ('0' + (now.getMonth()+1)).slice(-2)  + '-' + ('0' + now.getDate()).slice(-2);
    //console.log(today);

    var dateID = '#Update-latest' + $(this).data('internalid');
    $(dateID).val(today);

    //console.log($(this).data('internalid'));
});

//(now.getMonth()+1)).slice(-2)


//window.onload = function shagadelic() {