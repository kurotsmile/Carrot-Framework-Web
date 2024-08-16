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
            html+='<input type="email" field-key="'+field.id+'" class="form-control inp_cmd_field" id="'+field.id+'" placeholder="Enter data">';
            html+='</div>';
        });
        html+='<a href="#" class="btn btn-primary" id="btn_frm_add"><span data-feather="plus-circle"></span> Add</a>';
        html+='</div>';
        html+='</form>';
        var emp_form=$(html);
        var collection=this.id_collection;
        var post_cur=this;
        $(emp_form).find("#btn_frm_add").click(function(){
            cr.msg("Add success");
            var data={};
            $(".inp_cmd_field").each(function(index,emp){
                var v=$(emp).val();
                var k=$(emp).attr("field-key");
                data[k]=v;
            });
            cr_firestore.add(data,collection);
            post_cur.load_data_for_list();
            return false;
        });
        return emp_form;
    }

    show_list(){
        var html='';
        html+='<div class="w-100">';
        html+='<h2 class="h3 mt-3">List</h2>';
        html+='<table class="table table-striped table-sm">';
        html+='<tbody id="list_post_table"></tbody>';
        html+='</table>';
        html+='</div>';
        return html;
    }

    load_data_for_list(){
        $("#list_post_table").html('');
        cr_firestore.list(this.id_collection,(data)=>{
            $.each(data,function(index,item_p){
                var htm_tr='<tr>';
                $.each(item_p,function(k,v){
                    htm_tr+='<td>'+v+'</td>';
                });
                htm_tr+='<td>';
                htm_tr+='<button class="btn btn-sm btn-info m-1">Edit</button>';
                htm_tr+='<button class="btn btn-sm btn-info m-1">Delete</button>';
                htm_tr+='</td>';
                htm_tr+='</tr>';

                let emp_tr=$(htm_tr);
                $("#list_post_table").append(emp_tr);
            })
        });
    }

    show(){
        $("#main_contain").html(this.show_form_add());
        $("#main_contain").append(this.show_list());
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
        this.show_list_menu_sidebar();
        this.show_post_object(this.index_post_cur);

        $("#list_info").html("");
        $("#list_info").append(this.sidebar_item_info("ID:"+cr_firestore.id_project));
        $("#list_info").append(this.sidebar_item_info("Key:"+cr_firestore.api_key));
        $("#inp_cms_search").change(function(){
            cms.act_search();
        });
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
        $("#main_contain").html('<div><h3 class="h3">Search Result</h3></div>');
    }
}
var cms=new CMS();