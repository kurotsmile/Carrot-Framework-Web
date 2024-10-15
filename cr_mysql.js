class CR_Mysql{
    
    api_mysql_url="";

    add(id_collection){

    }

    list(id_collection,act_done=null){
        $.get(cr_mysql.api_mysql_url+"/api/get-data", { table: id_collection }, function(data) {
            if(act_done) act_done(data);
        });
    }
}

var  cr_mysql=new CR_Mysql();