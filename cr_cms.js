class Post_Field{
    label="Field Name";
    id="field_id";
    value="";
}

class Post{
    id_collection="";
    label="Post new";
    data_form_add={};
    id_document_edit="";

    constructor(){
        this.data_form_add["fields"]=[];
    }

    show_form_add(data_document=null){
        var html='';
        let fields=this.data_form_add.fields;
        html+='<form class="card mt-3">';
        html+='<div class="card-header">Form Add Data</div>';
        html+='<div class="card-body">';
        if(this.id_document_edit=="")
            html+=' <h5 class="card-title">Add Data</h5>';
        else
            html+=' <h5 class="card-title">Edit ('+this.id_document_edit+')</h5>';
        $.each(fields,function(index,field){
            html+='<div class="mb-3">';
            html+='<label for="'+field.id+'" class="form-label">'+field.name+'</label>';
            html+='<div class="input-group mb-3">';
            html+='<input type="email" field-key="'+field.id+'" class="form-control inp_cmd_field" id="'+field.id+'" value="'+(data_document!==null ? data_document[field.id]:"")+'" placeholder="Enter data">';
            if(field.type=="file")
                html+='<button onclick="cr_firestore.upload_file();return false;" class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fas fa-cloud-upload-alt"></i> Upload</button>';
            else
                html+='<button onclick="cr.paste(\'#'+field.id+'\');return false;" class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fas fa-clipboard"></i> Paste</button>';
            html+='</div>';
            html+='</div>';
        });

        if(this.id_document_edit==""){
            html+='<a href="#" class="btn btn-success" id="btn_frm_add"><i class="fas fa-plus-square"></i> Add</a>';
        }else{
            html+='<a href="#" class="btn btn-success m-1" id="btn_frm_add" ><i class="fas fa-check-square"></i> Done Update</a>';
            html+='<a href="#" class="btn btn-info m-1" id="btn_frm_back"><i class="fas fa-caret-square-left"></i> Back Add</a>';
        }
        
        html+='</div>';
        html+='</form>';
        var emp_form=$(html);
        var collection=this.id_collection;
        var post_cur=this;
        $(emp_form).find("#btn_frm_add").click(function(){
            var data={};
            $(".inp_cmd_field").each(function(index,emp){
                var v=$(emp).val();
                var k=$(emp).attr("field-key");
                data[k]=v;
            });

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
        html+='<table class="table table-striped table-sm">';
        html+='<tbody id="list_post_table"></tbody>';
        html+='</table>';
        html+='</div>';
        html+='</div>';
        return html;
    }

    load_data_for_list(){
        $("#list_post_table").html('');
        var p=this;
        cr_firestore.list(this.id_collection,(data)=>{
            $.each(data,function(index,item_p){
                var htm_tr='<tr>';
                $.each(item_p,function(k,v){
                    htm_tr+='<td>'+v+'</td>';
                });
                htm_tr+='<td>';
                htm_tr+='<button id-doc="'+item_p["id_doc"]+'" class="btn btn-sm btn-info m-1 btn_edit"><i class="fas fa-edit"></i></button>';
                htm_tr+='<button id-doc="'+item_p["id_doc"]+'" class="btn btn-sm btn-info m-1 btn_del"><i class="fas fa-trash"></i></button>';
                htm_tr+='</td>';
                htm_tr+='</tr>';

                let emp_tr=$(htm_tr);
                $(emp_tr).find(".btn_edit").click(function(){
                    let id_doc=$(this).attr("id-doc");
                    cr_firestore.get(p.id_collection,id_doc,(data_doc)=>{
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
        });
    }

    reload_list(){
        $("#list_cms_data").html(this.show_list());
        this.load_data_for_list();
    }

    show(){
        var html='';
        html+='<div class="d-block w-100" id="frm_cms_act"></div>';
        html+='<div class="d-block w-100" id="list_cms_data"></div>';
        $("#main_contain").html('');
        $("#main_contain").html(html);
        $("#frm_cms_act").html(this.show_form_add());
        $("#list_cms_data").html(this.show_list());
        this.load_data_for_list();
    }
}

class CMS{
    home_url="";

    list_post=[];
    index_post_cur=0;

    add(p){
        this.list_post.push(p);
    }

    onLoad(){
        this.home_url= window.location.origin;
        this.show_list_menu_sidebar();
        this.show_post_object(this.index_post_cur);

        $("#list_info").html("");
        var item_home_page=this.sidebar_item_info("Home Page",'<i class="fas fa-home"></i>');
        $(item_home_page).click(function(){
            window.open(cms.home_url,"_blank");
        });
        $("#list_info").append(item_home_page);
        $("#list_info").append(this.sidebar_item_info("ID Project",'',cr_firestore.id_project));
        $("#list_info").append(this.sidebar_item_info("Api Key",'',cr_firestore.api_key));
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
            var emp_post=$('<li class="nav-item"><a class="nav-link '+(cms.index_post_cur===index ? "active":"")+'" aria-current="page" href="#"><span data-feather="database"></span> '+p.label+'</a></li>');
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
        feather.replace();
    }

    field(id,name,type){
        var data_field={};
        data_field["id"]=id;
        data_field["name"]=name;
        data_field["type"]=type;
        return data_field;
    }

    show_setting(){
        cr.show_setting();
    }

    act_search(){
        $("#main_contain").html('<div><h2 class="">Search Result</h2></div>');
    }
}
var cms=new CMS();