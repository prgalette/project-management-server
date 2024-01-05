const { model, Schema } = require("mongoose");

const projectSchema = new Schema(
  {
    title: String,
    description: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

module.exports = model("Project", projectSchema);