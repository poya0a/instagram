(($)=>{

    class Insta {
        init(){
            this.login();
            this.header();
            this.main();
            this.footer();
        }
        login(){

            let cnt = 1;

            function slide(){
                $('#loginWrap .slide').css({zIndex:1}).stop().animate({opacity:1},0);
                $('#loginWrap .slide').eq(cnt).css({zIndex:2}).stop().animate({opacity:1},0);
                $('#loginWrap .slide').eq(cnt==0?3:cnt-1).css({zIndex:3}).stop().animate({opacity:1},0).animate({opacity:0},1000);
            }

            function nextCount(){
                cnt++;
                cnt>3?cnt=0:cnt;
                slide();
            }

            function autoTimer(){
                setInterval(nextCount,5000);
            }
            autoTimer();

        }
        header(){}
        main(){}
        footer(){}
    }
    const newInsta = new Insta();
    newInsta.init();
})(jQuery);