class CMS{
    home_url="";

    list_post=[];
    index_post_cur=0;

    mode="dev";

    data_user_login=null;
    data_list_temp=null;
    is_collapse_box_add=false;

    add(p){
        this.list_post.push(p);
    }

    onLoad(){
        if(localStorage.getItem("user_login")) cms.data_user_login=JSON.parse(localStorage.getItem("user_login"));
        if(localStorage.getItem("is_collapse_box_add")){
            if(localStorage.getItem("is_collapse_box_add")=="0")
                cms.is_collapse_box_add=false;
            else
                cms.is_collapse_box_add=true;
        }

        this.home_url= window.location.origin;
        cr.loadJs("Carrot-Framework-Web/summernote/summernote-bs4.min.js");
        $('head').append('<link rel="stylesheet" type="text/css" href="Carrot-Framework-Web/summernote/summernote-bs4.min.css">');

        if(this.mode=="dev"){
            this.show_dashboar();
        }else{
            if(cms.data_user_login==null)
                this.show_login();
            else
                this.show_dashboar();
        }
    }

    show_dashboar(){
        var html = '';
        html += '<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">';
            html += '<a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Manager Data</a>';
            html += '<button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>';
            html += '<input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" id="inp_cms_search">';
            html += '<div class="navbar-nav">';
            html += '<div class="nav-item text-nowrap"> ';
            html += '<a class="nav-link px-3" href="#" onclick="cr.show_setting();return false;"><i class="fas fa-cog"></i> Setting</a>';
            html += '</div>';
            html += '</div>';
        html += '</header>';

        html += '<div class="container-fluid">';
            html += '<div class="row">';
            html += '<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">';
            html += '<div class="position-sticky pt-3">';
            html += '<ul class="nav flex-column" id="list_post"></ul>';
            html += '<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">';
                html += '<span>Info Database Cloud</span>';
                html += '<a class="link-secondary" href="#" aria-label="Add a new report"><span data-feather="plus-circle"></span></a>';
            html += '</h6>';
            html += '<ul class="nav flex-column mb-2" id="list_info">';
                html += '<li class="nav-item"><a class="nav-link" href="#"><span data-feather="file-text"></span> Info Database Cloud</a></li>';
            html += '</ul>';
            html += '</div>';

            if(cms.data_user_login==null){
                html += '<div class="alert alert-warning alert-dismissible fade show" role="alert">';
                    html += '<strong>Security</strong> <small>Cms sẽ được cài mật khẩu và trang đăng nhập khi quá trình xây dựng web hoàn tất!</small>';
                    html += '<button onclick="$(this).parent().remove();" type="button" class="close btn btn-sm btn-dark" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                html += '</div>';
            }

            html += '</nav>';
            html += '<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="main_contain"></main>';
            html += '</div>';
        html += '</div>';

        $("body").html(html);
        $("body").removeClass("body_login text-center");

        var p=cr.arg("p");
        this.load_list_post();
        if(p){
            this.show_post_object(parseInt(p));
            cms.index_post_cur=parseInt(p);
        }else{
            this.show_post_object(this.index_post_cur);
        }
        this.load_list_action();
    }

    load_list_post(){

        this.add_menu("menu","Menu Default");

        var p_file=new Post();
        p_file.id_collection="file";
        p_file.data_form_add=null;
        p_file.label="File";
        p_file.icon='<i class="fas fa-file"></i>';
        p_file.list_fields_table=["name","updated","contentType"];
        this.add(p_file);

        var p_user=new Post();
        p_user.id_collection="user";
        p_user.label="User";
        p_user.icon='<i class="fas fa-user"></i>';
        p_user.data_form_add.fields.push(cms.field('full_name', "Tên đầy đủ"));
        p_user.data_form_add.fields.push(cms.field('role', "Vai trò","select",[{value:"admin",label:"Admin"},{value:"editor",label:"Editor"},{value:"user",label:"User"}]));
        p_user.data_form_add.fields.push(cms.field('username', "Tên đăng nhập(username)"));
        p_user.data_form_add.fields.push(cms.field('password', "Mật khẩu (Password)"));
        this.add(p_user);

        this.show_list_menu_sidebar();
    }

