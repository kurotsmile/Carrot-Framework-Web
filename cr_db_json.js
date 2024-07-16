class Carrot_Database_Json{

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
        var html='';
        html+='<form class="text-left">';
        $.each(data,function(k,v){
            html+='<div class="form-group">';
                html+='<label>'+k+'</label>';
                html+='<div class="input-group">';
                    html+='<div class="input-group-prepend">';
                        html+='<span class="input-group-text">'+cr_data.getIconBykey(k)+'</span>';
                    html+='</div>';
                    
                    html+=cr_data.getFieldTypeByKey(k,v);

                    html+='<div class="input-group-append">';
                        html+='<span role="button" class="input-group-text" onClick="cr.copy(\'#inp_db_'+k+'\');"><i class="fas fa-copy"></i></span>';
                        html+='<span role="button" class="input-group-text" onClick="cr.paste(\'#inp_db_'+k+'\');"><i class="fas fa-paste"></i></span>';
                    html+='</div>';
                html+='</div>';
            html+='</div>';
        });
        html+='</form>';
        Swal.fire({
            title:"Edit Database",
            html:html,
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonColor: cr.color_btn
        }).then((result)=>{
            if(result.isConfirmed){
                var db={};
                $(".inp_db").each(function(index,emp){
                    var db_key=$(emp).attr("db-key");
                    var db_val=$(emp).val();
                    db[db_key]=db_val;
                });
                if(act_done!=null) act_done(db);
            }
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
            case 'lyrics':
                html+='<textarea class="form-control inp_db" db-key="'+key+'" rows="3" id="inp_db_'+key+'"/>'+val_default+'<textarea>';
                break;
            case 'date':
                html+='<input type="date" class="form-control inp_db" db-key="'+key+'" value="'+val_default+'" id="inp_db_'+key+'"/>';
                break;
            case 'publishedAt':
                html+='<input class="form-control inp_db"  type="datetime-local" db-key="'+key+'" value="'+this.convertISOToLocalDatetime(val_default)+'" id="inp_db_'+key+'"/>';
                break;
            default:
                html+='<input class="form-control inp_db" db-key="'+key+'" value="'+val_default+'" id="inp_db_'+key+'"/>';
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
}
var cr_data=new Carrot_Database_Json();
cr.data=cr_data;