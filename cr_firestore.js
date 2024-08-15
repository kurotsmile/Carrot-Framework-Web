class CR_FireStore{
    id_project="";
    api_key="";

    add(data_document,collection){
        var firestoreUrl = 'https://firestore.googleapis.com/v1/projects/'+cr_firestore.id_project+'/databases/(default)/documents/'+collection+'/?key='+cr_firestore.api_key;
            var data={};
            data["fields"]=cr_firestore.convertToFirestoreFormat(data_document);
            $.ajax({
                url: firestoreUrl,
                method: 'POST',
                headers: {
                    
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

    convertToFirestoreFormat(data) {
        let firestoreData = {};
    
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let value = data[key];
                if (typeof value === 'string') {
                    firestoreData[key] = { stringValue: value };
                } else if (typeof value === 'number') {
                    if (Number.isInteger(value)) {
                        firestoreData[key] = { integerValue: value };
                    } else {
                        firestoreData[key] = { doubleValue: value };
                    }
                } else if (typeof value === 'boolean') {
                    firestoreData[key] = { booleanValue: value };
                } else if (value instanceof Date) {
                    firestoreData[key] = { timestampValue: value.toISOString() };
                } else if (Array.isArray(value)) {
                    firestoreData[key] = {
                        arrayValue: {
                            values: value.map(item => convertToFirestoreFormat({ item }).item)
                        }
                    };
                } else if (typeof value === 'object' && value !== null) {
                    firestoreData[key] = {
                        mapValue: {
                            fields: convertToFirestoreFormat(value)
                        }
                    };
                } else if (value === null) {
                    firestoreData[key] = { nullValue: null };
                } else {
                    console.error(`Unsupported data type for Firestore: ${typeof value}`);
                }
            }
        }
    
        return firestoreData;
    }

    convertFromFirestoreFormat(firestoreData) {
        let data = {};
        for (let key in firestoreData) {
            if (firestoreData.hasOwnProperty(key)) {
                let value = firestoreData[key];
    
                if (value.stringValue !== undefined) {
                    data[key] = value.stringValue;
                } else if (value.integerValue !== undefined) {
                    data[key] = parseInt(value.integerValue);
                } else if (value.doubleValue !== undefined) {
                    data[key] = parseFloat(value.doubleValue);
                } else if (value.booleanValue !== undefined) {
                    data[key] = value.booleanValue;
                } else if (value.timestampValue !== undefined) {
                    data[key] = new Date(value.timestampValue);
                } else if (value.arrayValue !== undefined) {
                    data[key] = value.arrayValue.values.map(item => convertFromFirestoreFormat({ item }).item);
                } else if (value.mapValue !== undefined) {
                    data[key] = convertFromFirestoreFormat(value.mapValue.fields);
                } else if (value.nullValue !== undefined) {
                    data[key] = null;
                } else {
                    console.error(`Unsupported Firestore data type for key: ${key}`);
                }
            }
        }
    
        return data;
    }

    list(collection,act_done=null,act_fail=null){
        $.ajax({
            url: 'https://firestore.googleapis.com/v1/projects/'+cr_firestore.id_project+'/databases/(default)/documents/'+collection+'/?key='+cr_firestore.api_key,
            type: 'GET',
            success: function(data) {
                var list=[];
                for(var i=0;i<data.documents.length;i++){
                    var obj_data=cr_firestore.convertFromFirestoreFormat(data.documents[i].fields);
                    obj_data["id_doc"]=data.documents[i].name.split("/").pop();
                    list.push(obj_data);
                }
                if(act_done) act_done(list);
            },
            error: function(error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
                if(act_fail) act_fail();
            }
        });
    }
}

var cr_firestore=new CR_FireStore();
