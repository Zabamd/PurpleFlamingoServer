const express = require("express");
const router = express.Router();
const multer = require("multer");
const Action = require("../classes/Action");
const UtilityResponse = require("../utility/UtilityResponse");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/current_actions", function (req, res) {
  try {
    const actionsQuery = "SELECT * FROM action";
    const actionsResult = DatabaseHandler.queryData(actionsQuery);

    const actions = [];

    for (const actionRow of actionsResult) {
      const imagesQuery = "SELECT image FROM image WHERE actionId=?";
      const imagesResult = DatabaseHandler.queryData(imagesQuery, [
        actionRow.actionId,
      ]);
      const images = imagesResult.map((imageRow) => imageRow.image);

      const action = {
        ...actionRow,
        images: images,
      };

      actions.push(action);
    }

    return res.status(200).json(UtilityResponse.generateResponse(200, actions));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(UtilityResponse.generateResponse(500, error.message));
  }
});
router.get("/:actionID", function (req, res) {
  const actionId = req.params.actionID;
  try {
    const actionQuery = "SELECT * FROM action WHERE actionId = ?";
    const actionResult = DatabaseHandler.queryData(actionQuery, [actionId]);

    if (actionResult.length === 0) {
      return res
        .status(404)
        .json(UtilityResponse.generateResponse(404, "Action not found"));
    }

    const action = actionResult[0];
    const imagesQuery = "SELECT image FROM image WHERE actionId = ?";
    const imagesResult = DatabaseHandler.queryData(imagesQuery, [actionId]);

    const images = imagesResult.map((imageRow) => imageRow.image);

    const actionDetails = {
      ...action,
      images: images,
    };

    return res
      .status(200)
      .json(UtilityResponse.generateResponse(200, actionDetails));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(UtilityResponse.generateResponse(500, error.message));
  }
});

router.get("/highlighted", function (req, res) {
  try {
    const query = "SELECT * FROM action ORDER BY startDate ASC LIMIT 3";
    const result = DatabaseHandler.queryData(query);

    const actions = [];

    for (const actionRow of result) {
      const imagesQuery = "SELECT image FROM image WHERE actionId=?";
      const imagesResult = DatabaseHandler.queryData(imagesQuery, [
        actionRow.actionId,
      ]);
      const images = imagesResult.map((imageRow) => imageRow.image);

      const action = {
        ...actionRow,
        images: images,
      };

      actions.push(action);
    }

    return res.status(200).json(UtilityResponse.generateResponse(200, actions));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(UtilityResponse.generateResponse(500, error.message));
  }
});

router.get("/:userId", function (req, res) {
  const userId = req.params.userId;
  try {
    const response = Action.getUserActions(userId);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(UtilityResponse.generateResponse(500, error.message));
  }
});

router.post("/create_action", upload.array("images", 3), async (req, res) => {
  const { title, description, goal, startDate, finishDate, userID } = req.body;
  const files = req.files;

  try {
    const action = new Action(
      null, // actionId will be auto-incremented
      userID,
      title,
      new Date(startDate),
      new Date(finishDate),
      0, // currentAmount
      parseFloat(goal.replace(",", ".")), // Convert goal to a float number
      description,
      "active" // Default status
    );

    const actionResponse = action.uploadAction();
    if (actionResponse.statusCode !== 200) {
      return res
        .status(500)
        .json(UtilityResponse.generateResponse(500, "Failed to create action"));
    }

    const actionId = actionResponse.data.insertId;

    // Save images to database
    if (files) {
      for (const file of files) {
        const query = "INSERT INTO image (actionId, image) VALUES (?, ?)";
        const result = await DatabaseHandler.queryData(query, [
          actionId,
          file.buffer,
        ]);
        if (result.statusCode !== 200) {
          return res
            .status(500)
            .json(
              UtilityResponse.generateResponse(500, "Failed to save images")
            );
        }
      }
    }

    return res
      .status(200)
      .json(
        UtilityResponse.generateResponse(200, "Action created successfully")
      );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(UtilityResponse.generateResponse(500, error.message));
  }
});

module.exports = router;
