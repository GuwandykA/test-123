import { database } from "./../db/index.js";
import { videUploadMV } from "./../functions/videoUpload.js";
import { OneImageUploadMV } from "./../functions/imageUpload.js";

const create = async (req, res) => {
  try {
    const { author_name, desc, date_format } = req.body;

    const user_id = req.user_id;
    const image = req.files && req.files.file ? req.files["file"] : false;
    const mimetype = image.mimetype.split("/");

    if (req.body != null) {
      if (mimetype[0] == "image") {
        var path = await OneImageUploadMV(image, user_id, 1, "news");
      } else {
        var path = await videUploadMV(image, "news", user_id);
      }

      console.log(path);

      const q_text = `INSERT INTO news ( author_name, "desc", date_format, path, user_id, type_file)  
                            VALUES ($1, $2, $3, $4, $5, $6) returning id;`;
      if (path) {
        await database(q_text, [
          author_name,
          desc,
          date_format,
          path,
          user_id,
          mimetype[0],
        ]);

        res.json({
          status: true,
          msg: "Successfully added",
        });
      } else {
        res.status(500).send("IMAGE NOT UPLOADED");
      }
    } else {
      res.json({
        status: false,
        msg: "Unidefined",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

const update = async (req, res) => {
  try {
    const { uuid, author_name, desc, date_format } = req.body;

    const user_id = req.user_id;
    const image = req.files && req.files.file ? req.files["file"] : false;
    const mimetype = image.mimetype.split("/");

    if (req.body != null) {
      if (mimetype[0] == "image") {
        var path = await OneImageUploadMV(image, user_id, 1, "news");
      } else {
        var path = await videUploadMV(image, "news", user_id);
      }

      console.log(path);

      const q_text = `update  news set 
                            author_name = $1, "desc" = $2,
                            date_format = $3, path = $4, 
                            user_id = $5 , type_file = $6
                          where id = $7 ;`;
      if (path) {
        await database(q_text, [
          author_name,
          desc,
          date_format,
          path,
          user_id,
          mimetype[0],
          uuid,
        ]);

        res.json({
          status: true,
          msg: "Successfully updated",
        });
      } else {
        res.status(500).send("IMAGE NOT UPLOADED");
      }
    } else {
      res.json({
        status: false,
        msg: "Unidefined",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

const getAll = async (req, res) => {
  try {
    const { page } = req.body;

    const c_text = ` select count(*) from news ;`;
    const { rows } = await database(c_text);

    const q_text = ` select 
        id, author_name, path, type_file, "desc", date_format
    from news ORDER BY date_format DESC limit 20 offset $1 ;`;
    const data = await database(q_text, [(page - 1) * 20]);

    res.json({
      status: true,
      count: rows[0],
      data: data.rows,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const delete_news = async (req, res) => {
  try {
    const id = req.params["id"];
    const q_text = " DELETE FROM news WHERE id=$1;";
    await database.query(q_text, [id]);

    res.json({
      status: true,
      msg: "Data delete successful",
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export { create, getAll, delete_news, update };
