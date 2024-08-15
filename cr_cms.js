class Post_Field{
    label="Field Name";
    id="field_id";
    value="";
}

class Post{
    id_collection="";
    label="Post new";
    data_form_add={};

    constructor(){
        this.data_form_add["fields"]=[];
    }

    show_form_add(){
        var html='';
        let fields=this.data_form_add.fields;
        html+='<form class="card mt-3">';
        html+='<div class="card-header">Form Add Data</div>';
        html+='<div class="card-body">';
        html+=' <h5 class="card-title">Add Data</h5>';
        $.each(fields,function(index,field){
            html+='<div class="mb-3">';
            html+='<label for="'+field.id+'" class="form-label">'+field.name+'</label>';
            html+='<input type="email" class="form-control inp_cmd_field" id="'+field.id+'" placeholder="Enter data">';
            html+='</div>';
        });
        html+='<a href="#" class="btn btn-primary" id="btn_frm_add"><span data-feather="plus-circle"></span> Add</a>';
        html+='</div>';
        html+='</form>';
        var emp_form=$(html);
        var collection=this.id_collection;
        $(emp_form).find("#btn_frm_add").click(function(){
            cr.msg("Add success");
            cr_firestore.add({},collection);
            return false;
        });
        return emp_form;
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
        this.show_list_menu_sidebar();
        this.show_post_object(this.index_post_cur);

        $("#list_info").html("");
        $("#list_info").append(this.sidebar_item_info("ID:"+cr_firestore.id_project));
        $("#list_info").append(this.sidebar_item_info("Key:"+cr_firestore.api_key));
    }

    sidebar_item_info(name){
        var item_info=$('<li class="nav-item"><a class="nav-link text-break"><span data-feather="file-text"></span> <small>'+name+'</small></a></li>');
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
        $("#main_contain").html(this.list_post[index].show_form_add());
        feather.replace();
    }

    field(id,name,type){
        var data_field={};
        data_field["id"]=id;
        data_field["name"]=name;
        data_field["type"]=type;
        return data_field;
    }
}
var cms=new CMS();