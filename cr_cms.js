class Post{
    id_collection="";
    label="Post new";
    data_form_add={};
    id_document_edit="";
    icon='<i class="fas fa-database"></i>';
    list_fields_table=null;
    type="list";

    constructor(){
        this.data_form_add["fields"]=[];
    }

    show_form_add(data_document=null){
        var html='';
        let fields=this.data_form_add.fields;
        html+='<form class="card mt-3">';
        if(this.type=="list"){
            html+='<div class="card-header">'+this.label+'</div>';
        }
        else{
            html+='<div class="card-header">Setting ('+this.label+')</div>';
        }

        html+='<div class="card-body">';
        if(this.id_document_edit=="")
            html+=' <h5 class="card-title">Add Data</h5>';
        else
            html+=' <h5 class="card-title">Edit ('+this.id_document_edit+')</h5>';

        html+='<div class="w-100" id="list_cms_field"></div>';

        if(this.type=='list'){
            if(this.id_document_edit==""){
                html+='<a href="#" class="btn btn-success" id="btn_frm_add"><i class="fas fa-plus-square"></i> Add</a>';
            }else{
                html+='<a href="#" class="btn btn-success m-1" id="btn_frm_add" ><i class="fas fa-check-square"></i> Done Update</a>';
                html+='<a href="#" class="btn btn-info m-1" id="btn_frm_back"><i class="fas fa-caret-square-left"></i> Back Add</a>';
            }
        }else{
            html+='<a href="#" class="btn btn-info" id="btn_frm_add"><i class="fas fa-save"></i> Save</a>';
        }
     
        html+='</div>';
        html+='</form>';
        var emp_form=$(html);

        $.each(fields,function(index,field){
            let html_field='<div class="mb-3">';
            html_field+='<label for="'+field.id+'" class="form-label">';
            html_field+=field.name;
            if(field.required) html_field+=' <b style="color:red">(*)</b>';
            html_field+='</label>';
            html_field+='<div class="input-group mb-3">';

            let val_field='';
            if(data_document!=null){
                if(cr.alive(data_document[field.id])) val_field=data_document[field.id];
            }

            if(field.type=="textarea"){
                html_field+='<textarea class="inp_cmd_field w-100 form-control" id="'+field.id+'" field-key="'+field.id+'" rows="10">'+val_field+'</textarea>';
            }
            else{
                html_field+='<input type="text" '+(field.type==="collection" ? 'list="'+field.id+'_list"': '')+' field-key="'+field.id+'" class="form-control inp_cmd_field" id="'+field.id+'" value="'+val_field+'" placeholder="Enter data" '+(field.required===true? "required":"")+'>';
            }
                
            
            if(field.type=="file"){
                html_field+='<button class="btn btn-outline-secondary btn_upload_file" type="button"><i class="fas fa-cloud-upload-alt"></i> Upload</button>';
                html_field+='<button class="btn btn-outline-secondary btn_select_file" type="button"><i class="fas fa-folder-open"></i> Select</button>';
            }else if(field.type=="textarea"){

            }
            else
                html_field+='<button onclick="cr.paste(\'#'+field.id+'\');return false;" class="btn btn-outline-secondary" type="button"><i class="fas fa-clipboard"></i> Paste</button>';
            html_field+='</div>';
            html_field+='</div>';
            let emp_field=$(html_field);

            if(field.type=="collection"){
                cr_firestore.list("network",(data)=>{
                    var html_list='';
                    html_list+='<datalist id="'+field.id+'_list">';
                    $.each(data,function(index,l){
                        html_list+='<option value="'+l.name+'">';
                    });
                    html_list+='</datalist>';
                    $(emp_field).after(html_list);
                });    
            }

            if(field.type=="textarea"){
                setTimeout(()=>{
                    $('#'+field.id).summernote();
                },200);
            }

            $(emp_field).find(".btn_upload_file").click(()=>{
                cr_firestore.upload_file((data)=>{
                    var downloadUrl = 'https://firebasestorage.googleapis.com/v0/b/'+cr_firestore.id_project+'.appspot.com/o/' + data.name + '?alt=media&token=' + data.downloadTokens;
                    $(emp_field).find(".inp_cmd_field").val(downloadUrl);
                });
                return false;
            });

            $(emp_field).find(".btn_select_file").click(()=>{
                cms.show_select_file((l)=>{
                    $(emp_field).find(".inp_cmd_field").val(l);
                });
            });
            emp_form.find("#list_cms_field").append(emp_field);
        });

        var collection=this.id_collection;
        var post_cur=this;
        $(emp_form).find("#btn_frm_add").click(function(){
            var data={};

            var allFilled = true;

            $('input[required]').each(function() {
              if ($(this).val() === '') {
                allFilled = false;
                $(this).css('border', '2px solid red');
              } else {
                $(this).css('border', '');
              }
            });

            if(allFilled==false){
                cr.msg("Vui lòng điền đẩy đủ các trường thông tin bắt buộc nhập","Lỗi các trường bắt buộc","warning");
                return false;
            }

            $(".inp_cmd_field").each(function(index,emp){
                var v=$(emp).val();
                var k=$(emp).attr("field-key");
                data[k]=v;
            });
            cr.msg_loading();
            if(post_cur.type=="list"){
                if(post_cur.id_document_edit==""){
                    cr_firestore.add(data,collection,()=>{
                        cr.msg("Add success","Add item success!","success");
                        $("#frm_cms_act").html(post_cur.show_form_add());
                        post_cur.reload_list();
                    });
                }else{
                    cr_firestore.update(data,collection,post_cur.id_document_edit,()=>{
                        cr.msg("Update success","Update item success!","success");
                        post_cur.id_document_edit="";
                        $("#frm_cms_act").html(post_cur.show_form_add());
                        post_cur.reload_list();
                    });
                }
            }else{
                cr_firestore.set(data,"setting",collection,()=>{
                    cr.msg("Setting","Update success!","success");
                })
            }
   
            return false;
        });

        $(emp_form).find("#btn_frm_back").click(function(){
            post_cur.id_document_edit="";
            $("#frm_cms_act").html(post_cur.show_form_add());
        });
        return emp_form;
    }

    show_edit(data){
        $("#frm_cms_act").html(this.show_form_add(data));
    }

    show_list(){
        var html='';
        html+='<div class="w-100">';
        html+='<h2 class="h3 mt-3">List</h2>';
        html+='<div class="w-100 table-responsive">';
        html+='<table class="table table-striped table-sm" id="table_list_post">';
        html+='<thead><tr id="list_head"><tr/></thead>';
        html+='<tbody id="list_post_table"></tbody>';
        html+='</table>';
        html+='</div>';
        html+='</div>';
        return html;
    }

    load_data_for_list(){
        $("#list_post_table").html('<tr><td class="w-100"><i class="fas fa-spinner fa-spin"></i> Loading...</td></tr>');
        var p=this;
        cr_firestore.list(this.id_collection,(data)=>{
            $("#list_post_table").html('');

            if(data.length==0){
                $("#list_post_table").html('<tr><td class="w-100 text-center"><i class="fas fa-sad-tear fa-5x"></i><br/>List None!</td></tr>');
            }
            var keys=[];
            if(p.list_fields_table==null)
                keys= Object.keys(data[0]);
            else
                keys= p.list_fields_table;

            keys.forEach(function(key) {
                $("#list_head").append("<th>" + key + "</th>");
            });
            $("#list_head").append("<th>Action</th>");

            $.each(data,function(index,item_p){
                var htm_tr='<tr>';

                if(p.list_fields_table!=null){
                    p.list_fields_table.forEach(function(key) {
                        htm_tr += "<td>" + cms.processString(item_p[key]) + "</td>";
                    });
                }else{
                    keys.forEach(function(key) {
                        htm_tr += "<td>" + cms.processString(item_p[key]) + "</td>";
                    });
                }

                htm_tr+='<td>';
                if(p.data_form_add!=null) htm_tr+='<button id-doc="'+item_p["id_doc"]+'" class="btn btn-sm btn-info m-1 btn_edit"><i class="fas fa-edit"></i></button>';
                htm_tr+='<button id-doc="'+item_p["id_doc"]+'" class="btn btn-sm btn-info m-1 btn_del"><i class="fas fa-trash"></i></button>';
                htm_tr+='</td>';
                htm_tr+='</tr>';

                let emp_tr=$(htm_tr);
                $(emp_tr).find(".btn_edit").click(function(){
                    let id_doc=$(this).attr("id-doc");
                    cr_firestore.get(p.id_collection,id_doc,(data_doc)=>{
                        cr.top();
                        p.id_document_edit=id_doc;
                        p.show_edit(data_doc);
                    })
                    return false;
                });
                $(emp_tr).find(".btn_del").click(function(){
                    let id_doc=$(this).attr("id-doc");
                    cr_firestore.delete(p.id_collection,id_doc,()=>{
                        cr.msg("Delete success","Delete item success!","success");
                        p.reload_list();
                    });
                    return false;
                });
                $("#list_post_table").append(emp_tr);
            })
        },()=>{
            cr.msg("Kết nối tới dữ liệu gặp xự cố","Kết nối lấy dữ liệu","error");
        });
    }

    reload_list(){
        $("#list_cms_data").html(this.show_list());
        this.load_data_for_list();
    }

    show(){
        var html='';
        html+='<div class="d-block w-100" id="frm_cms_act"></div>';
        html+='<div class="d-block w-100 mb-5" id="list_cms_data"></div>';
        $("#main_contain").html('');
        $("#main_contain").html(html);
        
        if(this.type=="list"){
            if(this.data_form_add!=null) $("#frm_cms_act").html(this.show_form_add());
            $("#list_cms_data").html(this.show_list());
            this.load_data_for_list();
        }

        if(this.type=="setting"){
            cr_firestore.get("setting",this.id_collection,(data_setting)=>{
                $("#frm_cms_act").html(this.show_form_add(data_setting));
            },()=>{
                $("#frm_cms_act").html(this.show_form_add());
            });
        }
    }
}

