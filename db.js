import mongoose from "mongoose";

const mongoURI =
  "mongodb+srv://tamaldas69:tamaldas69@cluster0.g8nkn.mongodb.net/memoirs?retryWrites=true&w=majority";

const connectToMongo = async () => {
  await mongoose.connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Connected to Mongo Successfully");
    }
  );
};

export default connectToMongo;
