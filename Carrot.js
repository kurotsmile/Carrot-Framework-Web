class Carrot{

    lang="en";
    color_btn="#fa1675";

    loadJs(path_js, obj_call, func_call = "show") {
        if(window[obj_call]!=null){
            window[obj_call][func_call]();
        }else{
            $.getScript(path_js).done(function(script, textStatus) {
                if(obj_call!=null) window[obj_call][func_call]();
            })
            .fail(function(jqxhr, settings, exception) {
                Swal.fire({
                    title:"Error",
                    icon:"error",
                    text:"Script loading failed: " + exception
                })
            });
        }
    }

    set_color_btn(color){
        cr.color_btn=color;
    }

    show_setting(act_done=null){
        var html='';
        html+='<form>';
        html+='<div class="form-group">';
            html+='<label for="exampleInputEmail1"><i class="fas fa-globe-asia"></i> Language</label>';
            html+='<select class="form-control" id="dropdown_lang"><select>';
            html+='<small id="emailHelp" class="form-text text-muted">Select your country and language</small>';
        html+='</div>';
        html+='</form>';
        Swal.fire({
            title:"Setting",
            html:html,
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonColor: cr.color_btn,
            didOpen:()=>{
                $.getJSON('https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/lang.json', function(data) {
                    $.each(data.all_item,function(index,lang){
                        if(lang.key==m.lang)
                            $("#dropdown_lang").append($('<option>', { value: lang.key,text : lang.name,selected:true}));
                        else
                            $("#dropdown_lang").append($('<option>', { value: lang.key,text : lang.name}));
                    });
                });
            }
        }).then((result)=>{
            if(result.isConfirmed){
                cr.lang=$("#dropdown_lang").val();
                localStorage.setItem("lang",cr.lang);
                if(act_done!=null) act_done();
            }
        });
    }

    show_contact(){
        var html='';
        html+='<div>I offer development services for Unity3D applications and games across various platforms. Additionally, I can develop web apps and web games. I am available for participation in large projects. Feel free to contact me via email:</div>';
        html+='<ul class="text-left mt-3">';
        html+="<li>Phone:<a href='tel:'>0978651577</a></li>";
        html+="<li>Mail:<a href='mailto:tranthienthanh93@gmail.com'>tranthienthanh93@gmail.com</a></li>";
        html+='</ul>';

        Swal.fire({
            title:"Contacts",
            icon:"info",
            html:html,
            iconColor: cr.color_btn,
            confirmButtonColor: cr.color_btn
        })
    }

    show_pay(){
        Swal.fire({
            title: 'Order Item',
            html: `
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_xclick">
                <input type="hidden" name="business" value="tranthienthanh93@gmail.com">
                <input type="hidden" name="item_name" value="Sample Item">
                <input type="hidden" name="amount" value="2.00">
                <input type="hidden" name="currency_code" value="USD">
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynow_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
              </form>
            `,
            showConfirmButton: false,
            confirmButtonColor: cr.color_btn
          });
    }
}
var cr=new Carrot();