class Carrot_Database_Json{

    edit(data){
        var html='';
        html+='<form class="text-left">';
        $.each(data,function(k,v){
            html+='<div class="form-group">';
            html+='<label for="data_field_'+k+'"><i class="fas fa-database"></i> '+k+'</label>';
            html+='<input class="form-control" value="'+v+'"/>';
            html+='</div>';
        });
        html+='</form>';
        Swal.fire({
            title:"Edit Database",
            html:html,
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonColor: cr.color_btn
        });
    }
}
var cr_data=new Carrot_Database_Json();
cr.data=cr_data;