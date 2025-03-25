const AdminSchema = new mongoose.Schema({
    phNumber: { type: String, required: true, unique: true },
    policeIdNumber: { type: String, required: true, unique: true },
    policeIdImage: { type: String, required: true },
    password: { type: String, required: true },
  });
  module.exports = mongoose.model("Admin", AdminSchema);