class CMS{
    home_url="";

    list_post=[];
    index_post_cur=0;

    mode="dev";

    data_user_login=null;

    add(p){
        this.list_post.push(p);
    }

    onLoad(){

        if(localStorage.getItem("user_login")) cms.data_user_login=JSON.parse(localStorage.getItem("user_login"));

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
        this.load_list_post();
        this.show_post_object(this.index_post_cur);
        this.load_list_action();
    }

    load_list_post(){
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
        p_user.data_form_add.fields.push(cms.field('role', "Vai trò"));
        p_user.data_form_add.fields.push(cms.field('username', "Tên đăng nhập(username)"));
        p_user.data_form_add.fields.push(cms.field('password', "Mật khẩu (Password)"));
        this.add(p_user);

        this.show_list_menu_sidebar();
    }

    load_list_action(){
        $("#list_info").html("");
        var item_home_page=this.sidebar_item_info("Home Page",'<i class="fas fa-home"></i>');
        $(item_home_page).click(function(){window.open(cms.home_url,"_blank");});
        $("#list_info").append(item_home_page);

        //$("#list_info").append(this.sidebar_item_info("ID Project",'',cr_firestore.id_project));
        //$("#list_info").append(this.sidebar_item_info("Api Key",'',cr_firestore.api_key));
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
            var emp_post=$('<li role="button" class="nav-item"><a class="nav-link '+(cms.index_post_cur===index ? "active":"")+'" aria-current="page" >'+p.icon+' '+p.label+'</a></li>');
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
    }

