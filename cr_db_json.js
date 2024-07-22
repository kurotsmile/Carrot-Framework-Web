class Carrot_Database_Json{

    obj_temp=null;

    clear_value(obj){
        var objBlank=obj;
        $.each(objBlank,function(k,v){
            objBlank[k]="";
        });
        return objBlank;
    }

    add(data,act_done){
        this.edit(data,act_done);
    }

    edit(data,act_done){
        this.obj_temp=data;
        cr.box("Edit",'<form class="text-left cr_data_from"></form>',(emp)=>{
            var empDock=emp.find(".modal-footer");
            var empForm=$(emp).find(".cr_data_from");
            cr_data.dockBtnForBox(data,empDock);
            var btnAddField=$('<button class="btn btn-light btn-sm"><i class="far fa-plus-square"></i> Add Field</button>');
            $(btnAddField).click(function(){
                cr_data.show_add_field();
            });
            $(empDock).append(btnAddField);

            $.each(data,function(k,v){
               $(empForm).append(cr_data.itemField(k,v));
            });
        },()=>{
            var db={};
            $(".inp_db").each(function(index,emp){
                var db_key=$(emp).attr("db-key");
                var db_val=$(emp).val();
                db[db_key]=db_val;
            });
            if(act_done!=null) act_done(db);
        });
    }

    getIconBykey(key){
        var icon='';
        switch (key) {
            case 'lang':
                icon='<i class="fas fa-globe"></i>';
                break;
            case 'id':
                icon='<i class="fas fa-robot"></i>';
                break;
            case 'name':
                icon='<i class="fas fa-file-signature"></i>';
                break;
            case 'color':
                icon='<i class="fas fa-paint-brush"></i>';
                break;
            case 'date_create':
            case 'date':
            case 'publishedAt':
                icon='<i class="fas fa-calendar"></i>';
                break;
            default:
                icon='<i class="fas fa-database"></i>';
                break;
        }
        return icon;
    }

    getFieldTypeByKey(key,val_default=''){
        var html='';
        switch (key) {
            case 'lang':
                html+='<input list="inp_db_'+key+'_list" class="form-control inp_db" db-key="'+key+'" value="'+val_default+'" id="inp_db_'+key+'"/>';
                html+='<datalist id="inp_db_'+key+'_list">';
                    if(cr.list_lang!=null){
                        $.each(cr.list_lang,function(index,lang){
                            html+='<option value="'+lang.key+'">'+lang.name+'</option>';
                        });
                    }
                html+='</datalist>';
                break;
            case 'color':
                html+='<input type="color" class="form-control inp_db" db-key="'+key+'" value="'+val_default+'" id="inp_db_'+key+'"/>';
                break;
            case 'lyrics':
                html+='<textarea class="form-control inp_db" db-key="'+key+'" rows="3" id="inp_db_'+key+'"/>'+val_default+'</textarea>';
                break;
            case 'date':
                html+='<input type="date" class="form-control inp_db" db-key="'+key+'" value="'+val_default+'" id="inp_db_'+key+'"/>';
                break;
            case 'date_create':
            case 'publishedAt':
                html+='<input class="form-control inp_db"  type="datetime-local" db-key="'+key+'" value="'+this.convertISOToLocalDatetime(val_default)+'" id="inp_db_'+key+'"/>';
                break;
            default:
                if(Object.prototype.toString.call(val_default) === '[object Object]'){
                    html+=`<button class="btn btn-sm btn-light" data-json="${encodeURIComponent(JSON.stringify(val_default))}" onClick="cr_data.showObj(this);return false;"><i class="fas fa-box"></i> Object</button>`;
                }else{
                    html+='<input class="form-control inp_db" db-key="'+key+'" value="'+val_default+'" id="inp_db_'+key+'"/>';
                }
                break;
        }
        return html;
    }

    convertISOToLocalDatetime(isoString) {
        if (!isoString) {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        }

        const date = new Date(isoString);
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    convertLocalDatetimeToISO(datetimeLocalString) {
        const localDate = new Date(datetimeLocalString);
        const isoString = localDate.toISOString();
        return isoString;
    }

    info(data){
        var html='';
        html+='<table class="table table-striped table-hover table-sm text-left table-responsive">';
        html+='<tbody>';
        $.each(data,function(k,v){
            html+='<tr class="animate__flipInX animate__animated inp_db" db-val="'+v+'" db-key="'+k+'">';
                html+='<td>'+cr_data.getIconBykey(k)+'</td>';
                html+='<td>'+k+'</td>';
                html+='<td><small>'+v+'</small></td>';
            html+='</tr>';
        });
        html+='</tbody>';
        html+='</table>';
        cr.box("Info",html,(emp)=>{
            var emp_dock=$(emp).find(".modal-footer");
            cr_data.dockBtnForBox(data,emp_dock);
        });
    }

    dockBtnForBox(data,emp_add){
        var btnInfo=$('<button class="btn btn-light"><i class="fas fa-info-circle"></i> Info</button>');
        $(btnInfo).click(function(){
            cr_data.info(data);
        });
        $(emp_add).append(btnInfo);

        var btnEdit=$('<button class="btn btn-light"><i class="fas fa-edit"></i> Edit</button>');
        $(btnEdit).click(function(){
            cr_data.edit(data);
        });
        $(emp_add).append(btnEdit);

        var btnDownload=$('<button class="btn btn-light"><i class="fas fa-file-download"></i> Download</button>');
        $(btnDownload).click(function(){
            var db={};
                $(".inp_db").each(function(index,emp){
                    var db_key=$(emp).attr("db-key");
                    var db_val='';
                    if ($(emp).attr('db-val') !== undefined) {
                        db_val=$(emp).attr('db-val');
                    } else {
                        db_val=$(emp).val();
                    }
                    db[db_key]=db_val;
                });
            cr.download(db,"data.json");
        });
        $(emp_add).append(btnDownload);
    }

    itemField(k,v){
        var empObj=$(`
            <div class="form-group">
                <label>${k}</label>
                <div class="input-group">
                    <div class="input-group-prepend"><span class="input-group-text">${cr_data.getIconBykey(k)}</span></div>
                    ${cr_data.getFieldTypeByKey(k,v)}
                    <div class="input-group-append">
                        <span role="button" class="input-group-text" onClick="cr.copy('#inp_db_${k}');"><i class="fas fa-copy"></i></span>
                        <span role="button" class="input-group-text" onClick="cr.paste('#inp_db_${k}');"><i class="fas fa-paste"></i></span>
                    </div>
                </div>
            </div>
        `);
        return empObj;
    }

    showObj(emp){
        var datajson=$(emp).attr("data-json");
        const jsonString = decodeURIComponent(datajson);
        const data = JSON.parse(jsonString);
        var data_object_main=this.obj_temp;
        this.info(data);
        
        var btn_back_object_main=$(`<button class="btn btn-light float-right"><i class="fas fa-dice-d6"></i> Back Object Main</button>`);
        $(btn_back_object_main).click(()=>{
            cr_data.edit(data_object_main);
        });
        $(cr.box_cur).find(".modal-footer").append(btn_back_object_main);
        return false;
    }

    show_add_field(){
        Swal.fire({
            title:"Add Field",
            input: "text",
            inputLabel:"Enter Name Field",
            confirmButtonColor: cr.color_btn,
            preConfirm:(val)=>{
                if(val.trim()==""){
                    Swal.fire({
                        icon:"error",
                        text:"Name field cannot be empty!",
                        confirmButtonColor: cr.color_btn
                    });
                }else{
                    $(cr.box_cur).find(".modal-body").append(cr_data.itemField(val,""));
                }             
            }
        });
    }
}
var cr_data=new Carrot_Database_Json();
cr.data=cr_data;