    add_menu(id_collection,label,icon='<i class="fas fa-bars"></i>'){
        var p_menu_default=new Post();
        p_menu_default.id_collection=id_collection;
        p_menu_default.label=label;
        p_menu_default.icon=icon;
        p_menu_default.data_form_add.fields.push(cms.field('name', "Tên",'text','',true));
        p_menu_default.data_form_add.fields.push(cms.field('icon', "Biểu tượng","icon"));
        p_menu_default.data_form_add.fields.push(cms.field('type', "Loại","list",[{value:"link",label:"Liên Kết"},{value:"functionJS",label:"Chức năng javascript"},{value:"none",label:"Trống"}]));
        p_menu_default.data_form_add.fields.push(cms.field('value', "Tham số (link,function,collection hoặt trang)"));
        p_menu_default.data_form_add.fields.push(cms.field('father', "Mục cha (Chọn mục làm menu cha nếu bạn muốn đây là menu con)","collection",id_collection));
        p_menu_default.data_form_add.fields.push(cms.field('class', "Css Class Customer",'text'));
        p_menu_default.data_form_add.fields.push(cms.field('order', "Thứ tự","number"));
        this.add(p_menu_default);
    }

    load_list_action(){
        $("#list_info").html("");
        var item_home_page=this.sidebar_item_info("Home Page",'<i class="fas fa-home"></i>');
        $(item_home_page).click(function(){window.open(cms.home_url,"_blank");});
        $("#list_info").append(item_home_page);

        if(cms.data_user_login!=null){
            $("#list_info").append(this.sidebar_item_info(cms.data_user_login.full_name,'<i class="fas fa-user-circle"></i>','User Login ('+cms.data_user_login.role+')'));
            var item_user_logout=this.sidebar_item_info("Đăng Xuất",'<i class="fas fa-sign-out-alt"></i>');
            $(item_user_logout).click(function(){
                localStorage.removeItem("user_login");
                cms.data_user_login=null;
                cms.show_login();
            });
            $("#list_info").append(item_user_logout);
        }
        $("#inp_cms_search").change(function(){
            cms.act_search();
        });
    }

    sidebar_item_info(name,icon='',val=''){
        var s_val='';
        let s_icon='';
        if(icon=='') s_icon='<i class="fas fa-leaf"></i>';
        else s_icon=icon;
        if(val!='') s_val='<small class="text-break text-muted">'+val+'</small>';
        var item_info=$('<li class="nav-item" role="button"><a class="nav-link">'+s_icon+' '+name+' '+s_val+'</a></li>');
        return item_info;
    }

    show_list_menu_sidebar(){
        $("#list_post").html('');
        $.each(this.list_post,function(index,p){
            var emp_post=$('<li role="button" class="nav-item" id="m_p_'+index+'"><a class="nav-link" aria-current="page" >'+p.icon+' '+p.label+'</a></li>');
            $(emp_post).click(function(){
                cms.index_post_cur=index;
                cms.show_post_object(index);
                return false;
            });
            $("#list_post").append(emp_post);
        });
    }

    show_post_object(index){
        this.show_list_menu_sidebar();
        this.list_post[index].show();
        cr.change_title(this.list_post[index].label,"?p="+index);
        $(".nav-item a").removeClass("active");
        $("#m_p_"+index+" a").addClass("active");
    }

    field(id,name,type,data='',required=false,tip=''){
        var data_field={};
        data_field["id"]=id;
        data_field["name"]=name;
        data_field["type"]=type;
        data_field["data"]=data;
        data_field["required"]=required;
        data_field["tip"]=tip;
        return data_field;
    }

    show_setting(){
        cr.show_setting();
    }

    act_search(){
        $("#main_contain").html('<div><h2 class="">Search Result</h2></div>');
    }

    show_select_file(act_done=null){
        cr.msg_loading();
        cr_firestore.list("file",(data)=>{
            if(data.length>0) data.sort(function(a, b) { return new Date(b.updated) - new Date(a.updated);});

            var html='';
            html+='<div class="d-block w-100 text-left" id="csm_all_files"></div>';
            cr.msg(html,"Select File",'',()=>{
                $.each(data,function(index,f){
                    var downloadUrl = 'https://firebasestorage.googleapis.com/v0/b/'+cr_firestore.id_project+'.appspot.com/o/' + f.name + '?alt=media&token=' + f.downloadTokens;
                    var f_item=$('<img role="button" src="'+downloadUrl+'" class="img-thumbnail m-1" style="width:60px;height:60px"/>');
                    $(f_item).click(function(){
                        swal.close();
                        if(act_done) act_done(downloadUrl);
                    });
                    $("#csm_all_files").append(f_item);
                });
            });
        });
    }

