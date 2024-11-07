require("dotenv").config();

io = require("socket.io")(3001, {
  cors: {
    origin: "https://google-doc-clone-smoky.vercel.app",
    methods: ["GET", "POST"],
  },
});
const db = require("mongoose");
const Document = require("./Document");
const User = require("./User");

db.connect(process.env.MONGODB_URI);

const defaultValue = "";
io.on("connection", async (socket) => {
  socket.on("add-user", async (id) => {
    const user = await User.findById(id);
    if (!user) {
      await User.create({ _id: id, recents: [] });
    }
  });
  socket.on("fetch-recent", async (user_id) => {
    const user = await User.findById(user_id);
    if (!user) return;

    const res = await Promise.all(
      user.recents.map(async (id) => {
        return Document.findById(id);
      })
    );

    socket.emit("receive-recent", res);
  });
  socket.on("get-document", async (id) => {
    socket.join(id);
    const document = await findAndCreateDoc(id);

    socket.emit("load-document", document);

    socket.on("save-doc", async ([delta, user_id]) => {
      await findAndSaveDoc(id, delta, user_id);
      console.log("saved");
    });

    socket.on("change-doc", (delta) => {
      socket.broadcast.to(id).emit("receive-changes", delta);
    });

    socket.on("send-position", ([position, url, name]) => {
      socket.broadcast.to(id).emit("receive-position", [position, url, name]);
    });

    socket.on("name-change", async (name) => {
      socket.broadcast.to(id).emit("update-name", name);
      await Document.findByIdAndUpdate(id, { name });
    });
  });

  console.log("connected");
});

const findAndCreateDoc = async (id) => {
  const document = await Document.findById(id);
  if (document) return document;
  return Document.create({
    _id: id,
    data: defaultValue,
    name: "Untitled",
    user_id: null,
  });
};

const findAndSaveDoc = async (id, data, user_id) => {
  const document = await Document.findById(id);
  const res = { data };
  if (!document.user_id && user_id) {
    res.user_id = user_id;
  }

  const user = await User.findById(user_id);

  if (user && !user.recents.includes(id)) {
    user.recents.push(id);
    await user.save();
  }

  await Document.findByIdAndUpdate(id, res);
};
