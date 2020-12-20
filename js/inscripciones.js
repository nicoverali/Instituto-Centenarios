
window.addEventListener("DOMContentLoaded", function(){

    const slide = document.getElementsByClassName("slide-container")[0];
    const tabs = document.getElementsByClassName("tab");
    const slideChilds = document.getElementsByClassName("slide-child");

    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        tab.addEventListener("click", function(){
            if(!this.classList.contains('selected')){
                for (const tab of tabs) {
                    tab.classList.remove('selected');
                }
                this.classList.add('selected');
                slide.style.left = "-"+100*i+"%"
                
            }
        })
    }

    tabs[0].classList.add('selected');
    slide.style.left = "0%";
    

});