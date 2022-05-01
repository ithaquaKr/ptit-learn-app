const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const documentRoute = require("./routes/documents");
const todoRoute = require("./routes/todo")
const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster14.gkzcx.mongodb.net/ptit-learn?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)

		console.log('Database Connection Successfull!')
	} catch (error) {
		console.log(error.message)
	}
};
connectDB();

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/documents", documentRoute);
app.use("/api/todo", todoRoute);

app.listen(process.env.PORT || 8800, () => {
  console.log(`Backend server is running on PORT: ${8800}!`);
});

