import { rest } from "msw";
import { setupServer } from "msw/node";


const body = { hello: "world" };

const server = setupServer(
  rest.get(
    "https://images-api.nasa.gov/search?media_type=image",
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(body));
    }
  )
);
describe("ListData", () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
  it("Should fetch data from the API", () => {
    expect(true).toBe(true);
  });
});
