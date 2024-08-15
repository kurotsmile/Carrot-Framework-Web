class CR_FireStore{
    id_project="";
    api_key="";

    add(data_document,collection){
        var firestoreUrl = 'https://firestore.googleapis.com/v1/projects/'+cr_firestore.id_project+'/databases/(default)/documents/'+collection;
            var data = {
                fields: {
                    fieldName1: { stringValue: "Value1" },
                    fieldName2: { integerValue: 123 }
                }
            };

            $.ajax({
                url: firestoreUrl,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+cr_firestore.api_key,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data),
                success: function(response) {
                    console.log('Document added successfully:', response);
                },
                error: function(error) {
                    console.error('Error adding document:', error);
                }
            });
    }
}

var cr_firestore=new CR_FireStore();
