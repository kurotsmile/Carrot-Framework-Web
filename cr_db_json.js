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
                    
                    html+='<input class="form-control inp_db" db-key="'+k+'" value="'+v+'" id="inp_db_'+k+'"/>';
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
}
var cr_data=new Carrot_Database_Json();
cr.data=cr_data;