    show_login(){
        var html = '';
        html += '<main class="form-signin">';

            html += '<img class="mb-4" src="Carrot-Framework-Web/icon.ico" alt="" width="72" height="72">';
            html += '<h1 class="h3 mb-3 fw-normal">Please sign in</h1>';

            html += '<div class="form-floating">';
            html += '<input type="email" class="form-control" id="cms_username" placeholder="name@example.com">';
            html += '<label for="cms_username">Email address</label>';
            html += '</div>';
            html += '<div class="form-floating">';
            html += '<input type="password" class="form-control" id="cms_password" placeholder="Password">';
            html += '<label for="cms_password">Password</label>';
            html += '</div>';

            html += '<button id="btn_login_cms" class="w-100 btn btn-lg btn-primary" style="background-color:'+cr.color_btn+'">Sign in</button>';
            html += '<p class="mt-5 mb-3 text-muted">© CMS - 2024</p>';

        html += '</main>';
        $("body").html(html);
        $("body").addClass("body_login text-center");
        $("#btn_login_cms").click(function(){
            cr.msg_loading();
            var cms_password=$("#cms_password").val();
            var cms_username=$("#cms_username").val();
            var q=new Firestore_Query("user");
            q.add_where("username",cms_username);
            q.add_where("password",cms_password);
            q.set_limit(1);
            q.get_data((data)=>{
                if(data.length>0){
                    localStorage.setItem("user_login",JSON.stringify(data[0]));
                    cms.data_user_login=data[0];
                    cms.show_dashboar();
                    return false;
                }else{
                    cr.msg("Đăng nhập không thành công!","Đăng Nhập","error");
                }
            },()=>{
                cr.msg("Đăng nhập không thành công!","Đăng Nhập lỗi \nxin vui lòng thử lại!","error");
                return false;
            });
            return false;
        });
    }

    processString(input) {
        var urlPattern = /^(https?:\/\/)?([\w\-\.]+\.[a-zA-Z]{2,})(\/[\w\-\.\?&=%]*)*$/;
        var imagePattern = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
    
        if (urlPattern.test(input)) {
            if (imagePattern.test(input)) {
                return `<i class="fas fa-regular fa-image"></i> ${input}`;
            } else {
                return `<a href="${input}" target="_blank">${input}</a>`;
            }
        } else {
            return input;
        }
    }

    export_data_list(){
        let file_name=cms.list_post[cms.index_post_cur].id_collection;
        cr.download(cms.data_list_temp,file_name+".json");
        cr.msg("Export data ("+file_name+") success!","success");
    }

