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
        'fas fa-wheelchair',
        'fas fa-weight-hanging',
        'fas fa-weight',
        'fas fa-warehouse',
        'fas fa-wallet',
        'fas fa-walking',
        'fas fa-volume-up',
        'fas fa-volume-off',
        'fas fa-volume-mute',
        'fas fa-volume-down',
        'fas fa-volleyball-ball',
        'fas fa-vihara',
        'fas fa-video-slash',
        'fas fa-video',
        'fas fa-vials',
        'fas fa-vial',
        'fas fa-venus-mars',
        'fas fa-venus-double',
        'fas fa-venus',
        'fas fa-vector-square',
        'fas fa-utensils',
        'fas fa-utensil-spoon',
        'fas fa-store',
        'fas fa-phone',
        'fas fa-map-marker-alt',
        'fas fa-envelope'
    ]

    show_select(emp_inp=null){
        cr.msg('<div id="cr_all_item_icon"></div>',"Select Icon","",()=>{
            $.each(cr_icon.list_icon,function(index,ico){
                var emp_icon=$(`<button class="btn btn-sm btn-light m-1"><i class="${ico}"></i></button>`)
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