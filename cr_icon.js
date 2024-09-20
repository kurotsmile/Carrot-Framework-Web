class CR_Icons{

    list_icon=[
        'fas fa-yin-yang',
        'fas fa-yen-sign',
        'fas fa-x-ray',
        'fas fa-wrench',
        'fas fa-won-sign',
        'fas fa-wine-glass-alt',
        'fas fa-wine-glass',
        'fas fa-wine-bottle',
        'fas fa-window-restore',
        'fas fa-window-minimize',
        'fas fa-window-maximize',
        'fas fa-window-close',
        'fas fa-wind',
        'fas fa-wifi',
        'fas fa-wheelchair'
    ]

    show_select(emp_inp=null){
        cr.msg('<div id="cr_all_item_icon"></div>',"Select Icon","",()=>{
            $.each(cr_icon.list_icon,function(index,ico){
                var emp_icon=$(`<button class="btn btn-sm btn-light m-2"><i class="${ico}"></i></button>`)
                $(emp_icon).click(function(){
                    $("#"+emp_inp).val(ico);
                    Swal.close();
                });
                $("#cr_all_item_icon").append(emp_icon);
            });
        })
    }
}

var cr_icon=new CR_Icons();