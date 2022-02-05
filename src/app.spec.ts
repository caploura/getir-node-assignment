import request, { Response } from "supertest";
import app from "./app";

// import { ResponsePayload, RequestPayload } from "./types/payload";
import { validateResponsePayload } from "./validation/payload";

describe("POST /fetchByDateAndTotalCount", () => {
  describe("If the RequestPayload is missing", () => {
    test("Should respond with a 400 - Bad Request", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send();

      expect(res.statusCode).toBe(400);
    });

    test("Should respond with a JSON message (Content-type)", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send();

      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Message should be of type ResponsePayload", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send();

      expect(validateResponsePayload(res.body).valid).toEqual(true);
    });
  });

  describe("If the startDate is missing from the RequestPayload", () => {
    test("Should respond with a 400 - Bad Request", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          endDate: "2015-11-28T11:48:29.706+00:00",
          minCount: 0,
          maxCount: 4500,
        });

      expect(res.statusCode).toBe(400);
    });

    test("Should respond with a JSON message (Content-type)", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          endDate: "2015-11-28T11:48:29.706+00:00",
          minCount: 0,
          maxCount: 4500,
        });

      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Message should be of type ResponsePayload", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          endDate: "2015-11-28T11:48:29.706+00:00",
          minCount: 0,
          maxCount: 4500,
        });

      expect(validateResponsePayload(res.body).valid).toEqual(true);
    });
  });

  describe("If the endDate is missing from the RequestPayload", () => {
    test("Should respond with a 400 - Bad Request", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          minCount: 0,
          maxCount: 4500,
        });

      expect(res.statusCode).toBe(400);
    });

    test("Should respond with a JSON message (Content-type)", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          minCount: 0,
          maxCount: 4500,
        });

      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Message should be of type ResponsePayload", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          minCount: 0,
          maxCount: 4500,
        });

      expect(validateResponsePayload(res.body).valid).toEqual(true);
    });
  });

  describe("If the maxCount is missing from the RequestPayload", () => {
    test("Should respond with a 400 - Bad Request", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          endDate: "2015-11-28T11:48:29.706+00:00",
          minCount: 0,
        });

      expect(res.statusCode).toBe(400);
    });

    test("Should respond with a JSON message (Content-type)", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          endDate: "2015-11-28T11:48:29.706+00:00",
          minCount: 0,
        });

      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Message should be of type ResponsePayload", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          endDate: "2015-11-28T11:48:29.706+00:00",
          minCount: 0,
        });

      expect(validateResponsePayload(res.body).valid).toEqual(true);
    });
  });

  describe("If the minCount is missing from the RequestPayload", () => {
    test("Should respond with a 400 - Bad Request", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          endDate: "2015-11-28T11:48:29.706+00:00",
          maxCount: 4500,
        });

      expect(res.statusCode).toBe(400);
    });

    test("Should respond with a JSON message (Content-type)", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          endDate: "2015-11-28T11:48:29.706+00:00",
          maxCount: 4500,
        });

      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Message should be of type ResponsePayload", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          endDate: "2015-11-28T11:48:29.706+00:00",
          maxCount: 4500,
        });

      expect(validateResponsePayload(res.body).valid).toEqual(true);
    });
  });

  describe("If the minCount is greater then maxCount", () => {
    test("Should respond with a 400 - Bad Request", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          endDate: "2015-11-28T11:48:29.706+00:00",
          maxCount: 10,
          minCount: 200,
        });

      expect(res.statusCode).toBe(400);
    });

    test("Should respond with a JSON message (Content-type)", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          endDate: "2015-11-28T11:48:29.706+00:00",
          maxCount: 4500,
        });

      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Message should be of type ResponsePayload", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          endDate: "2015-11-28T11:48:29.706+00:00",
          maxCount: 4500,
        });

      expect(validateResponsePayload(res.body).valid).toEqual(true);
    });
  });

  describe("If the route doesn't exist", () => {
    test("Should respond with a 404 - Not Found", async () => {
      const res: Response = await request(app)
        .post("/thisEndpointDoesntExist")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          endDate: "2015-11-28T11:48:29.706+00:00",
          minCount: 0,
          maxCount: 4500,
        });

      expect(res.statusCode).toBe(404);
    });

    test("Should respond with a JSON message (Content-type)", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          endDate: "2015-11-28T11:48:29.706+00:00",
          maxCount: 4500,
        });

      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Message should be of type ResponsePayload", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          endDate: "2015-11-28T11:48:29.706+00:00",
          maxCount: 4500,
        });

      expect(validateResponsePayload(res.body).valid).toEqual(true);
    });
  });

  describe("When everything is provided", () => {
    test("Should respond with a 200 - OK", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-01-27T01:20:48.978+00:00",
          endDate: "2020-01-29T10:59:48.978+00:00",
          minCount: 0,
          maxCount: 1000,
        });

      expect(res.statusCode).toBe(200);
    });

    test("Should respond with a JSON message (Content-type)", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-01-27T01:20:48.978+00:00",
          endDate: "2020-01-29T10:59:48.978+00:00",
          minCount: 0,
          maxCount: 1000,
        });

      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Message should be of type ResponsePayload", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-01-27T01:20:48.978+00:00",
          endDate: "2020-01-29T10:59:48.978+00:00",
          minCount: 0,
          maxCount: 1000,
        });

      expect(validateResponsePayload(res.body).valid).toEqual(true);
    });
  });

  describe("When everything is provided but no records are found", () => {
    test("Should respond with a 200 - OK", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          endDate: "2015-11-28T11:48:29.706+00:00",
          minCount: 0,
          maxCount: 1,
        });

      expect(res.statusCode).toBe(200);
    });

    test("Should respond with a JSON message (Content-type)", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2015-11-28T11:46:29.706+00:00",
          endDate: "2015-11-28T11:48:29.706+00:00",
          minCount: 0,
          maxCount: 1,
        });

      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Message should be of type ResponsePayload", async () => {
      const res: Response = await request(app)
        .post("/fetchByDateAndTotalCount")
        .send({
          startDate: "2010-11-28T11:46:29.706+00:00",
          endDate: "2019-11-28T11:48:29.706+00:00",
          minCount: 0,
          maxCount: 1,
        });

      expect(validateResponsePayload(res.body).valid).toEqual(true);
    });
  });
});
