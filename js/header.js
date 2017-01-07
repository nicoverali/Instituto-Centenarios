window.addEventListener('DOMContentLoaded', function() {
  
  /* Menu Toggle */
  var burguer = document.getElementsByClassName("burguer-nav")[0];
  burguer.addEventListener("click", function(){
      var header = document.getElementsByTagName("header")[0];
      if(header.className == "opened")
        header.className = "";
      else
        header.className = "opened";
  });

}, true);
