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
        'fas fa-users-cog',
        'fas fa-users',
        'fas fa-user-times',
        'fas fa-user-tie',
        'fas fa-user-tag',
        'fas fa-user-slash',
        'fas fa-user-shield',
        'fas fa-user-secret',
        'fas fa-user-plus',
        'fas fa-user-ninja',
        'fas fa-user-minus',
        'fas fa-user-md',
        'fas fa-user-lock',
        'fas fa-user-injured',
        'fas fa-user-graduate',
        'fas fa-user-friends',
        'fas fa-user-edit',
        'fas fa-user-cog',
        'fas fa-user-clock',
        'fas fa-user-circle',
        'fas fa-user-check',
        'fas fa-user-astronaut',
        'fas fa-user-alt-slash',
        'fas fa-user-alt',
        'fas fa-user',
        'fas fa-upload',
        'fas fa-unlock-alt',
        'fas fa-unlock',
        'fas fa-unlink',
        'fas fa-university',
        'fas fa-universal-access',
        'fas fa-undo-alt',
        'fas fa-undo',
        'fas fa-underline',
        'fas fa-umbrella-beach',
        'fas fa-umbrella',
        'fas fa-tv',
        'fas fa-tty',
        'fas fa-tshirt',
        'fas fa-truck-pickup',
        'fas fa-truck-moving',
        'fas fa-truck-monster',
        'fas fa-truck-loading',
        'fas fa-truck',
        'fas fa-trophy',
        'fas fa-tree',
        'fas fa-trash-alt',
        'fas fa-trash',
        'fas fa-transgender-alt',
        'fas fa-transgender',
        'fas fa-train',
        'fas fa-traffic-light',
        'fas fa-trademark',
        'fas fa-tractor',
        'fas fa-torii-gate',
        'fas fa-torii-gate',
        'fas fa-torah',
        'fas fa-tooth',
        'fas fa-toolbox',
        'fas fa-toilet-paper',
        'fas fa-toggle-on',
        'fas fa-toggle-off',
        'fas fa-tired',
        'fas fa-tint-slash',
        'fas fa-tint',
        'fas fa-times-circle',
        'fas fa-times',
        'fas fa-ticket-alt',
        'fas fa-thumbtack',
        'fas fa-thumbs-up',
        'fas fa-thumbs-down',
        'fas fa-thermometer-three-quarters',
        'fas fa-thermometer-quarter',
        'fas fa-thermometer-full',
        'fas fa-thermometer',
        'fas fa-theater-masks',
        'fas fa-th-list',
        'fas fa-th-large',
        'fas fa-th',
        'fas fa-text-width',
        'fas fa-text-height',
        'fas fa-temperature-high',
        'fas fa-teeth-open',
        'fas fa-teeth',
        'fas fa-taxi',
        'fas fa-tasks',
        'fas fa-tape',
        'fas fa-tags',
        'fas fa-tag',
        'fas fa-tachometer-alt',
        'fas fa-tablets',
        'fas fa-tablet-alt',
        'fas fa-tablet',
        'fas fa-table-tennis',
        'fas fa-table',
        'fas fa-syringe',
        'fas fa-sync-alt',
        'fas fa-sync',
        'fas fa-synagogue',
        'fas fa-swimming-pool',
        'fas fa-swimmer',
        'fas fa-swatchbook',
        'fas fa-surprise',
        'fas fa-superscript',
        'fas fa-sun',
        'fas fa-suitcase-rolling',
        'fas fa-suitcase',
        'fas fa-subway',
        'fas fa-subscript',
        'fas fa-stroopwafel',
        'fas fa-strikethrough',
        'fas fa-street-view',
        'fas fa-stream',
        'fas fa-store-alt',
        'fas fa-store',
        'fas fa-stopwatch',
        'fas fa-stop-circle',
        'fas fa-stop',
        'fas fa-sticky-note',
        'fas fa-stethoscope',
        'fas fa-step-forward',
        'fas fa-step-backward',
        'fas fa-star-of-life',
        'fas fa-star-of-david',
        'fas fa-star-half-alt',
        'fas fa-star-half',
        'fas fa-star-and-crescent',
        'fas fa-star',
        'fas fa-spa',
        'fas fa-gem',
        'far fa-gem',
        'fas fa-spider',
        'fas fa-skull',
        'fas fa-snowflake',
        'fas fa-share-alt-square',
        'fas fa-phone',
        'fas fa-map-marker-alt',
        'fas fa-envelope',
        'fas fa-home',
        'fas fa-tv',
        'fab fa-chrome',
        'fas fa-microphone',
        'fas fa-phone-square',
        'fas fa-key',
        'fas fa-sign-in-alt',
        'fas fa-box',
        'fas fa-boxes',
        'fas fa-dolly',
        'fas fa-hotel',
        'fas fa-sign-out-alt',
        'fab fa-youtube',
        'fas fa-hiking',
        'fas fa-route',
        'fab fa-facebook-square',
        'fab fa-telegram',
        'fas fa-motorcycle',
        'fas fa-language',
        'fas fa-info-circle',
        'fas fa-hippo',
        'fas fa-heart',
        'fas fa-gamepad',
        'fas fa-frog',
        'fas fa-fish',
        'fas fa-eye'
    ]

    emp_inp=null;

    show_select(emp_inp=null){
        var html='';
        html+='<div class="input-group mb-3">';
            html+='<input id="inp_search_name_icon" type="text" class="form-control" placeholder="Enter name icon" tabindex="-1">';
            html+='<button class="btn btn-outline-secondary" type="button" id="button-search-icon"><i class="fas fa-search"></i> Search</button>';
        html+='</div>';
        cr.emp_inp=emp_inp;
        html+='<div id="cr_all_item_icon" style="overflow: auto;width: 100%;height: 300px;"></div>';
        cr.msg(html,"Select Icon","",()=>{
            $("#button-search-icon").click(function(){
                var val_search_name_icon=$("#inp_search_name_icon").val();
                if(val_search_name_icon.trim()==""){
                    cr.msg("Vui lòng nhập tên biểu tượng!","Tìm kiếm biểu tượng","warning");
                    return false;
                }
                cr_icon.load_list_for_msg(val_search_name_icon);
            });

            $("#inp_search_name_icon").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $("#cr_all_item_icon button").filter(function() {
                  $(this).toggle($(this).attr("title").toLowerCase().indexOf(value) > -1);
                });
            });
            cr_icon.load_list_for_msg();

            if($('#box_cms').length>0) $('#box_cms').modal('hide');
        });
    }

    load_list_for_msg(key=''){
        $("#cr_all_item_icon").empty();
        $.each(cr_icon.list_icon,function(index,ico){
            if(key!=''){
                if(!ico.includes(key)) return true;
            }

            var emp_icon=$(`<button title="${ico}" class="btn btn-sm btn-light m-1"><i class="${ico}"></i></button>`)
            $(emp_icon).click(function(){
                $("#"+cr.emp_inp).val(ico);
                Swal.close();
                if($('#box_cms').length>0) $('#box_cms').modal('show');
            });
            $("#cr_all_item_icon").append(emp_icon);
        });
    }
}

var cr_icon=new CR_Icons();