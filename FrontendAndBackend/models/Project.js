const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  approvals: {
    startup: { type: String, default: "pending" }, // approved/rejected/pending
    government: { type: String, default: "pending" },
    financial: { type: String, default: "pending" },
    auditor: { type: String, default: "pending" }
  }
});
