const { getCountriesService } = require("../countries/services/countries");
const {connection} = require("../helpers/db.ts");

jest.mock("../helpers/db", () => ({
  connection: {
    promise: jest.fn().mockReturnThis(),
    query: jest.fn(),
  },
}));

describe("getCountriesService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array with countries", async () => {
    const mockRows: any[] = [
      {
        name: "Mock Country",
        population_size: 1000000,
        Percentage_of_total: 10,
      },
    ];

    (connection.promise().query as jest.Mock).mockResolvedValueOnce([mockRows]);

    const result = await getCountriesService("Mock");

    expect(connection.promise().query).toHaveBeenCalledWith(
      expect.any(String),
      ["%Mock%", 5]
    );
    expect(result).toEqual(mockRows);
  });

  it("should return an empty array if no countries found", async () => {
    (connection.promise().query as jest.Mock).mockResolvedValueOnce([[]]);

    const result = await getCountriesService("Nonexistent");

    expect(connection.promise().query).toHaveBeenCalledWith(
      expect.any(String),
      ["%Nonexistent%", 5]
    );
    expect(result).toEqual([]);
  });
});
