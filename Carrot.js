class Carrot{

    lang="en";
    list_lang=null;

    color_btn="#fa1675";
    color_active="#FAFA04";

    //Info
    site_name="Site Name";
    site_url="";
    email1="";
    email2="";
    link_twitte="";
    link_pinterest="";
    link_linkedin="";
    link_fb="";
    contact_phone="";
    link_tiktok="";
    link_youtube="";
    link_github="";

    data_order_cr=null;

    ver="0.1";

    dev=false;

    act_done_pay=null;
    btnTop=null;
    
    path="Carrot-Framework-Web";

    box_cur=null;

    multi_language=false;
    lang_data=null;

    list_icon_top=[
        '<i class="fas fa-arrow-circle-up"></i>',
        '<i class="fas fa-chevron-circle-up"></i>',
        '<i class="fas fa-chevron-up"></i>',
        '<i class="fas fa-caret-square-up"></i>',
        '<i class="far fa-arrow-alt-circle-up"></i>',
        '<i class="fas fa-angle-double-up"></i>',
        '<i class="fas fa-long-arrow-alt-up"></i>',
        '<i class="fas fa-level-up-alt"></i>',
        '<i class="fas fa-hand-point-up"></i>'
    ];
    index_cur_btn_top=0;
    
    onLoad(is_langs=false){
        if(localStorage.getItem("dev")!=null){
            if(localStorage.getItem("dev")=="1") this.dev=true;
        }
        if(localStorage.getItem("lang")!=null) this.lang=localStorage.getItem("lang");
        if(localStorage.getItem("index_cur_btn_top")!=null) this.index_cur_btn_top=parseInt(localStorage.getItem("index_cur_btn_top"));

        $('head').append('<link rel="stylesheet" type="text/css" href="Carrot-Framework-Web/carrot_style.css">');
        this.addHandlebars();
        if(localStorage.getItem("data_order_cr")!=null) {
            this.data_order_cr=JSON.parse(localStorage.getItem("data_order_cr"));
            this.addOrder(this.data_order_cr);
        }
        this.loadJs("Carrot-Framework-Web/cr_db_json.js");
        
        this.multi_language=is_langs;
        this.load_multi_language();
    }

    load_multi_language(){
        if(this.multi_language){
            this.get_json("lang/"+this.lang+".json",(data)=>{
                cr.lang_data=data;
                cr.update_lang();
            });
        }
    }

    update_lang(){
        if(this.lang_data!=null){
            $(".lang").each(function(index,emp){
                var key_lang=$(emp).attr("key_lang");
                if(cr.lang_data[key_lang]) $(emp).html(cr.lang_data[key_lang]);
            });
        }
    }

    setSiteName(name){
        this.site_name=name;
    }

    setSiteUrl(url){
        this.site_url=url;
    }

    setVer(ver){
        this.ver=ver;
    }

    change_title(s_title,s_url=''){
        document.title =s_title;
        history.pushState(null, s_title, s_url);
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
                cr.msg("Script loading failed: " + exception,"Error","error");
            });
        }
    }

    setColor(color){
        cr.color_btn=color;
    }

    set_color_btn(color){
        cr.color_btn=color;
    }

    set_color_active(color){
        cr.color_active=color;
    }

    l(key,key_default=''){
        var label='';
        if(this.lang_data!=null){
            if(this.lang_data[key]!=null)
                label=this.lang_data[key];
            else
                label=key_default;    
        }else{
            label=key_default;
        }

        if(label=="") label=key;
        return label;
    }

    show_setting(act_done=null,html_extension=''){
        var html='';
        html+='<form>';
        html+='<div class="form-group">';
            html+='<label for="dropdown_lang"><i onclick="cr.act_dev()" class="fas fa-globe-asia"></i> '+this.l("language","Language")+'</label>';
            html+='<select class="form-control" id="dropdown_lang"><select>';
            html+='<small id="dropdown_lang_tip" class="form-text text-muted">'+this.l("language_tip","Select your country and language")+'</small>';
        html+='</div>';

        html+='<div class="form-group">';
            html+='<label for="sel_btn_top"><i class="fas fa-scroll"></i> '+this.l("top_btn","Scroll Top Button")+'</label>';
            html+='<div class="d-block mt-1 mb-1" id="list_btn_top_setting"></div>';
            html+='<small id="list_btn_top_setting_tip" class="form-text text-muted">'+this.l("top_btn_tip",'Choose a style for the top scroll button that\'s right for you')+'</small>';
        html+='</div>';

        if(cr.dev){
            html+='<div class="form-group">';
                html+='<label for="dev_tool"><i class="fab fa-dev"></i> Programming support tools</label>';
                html+='<div class="d-block mt-1 mb-1" id="dev_tool">';
                    html+='<button class="btn btn-sm btn-dark" onclick="cr.get_google_drive_link();return false;"><i class="fab fa-google-drive"></i> Get Link Download From Google Drive</button>';
                html+='</div>';
                html+='<small id="dev_tool_tip" class="form-text text-muted">These are programming support functions</small>';
            html+='</div>';

            html+='<div class="form-group">';
                html+='<label for="dev_json"><i class="fas fa-file-invoice"></i> Json Editor</label>';
                html+='<div class="input-group">';
                    html+='<div class="custom-file">';
                        html+='<input type="file" class="form-control custom-file-input" id="dev_json_fileInput" aria-describedby="dev_json_fileInput" aria-label="Upload">';
                        html+='<label class="custom-file-label" for="customFile">Choose file</label>';
                    html+='</div>';
                html+='</div>';
                html+='<small id="dev_json_tip" class="form-text text-muted">These are programming support functions</small>';
            html+='</div>';
        }

        html+='</form>';
        html+=html_extension;

        var title='';
        if(this.dev)
            title="Settings for development mode";
        else
            title=this.l("setting","Setting");
        Swal.fire({
            title:title,
            html:html,
            showCancelButton: true,
            showCloseButton: true,
            cancelButtonText: cr.l("cancel","Cancel"),
            confirmButtonColor: cr.color_btn,
            didOpen:()=>{
                $.getJSON('https://raw.githubusercontent.com/kurotsmile/Database-Store-Json/main/lang.json', function(data) {
                    cr.list_lang=data.all_item;
                    $.each(cr.list_lang,function(index,lang){
                        if(lang.key==cr.lang)
                            $("#dropdown_lang").append($('<option>', { value: lang.key,text : lang.name,selected:true}));
                        else
                            $("#dropdown_lang").append($('<option>', { value: lang.key,text : lang.name}));
                    });
                });

                $.each(cr.list_icon_top,function(index,t){
                    var empSettingBtnTop='';
                    if(cr.index_cur_btn_top==index)
                        empSettingBtnTop=$('<span index="'+index+'" style="background-color:black;color:'+cr.color_active+'" class="m-1 btn cr_btn_top setting_review">'+t+'</span>');
                    else
                        empSettingBtnTop=$('<span index="'+index+'" style="background-color:'+cr.color_btn+'" class="m-1 btn cr_btn_top setting_review">'+t+'</span>');
                    $(empSettingBtnTop).click(function(){
                        var index=$(this).attr("index");
                        $(".cr_btn_top").attr("style","");
                        $(".cr_btn_top").css("background-color",cr.color_btn);
                        $(this).css("background-color","black");
                        $(this).css("color",cr.color_active);
                        cr.index_cur_btn_top=parseInt(index);
                        $(cr.btnTop).html(t);
                        localStorage.setItem("index_cur_btn_top",index);
                    });
                    $("#list_btn_top_setting").append(empSettingBtnTop);
                });

                if(cr.dev){
                    $('#dev_json_fileInput').on('change', function(event) {
                        var file = event.target.files[0];
                        if (file) {
                            var reader = new FileReader();
                            reader.onload = function(e) {
                                try {
                                    var jsonContent = JSON.parse(e.target.result);
                                    cr_data.edit(jsonContent,(datajson)=>{
                                        cr.download(datajson,"datajson.json");
                                    });
                                    Swal.close();
                                } catch (error) {
                                    cr.msg(error,"Error","error");
                                }
                            };
                            reader.readAsText(file);
                        }
                    });
                }
            }
        }).then((result)=>{
            if(result.isConfirmed){
                cr.lang=$("#dropdown_lang").val();
                localStorage.setItem("lang",cr.lang);
                cr.load_multi_language();
                if(act_done!=null) act_done({"lang":cr.lang});
            }
        });
    }

    get_google_drive_link(){
        this.input("Get Link Download","Get Link Download from Google Drive",(val)=>{
            Swal.fire({
                icon:"success",
                title:"Link create success",
                confirmButtonColor: cr.color_btn,
                iconColor: cr.color_btn,
                text:cr.replaceDriveUrl(val)
            });
        });
    }

    input(title='Enter data',txt='Please enter your data here',act_done=null){
        Swal.fire({
            title:title,
            input: "text",
            inputLabel:txt,
            confirmButtonColor: cr.color_btn,
            preConfirm:(val)=>{
                if(val.trim()==""){
                    Swal.fire({
                        icon:"error",
                        text:"Input data cannot be empty!",
                        confirmButtonColor: cr.color_btn
                    });
                }else{
                    if(act_done) act_done(val);
                }
            }
        });
    }

    replaceDriveUrl(driveUrl) {
        const regex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/;
        const match = driveUrl.match(regex);

        if (match && match[1]) {
            const fileId = match[1];
            const newUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=AIzaSyDKcjH_bDJz3EcqPdV5i62IZNVQ6EkyOFg`;
            return newUrl;
        } else {
            throw new Error('URL không hợp lệ hoặc không phải là Google Drive URL.');
        }
    }

    show_contact(){
        var html='';
        html+='<div>'+cr.l("contact_tip","I offer development services for Unity3D applications and games across various platforms. Additionally, I can develop web apps and web games. I am available for participation in large projects. Feel free to contact me via email:")+'</div>';
        html+='<ul class="text-left mt-3" style="list-style: none;">';
        if(this.contact_phone!="") html+="<li><i class='fas fa-phone'></i> Phone: <a href='tel:"+this.contact_phone+"'>"+this.contact_phone+"</a></li>";
        if(this.email1!="") html+="<li><i class='fas fa-envelope'></i> Mail: <a href='mailto:"+this.email1+"'>"+this.email1+"</a></li>";
        if(this.email2!="") html+="<li><i class='fas fa-envelope'></i> Mail: <a href='mailto:"+this.email2+"'>"+this.email2+"</a></li>";
        if(this.link_fb!="") html+="<li><i class='fab fa-facebook'></i> Facebook: <a href='"+this.link_fb+"' target='_blank'>"+this.link_fb+"</a></li>";
        if(this.link_linkedin!="") html+="<li><i class='fab fa-linkedin'></i> Linkedin: <a href='"+this.link_linkedin+"' target='_blank'>"+this.link_linkedin+"</a></li>";
        if(this.link_tiktok!="") html+="<li><i class='fab fa-tiktok'></i> TikTok: <a href='"+this.link_tiktok+"' target='_blank'>"+this.link_tiktok+"</a></li>";
        if(this.link_youtube!="") html+="<li><i class='fab fa-youtube'></i> YouTube: <a href='"+this.link_youtube+"' target='_blank'>"+this.link_youtube+"</a></li>";
        if(this.link_pinterest!="") html+="<li><i class='fab fa-pinterest'></i> Pinterest: <a href='"+this.link_pinterest+"' target='_blank'>"+this.link_pinterest+"</a></li>";
        if(this.link_twitte!="") html+="<li><i class='fab fa-x-twitter'></i> X: <a href='"+this.link_twitte+"' target='_blank'>"+this.link_twitte+"</a></li>";
        if(this.link_github!="") html+="<li><i class='fab fa-github'></i> Github: <a href='"+this.link_github+"' target='_blank'>"+this.link_github+"</a></li>";
    
        html+='</ul>';
        this.msg(html,cr.l("contact","Contact"),"info");
    }

    createCodeOrder(){
        const month = ["Rose", "Tulip", "Daisy", "Sunflower", "Lily", "Orchid", "Lavender", "Marigold", "Jasmine", "Chrysanthemum", "Poppy", "Peony"];
        const d = new Date();
        let name = month[d.getMonth()]+"-"+d.getFullYear();
        return name;
    }

    showConfimOrder(){
        var html='Enter the confirmation code we sent to your email!';
        html+='<input class="form-control mt-2" id="codeConfimOrder"/>'
        Swal.fire({
            title:'Confirm purchase',
            html:html,
            confirmButtonColor: cr.color_btn
        }).then((result)=>{
            if(result.isConfirmed){
                var codeConfimOrder=$("#codeConfimOrder").val();
                if(codeConfimOrder==cr.createCodeOrder()){
                    Swal.fire({
                        icon:"success",
                        title:"Confirm purchase",
                        text:'Successful order confirmation!\n You can use the purchased products!',
                        confirmButtonColor: cr.color_btn
                    });
                    setTimeout(()=>{
                        if(cr.data_order_cr.type=="link") 
                            window.open(cr.data_order_cr.val, '_blank').focus();
                        else
                            localStorage.setItem(cr.data_order_cr.type,cr.data_order_cr.val);
                        
                        if(cr.act_done_pay!=null) cr.act_done_pay(cr.data_order_cr);
                        cr.deleteOrder();
                    },2000);
                }else{
                    Swal.fire({
                        icon:"error",
                        title:"Confirm purchase",
                        text:'The order verification code is incorrect, please check your email!',
                        confirmButtonColor: cr.color_btn
                    });
                }
            }
        });
    }

    deleteOrder(){
        this.data_order_cr=null;
        localStorage.removeItem("data_order_cr");
        $("#cr_order").remove();
    }

    addOrder(dataOrder){
        this.data_order_cr=dataOrder;
        localStorage.setItem("data_order_cr",JSON.stringify(this.data_order_cr));
        var itemShopCard=$(`
                <div id='cr_order' role="button">
                    <i class="fas fa-hourglass-end fa-spin" id="cr_order_icon"></i>
                    <div id='cr_order_body'>    
                        Please click here if you have already paid
                    </div>
                    <button class="btn btn-sm btn-dark" id="cr_order_close"><i class="fas fa-window-close"></i></button>
                </div>
            `);
        $(itemShopCard).find("#cr_order_close").click(function (e) {
            cr.deleteOrder();
            return false;
        });

        $(itemShopCard).click(function(){
            cr.showConfimOrder();
        });
        $("body").append(itemShopCard);
    }

    show_pay(name_item='Test item',tip='Please start paying to use the corresponding function',price_item='2.00',val='',type='link'){
        var dataOrder={"type":type,"val":val,"name":name_item,"price":price_item,"date": Date.now()};
        this.addOrder(dataOrder);
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
        this.get("Carrot-Framework-Web/privacy_policy/"+this.lang+".html?v="+this.ver,(data)=>{
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
        this.get("Carrot-Framework-Web/terms_of_service/"+this.lang+".html?v="+this.ver,(data)=>{
            $(emp_contain).html(cr.getDataTemplate(data));
            if(act_done!=null) act_done();
        },act_fail);
    }

    get(url,act_done=null,act_fail=null){
        $.get(url)
        .done(function(data) {
            if(act_done!=null) act_done(data);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            cr.msg("Unable to download data from ("+url+"). Please try again later!","Error","error");
            if(act_fail!=null) act_fail();
        });
    }

    top(act_start=null,act_done=null){
        $('html,body').animate({ scrollTop: 0 }, "slow", function() {
            if(act_start!=null) act_start();
            setTimeout(function() {
                if(act_done!=null) act_done();
            }, 1000);
        }); 
    }

    goto(emp,pos_top_exc=0){
        this.go_to(emp,pos_top_exc);
    }

    go_to(emp,pos_top_exc=0){
        $('html, body').animate({
            scrollTop: $(emp).offset().top-pos_top_exc
        }, 1000);
    }

    arg(sParam='') {
        if(sParam==''){
            var currentURL = window.location.href;
            var parts = currentURL.split('/').filter(function(part) {
                return part.length > 0;
            });
            var params = parts.slice(3);
            return params;
        }else{
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
    }

    showSearch(act_done=null){
        Swal.fire({
            title:cr.l("search","Search"),
            input: "text",
            inputLabel:cr.l("search_tip","Search Content"),
            confirmButtonColor: cr.color_btn,
            preConfirm:(val)=>{
                if(val.trim()==""){
                    Swal.fire({
                        icon:"error",
                        title:cr.l("search","Search"),
                        text:cr.l("search_error","Search keywords cannot be empty!"),
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

    act_dev(){
        if(this.dev){
            this.dev=false;
            localStorage.setItem("dev","0");
            this.msg("Enabled Publishing mode for web app","Publishing mode","success");
        }else{
            this.dev=true;
            localStorage.setItem("dev","1");
            this.msg("Enabled development mode for web app","Development mode","info");
        }
    }

    random(list){
        return this.get_random(list);
    }

    get_random(list){
        var index_random = Math.floor(Math.random() * list.length);
        return list[index_random];
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    limitItem(array, length) {
        var limitedArray = array.slice(0, length);
        return limitedArray;
    }

    sortKeys(jsonObject) {
        const entries = Object.entries(jsonObject);
        entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
        return Object.fromEntries(entries);
    }

    show_share(url='',title='',tip='Get Now'){
        this.share(url,title,tip);
    }

    share(url='',title='',tip='Get Now'){
        if(url=='') url=window.location.href;
        if(title=='') title=this.site_name;
        let shareData = {
            title: title,
            text: tip,
            url: url,
        }
        navigator.share(shareData);
    }

    copy(emp,is_input=true) {
        var $temp = $("<input>");$("body").append($temp);
        var s_copy='';
        if(is_input)
            s_copy=$(emp).val();
        else
            s_copy=$(emp).html();
        $temp.val(s_copy).select();
        document.execCommand("copy");$temp.remove();
    }

    paste(emp=null,act_done=null) {
        navigator.clipboard.readText().then(text => {
            if(emp) $(emp).val(text.trim());
            if(act_done) act_done(text.trim());
        });
    }

    add_btn_top(){
        var empBtnTop=$(`<div id="cr_btn_top" style="background-color:${cr.color_btn};display:none;" onclick="cr.top();return false;">${this.list_icon_top[this.index_cur_btn_top]}</div>`);
        $("body").append(empBtnTop);
        this.btnTop=empBtnTop;
        $(window).scroll(function() {
            var windowHeight = $(window).height();
            var scrollTop = $(window).scrollTop();
    
            if (scrollTop > windowHeight / 2) {
                cr.btnTop.fadeIn();
            } else {
                cr.btnTop.fadeOut();
            }
       });
       return empBtnTop;
    }

    show_youtube(link_ytb,html_extension="",act_done_show=null) {
        m.song.box_info_menu_cur = "video";
        var html = '<iframe width="100%" height="315" src="https://www.youtube.com/embed/' + cr.getYouTubeVideoId(link_ytb) + '?autoplay=0" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
        html += html_extension;
        Swal.fire({
            title: data.name,
            html: html,
            confirmButtonColor: cr.color_btn,
            didOpen: () => {
                if(act_done_show!=null) act_done_show();
            }
        });
    }

    getYouTubeVideoId(url) {
        var regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        var match = url.match(regex);
        return (match && match[1]) ? match[1] : null;
    }

    download(data,file_name,type_file='application/json'){
        var dataString = '';
        if(type_file=='application/json') dataString = JSON.stringify(data);
        else dataString=data;
        var blob = new Blob([dataString], { type:type_file});
    
        var url = URL.createObjectURL(blob);
        
        var a = document.createElement('a');
        a.href = url;
        a.download = file_name;
        a.click();
        URL.revokeObjectURL(url);
    }

    create_id(length=8) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        var timestamp = new Date().getTime();
        return result + timestamp; 
    }

    btn(label='',icon='<i class="fas fa-bullseye"></i>'){
        var btn=$(`<button class="btn">${icon} ${label}</button>`);
        return btn;
    }

    add_btn_box(emp_btn){
        $(this.box_cur).find(".modal-footer").append(emp_btn);
    }

    box_title(s_title){
        $(this.box_cur).find(".modal-title").html(s_title);
    }

    box(title='Box Title',body='',show_done=null,act_done=null,act_close=null,footer=''){
        if(this.box_cur==null){
            var id_box="cr_box_"+cr.create_id();
            var empBox=$(`
                <div class="modal fade" id="${id_box}" role="dialog" aria-labelledby="cr_box_Label" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${body}
                    </div>
                    <div class="modal-footer">
                        ${footer}
                    </div>
                    </div>
                </div>
                </div>
            `);

            this.box_cur=empBox;

            $("body").append(cr.box_cur).ready(function() {
                $(cr.box_cur).modal('show');
                if(show_done!=null) show_done(cr.box_cur);
            });
        }else{
            $(cr.box_cur).modal('show');
            $(cr.box_cur).find(".modal-footer").html("");
            $(cr.box_cur).find(".modal-title").html(title);
            $(cr.box_cur).find(".modal-body").html(body).ready(function(){
                if(show_done!=null) show_done(cr.box_cur);
            });
        }

        if(act_done!=null){
            var btn_done=$(`<button type="button" style="background:${cr.color_btn}" class="btn text-white btn_cr_ok">Ok</button>`);
            $(btn_done).click(function(){
                $(cr.box_cur).modal('hide');
               if(act_done!=null) act_done();
            });
            $(cr.box_cur).find(".modal-footer").append(btn_done);
        }

        if(act_close!=null){
            var btn_cancel=$(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`); 
            $(cr.box_cur).find(".modal-footer").append(btn_cancel);
        }

        $(this.box_cur).on('hidden.bs.modal', function () {
            if(act_close!=null) act_close();
        });

        return this.box_cur;
    }

    get_json(url, act_done, act_fail = null) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                act_done(data);
            })
            .catch(error => {
                if (act_fail) {
                    act_fail(error);
                } else {
                    console.error('Error:', error);
                }
        });
    }
    
    msg(msg='',title='',icon='',act_show=null,showConfirmButton=true){
        var obj_msg={
            title:title,
            iconColor: cr.color_btn,
            confirmButtonColor: cr.color_btn
        }
        if(title!='') obj_msg["title"]=title;
        if(icon!='') obj_msg["icon"]=icon;
        if(this.containsHTMLTags(msg))
            obj_msg["html"]=msg;
        else
            obj_msg["text"]=msg;
        if(act_show) obj_msg["didOpen"]=act_show;
        obj_msg["showConfirmButton"]=showConfirmButton;
        Swal.fire(obj_msg);
    }

    msg_loading(){
        Swal.showLoading();
    }

    msg_question(msg,title,act_yes=null,act_no=null){
        var html='';
        html+='<p>'+msg+'</p>';
        html+='<p id="msg_cr_all_btn"></p>';
        cr.msg(html,title,"question",()=>{
            var btn_yes=$('<button class="btn btn-info m-1"><i class="fas fa-check"></i> Yes</button>');
            $(btn_yes).click(()=>{
                Swal.close();
                if(act_yes) act_yes();
            });

            var btn_no=$('<button class="btn btn-dark m-1"><i class="fas fa-times"></i> No</button>');
            $(btn_no).click(()=>{
                Swal.close();
                if(act_no) act_no();
            });
            $("#msg_cr_all_btn").append(btn_yes);
            $("#msg_cr_all_btn").append(btn_no);
        },false);
    }

    containsHTMLTags(str) {
        const htmlTagPattern = /<\/?[a-z][\s\S]*>/i;
        return htmlTagPattern.test(str);
    }

    
    download_sitemap(list_link){
            
        function getCurrentDateFormatted(){
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        var xml='<?xml version="1.0" encoding="UTF-8"?>';
        xml+='<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
            $(list_link).each(function(index,l){
                xml+='<url>';
                xml+='<loc>'+l+'</loc>';
                xml+='<lastmod>'+getCurrentDateFormatted()+'</lastmod>';
                xml+='<changefreq>monthly</changefreq>';
                xml+='<priority>0.8</priority>';
                xml+='</url>';
            })
        xml+='</urlset>';
        cr.download(xml,'sitemap.xml','application/xml');
    }

    tr(val_tr,emp_tr,targetLanguage){
        $(emp_tr).addClass("bg-warning");
        $.ajax({
            url: 'https://api.mymemory.translated.net/get',
            method: 'GET',
            data: {
                q: val_tr,
                langpair: 'en|' + targetLanguage
            },
            success: function (response) {
                var translatedText = response.responseData.translatedText;
                $(emp_tr).val(translatedText).removeClass("bg-warning");
            },
            error: function () {
                $(emp_tr).val('Error occurred while translating.').removeClass("bg-warning");
            }
        });
    }

    checkLinkDownload(linkArray) {
        var index = 0;

        function checkNextLink() {
            if (index >= linkArray.length) {
                console.log('Tất cả các liên kết đã được kiểm tra.');
                return;
            }
            
            var link = linkArray[index];
            
            $.ajax({
                url: link,
                type: 'HEAD',
                success: function() {window.open(link, '_blank');},
                error: function() {
                    index++;
                    checkNextLink();
                }
            });
        }
        checkNextLink();
    }

    setTile(newTitle,arg_tag_and_val=''){
        var newURL='';
        if(arg_tag_and_val!='') newURL=cr.site_url+"?"+arg_tag_and_val;
        document.title = newTitle;
        window.history.pushState({}, newTitle, newURL);
    }

    setTitleAndURL(newTitle, newURL) {
        document.title = newTitle;
        window.history.pushState({}, newTitle, newURL);
    }
    
    alive(val){
        if(val==null)
            return false;
        else if(val=='')
            return false;
        else if(val==undefined)
            return false;
        else if(val=='undefined')
            return false;
        else
            return true;
    }

    show_menu_list(id_emp_father,id_collection,act_done=null){

        function check_ready(id_menu,array_child){
            var is_true=false;
            $.each(array_child,function(index,c){
                if(c.father==id_menu){
                    is_true=true;
                    return false;
                }
            });
            return is_true;
        }

        function m_menu_item(m,level='father',is_child=false){
            var val_href=' href="#" ';
            var val_func_js="";
            var id_m="";
            let li_class='';
            let a_class='';
            let emp_icon='';
            if(cr.alive(m.id_customer))
                id_m=m.id_customer;
            else 
                id_m=m.id_doc;
            if(cr.alive(m.icon)) emp_icon='<i class="'+m.icon+'"></i> ';
            if(level=='father'){
                if(is_child)
                    li_class='nav-item dropdown '+(cr.alive(m.class)? m.class:'');
                else
                    li_class='nav-item '+(cr.alive(m.class)? m.class:'');
                a_class='nav-link';
            }else{
                a_class='dropdown-item';
                if(cr.alive(m.class)) li_class=m.class;
            }

            if(m.type=="link") val_href=' href="'+m.value+'" ';
            if(m.type=="functionJS") val_func_js=' onClick="'+m.value+';return false;"';
            
            var emp_m_item='<li class="'+li_class+' cr_menu_item" id="'+id_m+'">';
            if(is_child)
                emp_m_item+='<a id="a_'+id_m+'" class="nav-link dropdown-toggle"  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" '+val_func_js+' '+val_href+' >'+emp_icon+''+m.name+'</a>';
            else
                emp_m_item+='<a id="a_'+id_m+'" class="'+a_class+'" aria-current="page" '+val_func_js+' '+val_href+' >'+emp_icon+''+m.name+'</a>';
            emp_m_item+='</li>';
            return emp_m_item;
        }

        $(id_emp_father).append('<li><i class="fas fa-spinner fa-spin"></i> Loading</li>');
        cr_firestore.list(id_collection,(datas)=>{
            $(id_emp_father).empty();
            datas.sort(function(a, b) { return parseInt(a.order) - parseInt(b.order);});

            var list_m_menus=datas;
            var list_m_father=[];
            var list_m_child=[];

            $.each(list_m_menus,function(index,m){
                if(m.father=="") 
                    list_m_father.push(m);
                else
                    list_m_child.push(m);
            });
            
            $(list_m_father).each(function(index,m){
                if(m.type=="draft") return true;
                let is_child=check_ready(m.id_doc,list_m_child);
                $(id_emp_father).append(m_menu_item(m,'father',is_child));
                if(is_child){
                    $('#'+m.id_doc).append('<ul class="dropdown-menu" aria-labelledby="m_a_'+m.id_doc+'" id="list_m_child_'+m.id_doc+'"></ul>');
                    $(list_m_child).each(function(index,c){
                        $('#list_m_child_'+m.id_doc).append(m_menu_item(c,'child'));
                    });
                }
            });

            if(act_done) act_done();
        });
    }

    getBaseUrl() {
        return window.location.origin;
    }

    create_id() {
        const timestamp = Date.now();
        const randomThreeDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return timestamp + '_' + randomThreeDigits;
    }
    
    convertObjectToArray(obj) {
        return Object.keys(obj).map(function(key) {
            return obj[key];
        });
    }

    getDateTimeCur(){
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const localDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        return localDateTime;
    }

    getDateCur(){
        var now = new Date();
        var year = now.getFullYear();
        var month = ('0' + (now.getMonth() + 1)).slice(-2);
        var day = ('0' + now.getDate()).slice(-2);
        var hours = ('0' + now.getHours()).slice(-2);
        var minutes = ('0' + now.getMinutes()).slice(-2);
        return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
    }

    field(id,label,type='text',val='',required=false,tip='',placeholder='',btn_extension=''){
        if(placeholder=='') placeholder='Enter data here...';
        var html='';
        html+='<div class="mb-3">';
            html+='<label for="'+id+'" class="form-label">'+label+''+(required?' <b style="color:red">(*)</b>':'')+'</label>';
            html+='<div class="input-group">';
                if(type=='select'){
                    html+='<select class="inp_cmd_field w-100 form-control" id="'+id+'" field-key="'+id+'">';
                    if(val!=''){
                        $.each(val,function(index,data_item){
                            html+='<option value="'+data_item.value+'" '+(val_field==data_item.value ? "selected":"")+'>'+data_item.label+'</option>';
                        });
                    }
                    html+='</select>';
                }else if(type=='textarea'){
                    html+='<textarea class="form-control" id="'+id+'" rows="3" placeholder="'+placeholder+'"></textarea>';
                }else{
                    html+='<input type="'+type+'" value="'+val+'" class="form-control" id="'+id+'" placeholder="'+placeholder+'" tabindex="-1">';
                    html+='<button onclick="cr.paste(\'#'+id+'\');return false;" class="btn btn-outline-secondary" type="button"><i class="fas fa-clipboard"></i> Paste</button>';
                }
                if(btn_extension!='') html+=btn_extension;
            html+='</div>';
            if(cr.alive(tip)) html+='<div id="'+id+'Help" class="form-text">'+tip+'</div>';
        html+='</div>';
        return html;
    }

}
var cr=new Carrot();