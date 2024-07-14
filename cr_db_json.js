class Carrot_Database_Json{

    add(data,act_done){
        this.edit(data,act_done);
    }
    
    edit(data,act_done){
        var html='';
        html+='<form class="text-left">';
        $.each(data,function(k,v){
            html+='<div class="form-group">';
            html+='<label for="data_field_'+k+'"><i class="fas fa-database"></i> '+k+'</label>';
            html+='<input class="form-control inp_db" db-key="'+k+'" value="'+v+'"/>';
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
}
var cr_data=new Carrot_Database_Json();
cr.data=cr_data;