    field(id,name,type,data='',required=false){
        var data_field={};
        data_field["id"]=id;
        data_field["name"]=name;
        data_field["type"]=type;
        data_field["data"]=data;
        data_field["required"]=required;
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
            var html='';
            html+='<div class="d-block w-100 text-left" ><table class="table table-sm text-left"><tbody id="list_cms_file"></tbody></table></div>';
            cr.msg(html,"Select File",'',()=>{
                $.each(data,function(index,f){
                    var f_item=$('<tr><td><i class="fa-solid fa-file"></i> <b>'+f.name+'</b></td><td>'+f.contentType+'</td><td><span class="btn btn-sm btn-info"><i class="fas fa-check"></i></span></td></tr>');
                    $(f_item).click(function(){
                        var downloadUrl = 'https://firebasestorage.googleapis.com/v0/b/'+cr_firestore.id_project+'.appspot.com/o/' + f.name + '?alt=media&token=' + f.downloadTokens;
                        swal.close();
                        if(act_done) act_done(downloadUrl);
                    });
                    $("#list_cms_file").append(f_item);
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
                    cms.show();
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

    show(){
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
        this.show_list_menu_sidebar();
        this.show_post_object(this.index_post_cur);
        this.load_list_action();
    }

    processString(input) {
        var urlPattern = /^(https?:\/\/)?([\w\-\.]+\.[a-zA-Z]{2,})(\/[\w\-\.\?&=%]*)*$/;
        var imagePattern = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
    
        if (urlPattern.test(input)) {
            if (imagePattern.test(input)) {
                return `<img src="${input}" alt="Image" style="max-width: 100%; height: auto;">`;
            } else {
                return `<a href="${input}" target="_blank">${input}</a>`;
            }
        } else {
            return input;
        }
    }    
}
var cms=new CMS();