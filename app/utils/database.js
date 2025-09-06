import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // await 이유 : mongoose.connect가 완료되지 않았는데 Success가 뜰 수 있음. (await는 async와 함께 사용해야함)
    // 특히 try catch 구문에서는 await를 자주 함께 사용하므로 잘 기억해둘것!
    await mongoose.connect(
      "mongodb+srv://nugongja:B4IXsjZXzF2s11kD@cluster0.airqttr.mongodb.net/nextAppDataBase?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Success: Connected to MongoDB");
  } catch {
    console.log("Failure: Unconnected to MongoDB");
    throw new Error();
  }
};

export default connectDB;
