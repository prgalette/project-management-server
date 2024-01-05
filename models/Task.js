const { model, Schema } = require("mongoose");

const taskSchema = new Schema(
  {
    title: String,
    description: String,
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

module.exports = model("Task", taskSchema);