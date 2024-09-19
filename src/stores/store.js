const {MongoClient} = require("mongodb");
const uri = "mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0";
const client = new MongoClient(uri);
const db = client.db("guessMate");

const store = {
    client,
    db,
    signUp,
    confirmEmail,
    getUser,
    addQuiz,
    getQuizzes,
    addGuess,
    addQuizAnswers,
};


async function signUp(doc){
    const userCollection = this.db.collection("user");

    try{
        const result = await userCollection.insertOne(doc);
        return result.acknowledged ? true : false;
    }
    catch(err){
        throw err;
    }
}

async function confirmEmail(param){
    const {filter, update} = param;
    const userCollection = this.db.collection("user");

    try{
        const result = await userCollection.updateOne(filter, update);
        return result.modifiedCount > 0 ? true : false;
    }
    catch(err){
        throw err;
    }
}

async function getUser(param){
    const {query} = param;
    const userCollection = this.db.collection("user");

    try{
        const result = await userCollection.findOne(query);
        return result;
    }
    catch(err){
        throw err;
    }
}

async function addQuiz(doc){
    const quizzesCollection = this.db.collection("quizzes");

    try{
        const result = await quizzesCollection.insertOne(doc);

        return result ? true : false;
    }
    catch(err){
        console.log("Error in file: store.js, in function: addQuiz: ", err);
        throw err;
    }
}

async function getQuizzes(query){
    const quizzesCollection = this.db.collection("quizzes");

    try{
        const cursor = await quizzesCollection.find(query);
        const quizzes = await cursor.toArray();
        
        return quizzes.length > 0 ? quizzes : null;
    }
    catch(err){
        console.log("Error in file: store.js, in function: getQuizzes: ", err);
        throw err;
    }
}

async function addGuess(doc){
    const guessesCollection = this.db.collection("guesses");

    try{
        const result = await guessesCollection.insertOne(doc);
        
        return result.acknowledged ? true : false;
    }
    catch(err){
        console.log("Error in file store.js, in function addGuess: ", err);
        throw err;
    }
}

async function addQuizAnswers(doc){
    const answersCollection = this.db.collection("answers");

    try{
        const result = await answersCollection.insertOne(doc);
        
        return result.acknowledged === true ? true : false;
    }
    catch(err){
        console.log("Error in file store.js in function addQuizAnswers: ", err);
        throw err;
    }
}


module.exports = {store};
