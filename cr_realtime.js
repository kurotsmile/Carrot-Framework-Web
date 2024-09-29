//<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
//<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"></script>

class Carrot_Realtime_DB{

    db=null;
    firebase=null;
    ref=null;
    set=null;
    onValue=null;

    onLoad(config){
        cr_realtime.db=getDatabase(initializeApp(config));
        cr_realtime.ref=ref;
        cr_realtime.set=set;
        cr_realtime.onValue=onValue;
        cr_realtime.get=get;
    }

    add(id_collection,id_doc,data,act_done=null){
        const dbRef = cr_realtime.ref(cr_realtime.db, id_collection+'/'+id_doc);
        cr_realtime.set(dbRef,data)
        .then(() => {
            if(act_done) act_done();
          console.log("Data saved successfully!");
        })
        .catch((error) => {
          console.error("Error writing to database: ", error);
        });
    }

    getData(id_collection,id_doc,act_done) {
        const userRef = cr_realtime.ref(cr_realtime.db, id_collection+'/'+id_doc);
        cr_realtime.onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          
          if (data) {
            act_done(data);
          } else {
            console.log("No data available");
          }
        }, (error) => {
          console.error("Error reading data:", error);
        });
    }

    list(id_collection,act_done=null,act_fail=null){
        const usersRef = ref(cr_realtime.db,id_collection);
        onValue(usersRef, (snapshot) => {
          const data = snapshot.val();
          if (data) act_done(data);
        }, (error) => {
          console.error("Error reading data:", error);
          if(act_fail) act_fail();
        });
    }
};

var cr_realtime=new Carrot_Realtime_DB();