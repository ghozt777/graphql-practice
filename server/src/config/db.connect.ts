import mongoose from "mongoose";
const connectToDB = async () => {
  try {
    const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ghozt.1el8n.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
    await mongoose.connect(URL);
    console.log("connected to DB 🤙");
  } catch (e) {
    let message = "Unknown Error !";
    if (e instanceof Error) message = e.message;
    console.log("error while connecting to DB :  ", message);
  }
};

export = connectToDB;
