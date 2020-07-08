const express = require("express");
let unirest = require("unirest");
const router = express.Router();
const env = require("dotenv");
env.config();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");

const db = low(adapter);

router.get("/checkBlueButton", (req, res) => {
  res.json({
    name: "Blue Button API",
    status: "Ready",
  });
});

router.post("/getAuth", async (req, res) => {
  try {
    let params = new URLSearchParams();
    params.set("grant_type", process.env.GRANT_TYPE);
    params.set("redirect_uri", process.env.REDIRECT_URI);
    params.set("client_id", process.env.CLIENT_ID);
    params.set("client_secret", process.env.CLIENT_SECRET);
    params.set("code", req.headers.code);
    params.set("state", req.headers.state);

    let response = await unirest
      .post(`${process.env.GET_AUTH_URL}` + params.toString())
      .headers({
        "Content-Type": "application/json",
      });

    if (response) {
      let data = db.get("users").find({ id: 1 });
      if (data) {
        db.get("users").remove({ id: 1 }).write();
        db.get("users").push({ id: 1, authDetails: response.body }).write();
      } else {
        db.get("users")
          .find({ id: 1 })
          .assign({ authDetails: response.body })
          .write();
      }

      let auth = db.get("users").find({ id: 1 }).value();

      //Update Patient Data in DB
      let patientResponse = await unirest
        .get(`${process.env.GET_PATIENT_URL}` + auth.authDetails.patient)
        .headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.authDetails.access_token}`,
        });

      db.get("users")
        .find({ id: 1 })
        .assign({ patientData: patientResponse.body })
        .write();

      //Update Coverage Data in DB
      let coverageResponse = await unirest
        .get(`${process.env.GET_COVERAGE_URL}` + auth.authDetails.patient)
        .headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.authDetails.access_token}`,
        });

      db.get("users")
        .find({ id: 1 })
        .assign({ coverageData: coverageResponse.body })
        .write();

      //Update Benefit Data in DB
      let benefitResponse = await unirest
        .get(`${process.env.GET_BENEFIT_URL}` + auth.authDetails.patient)
        .headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.authDetails.access_token}`,
        });

      db.get("users")
        .find({ id: 1 })
        .assign({ benefitData: benefitResponse.body })
        .write();
    }
    res.status(200).json(response.body);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in getting auth data!" }).end();
  }
});

router.post("/getRefreshedAuth", async (req, res) => {
  try {
    let auth = db.get("users").find({ id: 1 }).value();

    let params = new URLSearchParams();
    params.set("grant_type", process.env.GRANT_TYPE_REFRESH);
    params.set("redirect_uri", process.env.REDIRECT_URI);
    params.set("client_id", process.env.CLIENT_ID);
    params.set("client_secret", process.env.CLIENT_SECRET);
    params.set("refresh_token", auth.authDetails.refresh_token);

    let response = await unirest
      .post(`${process.env.GET_AUTH_URL}` + params.toString())
      .headers({
        "Content-Type": "application/json",
      });

    if (response) {
      db.get("users")
        .find({ id: 1 })
        .assign({ authDetails: response.body })
        .write();

      let auth = db.get("users").find({ id: 1 }).value();

      //Update Patient Data in DB
      let patientResponse = await unirest
        .get(`${process.env.GET_PATIENT_URL}` + auth.authDetails.patient)
        .headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.authDetails.access_token}`,
        });

      db.get("users")
        .find({ id: 1 })
        .assign({ patientData: patientResponse.body })
        .write();

      //Update Coverage Data in DB
      let coverageResponse = await unirest
        .get(`${process.env.GET_COVERAGE_URL}` + auth.authDetails.patient)
        .headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.authDetails.access_token}`,
        });

      db.get("users")
        .find({ id: 1 })
        .assign({ coverageData: coverageResponse.body })
        .write();

      //Update Benefit Data in DB
      let benefitResponse = await unirest
        .get(`${process.env.GET_BENEFIT_URL}` + auth.authDetails.patient)
        .headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.authDetails.access_token}`,
        });

      db.get("users")
        .find({ id: 1 })
        .assign({ benefitData: benefitResponse.body })
        .write();
    }

    res.status(200).json(response.body);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in getting auth data!" }).end();
  }
});

router.get("/getPatientData", async (req, res) => {
  try {
    // let auth = db.get("users").find({ id: 1 }).value();

    // let response = await unirest
    //   .get(`${process.env.GET_PATIENT_URL}` + auth.authDetails.patient)
    //   .headers({
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${auth.authDetails.access_token}`,
    //   });

    // db.get("users")
    //   .find({ id: 1 })
    //   .assign({ patientData: response.body })
    //   .write();

    let response = db.get("users").find({ id: 1 }).value().patientData;

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in getting patient data!" }).end();
  }
});

router.get("/getCoverageData", async (req, res) => {
  try {
    // let auth = db.get("users").find({ id: 1 }).value();

    // let response = await unirest
    //   .get(`${process.env.GET_COVERAGE_URL}` + auth.authDetails.patient)
    //   .headers({
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${auth.authDetails.access_token}`,
    //   });

    // db.get("users")
    //   .find({ id: 1 })
    //   .assign({ coverageData: response.body })
    //   .write();
    let response = db.get("users").find({ id: 1 }).value().coverageData;

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in getting coverage data!" }).end();
  }
});

router.get("/getBenefitData", async (req, res) => {
  try {
    // let auth = db.get("users").find({ id: 1 }).value();

    // let response = await unirest
    //   .get(`${process.env.GET_BENEFIT_URL}` + auth.authDetails.patient)
    //   .headers({
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${auth.authDetails.access_token}`,
    //   });

    // db.get("users")
    //   .find({ id: 1 })
    //   .assign({ benefitData: response.body })
    //   .write();

    let response = db.get("users").find({ id: 1 }).value().benefitData;

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Error in getting explanation of benefit data!" })
      .end();
  }
});

module.exports = router;
