class Carrot_User{

    id_collection="user";

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
    }

    check_username(username,act_done){
        var report = {};
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
    }
}

var cr_user=new Carrot_User();