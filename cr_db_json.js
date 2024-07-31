class Carrot_Database_Json{

    obj_temp=null;
    ui_type_show="add";

    clear_value(obj){
        var objBlank= Object.assign({}, obj);
        $.each(objBlank,function(k,v){
            objBlank[k]="";
        });
        return objBlank;
    }

    add(data,act_done,fieldCustomer=null){
        return this.edit(data,act_done,fieldCustomer);
    }

    edit(data,act_done,fieldCustomer=null){
        this.ui_type_show="edit";
        this.obj_temp=data;
        return cr.box("Edit",'<form class="text-left cr_data_from"></form>',(emp)=>{
            var valObject=cr_data.dbVal(data);
            var empDock=emp.find(".modal-footer");
            var empForm=$(emp).find(".cr_data_from");
            cr_data.dockBtnForBox(data,empDock,fieldCustomer);
            var btnAddField=$('<button class="btn btn-light btn-sm"><i class="far fa-plus-square"></i> Field</button>');
            $(btnAddField).click(function(){cr_data.show_add_field();});
            $(empDock).append(btnAddField);

            var btnAddArray=$('<button class="btn btn-light btn-sm"><i class="far fa-plus-square"></i> Array</button>');
            $(btnAddArray).click(function(){cr_data.show_add_array();});
            $(empDock).append(btnAddArray);

            if(valObject.type=="object"){
                let list_key_field_customer=[];

                $.each(data,function(k,v){
                    if(fieldCustomer!=null){
                        $(empForm).append(cr_data.itemField(k,v,fieldCustomer[k]));
                        if(fieldCustomer[k]!=null) list_key_field_customer.push(k);
                    }else{
                        $(empForm).append(cr_data.itemField(k,v));
                    }
                });

                if(fieldCustomer!=null){
                    $.each(fieldCustomer,function(k,v){
                        if(list_key_field_customer.includes(k)) return true;
                        var itemField=fieldCustomer[k];
                        $(empForm).append(cr_data.itemField(itemField.name,"",itemField));
                    });
                }
            }else{
                $.each(data,function(index,item_data){
                    $(empForm).append(cr_data.itemArray(index,item_data,"Array item "+index));
                });
            }
        },()=>{
            if(act_done!=null) act_done(cr_data.get_data_box());
        });
    }

    icon(key){
        return this.getIconBykey(key);
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
            case 'mp3':
                icon='<i class="fas fa-file-audio"></i>';
                break;
            case 'album':
                icon='<i class="fas fa-compact-disc"></i>';
                break;
            case 'genre':
                icon='<i class="fas fa-guitar"></i>';
                break;
            case 'link':
                icon='<i class="fas fa-link"></i>';
                break;
            case 'name':
                icon='<i class="fas fa-file-signature"></i>';
                break;
            case 'user':
                icon='<i class="fas fa-user"></i>';
                break;
            case 'artist':
                icon='<i class="fas fa-user-tie"></i>';
                break;
            case 'color':
                icon='<i class="fas fa-paint-brush"></i>';
                break;
            case 'date_create':
            case 'date':
            case 'publishedAt':
                icon='<i class="fas fa-calendar-day"></i>';
                break;
            case 'link_ytb':
                icon='<i class="fab fa-youtube"></i>';
                break;
            case 'avatar':
                icon='<i class="fas fa-portrait"></i>';
                break;
            case 'year':
                icon='<i class="fas fa-calendar-week"></i>';
                break;
            case 'id_import':
                icon='<i class="fas fa-satellite"></i>';
                break;
            default:
                icon='<i class="fas fa-database"></i>';
                break;
        }
        return icon;
    }

    tip_field(tip,id_emp=""){
        if(id_emp!="") id_emp='id="'+id_emp+'"';
        if(tip!=null) return '<small class="form-text text-muted" '+id_emp+'>'+tip+'</small>';
        else return '';
    }

    getFieldTypeByKey(key,val_default='',fieldCustomer=null){
        var html='';
        if(fieldCustomer!=null){
            switch (fieldCustomer.type) {
                case "list":
                case "select":
                case "dropdown":
                    html+='<select class="form-select custom-select inp_db"  db-key="'+key+'"  db-type="string"  id="inp_db_'+key+'">';
                    $.each(fieldCustomer.datas,function(index,d){
                        if(d.value==val_default)
                            html+='<option value="'+d.value+'" selected="true">'+d.label+'</option>';
                        else
                            html+='<option value="'+d.value+'">'+d.label+'</option>';
                    });
                    html+='</select>';
                    break;
                default:
                    break;
            }
        }else{
            switch (key) {
                case 'lang':
                    html+='<input list="inp_db_'+key+'_list" class="form-control inp_db" db-key="'+key+'" db-type="string"  value="'+val_default+'" id="inp_db_'+key+'"/>';
                    html+='<datalist id="inp_db_'+key+'_list">';
                        if(cr.list_lang!=null){
                            $.each(cr.list_lang,function(index,lang){
                                html+='<option value="'+lang.key+'">'+lang.name+'</option>';
                            });
                        }
                    html+='</datalist>';
                    break;
                case 'color':
                    html+='<input type="color" class="form-control inp_db" db-key="'+key+'" db-type="string" value="'+val_default+'" id="inp_db_'+key+'"/>';
                    break;
                case 'lyrics':
                    html+='<textarea class="form-control inp_db" db-key="'+key+'" db-type="string" rows="3" id="inp_db_'+key+'"/>'+val_default+'</textarea>';
                    break;
                case 'date':
                    html+='<input type="date" class="form-control inp_db" db-key="'+key+'" db-type="string" value="'+val_default+'" id="inp_db_'+key+'"/>';
                    break;
                case 'date_create':
                case 'publishedAt':
                    html+='<input class="form-control inp_db"  type="datetime-local" db-key="'+key+'" db-type="string" value="'+this.convertISOToLocalDatetime(val_default)+'" id="inp_db_'+key+'"/>';
                    break;
                default:
                    var db_val_filed=cr_data.dbVal(val_default);
                    if(db_val_filed.type=="object")
                        html+=`<button class="btn btn-sm btn-light inp_db" db-key="${key}" db-val="${db_val_filed.val}" db-type="${db_val_filed.type}" onClick="cr_data.showObj(this);return false;"><i class="fas fa-box"></i> Object (${Object.keys(val_default).length})</button>`;
                    else if(db_val_filed.type=="array")
                        html+=`<button class="btn btn-sm btn-light inp_db" db-key="${key}" db-val="${db_val_filed.val}" db-type="${db_val_filed.type}" onClick="cr_data.showObj(this);return false;"><i class="fas fa-layer-group"></i> Array (${Object.keys(val_default).length})</button>`;
                    else
                        html+='<input class="form-control inp_db" db-key="'+key+'" db-type="string" value="'+val_default+'" id="inp_db_'+key+'"/>';
                    break;
            }
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

    info(data,fieldCustomer=null){
        this.ui_type_show="info";
        var html='';
        html+='<div class="table-responsive">';
        html+='<table class="table table-striped table-hover table-sm text-left">';
        html+='<tbody>';
        $.each(data,function(k,v){
            var db_v=cr_data.dbVal(v);
            html+='<tr class="animate__flipInX animate__animated inp_db" db-val="'+db_v.val+'" db-type="'+db_v.type+'" db-key="'+k+'">';
                if(db_v.type=="array")
                    html+='<td><i class="fas fa-layer-group"></i></td>';
                else if(db_v.type=="object")
                    html+='<td><i class="fas fa-object-group"></i></td>';
                else
                    html+='<td>'+cr_data.getIconBykey(k)+'</td>';
                html+='<td>'+k+'</td>';
                if(fieldCustomer!=null)
                    html+='<td>'+cr_data.itemValInfo(k,v,fieldCustomer[k])+'</td>';
                else
                    html+='<td>'+cr_data.itemValInfo(k,v)+'</td>';
            html+='</tr>';
        });
        html+='</tbody>';
        html+='</table>';
        html+='</div>';
        cr.box("Info",html,(emp)=>{
            var emp_dock=$(emp).find(".modal-footer");
            cr_data.dockBtnForBox(data,emp_dock,fieldCustomer);
        });
    }

    dbVal(v) {
        let type;
        let value;
    
        if (typeof v === 'object') {
            if (Array.isArray(v)) {
                type = 'array';
            } else if (v === null) {
                type = 'null';
            } else {
                type = 'object';
            }
        } else {
            type = typeof v;
        }
        value = (type === 'object' || type === 'array') ? JSON.stringify(v) : String(v);
        value = encodeURIComponent(value);
        return { val: value, type: type };
    }

    dbGetVal(v, type) {
        let decodedValue;
        decodedValue = decodeURIComponent(v);
        switch (type) {
            case 'object':
            case 'array':
                try {
                    return JSON.parse(decodedValue);
                } catch (e) {
                    console.error('JSON parsing error:', e);
                    return null;
                }
            case 'string':
            case 'number':
            case 'boolean':
                return decodedValue;
            default:
                return decodedValue;
        }
    }
    
    dockBtnForBox(data,emp_add,fieldCustomer=null){

        if(this.ui_type_show=="info"){
            var btnEdit=$('<button class="btn btn-light"><i class="fas fa-edit"></i> Edit</button>');
            $(btnEdit).click(function(){
                cr_data.edit(data,null,fieldCustomer);
            });
            $(emp_add).append(btnEdit);
        }else{
            var btnInfo=$('<button class="btn btn-light"><i class="fas fa-info-circle"></i></button>');
            $(btnInfo).click(function(){
                cr_data.info(data,fieldCustomer);
            });
            $(emp_add).append(btnInfo);
        }

        var btnDownload=$('<button class="btn btn-light"><i class="fas fa-file-download"></i></button>');
        $(btnDownload).click(function(){
            cr.download(cr_data.get_data_box(),"data.json");
        });
        $(emp_add).append(btnDownload);
    }

    itemField(k,v,fieldCustomer=null,tip=null){
        var empObj=$(`
            <div class="form-group">
                <label>${k}</label>
                <div class="input-group">
                    <div class="input-group-prepend"><span class="input-group-text">${cr_data.getIconBykey(k)}</span></div>
                    ${cr_data.getFieldTypeByKey(k,v,fieldCustomer)}
                    <div class="input-group-append">
                        <span role="button" class="input-group-text" onClick="cr.copy('#inp_db_${k}');"><i class="fas fa-copy"></i></span>
                        <span role="button" class="input-group-text" onClick="cr.paste('#inp_db_${k}');"><i class="fas fa-paste"></i></span>
                        <span role="button" class="input-group-text" onClick="$(this).parent().parent().parent().remove()"><i class="fas fa-backspace"></i></span>
                    </div>
                </div>
                ${cr_data.tip_field(tip,k+"_tip")}
            </div>
        `);
        return empObj;
    }

    itemArray(indexArray,v,tip=null){
        var empObj='';
        if(cr_data.ui_type_show=="edit"){
            empObj=$(`
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-layer-group"></i>  &nbsp; ${indexArray}</span></div>
                        ${cr_data.getFieldTypeByKey(indexArray,v)}
                        <div class="input-group-append"></div>
                    </div>
                    ${cr_data.tip_field(tip,"arr_"+indexArray+"_tip")}
                </div>
            `);

            var btn_del=$('<span role="button" class="input-group-text" onClick="$(this).parent().parent().parent().remove()"><i class="fas fa-backspace"></i></span>');
            $(empObj).find(".input-group-append").append(btn_del);
        }else{
            empObj=$(`<i class="fas fa-layer-group"></i>  &nbsp; ${indexArray}</span> ${cr_data.getFieldTypeByKey(indexArray,v)}`);
        }
        return empObj;
    }

    itemValInfo(k,v,fieldCustomer=null){
        var checkVal=this.dbVal(v);
        var val='';
        if(fieldCustomer!=null){
            $.each(fieldCustomer.datas,function(index,d){
                if(d.value==v){
                    val=d.label;
                    return false;
                }
            });
        }else{
            if(checkVal.type=="array"){
                if(cr_data.ui_type_show=="add") val+='<button class="btn btn-sm btn-dark m-1"><i class="fas fa-plus-square"></i> Add item</button>';
                $.each(v,function(index,obj){
                    val+=cr_data.itemArray(index,obj,"Array item "+index).html();
                });
            }else if(checkVal.type=="object"){
                val+='<button class="btn btn-sm btn-light inp_db" db-key="'+k+'" db-val="'+checkVal.val+'" db-type="'+checkVal.type+'" onClick="cr_data.showObj(this);return false;"><i class="fas fa-box"></i> Object ('+Object.keys(v).length+')</button>';
            }else{
                switch (k) {
                    case 'color':
                        val='<i class="fas fa-palette" style="color:'+v+'"></i> '+v;
                        break;
                    case 'user':
                        val=v.name;
                        break;
                    default:
                        if(v=="")
                            val='<i class="fas fa-border-none"></i> None';
                        else
                            val='<small>'+v+'</small>';
                        break;
                }
            }
        }
        return val;
    }

    showObj(emp){
        var key=$(emp).attr("db-key");
        var datajson=$(emp).attr("db-val");
        const jsonString = decodeURIComponent(datajson);
        const data = JSON.parse(jsonString);
        var data_object_main=this.obj_temp;
        if(this.ui_type_show=="info")
            this.info(data);
        else
            this.edit(data,(data_sub)=>{
                data_object_main[key]=data_sub;
                setTimeout(()=>{
                    cr_data.edit(data_object_main);
                },500);
            });
        
        var btn_back_object_main=$(`<button class="btn btn-light float-right"><i class="fas fa-dice-d6"></i> Back Object Main</button>`);
        $(btn_back_object_main).click(()=>{
            cr_data.edit(data_object_main);
        });
        $(cr.box_cur).find(".modal-footer").append(btn_back_object_main);
        return false;
    }

    show_add_field(){
        cr.input("Add Field","Enter Name Field",(val)=>{
            $(cr.box_cur).find(".modal-body").append(cr_data.itemField(val,""));
        });
    }

    show_add_array(){
        cr.input("Add Array","Enter Name Array",(val)=>{
            $(cr.box_cur).find(".modal-body").append(cr_data.itemField(val,Array()));
        });
    }

    fieldCustomer_data(type,list_option=nul){
        return {"type":type,"datas":list_option};
    }

    fieldCustomer(name,type,list_option=nul){
        let fieldC={};
        fieldC[name]=this.fieldCustomer_data(type,list_option);
        fieldC.name=name;
        return fieldC;
    }

    get_data_box(){
        var db={};
        $(".inp_db").each(function(index,emp){
            var db_key=$(emp).attr("db-key");
            var db_val='';
            if($(emp).attr("db-val"))
                db_val=cr_data.dbGetVal($(emp).attr("db-val"),$(emp).attr("db-type"));
            else
                db_val=cr_data.dbGetVal($(emp).val(),$(emp).attr("db-type"));
            db[db_key]=db_val;
        });
        return db;
    }
}
var cr_data=new Carrot_Database_Json();
cr.data=cr_data;