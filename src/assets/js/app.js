$(document).ready(function(){
    $(".left-menu-toggle").on("click", function(){
      $(".navbar-left").toggleClass("open");
      if($(".navbar-left").hasClass("open")){
        $(".shade").css("display", "block");
        $(".navbar-right").removeClass("open");
      }else{
        $(".shade").css("display", "none");
      }
    });

    $(".right-menu-toggle").on("click", function(){
      $(".navbar-right").toggleClass("open");
      if($(".navbar-right").hasClass("open")){
        $(".shade").css("display", "block");
        $(".navbar-left").removeClass("open");
      }else{
        $(".shade").css("display", "none");
      }
    });

    $(".shade").on("click", function(){
      $(".navbar-left").removeClass("open");
      $(".shade").css("display", "none");
      $(".navbar-right").removeClass("open");
    })

  })


