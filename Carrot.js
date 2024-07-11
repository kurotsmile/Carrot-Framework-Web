class Carrot{

    lang="en";
    color_btn="#fa1675";

    site_name="Site Name";
    site_url="https://carrotstore.web.app";
    email1="tranthienthanh93@gmail.com";
    email2="kurotsmile@gmail.com";
    link_twitte="https://twitter.com/carrotstore1";
    link_pinterest="https://br.pinterest.com/tranrot93";
    link_linkedin="https://www.linkedin.com/in/tranthienthanh";
    link_fb="https://www.facebook.com/kurotsmile";
    contact_phone="+840978651577";

    onLoad(){
        $('head').append('<link rel="stylesheet" type="text/css" href="Carrot-Framework-Web/style.css">');
        this.addHandlebars();
    }

    setSiteName(name){
        this.site_name=name;
    }

    setSiteUrl(url){
        this.site_url=url;
    }

    addHandlebars(){
        if(window['Handlebars']==null) $("head").append('<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js"></script>');
    }

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

    setColor(color){
        cr.color_btn=color;
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
                        if(lang.key==cr.lang)
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
                if(act_done!=null) act_done({"lang":cr.lang});
            }
        });
    }

    show_contact(){
        var html='';
        html+='<div>I offer development services for Unity3D applications and games across various platforms. Additionally, I can develop web apps and web games. I am available for participation in large projects. Feel free to contact me via email:</div>';
        html+='<ul class="text-left mt-3">';
        if(this.contact_phone!="") html+="<li>Phone:<a href='tel:"+this.contact_phone+"'>"+this.contact_phone+"</a></li>";
        if(this.email1!="") html+="<li>Mail:<a href='mailto:"+this.email1+"'>"+this.email1+"</a></li>";
        if(this.email2!="") html+="<li>Mail:<a href='mailto:"+this.email2+"'>"+this.email2+"</a></li>";
        if(this.link_fb!="") html+="<li>Facebook:<a href='"+this.link_fb+"' target='_blank'>"+this.link_fb+"</a></li>";
        if(this.link_linkedin!="") html+="<li>Linkedin:<a href='"+this.link_linkedin+"' target='_blank'>"+this.link_linkedin+"</a></li>";
        if(this.link_pinterest!="") html+="<li>Pinterest:<a href='"+this.link_pinterest+"' target='_blank'>"+this.link_pinterest+"</a></li>";
        if(this.link_twitte!="") html+="<li>X:<a href='"+this.link_twitte+"' target='_blank'>"+this.link_twitte+"</a></li>";

        html+='</ul>';

        Swal.fire({
            title:"Contacts",
            icon:"info",
            html:html,
            iconColor: cr.color_btn,
            confirmButtonColor: cr.color_btn,
        })
    }

    addOrder(){
        var itemShopCard=$(`
                <div id='cr_order'>
                    <div>
                        <i class="fas fa-hourglass-end fa-spin"></i>
                        Please click here if you have already paid
                    </div>
                    <button class="btn btn-sm btn-dark" id="cr_order_close"><i class="fas fa-window-close"></i><button>
                </div>
            `);
        $(itemShopCard).find("#cr_order_close").click(function (e) {
            $("#cr_order").remove();
            return false;
        });

        $(itemShopCard).click(function(){
            Swal.fire({
                text:"sdsd"
            });
        });
        $("body").append(itemShopCard);
    }

    show_pay(name_item='Test item',tip='Please start paying to use the corresponding function',price_item='2.00'){
        this.addOrder();
        Swal.fire({
            title: 'Order Item',
            html: `
              ${name_item} <br/><br/>
              <b style="color:${this.color_btn}"><i class="fas fa-dollar-sign"></i> ${price_item}</b> USD  <br/><br/>
              ${tip}
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_xclick">
                <input type="hidden" name="business" value="tranthienthanh93@gmail.com">
                <input type="hidden" name="item_name" value="${name_item}">
                <input type="hidden" name="amount" value="${price_item}">
                <input type="hidden" name="currency_code" value="USD">
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynow_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
              </form>
            `,
            showConfirmButton: false,
            confirmButtonColor: cr.color_btn
          });
    }

    show_pp(emp_contain,act_done=null,act_fail=null){
        this.get("Carrot-Framework-Web/privacy_policy/"+this.lang+".html?a=12",(data)=>{
            $(emp_contain).html(cr.getDataTemplate(data));
            if(act_done!=null) act_done();
        },act_fail);
    }

    getDataTemplate(data){
        var template = Handlebars.compile(data);
        var html = template({
            site_name: cr.site_name,
            site_url:cr.site_url,
            email1:cr.email1,
            email2:cr.email2,
            link_fb:cr.link_fb,
            link_linkedin:cr.link_linkedin,
            link_pinterest:cr.link_pinterest,
            link_twitte:cr.link_twitte,
            contact_phone:cr.contact_phone
        });
        return html;
    }

    show_tos(emp_contain,act_done=null,act_fail=null){
        this.get("Carrot-Framework-Web/terms_of_service/"+this.lang+".html?a=12",(data)=>{
            $(emp_contain).html(cr.getDataTemplate(data));
            if(act_done!=null) act_done();
        },act_fail);
    }

    get(url,act_done=null,act_fail=null){
        $.get(url)
        .done(function(data) {
            if(act_done!=null) act_done(data);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            Swal.fire({
                icon:"error",
                title:"Error",
                text:"Unable to download data from ("+url+"). Please try again later!",
                confirmButtonColor: cr.color_btn
            });
            if(act_fail!=null) act_fail();
        });
    }


    top(act_start=null,act_done=null){
        $('html, body').animate({ scrollTop: 0 }, 800, function() {
            if(act_start!=null) act_start();
            setTimeout(function() {
                if(act_done!=null) act_done();
            }, 1000);
        });
    }

    arg(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        var sParameterName;
    
        for (var i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    }

    showSearch(act_done=null){
        Swal.fire({
            title:"Search",
            input: "text",
            inputLabel:"Search Content",
            confirmButtonColor: cr.color_btn,
            preConfirm:(val)=>{
                if(val.trim()==""){
                    Swal.fire({
                        icon:"error",
                        text:"Search keywords cannot be empty!",
                        confirmButtonColor: cr.color_btn
                    });
                }else{
                    if(act_done!=null) act_done(val);
                }             
            }
        });
    }

    show_donation(){
        Swal.fire({
            title:"Donation",
            html:"<iframe id='kofiframe' src='https://ko-fi.com/thienthanhtran/?hidefeed=true&widget=true&embed=true&preview=true' style='border:none;width:100%;padding:4px;background:#f9f9f9;' height='712' title='thienthanhtran'></iframe>",
            confirmButtonColor: cr.color_btn,
        });
    }
}
var cr=new Carrot();