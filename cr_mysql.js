class CR_Mysql{
    
    api_mysql_url="";

    add(id_collection,data,act_done=null,act_fail=null){
        $.ajax({
            url: cr_mysql.api_mysql_url+"/api/add",
            type: "POST",
            data: {
                table: id_collection,
                data: JSON.stringify(data)
            },
            success: function(response) {
                if(act_done) act_done(response);
            },
            error: function(xhr, status, error) {
                if(act_fail) act_fail();
            }
        });
    }

    list(id_collection,act_done=null){
        $.get(cr_mysql.api_mysql_url+"/api/list", { table: id_collection }, function(data) {
            if(act_done) act_done(data);
        });
    }
}

var  cr_mysql=new CR_Mysql();