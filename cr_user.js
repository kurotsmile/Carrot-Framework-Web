class Carrot_User{

    id_collection="user";
    type_db="firestore";//realtime

    login(username, password, act_done) {
        var report = {};

        if(username.trim()==""){
            report["status"]="error_username";
            act_done(report);
            return false;
        }

        if(password.trim()==""){
            report["status"]="error_password";
            act_done(report);
            return false;
        }

        if(cr_user.type_db=="firestore"){
            var q = new Firestore_Query(cr_user.id_collection);
            q.add_where("username", username);
            q.add_where("password", password);
            q.set_limit(1);
            q.get_data((data) => {
                if (data.length > 0) {
                    report["status"]="login_success";
                    report["user"]=data[0];
                    act_done(report);
                    return false;
                } else {
                    report["status"]="no_user";
                    act_done(report);
                    return false;
                }
            }, () => {
                report["status"]="error_server";
                act_done(report);
                return false;
            });
        }else{

            cr_realtime.getOne(cr_user.id_collection,username,users=>{
                if(users==null){
                    report["status"]="no_user";
                    act_done(report);
                    return false;
                }else{
                    if(users.password==password){
                        report["status"]="login_success";
                        report["user"]=users;
                        act_done(report);
                        return false;
                    }else{
                        report["status"]="no_user";
                        act_done(report);
                        return false;
                    }
                }
            },()=>{
                report["status"]="error_server";
                act_done(report);
                return false;
            });
        }

    }

    check_username(username,act_done){
        var report = {};
        if(cr_user.type_db=="firestore"){
            var q = new Firestore_Query(cr_user.id_collection);
            q.add_where("username", username);
            q.set_limit(1);
            q.get_data((data) => {
                if (data.length > 0) {
                    report["status"]="user_ready";
                    report["user"]=data[0];
                    act_done(report);
                    return false;
                } else {
                    report["status"]="no_user";
                    act_done(report);
                    return false;
                }
            }, () => {
                report["status"]="error_server";
                act_done(report);
                return false;
            });
        }else{
            cr_realtime.getOne(cr_user.id_collection,username,users=>{
                if(users==null){
                    report["status"]="no_user";
                    act_done(report);
                    return false;
                }else{
                    report["status"]="user_ready";
                    report["user"]=users;
                    act_done(report);
                    return false;
                }
            },()=>{
                report["status"]="error_server";
                act_done(report);
                return false;
            });
        }
    }

    change_password(id_doc,password,act_done=null){
        var report = {};
        if(cr_user.type_db=="firestore"){
            cr_firestore.update_field(id_doc,cr_user.id_collection,"password",password,()=>{
                report["status"]="success";
                if(act_done) act_done(report);
                return false;
            },()=>{
                report["status"]="error_server";
                if(act_done) act_done(report);
                return false;
            });
        }else{
            cr_realtime.updateData(cr_user.id_collection,id_doc,{"password":password},()=>{
                report["status"]="success";
                if(act_done) act_done(report);
                return false;
            },()=>{
                report["status"]="error_server";
                if(act_done) act_done(report);
                return false;
            });
        }
    }
}

var cr_user=new Carrot_User();