    import_data_list(collectionId,is_setting=false){
        var html_imp='';
        html_imp+='<h1 class="h2 mt-5"><i class="fas fa-cloud-upload-alt"></i> Import data</h1>';
        html_imp+='<p>Upload json file to import corresponding data<br/>';
        html_imp+='<progress min="0" max="100" value="0" class="w-100" id="status_import">';
        html_imp+='</p>';
        html_imp+='<input type="file" id="fileimport_data" />';
        $("#main_contain").html(html_imp);
        $("#status_import").hide();

        $('#fileimport_data').on('change', function(event) {
            
            const file = event.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = function(e) {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    if(is_setting){
                        Swal.showLoading();
                        cr_firestore.set(jsonData,"setting",collectionId,()=>{
                            cr.msg("Import Data Success!", "Import Data", "success");
                        })
                    }else{
                        $("#status_import").show();
                        let length_progress = jsonData.length;
                        $("#status_import").attr("max", length_progress);
                        $.each(jsonData, function (index, d) {
                            cr_firestore.add(d, collectionId, () => {
                                $("#status_import").attr("value", index);
                                if (index >= length_progress - 1) {
                                    cr.msg("Import Data Success!", "Import Data", "success");
                                }
                            });
                        });
                    }
                } catch (error) {
                  cr.msg('Không thể phân tích file JSON:'+error,"Import Error","error");
                }
              };
              reader.readAsText(file);
            }
        });
    }

    getFirebaseStorageUrl(bucketName, filePath, downloadToken) {
        const encodedFilePath = encodeURIComponent(filePath);
        const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedFilePath}?alt=media&token=${downloadToken}`;
        return fileUrl;
    }

    collapse_box_add(){
        if(cms.is_collapse_box_add){
            localStorage.setItem("is_collapse_box_add","0");
            cms.is_collapse_box_add=false;
            cms.collapse_box_add_show();
        }else{
            localStorage.setItem("is_collapse_box_add","1");
            cms.is_collapse_box_add=true;
            cms.collapse_box_add_hide();
        }
    }

    collapse_box_add_show(speed='fast'){
        if(speed=='none')
            $('#collapse_frm_add_body').show();
        else
            $('#collapse_frm_add_body').show(speed);
        $('#icon_collapse_box_add').attr("class","fas fa-caret-square-up");
    }

    collapse_box_add_hide(){
        $('#collapse_frm_add_body').hide('fast');
        $('#icon_collapse_box_add').attr("class","fas fa-caret-square-down");
    }

    filter_list(){
        var fields=cms.list_post[cms.index_post_cur].data_form_add.fields;
        var fields_select=cms.list_post[cms.index_post_cur].list_fields_show || [];
        var html='<ul class="list-group text-left">';
        $.each(fields,function(index,field){
            html+='<li class="list-group-item text-left"><input data-id="'+field.id+'" class="filter_list_check_box" type="checkbox" '+($.inArray(field.id,fields_select)!==-1 ? "checked":"")+' /> '+field.name+' <small style="font-size:11px;" class="text-muted">('+field.id+')</small></li>';
        });
        html+='</ul>';
        html+='<div class="w-100 mt-2 mb-2">';
        html+='<button class="btn btn-sm btn-dark m-2" onclick="cms.filter_list_select_all()"><i class="fas fa-check-square"></i> Select All</button>';
        html+='<button class="btn btn-sm btn-dark m-2" onclick="cms.filter_list_select_default()"><i class="fas fa-retweet"></i> Default</button>';
        html+='<button class="btn btn-sm btn-dark m-2" onclick="cms.filter_list_save()"><i class="fas fa-save"></i> Save</button>';
        html+='<button class="btn btn-sm btn-dark m-2" onclick="swal.close()"><i class="fas fa-times"></i> Close</button>';
        html+='</div>';
        cr.msg(html,"Filter","",null,false);
    }

    filter_list_select_all(){
        $(".filter_list_check_box").each(function(index){
            $(this).attr("checked","true");
        });
    }

    filter_list_select_default(){
        var fields_default=cms.list_post[cms.index_post_cur].list_fields_table || [];
        if(fields_default.length==0){
            cms.filter_list_select_all();
        }else{
            $(".filter_list_check_box").each(function(index){
                var id_field=$(this).data("id");
                if($.inArray(id_field,fields_default)!==-1)
                    $(this).prop("checked", true);
                else
                    $(this).prop("checked", false);
            });
        }
    }

    filter_list_save(){
        var post=cms.list_post[cms.index_post_cur];
        let fields=[];
        $(".filter_list_check_box").each(function(index){
            if($(this).is(':checked')){
                fields.push($(this).data("id"));
            }
        });
        post.list_fields_show=fields;
        localStorage.setItem("filter_"+post.id_collection,JSON.stringify(post.list_fields_show));
        swal.close();
        post.reload_list();
    }

    clear_data_list(){
        var post=cms.list_post[cms.index_post_cur];
        cr.msg_question("Delete all item?","Delete All",()=>{
            $.each(cms.data_list_temp,function(index,d){
                cr_firestore.delete(post.id_collection,d.id_doc);
            });

            setTimeout(() => {
                post.reload_list();    
            }, 2000);
        });
    }

    show_list_document(id_collection,emp_field){
        cr.msg('<div id="all_item_collection"></div>',id_collection,"",()=>{
            $('#all_item_collection').html('<i class="fas fa-spinner fa-spin"></i>');
            cr_firestore.list(id_collection,data=>{
                $('#all_item_collection').empty();
                $.each(data,function(index,item_data){
                    const firstTwoKeys = Object.keys(item_data).slice(0, 2);
                    let key_1='';
                    if(item_data['name']!=null)
                        key_1=item_data['name'];
                    else
                        key_1=item_data[firstTwoKeys[0]];
                    
                    var emp_item=$('<div class="w-100 btn btn-light mt-2" style="text-align:left"><i class="fas fa-circle"></i> '+key_1+' <small class="text-muted">'+item_data.id_doc+'</small></div>');
                    $(emp_item).click(()=>{
                        $(emp_field).val(item_data.id_doc);
                        Swal.close();
                    });
                    $("#all_item_collection").append(emp_item);    
                });
            });    
        });
    }

    show_sort_list(){
        $("#table_list_post tbody").sortable();
        $("#table_list_post tbody tr td .btn_edit").hide();
        $("#table_list_post tbody tr td .btn_del").hide();
        $("#table_list_post tbody tr td .btn_move").show();
        $(".btn-list-tool").hide();
        $("#btn_list_done_sort").show();
        $("#btn_list_cancel_sort").show();
    }

    sort_list_done(){
        cms.sort_list_hide();
        var post=cms.list_post[cms.index_post_cur];
        var order = $("#table_list_post tbody").sortable("toArray");
        $("#table_list_post tbody").sortable("destroy");

        $.each(order,function(index,id_doc){
            cr_firestore.update_field(id_doc,post.id_collection,"order",index.toString());
        });
    }

    sort_list_hide(){
        $("#table_list_post tbody tr td .btn_edit").show();
        $("#table_list_post tbody tr td .btn_del").show();
        $("#table_list_post tbody tr td .btn_move").hide();
        $(".btn-list-tool").show();
        $("#btn_list_done_sort").hide();
        $("#btn_list_cancel_sort").hide();
    }

    sort_list_cancel(){
        cms.sort_list_hide();
        $("#table_list_post tbody").sortable("destroy");
    }
}
var cms=new CMS();