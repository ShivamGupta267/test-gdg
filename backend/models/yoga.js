import mongoose from "mongoose";

const yogaPoseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  instructions: {
    type: [String],
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  media: {
    type: String,
    required: true
  },
  
});

const YogaPose = mongoose.model('YogaPose', yogaPoseSchema);

export default YogaPose;
