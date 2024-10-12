class Post{
    id_collection="";
    label="Post new";
    data_form_add={};
    id_document_edit="";
    icon='<i class="fas fa-database"></i>';
    list_fields_table=null;
    list_btn_table=[];
    list_fields_show=[];
    type="list"; //type list,page or setting
    js=null;
    js_act_done_frm=null;//Action for form done add or Update at data
    type_db="firestore";//realtime
    key_main='id_doc';

    constructor(){
        this.data_form_add["fields"]=[];
    }

    form_body(data_document=null){
        var html='<div>';
        let fields=this.data_form_add.fields;

        if(this.id_document_edit==""){
            if(this.type=="setting")
                html+=' <h5 class="card-title">Update Data <span class="text-muted" style="font-size:12px">('+this.id_collection+')</span></h5>';
            else
                html+=' <h5 class="card-title">Add Data <span class="text-muted" style="font-size:12px">('+this.id_collection+')</span></h5>';
        }
        else
            html+=' <h5 class="card-title">Edit ('+this.id_document_edit+')</h5>';

        html+='<div class="w-100 list_cms_field"></div>';

        if(this.type=='list'){
            if(this.id_document_edit==""){
                html+='<a href="#" class="btn btn-success" id="btn_frm_add"><i class="fas fa-plus-square"></i> Add</a>';
            }else{
                html+='<a href="#" class="btn btn-success m-1" id="btn_frm_add" ><i class="fas fa-check-square"></i> Done Update</a>';
                html+='<a href="#" class="btn btn-info m-1" id="btn_frm_back"><i class="fas fa-caret-square-left"></i> Back Add</a>';
            }
        }else{
            html+='<a href="#" class="btn btn-info" id="btn_frm_add"><i class="fas fa-save"></i> Save</a>';
            if(this.type=="setting"){
                cms.data_list_temp=data_document;
                html+='<button style="float:right" onclick="cms.export_data_list();return false;" class="btn btn-dark m-1 d-right"><i class="fas fa-file-download"></i> Export Data</button>';
                html+='<button style="float:right" onclick="cms.import_data_list(\''+this.id_collection+'\');return false;" class="float-right btn btn-dark m-1"><i class="fas fa-cloud-upload-alt"></i> Import Data</button>';
            }
        }
        html+='<div>';
        var emp_form=$(html);
        var collection=this.id_collection;
        var post_cur=this;
        
        $.each(fields,function(index,field){
            let html_field='<div class="mb-3">';
            html_field+='<label for="'+field.id+'" class="form-label">';
            html_field+=field.name;
            if(field.required) html_field+=' <b style="color:red">(*)</b>';
            html_field+=' <span class="text-muted" style="font-size:12px">('+field.id+')</span>';
            html_field+='</label>';
            html_field+='<div class="input-group mb-3">';

            let val_field='';
            if(data_document!=null){
                if(cr.alive(data_document[field.id])){
                    if(field.type=="textarea"){
                        function escapeHTML(html) {
                            return html.replace(/&/g, "&amp;")
                                       .replace(/</g, "&lt;")
                                       .replace(/>/g, "&gt;")
                                       .replace(/"/g, "&quot;")
                                       .replace(/'/g, "&#039;");
                        }
                        val_field=escapeHTML(data_document[field.id]);
                    }else{
                        val_field=data_document[field.id];
                    }
                }
                else{
                    if(field.type=="number") val_field="0";
                }
            }else{
                if(field.type=="number") val_field="0";
                if(field.type=="datetime-local"){
                    val_field=cr.getDateCur();
                }
                if(field.type=="user"){
                    val_field=cms.data_user_login.username;
                }
            }

            if(field.type=="textarea"){
                html_field+='<textarea class="inp_cmd_field w-100 form-control" id="'+field.id+'" field-key="'+field.id+'" rows="10">'+val_field+'</textarea>';
            }
            else if(field.type=="icon"){
                html_field+='<input type="text" field-key="'+field.id+'" class="form-control inp_cmd_field" id="'+field.id+'" value="'+val_field+'" placeholder="Enter data" '+(field.required===true? "required":"")+'>';
            }
            else if(field.type=="collection"){
                html_field+='<input type="text" field-key="'+field.id+'" class="form-control inp_cmd_field" id="'+field.id+'" value="'+val_field+'" placeholder="Enter data" '+(field.required===true? "required":"")+'>';
            }
            else if(field.type=="list"||field.type=="select"){
                html_field+='<select class="inp_cmd_field w-100 form-control" id="'+field.id+'" field-key="'+field.id+'">';
                $.each(field.data,function(index,data_item){
                    html_field+='<option value="'+data_item.value+'" '+(val_field==data_item.value ? "selected":"")+'>'+data_item.label+'</option>';
                });
                html_field+='</select>';
            }
            else if(field.type=='file'){
                html_field+='<input type="text" field-key="'+field.id+'" class="form-control inp_cmd_field" id="'+field.id+'" value="'+val_field+'" placeholder="Enter data" '+(field.required===true? "required":"")+'>';
            }
            else{
                html_field+='<input type="'+field.type+'" field-key="'+field.id+'" class="form-control inp_cmd_field" id="'+field.id+'" value="'+val_field+'" placeholder="Enter data" '+(field.required===true? "required":"")+'>';
            }

            if(field.type=="file"){
                html_field+='<button class="btn btn-outline-secondary btn_upload_file" type="button"><i class="fas fa-cloud-upload-alt"></i> Upload</button>';
                html_field+='<button class="btn btn-dark btn_select_file" type="button"><i class="fas fa-folder-open"></i> Select</button>';
            }else if(field.type=="textarea"){}
            else if(field.type=="icon"){
                html_field+='<button onclick="cr_icon.show_select(\''+field.id+'\');return false;" class="btn btn-outline-secondary" type="button"><i class="fas fa-list"></i> Select</button>';
                html_field+='<button onclick="cr.paste(\'#'+field.id+'\');return false;" class="btn btn-outline-secondary" type="button"><i class="fas fa-clipboard"></i> Paste</button>';
            }
            else if(field.type=="collection"){
                html_field+='<button class="btn btn-dark btn-sel-collection" type="button"><i class="fas fa-list"></i> Select</button>';
                html_field+='<button onclick="cr.paste(\'#'+field.id+'\');return false;" class="btn btn-outline-secondary" type="button"><i class="fas fa-clipboard"></i> Paste</button>';
            }
            else if(field.type=="list"||field.type=="select"){}
            else
                html_field+='<button onclick="cr.paste(\'#'+field.id+'\');return false;" class="btn btn-outline-secondary" type="button"><i class="fas fa-clipboard"></i> Paste</button>';
            html_field+='</div>';
            if(cr.alive(field.tip)) html_field+='<div id="emailHelp" class="form-text">'+field.tip+'</div>';
            html_field+='</div>';
            let emp_field=$(html_field);

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

            if(field.type=="collection"){
                $(emp_field).find(".btn-sel-collection").click(()=>{
                    var id_collection="";
                    if (typeof field.data === 'string') {
                        id_collection=field.data;
                        cms.collection_msg_box=null;
                    } else if (typeof field.data === 'object' && field.data !== null) {
                        id_collection=field.data.id_collection;
                        cms.collection_msg_box=field.data;
                    }
                    cms.show_list_document(id_collection,'#'+field.id);
                    return false;
                });
            }

            if(field.id=="order"&&val_field=="0"){
                if(cr.alive(post_cur.data_temp)){
                    setTimeout(()=>{$("#"+field.id).val(post_cur.data_temp.length);},1000);
                }
                else{
                    if($('#list_cms_data_'+post_cur.id_collection).length>0) setTimeout(()=>{$("#"+field.id).val($('#list_cms_data_'+post_cur.id_collection+' tbody tr').length);},1000);
                }
            }
            emp_form.find(".list_cms_field").append(emp_field);
        });


        $(emp_form).find("#btn_frm_add").click(function(){
            var data={};

            var allFilled = true;

            $(emp_form).find('input[required]').each(function() {
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

            $(emp_form).find(".inp_cmd_field").each(function(index,emp){
                var v=$(emp).val();
                var k=$(emp).attr("field-key");
                data[k]=v;
            });
            cr.msg_loading();
            if(post_cur.type=="list"){
                if(post_cur.id_document_edit==""){
                    if(post_cur.type_db=="realtime"){
                        var id_c='';
                        if(post_cur.key_main!='id_doc') 
                            id_c=data[post_cur.key_main];
                        else
                            id_c=cr.create_id();
                        data["id_doc"]=id_c;
                        cr_realtime.add(collection,id_c,data,()=>{
                            cr.msg("Add success","Add item realtime success!","success");
                            $("#frm_cms_act").html(post_cur.show_form_add());
                            if($('#box_cms').length>0) $('#box_cms').modal('hide').remove();
                            if(post_cur.js_act_done_frm!=null) cms[post_cur.js_act_done_frm](data);
                        });
                    }else{
                        cr_firestore.add(data,collection,()=>{
                            cr.msg("Add success","Add item success!","success");
                            $("#frm_cms_act").html(post_cur.show_form_add());
                            post_cur.reload_list();
                            if($('#box_cms').length>0) $('#box_cms').modal('hide').remove();
                            if(post_cur.js_act_done_frm!=null) cms[post_cur.js_act_done_frm](data);
                        });
                    }
                }else{
                    if(post_cur.type_db=="realtime"){
                        data['id_doc']=post_cur.id_document_edit;
                        cr_realtime.add(collection,post_cur.id_document_edit,data,()=>{
                            cr.msg("Update success","Update item realtime success!","success");
                            $("#frm_cms_act").html(post_cur.show_form_add());
                            if($('#box_cms').length>0) $('#box_cms').modal('hide').remove();
                            if(post_cur.js_act_done_frm!=null) cms[post_cur.js_act_done_frm](data);
                        });
                    }else{
                        cr_firestore.update(data,collection,post_cur.id_document_edit,()=>{
                            cr.msg("Update success","Update item success!","success");
                            post_cur.id_document_edit="";
                            $("#frm_cms_act").html(post_cur.show_form_add());
                            post_cur.reload_list();
                            if($('#box_cms').length>0) $('#box_cms').modal('hide').remove();
                            if(post_cur.js_act_done_frm!=null) cms[post_cur.js_act_done_frm](data);
                        });
                    }
                }
            }else{
                cr_firestore.set(data,"setting",collection,()=>{
                    cr.msg("Setting","Update success!","success");
                    if(post_cur.js_act_done_frm!=null) cms[post_cur.js_act_done_frm](data);
                    if($('#box_cms').length>0) $('#box_cms').modal('hide').remove();
                })
            }
   
            return false;
        });

        $(emp_form).find("#btn_frm_back").click(function(){
            post_cur.id_document_edit="";
            cms.is_collapse_box_add=false;
            $("#frm_cms_act").html(post_cur.show_form_add());
        });
        return emp_form;
    }

    show_form_add(data_document=null){
        var html='';
        let style_collapse="block";

        html+='<form class="card mt-3 accordion" id="frm_act_'+this.id_collection+'">';
        if(this.type=="list"){
            html+='<div class="card-header"><button class="btn btn-sm" onclick="cms.collapse_box_add();return false;"><i id="icon_collapse_box_add" class="fas '+(cms.is_collapse_box_add===false ? 'fa-caret-square-up':'fa-caret-square-down')+'"></i></button> '+this.label+' <small class="text-muted">('+this.type_db+')</small></div>';
            if(cms.is_collapse_box_add) style_collapse="none"; else style_collapse="block";
        }
        else{
            html+='<div class="card-header">Setting ('+this.label+' - '+this.type_db+')</div>';
        }

        html+='<div class="card-body" id="collapse_frm_add_body" style="display: '+style_collapse+'"></div>';
        html+='</form>';
       
        var emp_frm=$(html);
        $(emp_frm).find("#collapse_frm_add_body").append(this.form_body(data_document));
        return emp_frm;
    }

    show_edit(data){
        $("#frm_cms_act").html(this.show_form_add(data));
    }

    show_list(){
        var html='';
        html+='<div class="w-100 mt-5">';

        html+='<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">';
            html+='<h1 class="h3">List</h1>';
            html+='<div class="btn-toolbar mb-2 mb-md-0">';
                html+='<button onclick="cms.filter_list();return false;" class="float-right btn btn-sm btn-dark m-1 btn-list-tool"><i class="fas fa-filter"></i> Filter</button>';
                html+='<button id="btn_list_sort" onclick="cms.show_sort_list();return false;" class="float-right btn btn-sm btn-dark m-1 btn-list-tool"><i class="fas fa-sort"></i> Sort</button>';
                html+='<button style="display:none" id="btn_list_done_sort" onclick="cms.sort_list_done();return false;" class="float-right btn btn-sm btn-dark m-1 btn-list-tool"><i class="fas fa-check-circle"></i> Save Sort</button>';
                html+='<button style="display:none" id="btn_list_cancel_sort" onclick="cms.sort_list_cancel();return false;" class="float-right btn btn-sm btn-dark m-1 btn-list-tool"><i class="fas fa-times-circle"></i> Cancel Sort</button>';
                html+='<button onclick="cms.clear_data_list();return false;" class="float-right btn btn-sm btn-dark m-1 btn-list-tool"><i class="fas fa-trash-alt"></i> Clear All</button>';
                html+='<button id="btn_list_export" onclick="cms.export_data_list();return false;" class="float-right btn btn-sm btn-dark m-1 btn-list-tool"><i class="fas fa-file-download"></i> Export</button>';
                html+='<button id="btn_list_import" onclick="cms.import_data_list(\''+this.id_collection+'\');return false;" class="float-right btn btn-sm btn-dark m-1  btn-list-tool"><i class="fas fa-cloud-upload-alt"></i> Import</button>';
            html+='</div>';
        html+='</div>';

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

        function load_list(data){
            var is_order=false;
            $("#list_post_table").html('');
            cms.data_list_temp=data;
            if(data.length==0){
                $("#list_post_table").html('<tr><td class="w-100 text-center"><i class="fas fa-sad-tear fa-5x"></i><br/>List None!</td></tr>');
                $(".btn-list-tool").hide();
                $("#btn_list_import").show();
            }else{
                var first_data=data[0];
                if(cr.alive(first_data['order'])) is_order=true;
                var keys=[];
                if(p.list_fields_show==null)
                    keys= Object.keys(data[0]);
                else
                    keys= p.list_fields_show;

                $("#list_head").empty();
                $("#list_head").append("<th>Action</th>");

                if(p.id_collection=="file") $("#list_head").append("<th>Preview</th>");
                keys.forEach(function(key) {
                    $("#list_head").append("<th>" + key + "</th>");
                });
                $(".btn-list-tool").show();
                $("#btn_list_done_sort").hide();
                $("#btn_list_cancel_sort").hide();

                if(is_order){
                    $("#btn_list_sort").show();
                    data.sort(function(a, b) { return parseInt(a.order) - parseInt(b.order);});
                }else{
                    if(cr.alive(first_data['date'])){
                        data.sort(function(a, b) {
                            return new Date(b['date']) - new Date(a['date']);
                        });
                    }
                    $("#btn_list_sort").hide();
                }
            }
            
            $.each(data,function(index,item_p){
                var id_doc=item_p[p.key_main];
                var htm_tr='<tr id="'+id_doc+'">';
                htm_tr+='<td class="list_btn_tr">';
                    if(p.data_form_add!=null) htm_tr+='<button id-doc="'+id_doc+'" class="btn btn-sm btn-info m-1 btn_edit"><i class="fas fa-edit"></i></button>';
                    htm_tr+='<button id-doc="'+id_doc+'" class="btn btn-sm btn-info m-1 btn_del"><i class="fas fa-trash"></i></button>';
                    htm_tr+='<span style="display:none" class="btn btn-sm btn-info m-1 btn_move"><i class="fas fa-arrows-alt"></i></span>';
                htm_tr+='</td>';
    
                if(p.list_fields_show!=null){
                    if(p.id_collection=="file")htm_tr+='<td><img style="width:50px;height:50px" class="img-thumbnail" src="'+cms.getFirebaseStorageUrl(item_p['bucket'],item_p['name'],item_p['downloadTokens'])+'"/></td>'; 
                    p.list_fields_show.forEach(function(key) {
                        htm_tr += "<td class='col_t_"+key+"'>" + cms.processString(item_p[key]) + "</td>";
                    });
                }else{
                    keys.forEach(function(key) {
                        htm_tr += "<td class='col_t_"+key+"'>" + cms.processString(item_p[key]) + "</td>";
                    });
                }
    
                htm_tr+='</tr>';
    
                let emp_tr=$(htm_tr);
                $(emp_tr).find(".btn_edit").click(function(){
                    let id_doc=$(this).attr("id-doc");
                    if(p.type_db=="realtime"){
                        cr_realtime.getData(p.id_collection,id_doc,(data_doc)=>{
                            cr.top();
                            p.id_document_edit=id_doc;
                            p.show_edit(data_doc);
                            if(cms.is_collapse_box_add) cms.collapse_box_add_show('none');
                        });
                    }else{
                        cr_firestore.get(p.id_collection,id_doc,(data_doc)=>{
                            cr.top();
                            p.id_document_edit=id_doc;
                            p.show_edit(data_doc);
                            if(cms.is_collapse_box_add) cms.collapse_box_add_show('none');
                        });
                    }
                    return false;
                });
                $(emp_tr).find(".btn_del").click(function(){
                    let id_doc=$(this).attr("id-doc");
                    if(p.type_db=="realtime"){
                        cr_realtime.delete(p.id_collection,id_doc,()=>{
                            cr.msg("Delete success","Delete item success!","success");
                        });
                    }else{
                        cr_firestore.delete(p.id_collection,id_doc,()=>{
                            cr.msg("Delete success","Delete item success!","success");
                            p.reload_list();
                        });
                    }
                    return false;
                });

                if(p.list_btn_table.length>0){
                    $.each(p.list_btn_table,function(index,btn){
                        var html_btn='';
                        html_btn+='<span class="btn btn-sm btn-info '+(cr.alive(btn.class)? btn.class:"")+'">'+btn.label+'</span>';
                        var emp_btn=$(html_btn);
                        $(emp_btn).click(()=>{
                            cms.data_select=item_p;
                            cms[btn.onclick]();
                        });
                        $(emp_tr).find(".list_btn_tr").append(emp_btn);
                    });
                }
                $("#list_post_table").append(emp_tr);
            });
            if(p.js!=null) cms[p.js]();
        }
        var p=this;
        if(localStorage.getItem("filter_"+p.id_collection)) 
            p.list_fields_show=JSON.parse(localStorage.getItem("filter_"+p.id_collection));
        else
            p.list_fields_show=p.list_fields_table;

        $("#list_post_table").html('<tr><td class="w-100"><i class="fas fa-spinner fa-spin"></i> Loading...</td></tr>');
        
        if(this.type_db=="realtime"){
            cr_realtime.list(this.id_collection,(data)=>{
                if(data) 
                    load_list(data);
                else
                    load_list([]);
            },()=>{
                cr.msg("Kết nối tới dữ liệu gặp xự cố","Kết nối lấy dữ liệu","error");
            });
        }else{
            cr_firestore.list(this.id_collection,(data)=>{
                if(data) 
                    load_list(data);
                else
                    load_list([]);
            },()=>{
                cr.msg("Kết nối tới dữ liệu gặp xự cố","Kết nối lấy dữ liệu","error");
            });
        }
    }

    reload_list(){
        if($("#list_cms_data_"+this.id_collection).length>0){
            $("#list_cms_data_"+this.id_collection).html(this.show_list());
            this.load_data_for_list();
        }
    }

    show(){
        var html='';
        html+='<div class="d-block w-100" id="frm_cms_act"></div>';
        html+='<div class="d-block w-100 mb-5" id="list_cms_data_'+this.id_collection+'"></div>';

        $("#main_contain").html('');
        
        if(this.type=="list"){
            $("#main_contain").html(html);
            if(this.data_form_add!=null) $("#frm_cms_act").html(this.show_form_add());
            $("#list_cms_data_"+this.id_collection).html(this.show_list());
            this.load_data_for_list();
        }

        if(this.type=="setting"){
            $("#main_contain").html(html);
            cr_firestore.get("setting",this.id_collection,(data_setting)=>{
                $("#frm_cms_act").html(this.show_form_add(data_setting));
            },()=>{
                $("#frm_cms_act").html(this.show_form_add());
            });
        }

        if(this.type=="page"){
            if(this.js!=null){
                var func_page=this.js;
                cms[func_page]();
            }
        }
    }
}