const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./service-key.json");
const config = require("./config.json")

const dataz = require("./characterskills.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.db
});

admin.firestore().settings({ timestampsInSnapshots: true });

getWeapons()


//------------------------
function getWeapons(){
    admin.firestore().collection("weapontraits").where("name", "==", 'backstab')
    .get()
    .then(function(data) {
    	var found
            data.forEach(function(doc) {
            	found = doc.data().description
                console.log(doc.data().description);
            });
            if (!found){
            	console.log("nope")
            }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function triggerUpload(){
    var myData = dataz
    
    myData && Object.keys(myData).forEach(key => {
    	console.log("key " + key)
        const nestedContent = myData[key];
    
        if (typeof nestedContent === "object") {
        	console.log(nestedContent)
    
                admin.firestore()
                    .collection("characteristicprofiles")
                    .doc(key)
                    .set(nestedContent)
                    .then((res) => {
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
    
        }
    });
}