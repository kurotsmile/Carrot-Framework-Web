//<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
//<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"></script>

class Carrot_Realtime_DB{
    config=null;
    /*
    const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
    */
    db=null;
    firebase=null;
    ref=null;
    set=null;
    onValue=null;
    
    onLoad(){
        //this.add("rot","thanh",{"name":"love"});
    }

    add(id_collection,id_doc,data){
        const dbRef = cr_realtime.ref(cr_realtime.db, id_collection+'/'+id_doc);
        cr_realtime.set(dbRef,data)
        .then(() => {
          console.log("Data saved successfully!");
        })
        .catch((error) => {
          console.error("Error writing to database: ", error);
        });
    }

    on(id_collection,id_doc,act_done=null){
        cr_realtime.db.ref(id_collection+'/'+id_doc).on('value', (snapshot) => {
            let data = snapshot.val();
            if(act_done) act_done(data);
        });        
    }
};

var cr_realtime=new Carrot_Realtime_DB();