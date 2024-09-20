class CR_Icons{

    list_icon=[
        '<i class="fas fa-yin-yang"></i>',
        '<i class="fas fa-yen-sign"></i>',
        '<i class="fas fa-x-ray"></i>',
        '<i class="fas fa-wrench"></i>',
        '<i class="fas fa-won-sign"></i>',
        '<i class="fas fa-wine-glass-alt"></i>',
        '<i class="fas fa-wine-glass"></i>',
        '<i class="fas fa-wine-bottle"></i>',
        '<i class="fas fa-window-restore"></i>',
        '<i class="fas fa-window-minimize"></i>',
        '<i class="fas fa-window-maximize"></i>',
        '<i class="fas fa-window-close"></i>',
        '<i class="fas fa-wind"></i>',
        '<i class="fas fa-wifi"></i>',
        '<i class="fas fa-wheelchair"></i>'
    ]

    show_select(act_done=null){
        cr.msg('<div id="cr_all_item_icon"></div>',"Select Icon","",()=>{
            $.each(cr_icon.list_icon,function(index,ico){
                var emp_icon=$(`<button class="btn btn-sm btn-light m-2">${ico}</button>`)
                $(emp_icon).click(function(){
                    if(act_done) act_done(ico);
                    Swal.close();
                });
                $("#cr_all_item_icon").append(emp_icon);
            });
        })
    }
}

var cr_icon=new CR_Icons();