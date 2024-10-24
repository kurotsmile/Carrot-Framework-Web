class CMS{
    home_url="";

    list_post=[];
    index_post_cur=0;

    mode="dev";

    data_user_login=null;
    data_list_temp=null;
    collection_msg_box=null;

    is_collapse_box_add=false;

    label_user_collection="User";
    
    constructor(){
        var dashboard_general=new Post();
        dashboard_general.id_collection="all";
        dashboard_general.label="Dashboard";
        dashboard_general.icon='<i class="fas fa-tachometer-alt"></i>';
        dashboard_general.type="page";
        dashboard_general.js="dashboard_general";
        this.add(dashboard_general);
    }

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
        
        if(p){
            this.show_post_object(parseInt(p));
            cms.index_post_cur=parseInt(p);
        }else{
            this.show_post_object(this.index_post_cur);
        }
        this.load_list_post();
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
        p_user.label=cms.label_user_collection;
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
        p_menu_default.data_form_add.fields.push(cms.field('type', "Loại","list",[{value:"link",label:"Liên Kết"},{value:"functionJS",label:"Chức năng javascript"},{value:"none",label:"Trống"},{value:"draft",label:"Nháp"}]));
        p_menu_default.data_form_add.fields.push(cms.field('value', "Tham số (link,function,collection hoặt trang)"));
        p_menu_default.data_form_add.fields.push(cms.field('father', "Mục cha (Chọn mục làm menu cha nếu bạn muốn đây là menu con)","collection",id_collection));
        p_menu_default.data_form_add.fields.push(cms.field('id_customer', "ID tùy biến",'text','',false,'Thêm id tùy chỉnh nếu để trống hệ thống sẽ tự động tạo id theo (id_doc)'));
        p_menu_default.data_form_add.fields.push(cms.field('class', "Css Class tùy biến",'text'));
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
                cms.logout();
            });
            $("#list_info").append(item_user_logout);
        }
        $("#inp_cms_search").change(function(){
            cms.act_search();
        });
    }

    logout(){
        localStorage.removeItem("user_login");
        cms.data_user_login=null;
        cms.show_login();
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
        var p_cur_id=this.list_post[this.index_post_cur];
        $.each(this.list_post,function(index,p){
            p.index=index;
            var htm_item='<li role="button" class="nav-item d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center" id="m_p_'+index+'">';
            htm_item+='<a class="nav-link" aria-current="page" >'+p.icon+' '+p.label+'</a>';
            var emp_post=null;
            if(p_cur_id.id_collection!=p.id_collection){
                if(p.type=="list"&&p.id_collection!="file"){
                    htm_item+='<div>';
                        htm_item+='<i class="fas fa-list m-1 text-muted btn-list btn-mini" title="Quick View"></i>';
                        htm_item+='<i class="fas fa-plus-circle m-1 text-muted btn-add btn-mini" title="Quick Add"></i>';
                    htm_item+='</div>';
                }
                htm_item+='</li>';
                emp_post=$(htm_item);
                $(emp_post).find(".btn-list").click(()=>{
                    cms.show_list_document(p.id_collection);
                    return false;
                });
    
                $(emp_post).find(".btn-add").click(()=>{
                    cms.box('<div id="frm_add_mini"></div>','Quick Add ('+p.label+')',()=>{
                        $("#frm_add_mini").append(p.form_body(null,"msg"));
                        return false;
                    });
                    return false;
                });
    
                $(emp_post).click(function(){
                    cms.index_post_cur=index;
                    cms.show_post_object(index);
                    return false;
                });
            }else{
                htm_item+='<div>';
                    htm_item+='<i class="fas fa-info-circle m-1 text-muted btn-info-post btn-mini" title="Struct View"></i>';
                htm_item+='</div>';

                emp_post=$(htm_item);

                $(emp_post).find(".btn-info-post").click(()=>{
                    cms.show_info_post(p);
                    return false;
                });
            }

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
        var keyword = $("#inp_cms_search").val();
        if(keyword.trim()==""){
            cr.msg("Từ khóa tìm kiếm không được để trống!","Tìm kiếm","warning");
        }

        var result = this.list_post.filter(function(item) {
            return Object.keys(item).some(function(key) {
                if(item[key]!=null) return item[key].toString().toLowerCase().includes(keyword.toLowerCase());
            });
        });

        var html='';
        html+='<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">';
        html+='<h3 class="h3">Search Result : <small class="text-muted">'+keyword+'</small></h3>';
        html+='</div>';

        html+='<div id="all_item_search_result"></div>';
        $("#main_contain").html(html);
        $.each(result,function(index,p){
            $("#all_item_search_result").append(cms.dashboard_item(p));
        });
        $("#inp_cms_search").val('');
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
        if(!cr.alive(input)) return '';
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

    import_data_list(collectionId){
        var p=cms.get_post_by_id_collection(collectionId);
        var html_imp='';
        html_imp+='<h1 class="h2 mt-5"><i class="fas fa-cloud-upload-alt"></i> Import data</h1>';
        html_imp+='<p>Upload json file to import corresponding data for <b>'+collectionId+'</b><br/>';
        html_imp+='<p id="status_import">Length:<b id="import_item_length">0</b> Done Item:<b id="import_item_count_done">0</b></p>';
        html_imp+='</p>';
        html_imp+='<input type="file" id="fileimport_data" />';
        $("#main_contain").html(html_imp);

        $('#fileimport_data').on('change', function(event) {
            
            const file = event.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = function(e) {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    if(p.type=='setting'){
                        Swal.showLoading();
                        cr_firestore.set(jsonData,"setting",collectionId,()=>{
                            cr.msg("Import Data Success!", "Import Data", "success");
                        });
                    }else{
                        $("#status_import").show();
                        let length_progress = jsonData.length;
                        $("#import_item_length").html(length_progress);
                        $.each(jsonData, function (index, d) {
                            if(p.type_db=='firestore'){
                                cr_firestore.set(d, collectionId, () => {
                                    $("#import_item_count_done").html(index);
                                    if (index >= length_progress - 1) {
                                        cr.msg("Import Data Success!", "Import Data", "success");
                                    }
                                });
                            }else{
                                var id_doc='';
                                if(cr.alive(d[p.key_main])){
                                    id_doc=d[p.key_main];
                                }
                                else{
                                    id_doc=cr.create_id();
                                    d["id_doc"]=id_doc;
                                }

                                cr_realtime.add(collectionId,id_doc,d, () => {
                                    $("#import_item_count_done").html(index);
                                    if (index >= length_progress - 1) {
                                        cr.msg("Import Data Success!", "Import Data", "success");
                                    }
                                });
                            }

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

        function delete_all_data_success(){
            setTimeout(() => {
                post.reload_list();    
            }, 2000);
        }

        var post=cms.list_post[cms.index_post_cur];
        cr.msg_question("Delete all item?","Delete All",()=>{
            if(post.type_db=="firestore"){
                $.each(cms.data_list_temp,function(index,d){
                    cr_firestore.delete(post.id_collection,d.id_doc);
                });
                delete_all_data_success();
            }

            if(post.type_db=="realtime"){
                cr_realtime.delete_collection(post.id_collection,()=>{
                    delete_all_data_success();
                });
            }

            if(post.type_db=="mysql"){
                cr.msg_loading();
                cr_mysql.delete_all(post.id_collection,()=>{
                    Swal.close();
                    delete_all_data_success();
                });
            }
        });
    }

    show_list_document(id_collection,emp_field=null,sub_box='box'){

        var p=cms.get_post_by_id_collection(id_collection);
        var type_db=p.type_db;
        var field_view=[];
        var field_select='id_doc';

        function get_fiels(limit=3){
            var array_field=[];
            $.each(p.data_form_add.fields,function(index,f){
                if(index>=limit) return false;
                array_field.push(f.id);
            });
            return array_field;
        }
        
        if(cms.collection_msg_box!=null){
            if(cms.collection_msg_box.field_view!=null)
                field_view=cms.collection_msg_box.field_view;
            else
                field_view=get_fiels(3);
            if(cms.collection_msg_box.field_select!=null) field_select=cms.collection_msg_box.field_select;
        }else{
            field_view=get_fiels(3);
        }

        if(type_db=="firestore"){
            cr_firestore.list(id_collection,datas=>{
                cms.msg_collection_data(p,field_view,datas,(data_item)=>{
                    if(emp_field) $(emp_field).val(data_item[field_select]);
                },sub_box); 
            });  
        }else{
            cr_realtime.list_one(id_collection,datas=>{
                var list_data=[];
                if(p.path_realtime!=null){
                    $.each(datas,function(i,d){
                        $.each(d,function(y,d_sub){
                            list_data.push(d_sub);
                        });
                    });
                }else{
                    list_data=datas;
                }
                cms.msg_collection_data(p,field_view,list_data,(data_item)=>{
                    if(emp_field) $(emp_field).val(data_item[field_select]);
                },sub_box); 

            }); 
        }
    }

    msg_collection_data(p,field_view,datas,onclick=null,sub_box='box'){
        function get_label_by_field_id(id){
            var label=id;
            $.each(p.data_form_add.fields,function(index,f){
                if(f.id==id){
                    label=f.name;
                    return false;
                }
            });
            return label;
        }

        function item_tr(item_data){
            var html_row='<tr role="button" class="w-100" style="text-align:left">';
            html_row+='<td>'+p.icon+'</td>';
            $.each(field_view,function(index,f){
                if(cr.alive(item_data[f.toString()]))
                    html_row+='<td>'+item_data[f.toString()]+'</td>';
                else
                    html_row+='<td>&nbsp;</td>';
            });
            html_row+='</tr>';
            var emp_item=$(html_row);
            $(emp_item).click(()=>{
                if(onclick){
                    onclick(item_data);
                    if(sub_box=='box')
                        cms.close_box();
                    else
                        Swal.close();
                }
            });
            return emp_item;
        }

        var htm_table='<div class="w-100">';
        htm_table+='<div class="input-group mb-3"><input id="inp_search_collection" type="text" class="form-control" placeholder="Search '+p.label+'"><button class="btn btn-outline-secondary" type="button" id="button-search-collection"><i class="fas fa-search"></i> Search</button></div>';
        htm_table+='<div class="table-responsive" style="max-height:320px">';
        htm_table+='<table class="table table-linght table-sm table-striped table-hover" style="overflow: auto;width: 100%;">';
        htm_table+='<thead>';
        htm_table+='<tr>';
            htm_table+='<th scope="col">#</th>';
            $.each(field_view,function(index,f){
                htm_table+='<th scope="col">'+get_label_by_field_id(f)+'</th>';
            });
        htm_table+='</tr>';
        htm_table+='</thead>';

        htm_table+='<tbody id="all_item_collection"></tbody>';
        htm_table+='</table>';
        htm_table+='</div>';
        if(sub_box=='box'){
            cms.box(htm_table,p.label,()=>{
                Swal.close();
                $('#all_item_collection').empty();
                $.each(datas,function(index,item_data){
                    $("#all_item_collection").append(item_tr(item_data)); 
                });  

                $("#inp_search_collection").on("keyup", function() {
                    var value = $(this).val().toLowerCase();
                    $("#all_item_collection tr").filter(function() {
                      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                    });
                });
            });
        }else{
            cr.msg(htm_table,p.label,'',()=>{
                $('#all_item_collection').empty();
                $.each(datas,function(index,item_data){
                    $("#all_item_collection").append(item_tr(item_data)); 
                });  

                $("#inp_search_collection").on("keyup", function() {
                    var value = $(this).val().toLowerCase();
                    $("#all_item_collection tr").filter(function() {
                      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                    });
                });
            },false);
        }
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
            if(post.type_db=="firestore") cr_firestore.update_field(id_doc,post.id_collection,"order",index.toString());
            if(post.type_db=="realtime") cr_realtime.updateData(post.id_collection,id_doc,{"order":index.toString()});
            if(post.type_db=="mysql") {
                var obj_new_order={};
                obj_new_order["id_doc"]=id_doc;
                obj_new_order["order"]=index.toString();
                cr_mysql.update(post.id_collection,obj_new_order);
            }
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

    get_post_by_id_collection(id_collection){
        var post_found=null
        $.each(cms.list_post,function(index,p){
            if(p.id_collection==id_collection){
                post_found=p;
                return false;
            }
        });
        return post_found;
    }

    general_item(key,val=0){
        var htm_item=$(`
            <li class="list-group-item m-0 p-0 d-flex justify-content-between align-items-center">
                ${key} <div class="bg-light rounded">${val}</div>
            </li>
        `);
        return htm_item;
    }

    dashboard_item(p){
        if(p.index==0) return;
        var html_item='';
        html_item+='<div class="col-6 col-md-3 col-xl-3 col-lg-3">';
            html_item+='<div role="button" class="card mb-4 box-shadow card_cms">';
                html_item+='<div class="card-header d-flex justify-content-between flex-wrap"><h6 class="my-0 font-weight-normal">'+p.label+'</h6><i class="btn_info_post fas fa-info-circle" style="color:#c3c3c3 !important"></i></div>';
                html_item+='<div class="card-body">';
                    html_item+='<div class="row">';
                        html_item+='<div class="col-3 text-center">'+p.icon+'</div>';
                        html_item+='<div class="col-9">';
                        html_item+='<ul class="list-group list_attr list-group-flush"></ul>';
                        html_item+='</div>';
                    html_item+='</div>';
                html_item+='</div>';
            html_item+='</div>';
        html_item+='</div>';
        var dashboard_item=$(html_item);
        $(dashboard_item).find(".list_attr").append(cms.general_item("Type Object",p.type));
        if(p.type_db=="firestore")
            $(dashboard_item).find(".list_attr").append(cms.general_item("Type Database",p.type_db));
        else if(p.type_db=="realtime")
            $(dashboard_item).find(".list_attr").append(cms.general_item("Type Database",'<i class="fas fa-circle live" ></i> '+p.type_db));
        else 
            $(dashboard_item).find(".list_attr").append(cms.general_item("Type Database",p.type_db));

        $(dashboard_item).find(".btn_info_post").click(()=>{
            cms.show_info_post(p);
            return false;
        });

        $(dashboard_item).click(()=>{
            cms.index_post_cur=p.index;
            cms.show_post_object(p.index);
            return false;
        });
        return dashboard_item;
    }

    dashboard_general(){

        var dashboard_chart=null;
        var messages = [
            "Hope you have a productive day!",
            "Wishing you a successful day at work!",
            "May your day be filled with accomplishments!",
            "Stay positive and have a great workday!",
            "Good luck with your tasks today!",
            "Hope today brings you closer to your goals!",
            "Have a smooth and efficient workday!",
            "May today be your best workday yet!",
            "Keep up the great work and have an amazing day!",
            "Wishing you a stress-free and fulfilling day!"
        ];

        function initializeChart() {
            var ctx = document.getElementById('dashboardChart').getContext('2d');
            dashboard_chart=new Chart(ctx, {
                type: 'bar',
                data:  {
                    labels: [],
                    datasets: [{
                        label: 'Overview data',
                        data: [],
                        backgroundColor: '#0e87d1a6',
                        borderColor: cr.color_btn,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {y: {beginAtZero: true}}
                }
            });
        }

        function chart_addData(label,val) {
            dashboard_chart.data.labels.push(label);
            dashboard_chart.data.datasets[0].data.push(val);
            dashboard_chart.update();
        }

        function load_list_dashboard(){
            $.each(cms.list_post,function(index,p){
                $("#all_item_dashboard").append(cms.dashboard_item(p));
                if(p.type=="list"){
                    if(p.type_db=="firestore"){
                        cr_firestore.list(p.id_collection,datas_p=>{
                            if(datas_p!=null){
                                p.data_temp=datas_p;
                                chart_addData(p.label,datas_p.length);
                            }
                        });
                    }
        
                    if(p.type_db=="realtime"){
                        cr_realtime.list(p.id_collection,datas_p=>{
                            if(datas_p!=null){
                                p.data_temp=datas_p;
                                chart_addData(p.label,datas_p.length);
                            }
                        });
                    }
        
                    if(p.type_db=="mysql"){
                        cr_mysql.list(p.id_collection,datas_p=>{
                            if(datas_p!=null){
                                p.data_temp=datas_p;
                                chart_addData(p.label,datas_p.length);
                            }
                        });
                    }
                }
            });
        }

        var html='<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">';
        html+='<h3 class="h3">Dashboard</h3>';
            html+='<div class="btn-toolbar mb-2 mb-md-0">';
            html+='<div class="btn-group me-2">';
                html+='<button type="button" class="btn btn-sm btn-outline-secondary" onclick="cms.export_all_data()"><i class="fas fa-cloud-download-alt"></i> Backup</button>';
                html+='<button type="button" class="btn btn-sm btn-outline-secondary" onclick="cms.import_data_list(\'*\')"><i class="fas fa-cloud-upload-alt"></i> Recover</button>';
            html+='</div>';
            html+='</div>'
        html+='</div>';

        if(cms.data_user_login!=null){
            html+='<div class="row mb-3" id="welcome">';
            html+='<div class="col-12">';
                html+='<div class="w-100 bg-secondary rounded p-2 text-white d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">';
                html+='<div>Welcome <b>'+cms.data_user_login.full_name+'</b> <br>'+messages[Math.floor(Math.random() * messages.length)]+'</div>';
                    html+='<div>';
                        html+='<button class="btn btn-outline-light m-1" onclick="cms.logout();"><i class="fas fa-sign-out-alt"></i></button>';
                        html+='<button class="btn btn-outline-light m-1" onclick="$(\'#welcome\').remove();"><i class="fas fa-times-circle"></i></button>';
                    html+='</div>';
                html+='</div>';
            html+='</div>';
            html+='</div>';
        }

        html+='<div class="row" id="all_item_dashboard"></div>';
        html+='<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">';
        html+='<h5 class="h5">Chart</h5>';
        html+='</div>';
        html+='<canvas id="dashboardChart" style="width:100%;height:300px" class="w-100"></canvas>';

        $("main").html(html);

        if (typeof Chart === 'undefined') {
            var script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/npm/chart.js";
            script.onload = function() {
                initializeChart();
                load_list_dashboard();
            };
            document.head.appendChild(script);
        } else {
            initializeChart();
            load_list_dashboard();
        }
    }

    export_all_data(){
        cr.download(cms.list_post,"Backup-"+cr.getDateTimeCur()+".json");
    }

    box(body,title,act_show=null){
        var html_box='';
        html_box+='<div class="modal fade modal-lg" id="box_cms" tabindex="-1" role="dialog" aria-labelledby="boxModalLabel" aria-hidden="true">';
        html_box+='<div class="modal-dialog" role="document">';
            html_box+='<div class="modal-content">';
            html_box+='<div class="modal-header">';
                html_box+='<h5 class="modal-title" id="boxModalLabel">'+title+'</h5>';
                html_box+='<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="$(\'#box_cms\').modal(\'hide\')">';
                html_box+='<span aria-hidden="true">&times;</span>';
                html_box+='</button>';
            html_box+='</div>';
            html_box+='<div class="modal-body">'+body+'</div>';
        html_box+='</div>';
        html_box+='</div>';
        html_box+='</div>';
        var emp_box=$(html_box);
        if($('#box_cms').length>0) $('#box_cms').remove();
        $("body").append(emp_box);
        $('#box_cms').modal('show');
        if(act_show) act_show();
    }

    close_box(){
        $('#box_cms').modal('hide');
    }

    show_info_post(p){
        var html_info='';
        html_info+='<div class="table-responsive" style="max-height:320px;text-align: left;">';
        html_info+='<table class="table table-striped table-sm" id="table_list_post">';
        html_info+='<thead>';
            html_info+='<tr>';
                html_info+='<th>Field</th>';
                html_info+='<th>Value</th>';
            html_info+='</tr>';
        html_info+='</thead>';
        html_info+='<tbody id="all_field_frm_view"></tbody>';
        html_info+='</table>';
        html_info+='</div>';
        cr.msg(html_info,"Thông tin cơ sỡ dữ liệu","",()=>{
            $.each(p, function( key, value ) {
                if(cr.alive(value)){
                    var html_item='';
                    var is_show=false;
                    if (typeof value === 'string') {
                        html_item='<tr><td class="text-muted">'+key+'</td><td>'+value+'</td></tr>';
                    } else if (typeof value === 'object'&& !Array.isArray(value)){
                        if (Object.keys(value).length!= 0){
                            html_item='<tr><td><i class="fas fa-object-group"></i> '+key+'</td><td><button class="btn btn-sm btn-dark"><i class="fas fa-list-alt"></i> View data Object</button></td></tr>';
                            is_show=true;
                        }
                    } else if (Array.isArray(value)) {
                        if(value.length!=0){
                            html_item='<tr><td><i class="fas fa-layer-group"></i> '+key+'</td><td><button class="btn btn-sm btn-dark"><i class="fas fa-list-alt"></i> View data Array</button></td></tr>';
                            is_show=true;
                        }
                    } else {
                        html_item='<tr><td>'+key+'</td><td>'+value+'</td></tr>';
                    }
                    var emp_item=$(html_item);
                    if(is_show){$(emp_item).click(()=>{ cms.show_info_post(value);});}
                    $("#all_field_frm_view").append(emp_item);
                }
            });
        });
        return false;
    }
}
var cms=new CMS();